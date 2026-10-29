import React, { useState } from 'react';
import { Folder, Shield, Calculator, FileCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { FileOrganizerExercise } from './exercises/FileOrganizerExercise';
import { PhishingSimulatorExercise } from './exercises/PhishingSimulatorExercise';
import { SpreadsheetMiniSandbox } from './exercises/SpreadsheetMiniSandbox';
import { AtsResumeTester } from './exercises/AtsResumeTester';
import { CourseDatabaseService } from '../services/courseDatabase';

export const SandboxesHub: React.FC<{ onRefreshProgress: () => void }> = ({ onRefreshProgress }) => {
  const [activeSandbox, setActiveSandbox] = useState<'files' | 'phishing' | 'sheets' | 'ats'>('files');
  const [progress, setProgress] = useState(() => CourseDatabaseService.getProgress());

  const handleComplete = () => {
    setProgress(CourseDatabaseService.getProgress());
    onRefreshProgress();
  };

  const sandboxes = [
    {
      id: 'files',
      key: 'ex-1-1',
      title: 'File & Folder Organizer',
      moduleTitle: 'Module 1: OS Navigation',
      icon: Folder,
      color: 'text-amber-600',
      description: 'Practice cleaning disorganized folders and applying ISO-8601 standardized file naming.'
    },
    {
      id: 'phishing',
      key: 'ex-5-1',
      title: 'Phishing Threat Defense',
      moduleTitle: 'Module 5: Cybersecurity',
      icon: Shield,
      color: 'text-rose-600',
      description: 'Inspect simulated workplace inbox messages, detect malicious link domains, and analyze phishing traps.'
    },
    {
      id: 'sheets',
      key: 'ex-4-1',
      title: 'Spreadsheet Formulas',
      moduleTitle: 'Module 4: Cloud Productivity',
      icon: Calculator,
      color: 'text-emerald-600',
      description: 'Enter real spreadsheet formulas (=C2*D2, =SUM, =AVERAGE) and evaluate live calculations.'
    },
    {
      id: 'ats',
      key: 'ex-6-1',
      title: 'ATS Resume Scanner',
      moduleTitle: 'Module 6: Workforce Readiness',
      icon: FileCheck,
      color: 'text-sky-600',
      description: 'Analyze resume keyword density, diagnose formatting blockers, and optimize for hiring systems.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Tactile Learning Workspaces</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Interactive Digital Competency Sandboxes
            </h2>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Moving beyond static Google Sites text into active, hands-on simulations where students directly manipulate files, inspect cyber threats, code spreadsheet formulas, and optimize resumes.
            </p>
          </div>
        </div>

        {/* Sandbox Switcher Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {sandboxes.map((item) => {
            const Icon = item.icon;
            const isSelected = activeSandbox === item.id;
            const submission = progress.exerciseSubmissions[item.key];

            return (
              <button
                key={item.id}
                onClick={() => setActiveSandbox(item.id as any)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900'
                    : 'bg-white hover:border-slate-300 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-sky-400' : item.color}`} />
                  {submission?.passed && (
                    <span className="text-[10px] font-bold font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      Passed ✓
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold truncate">{item.title}</h4>
                <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {item.moduleTitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Sandbox Viewport */}
      <div>
        {activeSandbox === 'files' && (
          <FileOrganizerExercise exerciseId="ex-1-1" onComplete={handleComplete} />
        )}
        {activeSandbox === 'phishing' && (
          <PhishingSimulatorExercise exerciseId="ex-5-1" onComplete={handleComplete} />
        )}
        {activeSandbox === 'sheets' && (
          <SpreadsheetMiniSandbox exerciseId="ex-4-1" onComplete={handleComplete} />
        )}
        {activeSandbox === 'ats' && (
          <AtsResumeTester exerciseId="ex-6-1" onComplete={handleComplete} />
        )}
      </div>
    </div>
  );
};
