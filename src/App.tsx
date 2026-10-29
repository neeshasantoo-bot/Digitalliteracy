import React, { useState, useEffect } from 'react';
import { Navigation, NavigationTab } from './components/Navigation';
import { CurriculumOverview } from './components/CurriculumOverview';
import { ModuleDetailView } from './components/ModuleDetailView';
import { SandboxesHub } from './components/SandboxesHub';
import { FileDatabaseExplorer } from './components/FileDatabaseExplorer';
import { ModernizationRecommendations } from './components/ModernizationRecommendations';
import { ProfessionalResourcesHub } from './components/ProfessionalResourcesHub';
import { StudentProgressModal } from './components/StudentProgressModal';
import { CourseModule } from './types/curriculum';
import { COURSE_MODULES, PROGRAM_INFO } from './data/courseData';
import { CourseDatabaseService } from './services/courseDatabase';
import { Globe, ShieldCheck, Cloud } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('curriculum');
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressState, setProgressState] = useState(() => CourseDatabaseService.getProgress());

  const refreshProgress = () => {
    setProgressState(CourseDatabaseService.getProgress());
  };

  const totalLessons = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalExercises = COURSE_MODULES.reduce((acc, m) => acc + m.exercises.length, 0);
  const completedLessons = progressState.completedLessons.length;
  const passedExercises = Object.values(progressState.exerciseSubmissions).filter((s) => s.passed).length;
  const overallPercentage = Math.round(
    ((completedLessons + passedExercises) / (totalLessons + totalExercises)) * 100
  );

  const handleTabChange = (tab: NavigationTab) => {
    setActiveTab(tab);
    if (tab !== 'curriculum') {
      setSelectedModule(null);
    }
  };

  const handleSelectModuleFromOverview = (module: CourseModule) => {
    setSelectedModule(module);
    setActiveTab('curriculum');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setSelectedModule(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Bar Navigation adhering to 3-Zone Contract */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenProgress={() => setShowProgressModal(true)}
        progressPercent={overallPercentage}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'curriculum' && (
          <>
            {selectedModule ? (
              <ModuleDetailView
                module={selectedModule}
                onBack={handleBackToOverview}
                onSelectModule={(modId) => {
                  const target = COURSE_MODULES.find((m) => m.id === modId);
                  if (target) setSelectedModule(target);
                }}
              />
            ) : (
              <CurriculumOverview
                onSelectModule={handleSelectModuleFromOverview}
                onExploreSandboxes={() => handleTabChange('sandboxes')}
              />
            )}
          </>
        )}

        {activeTab === 'sandboxes' && (
          <SandboxesHub onRefreshProgress={refreshProgress} />
        )}

        {activeTab === 'database' && (
          <FileDatabaseExplorer />
        )}

        {activeTab === 'recommendations' && (
          <ModernizationRecommendations />
        )}

        {activeTab === 'resources' && (
          <ProfessionalResourcesHub />
        )}
      </main>

      {/* Student Progress & Certificate Modal */}
      {showProgressModal && (
        <StudentProgressModal
          onClose={() => setShowProgressModal(false)}
          onRefresh={refreshProgress}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p className="font-semibold text-slate-800">
              {PROGRAM_INFO.title}
            </p>
            <p className="mt-0.5">
              Structured community curriculum modeled after the Youth Training & Employment Initiative.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              UNESCO & Northstar Aligned
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Cloud className="w-3.5 h-3.5 text-sky-600" />
              Cloudflare Pages Ready
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
