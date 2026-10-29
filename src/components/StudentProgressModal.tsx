import React, { useState } from 'react';
import { X, Award, CheckCircle2, RotateCcw, Download, Printer } from 'lucide-react';
import { COURSE_MODULES, PROGRAM_INFO } from '../data/courseData';
import { CourseDatabaseService } from '../services/courseDatabase';

export const StudentProgressModal: React.FC<{
  onClose: () => void;
  onRefresh: () => void;
}> = ({ onClose, onRefresh }) => {
  const [progress, setProgress] = useState(() => CourseDatabaseService.getProgress());
  const [studentName, setStudentName] = useState('Community Learner');
  const [showCertificate, setShowCertificate] = useState(false);

  const totalLessons = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalExercises = COURSE_MODULES.reduce((acc, m) => acc + m.exercises.length, 0);
  const completedLessonsCount = progress.completedLessons.length;
  const passedExercisesCount = Object.values(progress.exerciseSubmissions).filter((s) => s.passed).length;

  const totalScoreEarned = Object.values(progress.exerciseSubmissions).reduce((acc, s) => acc + s.score, 0);
  const maxPossibleScore = totalExercises * 100;
  const overallPercentage = Math.round(((completedLessonsCount + passedExercisesCount) / (totalLessons + totalExercises)) * 100);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your learning progress and exercise records?')) {
      CourseDatabaseService.resetProgress();
      setProgress(CourseDatabaseService.getProgress());
      onRefresh();
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Student Learning Portfolio</h3>
              <p className="text-xs text-slate-500">
                Youth Training & Employment Digital Literacy Track
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Score Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase tracking-wide block">Overall Progress</span>
              <span className="text-xl font-bold font-mono text-slate-900">{overallPercentage}%</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase tracking-wide block">Lessons Read</span>
              <span className="text-xl font-bold font-mono text-sky-700">
                {completedLessonsCount} / {totalLessons}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase tracking-wide block">Exercises Passed</span>
              <span className="text-xl font-bold font-mono text-emerald-700">
                {passedExercisesCount} / {totalExercises}
              </span>
            </div>
          </div>

          {/* Module-by-Module Progress Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Module Completion Status
            </h4>
            <div className="space-y-2.5">
              {COURSE_MODULES.map((mod) => {
                const modLessonsDone = mod.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
                const modExDone = mod.exercises.filter((ex) => progress.exerciseSubmissions[ex.id]?.passed).length;
                const modComplete = modLessonsDone === mod.lessons.length && modExDone === mod.exercises.length;

                return (
                  <div key={mod.id} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">
                        Module {mod.order}: {mod.title}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {modLessonsDone}/{mod.lessons.length} Lessons · {modExDone}/{mod.exercises.length} Exercises Passed
                      </div>
                    </div>
                    {modComplete ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Mastered ✓
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">In Progress</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certificate Generation Box */}
          <div className="p-5 bg-sky-50/60 rounded-xl border border-sky-200 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Certificate of Digital Competency</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Accredited digital transcript conforming to UNESCO & Northstar Digital Literacy standards.
                </p>
              </div>
              <button
                onClick={() => setShowCertificate(!showCertificate)}
                className="px-3 py-1.5 text-xs font-semibold bg-sky-600 text-white rounded-lg hover:bg-sky-700 shadow-xs"
              >
                {showCertificate ? 'Hide Preview' : 'Generate Certificate'}
              </button>
            </div>

            {showCertificate && (
              <div className="p-6 bg-white rounded-lg border-2 border-slate-800 text-center space-y-4 my-3 print:border-0 shadow-lg">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    Official Verification Credential
                  </span>
                  <h2 className="text-xl font-bold font-serif text-slate-900 mt-1">
                    Certificate of Digital Competency
                  </h2>
                  <p className="text-xs text-slate-500">Youth Training & Employment Initiative</p>
                </div>

                <div className="py-2">
                  <p className="text-xs text-slate-500 italic">This is proudly awarded to:</p>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="text-lg font-bold text-slate-900 text-center border-b border-slate-300 focus:outline-hidden py-1 w-72 mx-auto"
                  />
                  <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                    for successfully demonstrating foundational mastery in computer operating systems, cloud productivity, cyber defense, and workforce ATS job readiness.
                  </p>
                </div>

                <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono">
                  <div className="text-left">
                    <span>Issue Date: {new Date().toISOString().split('T')[0]}</span>
                    <span className="block text-[10px] text-slate-400">ID: UNESCO-DL-2026-COMMUNITY</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif italic text-slate-800">Youth Training Faculty</span>
                    <span className="block text-[10px]">Academic Credential Seal</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={handlePrintCertificate}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Certificate
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-rose-600 hover:underline font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Learning Data
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 text-white rounded-lg hover:bg-slate-700"
          >
            Close Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
