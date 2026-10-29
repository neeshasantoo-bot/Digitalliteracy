import React, { useState } from 'react';
import { Shield, ShieldAlert, CheckCircle2, AlertTriangle, Mail, RefreshCw, Info, Lock } from 'lucide-react';
import { CourseDatabaseService } from '../../services/courseDatabase';

interface EmailScenario {
  id: string;
  senderName: string;
  senderAddress: string;
  replyTo?: string;
  subject: string;
  date: string;
  isPhishing: boolean;
  actualDestinationUrl: string;
  displayLinkText: string;
  bodyText: string[];
  redFlags: string[];
  legitimateIndicators: string[];
  explanation: string;
}

const SCENARIOS: EmailScenario[] = [
  {
    id: 'phish-1',
    senderName: 'Workplace Payroll Department',
    senderAddress: 'payroll-services@workplace-portal99.xyz',
    subject: 'URGENT: Direct Deposit Suspension Notice - Verify within 24 Hours',
    date: 'Today, 9:14 AM',
    isPhishing: true,
    actualDestinationUrl: 'http://198.51.100.44/secure-login/payroll-harvest.php',
    displayLinkText: 'https://workplace.internal/payroll/verify-account',
    bodyText: [
      'Dear Employee,',
      'During our scheduled automated audit, an issue was detected with your banking routing number. To avoid immediate paycheck suspension for the current pay period, you are required to re-verify your direct deposit credentials immediately.',
      'Click the secure link below to confirm your login and banking PIN within 24 hours of receiving this notice.'
    ],
    redFlags: [
      'Sender domain ends in .xyz instead of official corporate domain',
      'Artificial panic and 24-hour urgency deadline',
      'Displayed link text does not match true destination URL (which points to an insecure IP address)',
      'Asks for private banking PIN credentials'
    ],
    legitimateIndicators: [],
    explanation: 'This is a classic payroll spear-phishing attack. Attackers manufacture false urgency to pressure employees into typing banking credentials into an IP-based harvest page.'
  },
  {
    id: 'phish-2',
    senderName: 'Youth Initiative Community Training',
    senderAddress: 'coordinator@communitytraining.org',
    subject: 'Schedule Update: Lab Open Hours & Mentorship Shifts for Next Week',
    date: 'Yesterday, 3:30 PM',
    isPhishing: false,
    actualDestinationUrl: 'https://communitytraining.org/schedule/nov-2026',
    displayLinkText: 'https://communitytraining.org/schedule/nov-2026',
    bodyText: [
      'Hello Community Training Cohort,',
      'Please note that the digital learning lab will be open extended hours on Tuesday and Thursday next week (8:00 AM - 7:00 PM) for those working on their Module 4 spreadsheet projects.',
      'Feel free to drop by to receive one-on-one resume feedback or practice keyboard navigation.',
      'Best regards,',
      'Marcus Rivera, Lab Coordinator'
    ],
    redFlags: [],
    legitimateIndicators: [
      'Sender domain matches official organization (@communitytraining.org)',
      'No requests for passwords or personal identification numbers',
      'Link destination matches the displayed address with HTTPS protocol',
      'Professional, calm tone with specific instructor sign-off'
    ],
    explanation: 'This is a legitimate workplace announcement. The domain is valid, no credentials or sensitive actions are requested, and the link goes to the organization\'s verified HTTPS portal.'
  },
  {
    id: 'phish-3',
    senderName: 'Dropbox Document Team',
    senderAddress: 'notification@drop-box-shares-file.com',
    subject: 'You have been sent a secure document: "Oct_Stipend_Contract.zip"',
    date: 'Oct 26, 11:42 AM',
    isPhishing: true,
    actualDestinationUrl: 'http://malware-payload-drop.ru/download?file=stipend.zip.exe',
    displayLinkText: 'https://www.dropbox.com/s/secure-stipend-agreement',
    bodyText: [
      'You have received an encrypted document regarding your community training stipend.',
      'To review and sign the attached agreement, please download and run the installer archive attached in the secure cloud link below.',
      'Please note: Your browser may display an unrecognized publisher warning. Click "Run Anyway" to complete verification.'
    ],
    redFlags: [
      'Lookalike domain (drop-box-shares-file.com is NOT dropbox.com)',
      'Requests downloading an executable (.zip.exe) file',
      'Instructs the victim to bypass operating system security warnings',
      'Generic greeting with no recipient name'
    ],
    legitimateIndicators: [],
    explanation: 'This is a malicious malware delivery attack masquerading as Dropbox. Cloud documents are viewed in the browser; legitimate services will never ask you to download a ZIP and bypass executable security warnings.'
  },
  {
    id: 'phish-4',
    senderName: 'Google Account Security',
    senderAddress: 'no-reply@accounts.google.com',
    subject: 'Security Alert: New sign-in from Chrome on Windows',
    date: 'Oct 24, 8:15 PM',
    isPhishing: false,
    actualDestinationUrl: 'https://myaccount.google.com/notifications',
    displayLinkText: 'https://myaccount.google.com/notifications',
    bodyText: [
      'We noticed a new sign-in to your Google Account from a Windows device in Seattle, WA.',
      'If this was you, you don\'t need to do anything. If you didn\'t recognize this activity, we\'ll help you secure your account.',
      'Check activity at your official Google Account security hub.'
    ],
    redFlags: [],
    legitimateIndicators: [
      'Sender address is authenticated from exact domain @accounts.google.com',
      'Does not ask you to email back passwords or banking data',
      'Direct link points to official Google security dashboard with valid HTTPS',
      'Reassures the user that if it was them, no action is required'
    ],
    explanation: 'Legitimate automated security notification from Google. Notice that Google does not ask you to click a button to send them your password; they provide direct visibility into account sessions.'
  },
  {
    id: 'phish-5',
    senderName: 'Human Resources Benefits Admin',
    senderAddress: 'hr-benefits@employment-verification-portal.net',
    subject: 'Mandatory Healthcare Benefits Confirmation [Action Required]',
    date: 'Oct 21, 2:10 PM',
    isPhishing: true,
    actualDestinationUrl: 'http://credential-capture-89.org/auth?session=harvest',
    displayLinkText: 'https://portal.employment-benefits.org/login',
    bodyText: [
      'ATTENTION ALL STAFF AND TRAINEES:',
      'Failure to update your Social Security Number and employee ID on our new portal prior to Friday will result in immediate cancellation of your healthcare coverage and stipend payments.',
      'Log in immediately to confirm your identity.'
    ],
    redFlags: [
      'High emotional coercion and threat of losing benefits',
      'Unknown domain (.net external service)',
      'Displayed URL does not match actual HTTP destination',
      'Demands Social Security Number over an unauthenticated web link'
    ],
    legitimateIndicators: [],
    explanation: 'This is a credential-harvesting phishing attack targeting employee benefits. Threatening immediate cancellation of healthcare to force hurried clicks is a hallmark of social engineering.'
  }
];

export const PhishingSimulatorExercise: React.FC<{ exerciseId: string; onComplete?: () => void }> = ({
  exerciseId,
  onComplete
}) => {
  const [selectedEmailId, setSelectedEmailId] = useState<string>(SCENARIOS[0].id);
  const [userAssessments, setUserAssessments] = useState<Record<string, { verdict: 'phishing' | 'legitimate' | null }>>({
    'phish-1': { verdict: null },
    'phish-2': { verdict: null },
    'phish-3': { verdict: null },
    'phish-4': { verdict: null },
    'phish-5': { verdict: null }
  });
  const [hoveredLinkUrl, setHoveredLinkUrl] = useState<string | null>(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const currentEmail = SCENARIOS.find((s) => s.id === selectedEmailId) || SCENARIOS[0];

  const handleSetVerdict = (emailId: string, verdict: 'phishing' | 'legitimate') => {
    setUserAssessments((prev) => ({
      ...prev,
      [emailId]: { verdict }
    }));
  };

  const handleRunEvaluation = () => {
    setShowEvaluation(true);

    let correctCount = 0;
    SCENARIOS.forEach((s) => {
      const assessment = userAssessments[s.id];
      const isCorrect = (s.isPhishing && assessment.verdict === 'phishing') || (!s.isPhishing && assessment.verdict === 'legitimate');
      if (isCorrect) correctCount++;
    });

    const score = Math.round((correctCount / SCENARIOS.length) * 100);
    const passed = score >= 80;

    CourseDatabaseService.recordExerciseSubmission(exerciseId, score, 100, passed, {
      correctCount,
      totalScenarios: SCENARIOS.length
    });

    if (passed && onComplete) {
      onComplete();
    }
  };

  const handleReset = () => {
    setUserAssessments({
      'phish-1': { verdict: null },
      'phish-2': { verdict: null },
      'phish-3': { verdict: null },
      'phish-4': { verdict: null },
      'phish-5': { verdict: null }
    });
    setShowEvaluation(false);
  };

  const completedCount = Object.values(userAssessments).filter((a) => a.verdict !== null).length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Simulation Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">Cybersecurity Simulation</span>
          <h4 className="text-base font-bold text-slate-900 mt-0.5">Interactive Workplace Phishing & Scam Defense Inbox</h4>
          <p className="text-xs text-slate-500 mt-1">
            Analyze 5 incoming workplace emails. Hover over links to inspect destination URLs, check sender domains, and classify threats.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Inbox
          </button>
          <button
            onClick={handleRunEvaluation}
            disabled={completedCount < 5}
            className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-md transition-colors shadow-xs ${
              completedCount === 5
                ? 'bg-rose-600 text-white hover:bg-rose-700 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Grade Security Audit ({completedCount}/5 Checked)
          </button>
        </div>
      </div>

      {/* Main Inbox Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
        {/* Left Column: Email List (4 cols) */}
        <div className="lg:col-span-4 border-r border-slate-200 bg-slate-50/50 p-3 space-y-2">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
            <span>Incoming Messages</span>
            <span className="font-mono">{completedCount}/5 classified</span>
          </div>

          {SCENARIOS.map((item) => {
            const isSelected = selectedEmailId === item.id;
            const assessment = userAssessments[item.id];
            const hasVerdict = assessment.verdict !== null;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedEmailId(item.id)}
                className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-sky-500 bg-white shadow-xs ring-1 ring-sky-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-semibold text-slate-800 truncate max-w-[150px]">{item.senderName}</span>
                  <span className="font-mono">{item.date}</span>
                </div>
                <p className="font-medium text-slate-900 truncate mb-2">{item.subject}</p>
                <div className="flex items-center justify-between text-[11px]">
                  {hasVerdict ? (
                    <span
                      className={`font-semibold ${
                        assessment.verdict === 'phishing' ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      Classified: {assessment.verdict === 'phishing' ? 'Phishing Threat' : 'Legitimate'}
                    </span>
                  ) : (
                    <span className="text-amber-600 font-medium">Pending Review</span>
                  )}
                  {showEvaluation && (
                    <span className="text-[11px] font-bold">
                      {((item.isPhishing && assessment.verdict === 'phishing') || (!item.isPhishing && assessment.verdict === 'legitimate')) ? (
                        <span className="text-emerald-600">Correct ✓</span>
                      ) : (
                        <span className="text-rose-600">Incorrect ✗</span>
                      )}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Email Inspector & Assessment Controls (8 cols) */}
        <div className="lg:col-span-8 p-5 flex flex-col justify-between">
          <div>
            {/* Header details */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4 space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200 pb-2">
                <h5 className="text-sm font-bold text-slate-900">{currentEmail.subject}</h5>
                <span className="text-xs text-slate-500 font-mono">{currentEmail.date}</span>
              </div>
              <div className="text-xs space-y-1 text-slate-600">
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-700 w-16 shrink-0">From:</span>
                  <span className="text-slate-900 font-medium">{currentEmail.senderName}</span>
                  <span className="font-mono text-slate-500">&lt;{currentEmail.senderAddress}&gt;</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-700 w-16 shrink-0">Security:</span>
                  <span className="text-slate-500 font-mono flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" /> Standard TLS transport
                  </span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-3">
              {currentEmail.bodyText.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              {/* Simulated Link with Hover Inspector */}
              <div className="pt-2 pb-1">
                <div
                  onMouseEnter={() => setHoveredLinkUrl(currentEmail.actualDestinationUrl)}
                  onMouseLeave={() => setHoveredLinkUrl(null)}
                  className="inline-block px-3 py-2 bg-sky-50 text-sky-700 rounded-md border border-sky-200 font-mono cursor-pointer hover:bg-sky-100 transition-colors"
                >
                  🔗 {currentEmail.displayLinkText}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  Hover or point mouse over link to inspect true browser destination in the status bar below.
                </p>
              </div>
            </div>

            {/* Hovered URL Status Bar */}
            <div className="mt-3 px-3 py-1.5 bg-slate-900 text-slate-100 rounded-md font-mono text-[11px] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-400" />
                Browser Destination Status Bar:
              </span>
              <span className="text-sky-300 font-bold truncate max-w-[400px]">
                {hoveredLinkUrl || 'Hover cursor over any link to inspect destination'}
              </span>
            </div>
          </div>

          {/* Assessment Action Bar */}
          <div className="mt-5 pt-4 border-t border-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-900">Classify this message:</p>
                <p className="text-[11px] text-slate-500">Is this a genuine email or a malicious phishing attempt?</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSetVerdict(currentEmail.id, 'legitimate')}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    userAssessments[currentEmail.id]?.verdict === 'legitimate'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Legitimate Email
                </button>
                <button
                  onClick={() => handleSetVerdict(currentEmail.id, 'phishing')}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors ${
                    userAssessments[currentEmail.id]?.verdict === 'phishing'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Flag as Phishing Threat
                </button>
              </div>
            </div>

            {/* Explanation card if evaluation is visible */}
            {showEvaluation && (
              <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                <h6 className="text-xs font-bold text-slate-900 mb-1">Expert Security Analysis:</h6>
                <p className="text-xs text-slate-600">{currentEmail.explanation}</p>
                {currentEmail.redFlags.length > 0 && (
                  <div className="mt-2 text-xs">
                    <span className="font-bold text-rose-700">Identified Red Flags:</span>
                    <ul className="list-disc pl-5 text-slate-600 mt-1 space-y-0.5">
                      {currentEmail.redFlags.map((flag, idx) => (
                        <li key={idx}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
