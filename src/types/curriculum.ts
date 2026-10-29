export type FileCategory =
  | 'Template'
  | 'Worksheet'
  | 'Reference Guide'
  | 'Exercise Starter'
  | 'Rubric'
  | 'Syllabus';

export type FileExtension = 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'zip' | 'txt' | 'csv' | 'json';

export interface CourseFile {
  id: string;
  title: string;
  filename: string;
  fileType: FileExtension;
  sizeBytes: number;
  category: FileCategory;
  moduleId: string;
  moduleTitle: string;
  version: string;
  dateAdded: string;
  tags: string[];
  checksum: string;
  description: string;
  previewContent: {
    type: 'text' | 'table' | 'checklist' | 'code';
    data: any;
  };
  sampleDownloadContent?: string;
}

export interface Lesson {
  id: string;
  title: string;
  readTimeMinutes: number;
  overview: string;
  keyPoints: string[];
  detailedContent: string[];
  tipsForCommunityLearners: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  contextTag: string;
}

export type ExerciseType = 'file_organizer' | 'phishing_inbox' | 'spreadsheet_math' | 'ats_resume' | 'quiz_check';

export interface ModuleExercise {
  id: string;
  title: string;
  type: ExerciseType;
  estimatedMinutes: number;
  points: number;
  objective: string;
  instructions: string[];
  rubricCriteria: { criterion: string; weight: string; description: string }[];
  quizQuestions?: QuizQuestion[];
}

export interface ProfessionalResourceLink {
  id: string;
  title: string;
  organization: string;
  url: string;
  description: string;
  domain: string;
  topics: string[];
  freeStatus: '100% Free' | 'Free with Paid Cert' | 'Open Source OER';
  accreditedBy?: string;
}

export interface CourseModule {
  id: string;
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  durationHours: number;
  level: 'Foundational' | 'Intermediate' | 'Workforce Ready';
  summary: string;
  competencies: string[];
  lessons: Lesson[];
  exercises: ModuleExercise[];
  fileIds: string[];
  recommendedResourceIds: string[];
  coverImage?: string;
}

export interface ImprovementRecommendation {
  id: string;
  category: 'Pedagogy & Engagement' | 'Cloudflare & Edge Architecture' | 'Accessibility & Inclusivity' | 'Assessment & Data Integrity';
  title: string;
  googleSitesLimitation: string;
  recommendedSolution: string;
  technicalArchitecture: string;
  impactScore: 'Critical' | 'High' | 'Strategic';
  actionItems: string[];
}

export interface UserProgressState {
  completedLessons: string[];
  exerciseSubmissions: Record<string, {
    score: number;
    maxScore: number;
    passed: boolean;
    completedAt: string;
    details?: any;
  }>;
  downloadedFileIds: string[];
  notes: Record<string, string>;
}
