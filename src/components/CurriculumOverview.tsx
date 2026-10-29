import React from 'react';
import { BookOpen, Clock, CheckCircle2, FileText, ArrowRight, Award, Sparkles, ExternalLink } from 'lucide-react';
import { COURSE_MODULES, PROGRAM_INFO } from '../data/courseData';
import { CourseModule } from '../types/curriculum';
import { CourseDatabaseService } from '../services/courseDatabase';

export const CurriculumOverview: React.FC<{
  onSelectModule: (module: CourseModule) => void;
  onExploreSandboxes: () => void;
}> = ({ onSelectModule, onExploreSandboxes }) => {
  const progress = CourseDatabaseService.getProgress();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Hero Copy & CTA (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold font-mono">
                <span>{PROGRAM_INFO.programName}</span>
                <span>/</span>
                <span>{PROGRAM_INFO.track}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Digital Literacy & Workforce Training
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                An interactive competency-based learning portal designed to bridge the digital divide. 
                Featuring hands-on workplace sandboxes, automated grading, a structured curriculum file database, and Cloudflare edge hosting readiness.
              </p>

              {/* Source Google Sites Reference Notice */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
                <span>
                  Curriculum modeled after:{' '}
                  <span className="font-mono text-slate-800 font-semibold">
                    youth-training-and-employment / modules-and-exercises
                  </span>
                </span>
                <a
                  href={PROGRAM_INFO.sourceGoogleSitesRef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sky-700 font-medium hover:underline text-[11px]"
                >
                  <span>Google Sites Reference</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 mt-6">
              <button
                onClick={() => onSelectModule(COURSE_MODULES[0])}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors shadow-xs"
              >
                <span>Begin Module 1: Computer Fundamentals</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreSandboxes}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Launch Interactive Sandboxes</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Fidelity Hero Image (5 cols) */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100">
            <img
              src="/src/assets/images/hero_digital_literacy_1793252992619.jpg"
              alt="Diverse community adult learners in a modern technology lab"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
              <div className="text-white text-xs">
                <p className="font-bold">Community Learning Lab</p>
                <p className="text-slate-200 text-[11px]">Equipping next-generation talent with digital workplace tools</p>
              </div>
            </div>
          </div>
        </div>

        {/* Metric Bar Row below hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-slate-200 bg-slate-50/70 divide-x divide-slate-200 text-center py-3.5">
          <div>
            <span className="block text-[11px] text-slate-500 font-mono">CURRICULUM MODULES</span>
            <span className="text-lg font-bold font-mono text-slate-900">6 Modules</span>
          </div>
          <div>
            <span className="block text-[11px] text-slate-500 font-mono">INSTRUCTION TIME</span>
            <span className="text-lg font-bold font-mono text-slate-900">36 Hours</span>
          </div>
          <div>
            <span className="block text-[11px] text-slate-500 font-mono">INTERACTIVE SANDBOXES</span>
            <span className="text-lg font-bold font-mono text-slate-900">4 Active Tools</span>
          </div>
          <div>
            <span className="block text-[11px] text-slate-500 font-mono">FRAMEWORK ALIGNED</span>
            <span className="text-lg font-bold font-mono text-slate-900">UNESCO / Northstar</span>
          </div>
        </div>
      </div>

      {/* Curriculum Modules Grid Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Curriculum Modules & Practical Exercises</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured progressive learning path from physical hardware basics through cloud collaboration and ATS job applications.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">6 Modules Total</span>
        </div>

        {/* Modules Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSE_MODULES.map((module) => {
            const moduleFiles = CourseDatabaseService.getFilesByModule(module.id);
            const completedLessons = module.lessons.filter((l) =>
              progress.completedLessons.includes(l.id)
            ).length;
            const completedExercises = module.exercises.filter((ex) =>
              progress.exerciseSubmissions[ex.id]?.passed
            ).length;
            const isCompleted =
              completedLessons === module.lessons.length &&
              completedExercises === module.exercises.length;

            return (
              <div
                key={module.id}
                onClick={() => onSelectModule(module)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Card Cover Visual */}
                  <div className="h-36 w-full bg-slate-100 relative overflow-hidden">
                    <img
                      src={module.coverImage || '/src/assets/images/hero_digital_literacy_1793252992619.jpg'}
                      alt={module.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                      MODULE {module.order}
                    </div>
                    {isCompleted && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Mastered</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span>{module.durationHours} hrs</span>
                      <span>·</span>
                      <span>{module.level}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                      {module.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {module.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>{module.lessons.length} Lessons</span>
                      <span>{module.exercises.length} Exercises</span>
                      <span>{moduleFiles.length} Files</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
                  <span>Explore Module & Exercises</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
