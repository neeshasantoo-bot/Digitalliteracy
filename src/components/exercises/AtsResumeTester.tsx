import React, { useState } from 'react';
import { FileCheck, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Search, Briefcase } from 'lucide-react';
import { CourseDatabaseService } from '../../services/courseDatabase';

interface JobRole {
  id: string;
  title: string;
  department: string;
  requiredKeywords: string[];
  recommendedVerbs: string[];
}

const TARGET_ROLES: JobRole[] = [
  {
    id: 'role-admin',
    title: 'Administrative & Digital Office Assistant',
    department: 'Community Workforce Services',
    requiredKeywords: ['Google Docs', 'Google Sheets', 'Spreadsheets', 'Calendar', 'Customer Service', 'Data Entry', 'Correspondence', 'Email Etiquette'],
    recommendedVerbs: ['Coordinated', 'Organized', 'Managed', 'Scheduled', 'Drafted', 'Processed', 'Communicated']
  },
  {
    id: 'role-tech',
    title: 'Junior IT Support & Computer Lab Assistant',
    department: 'Community Tech Center',
    requiredKeywords: ['Hardware', 'Peripherals', 'Operating Systems', 'Troubleshooting', 'Cybersecurity', 'Passkeys', 'Wi-Fi', 'File Systems'],
    recommendedVerbs: ['Diagnosed', 'Configured', 'Maintained', 'Resolved', 'Assisted', 'Installed', 'Trained']
  }
];

const DEFAULT_RESUME = `JORDAN TAYLOR
Seattle, WA | (555) 019-2834 | jordan.taylor@email.com | linkedin.com/in/jordantaylor-digital

PROFESSIONAL SUMMARY
Motivated and detail-oriented Community Digital Training graduate with foundational expertise in cloud productivity, spreadsheet modeling, and digital communication. Seeking to apply strong computer fundamentals, accurate data entry, and positive customer service to an entry-level administrative or lab assistant position.

CORE COMPETENCIES & TECHNICAL PROFICIENCIES
• Cloud Office Platforms: Google Docs, Google Sheets, Google Drive, Microsoft Word & Excel
• Data Entry & Administration: Spreadsheets calculation, file organization, calendar scheduling
• Workplace Communication: Professional email correspondence, customer service, phone etiquette
• Cybersecurity Fundamentals: Two-factor authentication, phishing defense, file backup hygiene

WORK EXPERIENCE & COMMUNITY PROJECTS
Youth Training & Employment Initiative | Digital Training Fellow
Sept 2026 - Present
• Organized community file directory structures using standardized ISO-8601 naming protocols across 40+ folders.
• Coordinated inventory logs and calculated budget projections using spreadsheet formulas (=SUM, =AVERAGE).
• Drafted professional email correspondence and managed shared digital calendars for training cohort.
• Maintained zero security incidents across lab workstations through proactive phishing detection drills.

EDUCATION & ACCREDITATIONS
Certificate in Digital Literacy for Workplace Employment | Completed 2026
Community Training Program (36 instructional hours)
`;

export const AtsResumeTester: React.FC<{ exerciseId: string; onComplete?: () => void }> = ({
  exerciseId,
  onComplete
}) => {
  const [selectedRole, setSelectedRole] = useState<JobRole>(TARGET_ROLES[0]);
  const [resumeText, setResumeText] = useState(DEFAULT_RESUME);
  const [scanResult, setScanResult] = useState<{
    score: number;
    matchedKeywords: string[];
    missingKeywords: string[];
    foundVerbs: string[];
    formattingIssues: string[];
    passed: boolean;
  } | null>(null);

  const handleRunScan = () => {
    const textLower = resumeText.toLowerCase();

    // 1. Keyword matching
    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];
    selectedRole.requiredKeywords.forEach((kw) => {
      if (textLower.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    // 2. Action verbs
    const foundVerbs: string[] = [];
    selectedRole.recommendedVerbs.forEach((verb) => {
      if (textLower.includes(verb.toLowerCase())) {
        foundVerbs.push(verb);
      }
    });

    // 3. Formatting hygiene
    const formattingIssues: string[] = [];
    if (resumeText.includes('<table>') || resumeText.includes('columns: 2')) {
      formattingIssues.push('Avoid HTML tables or multi-column containers; they scramble older ATS parsers.');
    }
    if (resumeText.length < 300) {
      formattingIssues.push('Resume text is too brief (under 300 characters). Add full work/project experience.');
    }
    if (!resumeText.includes('@') || !resumeText.includes('.')) {
      formattingIssues.push('Contact email address not detected. Always place email in the primary body, not a hidden header.');
    }

    // Scoring math: 60% keywords + 30% verbs + 10% hygiene
    const kwPercent = matchedKeywords.length / selectedRole.requiredKeywords.length;
    const verbPercent = Math.min(foundVerbs.length / 4, 1);
    const hygieneScore = formattingIssues.length === 0 ? 10 : 0;
    const rawScore = Math.round(kwPercent * 60 + verbPercent * 30 + hygieneScore);
    const passed = rawScore >= 75;

    setScanResult({
      score: rawScore,
      matchedKeywords,
      missingKeywords,
      foundVerbs,
      formattingIssues,
      passed
    });

    CourseDatabaseService.recordExerciseSubmission(exerciseId, rawScore, 100, passed, {
      roleTitle: selectedRole.title,
      matchedKeywordsCount: matchedKeywords.length
    });

    if (passed && onComplete) {
      onComplete();
    }
  };

  const handleInsertMissingKeywords = () => {
    if (!scanResult || scanResult.missingKeywords.length === 0) return;
    const addition = `\n• Relevant Additional Skills: ${scanResult.missingKeywords.join(', ')}`;
    setResumeText((prev) => prev + addition);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">Workforce Readiness Simulation</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Interactive ATS Resume Scanner & Optimizer</h4>
          <p className="text-xs text-slate-500 mt-1">
            Test how automated Applicant Tracking Systems parse and score resumes for entry-level digital roles.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setResumeText(DEFAULT_RESUME);
              setScanResult(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Template
          </button>
          <button
            onClick={handleRunScan}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 shadow-xs"
          >
            <FileCheck className="w-3.5 h-3.5" />
            Scan ATS Compatibility
          </button>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Target Role & Criteria (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Target Job Posting:
            </label>
            <div className="space-y-2">
              {TARGET_ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role);
                    setScanResult(null);
                  }}
                  className={`w-full text-left p-3 rounded-md border text-xs transition-colors ${
                    selectedRole.id === role.id
                      ? 'bg-white border-sky-500 shadow-xs ring-1 ring-sky-500'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold text-slate-900">{role.title}</p>
                  <p className="text-[11px] text-slate-500">{role.department}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border border-slate-200 text-xs">
            <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-600" />
              Target ATS Keyword Requirements
            </h5>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600">
              {selectedRole.requiredKeywords.map((kw, i) => (
                <span key={i} className="text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                  {kw}
                </span>
              ))}
            </div>

            <h5 className="font-bold text-slate-900 mt-4 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Recommended Action Verbs
            </h5>
            <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
              {selectedRole.recommendedVerbs.map((vb, i) => (
                <span key={i} className="text-slate-600 font-mono text-[10px]">
                  {vb} ·
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Resume Editor & Scan Results (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Resume Plain Text (ATS Readable Format)
              </label>
              <span className="text-[11px] text-slate-500 font-mono">{resumeText.length} characters</span>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={12}
              className="w-full p-3 font-mono text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800 leading-relaxed"
            />
          </div>

          {scanResult && (
            <div className={`p-4 rounded-lg border ${scanResult.passed ? 'bg-emerald-50/50 border-emerald-200' : 'bg-amber-50/50 border-amber-200'}`}>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  {scanResult.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  )}
                  <span className="font-bold text-sm text-slate-900">
                    ATS Match Score: {scanResult.score} / 100 {scanResult.passed ? '(Passed Threshold)' : '(Under 75% Threshold)'}
                  </span>
                </div>
                {scanResult.missingKeywords.length > 0 && (
                  <button
                    onClick={handleInsertMissingKeywords}
                    className="text-xs font-medium text-sky-700 hover:underline"
                  >
                    + Auto-Inject Missing Keywords
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-700">Matched Keywords ({scanResult.matchedKeywords.length}):</span>
                  <p className="text-slate-600 mt-1">{scanResult.matchedKeywords.join(', ') || 'None'}</p>
                </div>
                <div>
                  <span className="font-bold text-rose-700">Missing Keywords ({scanResult.missingKeywords.length}):</span>
                  <p className="text-slate-600 mt-1">{scanResult.missingKeywords.join(', ') || 'All matched!'}</p>
                </div>
              </div>

              {scanResult.formattingIssues.length > 0 && (
                <div className="mt-3 pt-2 border-t border-slate-200 text-xs">
                  <span className="font-bold text-amber-800">Formatting Recommendations:</span>
                  <ul className="list-disc pl-4 text-slate-600 mt-1 space-y-0.5">
                    {scanResult.formattingIssues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
