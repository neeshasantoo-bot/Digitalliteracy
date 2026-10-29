import React, { useState } from 'react';
import { Folder, FileText, CheckCircle2, AlertCircle, RefreshCw, Plus, ArrowRight, FolderPlus } from 'lucide-react';
import { CourseDatabaseService } from '../../services/courseDatabase';

interface SandboxFile {
  id: string;
  originalName: string;
  currentName: string;
  size: string;
  idealCategory: string;
  targetFolder: string | null;
  idealNaming: string;
  type: 'doc' | 'sheet' | 'pdf' | 'img';
}

const INITIAL_FILES: SandboxFile[] = [
  {
    id: 'f1',
    originalName: 'my_resume_final_FINAL_v2.docx',
    currentName: 'my_resume_final_FINAL_v2.docx',
    size: '84 KB',
    idealCategory: 'Career & Applications',
    targetFolder: null,
    idealNaming: '2026-10-28_Resume_JobSearch.docx',
    type: 'doc'
  },
  {
    id: 'f2',
    originalName: 'supply_budget_draft (1).xlsx',
    currentName: 'supply_budget_draft (1).xlsx',
    size: '142 KB',
    idealCategory: 'Financial & Budgets',
    targetFolder: null,
    idealNaming: '2026-10-20_Program_SupplyBudget_v01.xlsx',
    type: 'sheet'
  },
  {
    id: 'f3',
    originalName: 'hardware_notes_oct.pdf',
    currentName: 'hardware_notes_oct.pdf',
    size: '310 KB',
    idealCategory: 'Learning Notes',
    targetFolder: null,
    idealNaming: '2026-10-15_Hardware_StudyNotes.pdf',
    type: 'pdf'
  },
  {
    id: 'f4',
    originalName: 'receipt_chromebook_purchase.pdf',
    currentName: 'receipt_chromebook_purchase.pdf',
    size: '95 KB',
    idealCategory: 'Financial & Budgets',
    targetFolder: null,
    idealNaming: '2026-10-22_Receipt_Chromebook.pdf',
    type: 'pdf'
  },
  {
    id: 'f5',
    originalName: 'cover_letter_metro_health.docx',
    currentName: 'cover_letter_metro_health.docx',
    size: '62 KB',
    idealCategory: 'Career & Applications',
    targetFolder: null,
    idealNaming: '2026-10-24_CoverLetter_MetroHealth.docx',
    type: 'doc'
  },
  {
    id: 'f6',
    originalName: 'digital_literacy_certificate.pdf',
    currentName: 'digital_literacy_certificate.pdf',
    size: '220 KB',
    idealCategory: 'Learning Notes',
    targetFolder: null,
    idealNaming: '2026-10-28_Certificate_DigitalLiteracy.pdf',
    type: 'pdf'
  }
];

const RECOMMENDED_FOLDERS = [
  'Career & Applications',
  'Financial & Budgets',
  'Learning Notes'
];

export const FileOrganizerExercise: React.FC<{ exerciseId: string; onComplete?: () => void }> = ({
  exerciseId,
  onComplete
}) => {
  const [folders, setFolders] = useState<string[]>(['Career & Applications']);
  const [newFolderName, setNewFolderName] = useState('');
  const [files, setFiles] = useState<SandboxFile[]>(INITIAL_FILES);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [renameInput, setRenameInput] = useState('');
  const [auditResult, setAuditResult] = useState<{
    score: number;
    passed: boolean;
    folderScore: number;
    namingScore: number;
    feedback: string[];
  } | null>(null);

  const selectedFile = files.find((f) => f.id === selectedFileId);

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newFolderName.trim();
    if (!clean || folders.includes(clean)) return;
    setFolders([...folders, clean]);
    setNewFolderName('');
  };

  const handleMoveFile = (fileId: string, folderName: string | null) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, targetFolder: folderName } : f))
    );
  };

  const handleApplyRename = () => {
    if (!selectedFileId || !renameInput.trim()) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === selectedFileId ? { ...f, currentName: renameInput.trim() } : f))
    );
    setRenameInput('');
  };

  const handleAutoRenameISO = (fileId: string) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;
    setFiles((prev) =>
      prev.map((f) => (f.id === fileId ? { ...f, currentName: file.idealNaming } : f))
    );
  };

  const handleRunAudit = () => {
    let folderMatches = 0;
    let namingMatches = 0;
    const feedback: string[] = [];

    files.forEach((f) => {
      // Folder check
      if (f.targetFolder === f.idealCategory) {
        folderMatches++;
      } else if (!f.targetFolder) {
        feedback.push(`"${f.currentName}" is still in the messy unorganized Inbox.`);
      } else {
        feedback.push(`"${f.currentName}" is in "${f.targetFolder}", but would fit better in "${f.idealCategory}".`);
      }

      // Naming check (looks for ISO date YYYY-MM-DD or standard underscores without messy chars)
      const hasDatePrefix = /^\d{4}-\d{2}-\d{2}/.test(f.currentName);
      const hasMessyChars = /[()!@#$%^&*]/.test(f.currentName) || f.currentName.toLowerCase().includes('final_final');
      if (hasDatePrefix && !hasMessyChars) {
        namingMatches++;
      } else {
        feedback.push(`"${f.currentName}" could use ISO date prefix (YYYY-MM-DD) and cleaner terms.`);
      }
    });

    const folderScore = Math.round((folderMatches / files.length) * 50);
    const namingScore = Math.round((namingMatches / files.length) * 50);
    const totalScore = folderScore + namingScore;
    const passed = totalScore >= 75;

    setAuditResult({
      score: totalScore,
      passed,
      folderScore,
      namingScore,
      feedback: feedback.length ? feedback : ['Exceptional directory organization! All files adhere to ISO-8601 naming protocols.']
    });

    CourseDatabaseService.recordExerciseSubmission(exerciseId, totalScore, 100, passed, {
      folderScore,
      namingScore
    });

    if (passed && onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    setFiles(INITIAL_FILES);
    setFolders(['Career & Applications']);
    setSelectedFileId(null);
    setAuditResult(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Sandbox Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Interactive Simulation</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Desktop File & Folder Organization Sandbox</h4>
          <p className="text-xs text-slate-500 mt-1">
            Organize 6 messy downloads into categorized folders and standardize filenames using ISO dates (YYYY-MM-DD).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Files
          </button>
          <button
            onClick={handleRunAudit}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Run Audit & Grade
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Folder Creator & Target Directories (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-sky-600" />
              1. Create Directory Folders
            </h5>
            <form onSubmit={handleCreateFolder} className="flex gap-2">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="e.g. Financial & Budgets"
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="mt-2 text-[11px] text-slate-500">
              Suggested: {RECOMMENDED_FOLDERS.filter((f) => !folders.includes(f)).join(', ') || 'All recommended created!'}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              2. Target Directory Buckets ({folders.length})
            </h5>
            <div className="space-y-2">
              {folders.map((folder) => {
                const folderFiles = files.filter((f) => f.targetFolder === folder);
                return (
                  <div
                    key={folder}
                    className="p-3 bg-white rounded-lg border border-slate-200 hover:border-sky-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-medium text-xs text-slate-900">
                        <Folder className="w-4 h-4 text-amber-500 fill-amber-100" />
                        <span>/{folder}/</span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono">{folderFiles.length} files</span>
                    </div>

                    {folderFiles.length > 0 && (
                      <div className="mt-2 pl-4 border-l border-slate-200 space-y-1">
                        {folderFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between text-xs text-slate-600 py-0.5">
                            <span className="truncate max-w-[200px]" title={file.currentName}>
                              {file.currentName}
                            </span>
                            <button
                              onClick={() => handleMoveFile(file.id, null)}
                              className="text-[10px] text-red-600 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Unorganized Files & Naming Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Unorganized Files in Virtual /Downloads/
              </h5>
              <span className="text-[11px] text-slate-500 font-mono">
                {files.filter((f) => !f.targetFolder).length} remaining to sort
              </span>
            </div>

            <div className="space-y-2">
              {files.map((file) => {
                const isSelected = selectedFileId === file.id;
                const isSorted = !!file.targetFolder;
                return (
                  <div
                    key={file.id}
                    onClick={() => {
                      setSelectedFileId(file.id);
                      setRenameInput(file.currentName);
                    }}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/50 shadow-xs ring-1 ring-sky-500'
                        : isSorted
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <FileText className={`w-4 h-4 ${isSorted ? 'text-emerald-600' : 'text-slate-500'}`} />
                        <div>
                          <p className="font-semibold text-slate-900 font-mono">{file.currentName}</p>
                          <p className="text-[11px] text-slate-500">
                            Size: {file.size} · Ideal Type: {file.idealCategory}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={file.targetFolder || ''}
                          onChange={(e) => handleMoveFile(file.id, e.target.value || null)}
                          className="px-2 py-1 text-xs bg-white border border-slate-300 rounded-md text-slate-700"
                        >
                          <option value="">Move to...</option>
                          {folders.map((f) => (
                            <option key={f} value={f}>
                              /{f}/
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rename Tool for Selected File */}
          {selectedFile && (
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Standardize Filename: <span className="font-mono text-sky-700">{selectedFile.currentName}</span>
              </h5>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={renameInput}
                  onChange={(e) => setRenameInput(e.target.value)}
                  placeholder="2026-10-28_Project_Title.ext"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md font-mono"
                />
                <button
                  onClick={handleApplyRename}
                  className="px-3 py-1.5 text-xs font-medium bg-sky-600 text-white rounded-md hover:bg-sky-700"
                >
                  Apply Rename
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  Recommended: <span className="font-mono font-medium text-slate-700">{selectedFile.idealNaming}</span>
                </span>
                <button
                  onClick={() => handleAutoRenameISO(selectedFile.id)}
                  className="text-sky-600 hover:underline font-medium"
                >
                  Apply ISO Recommended Pattern
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audit Result Display */}
      {auditResult && (
        <div className={`p-5 border-t ${auditResult.passed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-amber-50/50 border-amber-200'}`}>
          <div className="flex items-start gap-3">
            {auditResult.passed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="text-sm font-bold text-slate-900">
                  {auditResult.passed ? 'Audit Passed! Excellent Organization' : 'Audit Complete: Room for Improvement'}
                </h5>
                <span className="text-sm font-bold font-mono text-slate-900">
                  Score: {auditResult.score} / 100 (Pass threshold: 75)
                </span>
              </div>
              <div className="flex gap-4 text-xs text-slate-600 mt-1 font-mono">
                <span>Folder Categorization: {auditResult.folderScore}/50</span>
                <span>ISO Naming Hygiene: {auditResult.namingScore}/50</span>
              </div>

              <div className="mt-3 space-y-1">
                {auditResult.feedback.map((msg, i) => (
                  <p key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
                    {msg}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
