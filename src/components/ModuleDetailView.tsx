import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  Activity,
  Download,
  Eye,
  ExternalLink,
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { CourseModule, CourseFile, ProfessionalResourceLink } from '../types/curriculum';
import { CourseDatabaseService } from '../services/courseDatabase';
import { PROFESSIONAL_RESOURCES } from '../data/courseData';
import { FileOrganizerExercise } from './exercises/FileOrganizerExercise';
import { PhishingSimulatorExercise } from './exercises/PhishingSimulatorExercise';
import { SpreadsheetMiniSandbox } from './exercises/SpreadsheetMiniSandbox';
import { AtsResumeTester } from './exercises/AtsResumeTester';
import { QuizExercise } from './exercises/QuizExercise';
import { FileViewerModal } from './FileViewerModal';

export const ModuleDetailView: React.FC<{
  module: CourseModule;
  onBack: () => void;
  onSelectModule: (moduleId: string) => void;
}> = ({ module, onBack, onSelectModule }) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'exercises' | 'files' | 'resources'>('lessons');
  const [previewFile, setPreviewFile] = useState<CourseFile | null>(null);
  const [progress, setProgress] = useState(() => CourseDatabaseService.getProgress());

  const moduleFiles = CourseDatabaseService.getFilesByModule(module.id);
  const moduleResources = PROFESSIONAL_RESOURCES.filter((r) =>
    module.recommendedResourceIds.includes(r.id)
  );

  const handleToggleLesson = (lessonId: string) => {
    CourseDatabaseService.toggleLessonCompletion(lessonId);
    setProgress(CourseDatabaseService.getProgress());
  };

  const completedLessonsInModule = module.lessons.filter((l) =>
    progress.completedLessons.includes(l.id)
  ).length;

  const moduleExercisesCompleted = module.exercises.filter((ex) =>
    progress.exerciseSubmissions[ex.id]?.passed
  ).length;

  const isModuleMastered =
    completedLessonsInModule === module.lessons.length &&
    moduleExercisesCompleted === module.exercises.length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Course Modules</span>
        </button>

        <div className="text-xs text-slate-500 font-mono">
          Module {module.order} of 6 · <span className="font-semibold text-slate-700">{module.level}</span>
        </div>
      </div>

      {/* Module Hero Banner */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>ESTIMATED DURATION: {module.durationHours} HOURS</span>
              <span>·</span>
              <span>{module.lessons.length} LESSONS</span>
              <span>·</span>
              <span>{module.exercises.length} EXERCISES</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {module.title}
            </h1>
            <p className="text-sm font-medium text-sky-700">{module.subtitle}</p>
            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{module.summary}</p>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                Core Competencies Acquired:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                {module.competencies.map((comp, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Module Mastery</h4>
              {isModuleMastered && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Completed ✓
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Lessons Read:</span>
                <span className="font-mono font-bold text-slate-800">
                  {completedLessonsInModule} / {module.lessons.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-600 h-full transition-all duration-300"
                  style={{
                    width: `${(completedLessonsInModule / module.lessons.length) * 100}%`
                  }}
                />
              </div>

              <div className="flex justify-between text-slate-600 pt-2">
                <span>Exercises Passed:</span>
                <span className="font-mono font-bold text-slate-800">
                  {moduleExercisesCompleted} / {module.exercises.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300"
                  style={{
                    width: `${(moduleExercisesCompleted / module.exercises.length) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-t border-slate-200 bg-slate-50/70 flex overflow-x-auto gap-4">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'lessons'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Lessons & Readings ({module.lessons.length})
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'exercises'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Interactive Exercises & Sandboxes ({module.exercises.length})
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'files'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Course Files & Downloads ({moduleFiles.length})
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === 'resources'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Industry Standards & Links ({moduleResources.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Lessons */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {module.lessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs text-slate-500 font-mono">
                      Estimated Read: {lesson.readTimeMinutes} mins
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{lesson.title}</h3>
                  </div>
                  <button
                    onClick={() => handleToggleLesson(lesson.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">{lesson.overview}</p>

                {/* Key Takeaways */}
                <div className="p-4 bg-sky-50/60 rounded-lg border border-sky-100 text-xs text-sky-950 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-sky-900 block">
                    Essential Key Takeaways:
                  </span>
                  <ul className="space-y-1 pl-4 list-disc text-slate-700">
                    {lesson.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>

                {/* Detailed Paragraphs */}
                <div className="text-xs text-slate-700 leading-relaxed space-y-3 pt-2">
                  {lesson.detailedContent.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Community Tips */}
                {lesson.tipsForCommunityLearners.length > 0 && (
                  <div className="p-4 bg-amber-50/60 rounded-lg border border-amber-200 text-xs text-amber-950 space-y-1.5">
                    <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 block">
                      Community Training Pro-Tip:
                    </span>
                    {lesson.tipsForCommunityLearners.map((tip, i) => (
                      <p key={i} className="text-slate-700">
                        • {tip}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Interactive Exercises & Sandboxes */}
      {activeTab === 'exercises' && (
        <div className="space-y-8">
          {module.exercises.map((exercise) => {
            const submission = progress.exerciseSubmissions[exercise.id];
            return (
              <div key={exercise.id} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span>TIME: ~{exercise.estimatedMinutes} MINS</span>
                      <span>·</span>
                      <span>POINTS: {exercise.points}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{exercise.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 max-w-2xl">{exercise.objective}</p>
                  </div>

                  {submission && (
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-700">
                        Recorded Score: {submission.score} / {submission.maxScore}
                      </span>
                      <span
                        className={`block text-[11px] font-bold ${
                          submission.passed ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {submission.passed ? 'Status: Passed ✓' : 'Status: Review & Retest'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Render the specific interactive component based on exercise type */}
                {exercise.type === 'file_organizer' && (
                  <FileOrganizerExercise
                    exerciseId={exercise.id}
                    onComplete={() => setProgress(CourseDatabaseService.getProgress())}
                  />
                )}

                {exercise.type === 'phishing_inbox' && (
                  <PhishingSimulatorExercise
                    exerciseId={exercise.id}
                    onComplete={() => setProgress(CourseDatabaseService.getProgress())}
                  />
                )}

                {exercise.type === 'spreadsheet_math' && (
                  <SpreadsheetMiniSandbox
                    exerciseId={exercise.id}
                    onComplete={() => setProgress(CourseDatabaseService.getProgress())}
                  />
                )}

                {exercise.type === 'ats_resume' && (
                  <AtsResumeTester
                    exerciseId={exercise.id}
                    onComplete={() => setProgress(CourseDatabaseService.getProgress())}
                  />
                )}

                {exercise.type === 'quiz_check' && exercise.quizQuestions && (
                  <QuizExercise
                    exerciseId={exercise.id}
                    questions={exercise.quizQuestions}
                    onComplete={() => setProgress(CourseDatabaseService.getProgress())}
                  />
                )}

                {/* Rubric Criteria Table */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 text-xs">
                  <h5 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                    Evaluation Rubric & Grading Criteria
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {exercise.rubricCriteria.map((c, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-200">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-900">{c.criterion}</span>
                          <span className="font-mono text-sky-700 text-[11px]">{c.weight}</span>
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Module Files */}
      {activeTab === 'files' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Courseware Materials for Module {module.order}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Download templates, rubrics, and diagnostic guides loaded from the curriculum database.
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">{moduleFiles.length} files available</span>
          </div>

          <div className="divide-y divide-slate-100">
            {moduleFiles.map((file) => (
              <div key={file.id} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[10px] font-bold uppercase px-2 py-1 rounded bg-slate-100 text-slate-700 mt-0.5">
                    {file.fileType}
                  </span>
                  <div>
                    <h4
                      className="text-xs font-bold text-slate-900 hover:text-sky-600 cursor-pointer"
                      onClick={() => setPreviewFile(file)}
                    >
                      {file.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono">{file.filename}</p>
                    <p className="text-xs text-slate-600 mt-1">{file.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview
                  </button>
                  <button
                    onClick={() => CourseDatabaseService.triggerFileDownload(file)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download File
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: External Standards & Links */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moduleResources.map((res) => (
            <div key={res.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{res.organization}</span>
                <span className="text-emerald-700 font-semibold">{res.freeStatus}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{res.description}</p>
              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-400">{res.domain}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-sky-700 hover:underline"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Preview Modal */}
      {previewFile && (
        <FileViewerModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
};
