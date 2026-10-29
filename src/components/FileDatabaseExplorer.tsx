import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  Plus,
  Database,
  Code,
  HardDrive,
  Copy,
  Check,
  RotateCcw,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { CourseFile, FileCategory, FileExtension } from '../types/curriculum';
import { COURSE_MODULES } from '../data/courseData';
import { CourseDatabaseService } from '../services/courseDatabase';
import { FileViewerModal } from './FileViewerModal';

export const FileDatabaseExplorer: React.FC = () => {
  const [files, setFiles] = useState<CourseFile[]>(() => CourseDatabaseService.getFiles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<FileCategory | 'all'>('all');
  const [selectedFileType, setSelectedFileType] = useState<FileExtension | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modals & Panels
  const [previewFile, setPreviewFile] = useState<CourseFile | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSchemaModal, setShowSchemaModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // New file form state
  const [newTitle, setNewTitle] = useState('');
  const [newFilename, setNewFilename] = useState('');
  const [newModuleId, setNewModuleId] = useState(COURSE_MODULES[0].id);
  const [newCategory, setNewCategory] = useState<FileCategory>('Worksheet');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const [formError, setFormError] = useState('');

  const refreshFiles = () => {
    setFiles(CourseDatabaseService.getFiles());
  };

  const filteredFiles = useMemo(() => {
    let result = CourseDatabaseService.searchFiles(
      searchQuery,
      selectedCategory,
      selectedFileType,
      selectedModule
    );

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'date') comparison = a.dateAdded.localeCompare(b.dateAdded);
      if (sortBy === 'title') comparison = a.title.localeCompare(b.title);
      if (sortBy === 'size') comparison = a.sizeBytes - b.sizeBytes;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [files, searchQuery, selectedCategory, selectedFileType, selectedModule, sortBy, sortOrder]);

  const handleCreateFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newFilename.trim()) {
      setFormError('Please provide both Title and Filename with extension (e.g. guide.pdf).');
      return;
    }

    const assignedModule = COURSE_MODULES.find((m) => m.id === newModuleId);
    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const res = CourseDatabaseService.addFile({
      title: newTitle.trim(),
      filename: newFilename.trim(),
      moduleId: newModuleId,
      moduleTitle: assignedModule?.title || 'Community Training Module',
      category: newCategory,
      description: newDescription.trim() || 'Custom course material loaded into community repository.',
      tags: tagsArray.length > 0 ? tagsArray : ['Custom', 'Community Learning'],
      sizeBytes: Math.floor(Math.random() * 200000) + 50000
    });

    if (res.success) {
      refreshFiles();
      setShowAddModal(false);
      setNewTitle('');
      setNewFilename('');
      setNewDescription('');
      setNewTags('');
      setFormError('');
    } else {
      setFormError(res.message);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(CourseDatabaseService.generateCloudflareD1Schema());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(files, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `digital_literacy_course_database_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset file database to default initial curriculum files?')) {
      CourseDatabaseService.resetFilesToDefaults();
      refreshFiles();
    }
  };

  const formatSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Zone */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold mb-1">
              <Database className="w-4 h-4" />
              <span>Structured Courseware Repository</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Community Curriculum File Database
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Centralized, typed file management system mirroring the curriculum hierarchy of{' '}
              <span className="font-mono text-slate-800 font-medium">/home/courses/community-training/modules-and-exercises</span>. 
              Load files, inspect schemas, and verify integrity hashes before deployment to Cloudflare R2 / D1.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowSchemaModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Code className="w-3.5 h-3.5 text-slate-500" />
              View Cloudflare D1/R2 Schema
            </button>
            <button
              onClick={handleExportJson}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
              Export JSON Bundle
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              Register / Load New File
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-5">
          {/* Search Bar (5 cols) */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files by title, filename, tags, or checksum..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-900"
            />
          </div>

          {/* Module Filter (3 cols) */}
          <div className="md:col-span-3">
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Modules (1 to 6)</option>
              {COURSE_MODULES.map((m) => (
                <option key={m.id} value={m.id}>
                  Module {m.order}: {m.title}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter (2 cols) */}
          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as FileCategory | 'all')}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All Categories</option>
              <option value="Reference Guide">Reference Guides</option>
              <option value="Worksheet">Worksheets</option>
              <option value="Template">Templates</option>
              <option value="Exercise Starter">Exercise Starters</option>
              <option value="Rubric">Rubrics</option>
            </select>
          </div>

          {/* Extension Filter (2 cols) */}
          <div className="md:col-span-2">
            <select
              value={selectedFileType}
              onChange={(e) => setSelectedFileType(e.target.value as FileExtension | 'all')}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">All File Types</option>
              <option value="pdf">PDF Documents</option>
              <option value="docx">DOCX Worksheets</option>
              <option value="xlsx">XLSX Spreadsheets</option>
              <option value="zip">ZIP Packages</option>
            </select>
          </div>
        </div>

        {/* Status / Active Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span>Showing <span className="font-bold text-slate-800 font-mono">{filteredFiles.length}</span> of <span className="font-mono">{files.length}</span> courseware records</span>
            {(selectedModule !== 'all' || selectedCategory !== 'all' || selectedFileType !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedModule('all');
                  setSelectedCategory('all');
                  setSelectedFileType('all');
                  setSearchQuery('');
                }}
                className="text-sky-600 hover:underline text-[11px]"
              >
                Clear Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              }}
              className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900"
            >
              <ArrowUpDown className="w-3 h-3" />
              Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-600 ml-2"
              title="Reset files to curriculum initial state"
            >
              <RotateCcw className="w-3 h-3" />
              Reset DB
            </button>
          </div>
        </div>
      </div>

      {/* Files Table View */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4 w-12 text-center">Type</th>
                <th className="py-3 px-4">Title & Description</th>
                <th className="py-3 px-4">Assigned Module</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right font-mono">Size</th>
                <th className="py-3 px-4 text-center">Version</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No course files match the selected filters or search terms.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-4 text-center">
                      <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {file.fileType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 hover:text-sky-600 cursor-pointer" onClick={() => setPreviewFile(file)}>
                        {file.title}
                      </div>
                      <div className="font-mono text-[11px] text-slate-400">{file.filename}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{file.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-800 font-medium block max-w-[180px] truncate" title={file.moduleTitle}>
                        {file.moduleTitle}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{file.moduleId}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-slate-600 text-xs">{file.category}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-600 tabular-nums">
                      {formatSize(file.sizeBytes)}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-500">
                      v{file.version}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setPreviewFile(file)}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-md transition-colors"
                          title="Preview in browser"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => CourseDatabaseService.triggerFileDownload(file)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                          title="Download real file"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <FileViewerModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}

      {/* Register New File Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-900 mb-1">Load / Register Courseware File</h3>
            <p className="text-xs text-slate-500 mb-4">
              Register a new training document, spreadsheet starter, or rubric into the structured schema.
            </p>

            {formError && (
              <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateFile} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Document Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Email Etiquette Rubric"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Filename (.pdf, .docx, .xlsx) *</label>
                  <input
                    type="text"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                    placeholder="e.g. email_rubric.pdf"
                    className="w-full px-3 py-2 font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as FileCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Worksheet">Worksheet</option>
                    <option value="Template">Template</option>
                    <option value="Reference Guide">Reference Guide</option>
                    <option value="Exercise Starter">Exercise Starter</option>
                    <option value="Rubric">Rubric</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Curriculum Module</label>
                <select
                  value={newModuleId}
                  onChange={(e) => setNewModuleId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                >
                  {COURSE_MODULES.map((m) => (
                    <option key={m.id} value={m.id}>
                      Module {m.order}: {m.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Summary of learning outcomes or exercise goals..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="e.g. Soft Skills, Email, Communication"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-xs"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cloudflare Schema Modal */}
      {showSchemaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Cloudflare D1 SQL Schema & R2 Worker Architecture
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Production edge database schema designed to replace Google Sites file links.
                </p>
              </div>
              <button
                onClick={() => setShowSchemaModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase font-mono">
                    1. Cloudflare D1 Serverless SQL Schema
                  </span>
                  <button
                    onClick={handleCopySql}
                    className="flex items-center gap-1 text-xs text-sky-600 hover:underline font-mono"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedSql ? 'Copied to Clipboard' : 'Copy D1 Schema SQL'}
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {CourseDatabaseService.generateCloudflareD1Schema()}
                </pre>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 uppercase font-mono block mb-1.5">
                  2. Cloudflare Worker + R2 Storage Bucket Proxy (Zero Egress Fees)
                </span>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-[11px] overflow-x-auto leading-relaxed">
                  {CourseDatabaseService.generateCloudflareWorkerR2Snippet()}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
