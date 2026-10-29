import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

export type NavigationTab = 'curriculum' | 'sandboxes' | 'database' | 'recommendations' | 'resources';

export const Navigation: React.FC<{
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  onOpenProgress: () => void;
  progressPercent: number;
}> = ({ activeTab, onTabChange, onOpenProgress, progressPercent }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onTabChange('curriculum')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:text-sky-600 transition-colors text-left"
        >
          <span>Digital Literacy Portal</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-600">
          <button
            onClick={() => onTabChange('curriculum')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'curriculum'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Curriculum Modules
          </button>
          <button
            onClick={() => onTabChange('sandboxes')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'sandboxes'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Interactive Sandboxes
          </button>
          <button
            onClick={() => onTabChange('database')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'database'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Course File Database
          </button>
          <button
            onClick={() => onTabChange('recommendations')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'recommendations'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Modernization Report
          </button>
          <button
            onClick={() => onTabChange('resources')}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeTab === 'resources'
                ? 'text-sky-700 font-bold border-b-2 border-sky-600'
                : 'hover:text-slate-900'
            }`}
          >
            Professional Standards
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenProgress}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>My Progress ({progressPercent}%)</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for small screens */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50/90 py-2 px-3 text-xs overflow-x-auto gap-2">
        <button
          onClick={() => onTabChange('curriculum')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'curriculum' ? 'bg-sky-100 text-sky-800 font-bold' : 'text-slate-600'}`}
        >
          Curriculum
        </button>
        <button
          onClick={() => onTabChange('sandboxes')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'sandboxes' ? 'bg-sky-100 text-sky-800 font-bold' : 'text-slate-600'}`}
        >
          Sandboxes
        </button>
        <button
          onClick={() => onTabChange('database')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'database' ? 'bg-sky-100 text-sky-800 font-bold' : 'text-slate-600'}`}
        >
          File DB
        </button>
        <button
          onClick={() => onTabChange('recommendations')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'recommendations' ? 'bg-sky-100 text-sky-800 font-bold' : 'text-slate-600'}`}
        >
          Modernize
        </button>
        <button
          onClick={() => onTabChange('resources')}
          className={`whitespace-nowrap px-2 py-1 rounded ${activeTab === 'resources' ? 'bg-sky-100 text-sky-800 font-bold' : 'text-slate-600'}`}
        >
          Resources
        </button>
      </div>
    </header>
  );
};
