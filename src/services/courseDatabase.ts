import { CourseFile, UserProgressState, FileCategory, FileExtension } from '../types/curriculum';
import { INITIAL_FILES_DATABASE } from '../data/courseData';

const STORAGE_KEY_FILES = 'digitalliteracy_files_db_v1';
const STORAGE_KEY_PROGRESS = 'digitalliteracy_user_progress_v1';

export class CourseDatabaseService {
  // --- Files Database Operations ---

  static getFiles(): CourseFile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FILES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored files database, resetting to defaults', e);
    }
    this.saveFiles(INITIAL_FILES_DATABASE);
    return INITIAL_FILES_DATABASE;
  }

  static saveFiles(files: CourseFile[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(files));
    } catch (e) {
      console.error('Failed to save files database to localStorage', e);
    }
  }

  static getFileById(id: string): CourseFile | undefined {
    return this.getFiles().find((f) => f.id === id);
  }

  static getFilesByModule(moduleId: string): CourseFile[] {
    return this.getFiles().filter((f) => f.moduleId === moduleId);
  }

  static searchFiles(query: string, category?: FileCategory | 'all', fileType?: FileExtension | 'all', moduleId?: string | 'all'): CourseFile[] {
    const all = this.getFiles();
    const cleanQuery = query.toLowerCase().trim();

    return all.filter((file) => {
      // Category filter
      if (category && category !== 'all' && file.category !== category) return false;
      // Type filter
      if (fileType && fileType !== 'all' && file.fileType !== fileType) return false;
      // Module filter
      if (moduleId && moduleId !== 'all' && file.moduleId !== moduleId) return false;

      // Search text query
      if (!cleanQuery) return true;
      const matchTitle = file.title.toLowerCase().includes(cleanQuery);
      const matchFilename = file.filename.toLowerCase().includes(cleanQuery);
      const matchDesc = file.description.toLowerCase().includes(cleanQuery);
      const matchTags = file.tags.some((t) => t.toLowerCase().includes(cleanQuery));
      return matchTitle || matchFilename || matchDesc || matchTags;
    });
  }

  static addFile(newFile: Partial<CourseFile>): { success: boolean; message: string; file?: CourseFile } {
    if (!newFile.title || !newFile.filename || !newFile.moduleId) {
      return { success: false, message: 'Missing required fields: Title, Filename, and Module assignment.' };
    }

    const files = this.getFiles();
    const id = `FILE-${Date.now().toString(36).toUpperCase()}`;
    const ext = (newFile.filename.split('.').pop()?.toLowerCase() as FileExtension) || 'pdf';

    const fullFile: CourseFile = {
      id,
      title: newFile.title,
      filename: newFile.filename,
      fileType: ext,
      sizeBytes: newFile.sizeBytes || 120000,
      category: newFile.category || 'Reference Guide',
      moduleId: newFile.moduleId,
      moduleTitle: newFile.moduleTitle || 'Community Training Module',
      version: newFile.version || '1.0.0',
      dateAdded: new Date().toISOString().split('T')[0],
      tags: newFile.tags || ['Custom Upload', 'Community'],
      checksum: this.generateSimpleChecksum(newFile.filename + Date.now()),
      description: newFile.description || 'Uploaded courseware material for youth learning.',
      previewContent: newFile.previewContent || {
        type: 'text',
        data: `File preview for ${newFile.filename}. Uploaded via Course File Database Manager.`
      },
      sampleDownloadContent: newFile.sampleDownloadContent || `# ${newFile.title}\n${newFile.description}\nFile: ${newFile.filename}\n`
    };

    files.push(fullFile);
    this.saveFiles(files);
    return { success: true, message: 'File successfully registered in database!', file: fullFile };
  }

  static deleteFile(id: string): boolean {
    const files = this.getFiles();
    const filtered = files.filter((f) => f.id !== id);
    if (filtered.length !== files.length) {
      this.saveFiles(filtered);
      return true;
    }
    return false;
  }

  static resetFilesToDefaults(): void {
    this.saveFiles(INITIAL_FILES_DATABASE);
  }

  // --- Real File Download Utility ---
  static triggerFileDownload(file: CourseFile): void {
    const mimeTypes: Record<FileExtension, string> = {
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      zip: 'application/zip',
      txt: 'text/plain;charset=utf-8',
      csv: 'text/csv;charset=utf-8',
      json: 'application/json;charset=utf-8'
    };

    const mime = mimeTypes[file.fileType] || 'application/octet-stream';
    const content = file.sampleDownloadContent || `# ${file.title}\n\n${file.description}\n\nFile Name: ${file.filename}\nModule: ${file.moduleTitle}\nVersion: ${file.version}\nChecksum: ${file.checksum}\n`;

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Record in user progress
    this.recordFileDownload(file.id);
  }

  // --- User Progress State Operations ---

  static getProgress(): UserProgressState {
    const defaultState: UserProgressState = {
      completedLessons: [],
      exerciseSubmissions: {},
      downloadedFileIds: [],
      notes: {}
    };

    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse user progress', e);
    }
    return defaultState;
  }

  static saveProgress(state: UserProgressState): void {
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }

  static toggleLessonCompletion(lessonId: string): boolean {
    const progress = this.getProgress();
    const index = progress.completedLessons.indexOf(lessonId);
    let completed = false;
    if (index >= 0) {
      progress.completedLessons.splice(index, 1);
    } else {
      progress.completedLessons.push(lessonId);
      completed = true;
    }
    this.saveProgress(progress);
    return completed;
  }

  static recordExerciseSubmission(
    exerciseId: string,
    score: number,
    maxScore: number,
    passed: boolean,
    details?: any
  ): void {
    const progress = this.getProgress();
    progress.exerciseSubmissions[exerciseId] = {
      score,
      maxScore,
      passed,
      completedAt: new Date().toISOString(),
      details
    };
    this.saveProgress(progress);
  }

  static recordFileDownload(fileId: string): void {
    const progress = this.getProgress();
    if (!progress.downloadedFileIds.includes(fileId)) {
      progress.downloadedFileIds.push(fileId);
      this.saveProgress(progress);
    }
  }

  static resetProgress(): void {
    localStorage.removeItem(STORAGE_KEY_PROGRESS);
  }

  // --- Cloudflare D1 / SQL Export Helper ---
  static generateCloudflareD1Schema(): string {
    return `-- Cloudflare D1 SQL Schema for Digital Literacy Learning Portal
-- Generated for youth-training-and-employment database migration

CREATE TABLE IF NOT EXISTS courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    track TEXT NOT NULL,
    estimated_hours INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS modules (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES courses(id),
    module_order INTEGER NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle TEXT,
    duration_hours INTEGER,
    level TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS course_files (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES modules(id),
    title TEXT NOT NULL,
    filename TEXT NOT NULL,
    file_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    category TEXT NOT NULL,
    version TEXT DEFAULT '1.0.0',
    r2_storage_key TEXT,
    checksum_sha256 TEXT,
    date_added TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES modules(id),
    title TEXT NOT NULL,
    exercise_type TEXT NOT NULL,
    points INTEGER DEFAULT 100,
    objective TEXT
);

CREATE TABLE IF NOT EXISTS user_progress (
    user_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL REFERENCES exercises(id),
    score INTEGER NOT NULL,
    max_score INTEGER NOT NULL,
    passed INTEGER NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, exercise_id)
);

-- Indexing for high-speed edge search
CREATE INDEX IF NOT EXISTS idx_files_module ON course_files(module_id);
CREATE INDEX IF NOT EXISTS idx_files_category ON course_files(category);
`;
  }

  static generateCloudflareWorkerR2Snippet(): string {
    return `// Cloudflare Worker Script: R2 File Serving & D1 Query Engine
// Deploy via Cloudflare Workers + Pages

export interface Env {
  COURSEWARE_BUCKET: R2Bucket; // Cloudflare R2 Bucket for PDFs, DOCX, XLSX
  DB: D1Database;               // Cloudflare Serverless SQL Database
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. API: List or search course files from D1
    if (url.pathname === '/api/files' && request.method === 'GET') {
      const category = url.searchParams.get('category');
      const query = category 
        ? await env.DB.prepare('SELECT * FROM course_files WHERE category = ? ORDER BY date_added DESC').bind(category).all()
        : await env.DB.prepare('SELECT * FROM course_files ORDER BY module_id, date_added DESC').all();
      return Response.json(query.results, {
        headers: { 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. R2 Object Download with zero egress fee
    if (url.pathname.startsWith('/downloads/')) {
      const key = url.pathname.replace('/downloads/', '');
      const object = await env.COURSEWARE_BUCKET.get(key);
      if (!object) return new Response('File Not Found in Cloudflare R2', { status: 404 });
      
      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);
      headers.set('Content-Disposition', \`attachment; filename="\${key}"\`);
      return new Response(object.body, { headers });
    }

    return new Response('Digital Literacy Cloudflare Edge API', { status: 200 });
  }
};
`;
  }

  private static generateSimpleChecksum(input: string): string {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex}e4b78912c45ab89201948ba${hex}fd91283c`.slice(0, 64);
  }
}
