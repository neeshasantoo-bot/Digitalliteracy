import { CourseModule, CourseFile, ProfessionalResourceLink, ImprovementRecommendation } from '../types/curriculum';

export const PROGRAM_INFO = {
  title: 'Digital Literacy for Youth & Community Employment',
  programName: 'Youth Training & Employment Initiative',
  track: 'Community Training Program',
  sourceGoogleSitesRef: 'https://sites.google.com/view/youth-training-and-employment-/home/courses/community-training/modules-and-exercises',
  targetAudience: 'Youth, jobseekers, and community members seeking essential digital skills for workforce entry and modern workplace productivity.',
  totalModules: 6,
  estimatedHours: 36,
  certificationStandards: 'Aligned with UNESCO Digital Literacy Global Framework & Northstar Digital Standards',
};

export const INITIAL_FILES_DATABASE: CourseFile[] = [
  {
    id: 'FILE-M1-01',
    title: 'Computer Hardware & Peripherals Diagnostic Sheet',
    filename: 'hardware_components_reference.pdf',
    fileType: 'pdf',
    sizeBytes: 245000,
    category: 'Reference Guide',
    moduleId: 'mod-1',
    moduleTitle: 'Computer Fundamentals & OS Navigation',
    version: '2.1.0',
    dateAdded: '2026-09-15',
    tags: ['Hardware', 'Peripherals', 'Diagnostics', 'Ports'],
    checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    description: 'Illustrated guide covering CPU, RAM, storage drives, USB-C/HDMI ports, peripheral connectivity, and basic hardware troubleshooting.',
    previewContent: {
      type: 'checklist',
      data: [
        { label: 'Central Processing Unit (CPU)', desc: 'The operational brain executing instructions and mathematical calculations.' },
        { label: 'Random Access Memory (RAM)', desc: 'Fast temporary volatile memory holding active applications; clearing RAM boosts responsiveness.' },
        { label: 'Storage (SSD vs HDD)', desc: 'Persistent non-volatile memory storing files and OS; Solid State Drives offer 5-10x faster boot speeds.' },
        { label: 'Display & I/O Ports', desc: 'HDMI/DisplayPort for video output, USB 3.0 / USB-C for fast data transfer and power delivery.' }
      ]
    },
    sampleDownloadContent: `# Computer Hardware & Peripherals Reference
Youth Training & Employment Initiative - Community Digital Training

1. Core Hardware Components
- CPU: Processes program instructions.
- RAM: Temporary workspace for running apps.
- Storage (SSD/HDD): Permanent file storage.
- Motherboard: Backbone connecting all components.

2. Connection Ports
- USB-A (Rectangular): Standard mouse, keyboard, flash drives.
- USB-C (Oval, reversible): High-speed data, charging, external displays.
- HDMI: High-definition digital video and audio to monitors.
- 3.5mm Audio: Headsets and microphones for remote calls.

3. Basic Hardware Troubleshooting Checklist
[ ] Cable firmly seated at both ends
[ ] Power switch toggled ON
[ ] Peripheral recognized in OS Device Settings
`
  },
  {
    id: 'FILE-M1-02',
    title: 'Standard File & Folder Naming Convention Guide',
    filename: 'workplace_file_organization_rules.docx',
    fileType: 'docx',
    sizeBytes: 118000,
    category: 'Worksheet',
    moduleId: 'mod-1',
    moduleTitle: 'Computer Fundamentals & OS Navigation',
    version: '1.4.0',
    dateAdded: '2026-09-20',
    tags: ['File System', 'Organization', 'Naming Standards', 'Productivity'],
    checksum: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
    description: 'Workplace standard for hierarchical folder structures and ISO-8601 file naming conventions (YYYY-MM-DD_Project_Version).',
    previewContent: {
      type: 'text',
      data: `RULE 1: Use ISO Date Format (YYYY-MM-DD) at the beginning of files to enable chronological sorting.\nRULE 2: Avoid special characters (!@#$%^&*?) which break cloud storage and web servers.\nRULE 3: Use hyphens or underscores instead of spaces for cross-platform stability.\nRULE 4: Include version numbers (v01, v02, Final) instead of "final_final_reallyfinal".`
    },
    sampleDownloadContent: `STANDARD WORKPLACE FILE ORGANIZATION PROTOCOL
-------------------------------------------------
Correct Naming Pattern:
[YYYY-MM-DD]_[ClientOrDept]_[DocumentTitle]_[vXX].[ext]

Examples:
2026-10-28_YouthInitiative_MonthlyReport_v02.docx
2026-10-15_Resume_SarahMiller_Final.pdf

Hierarchy Recommendation:
/Documents/
  └── /01_Career_JobSearch/
  └── /02_Financial_Records/
  └── /03_Project_Deliverables/
  └── /04_Learning_Certificates/
`
  },
  {
    id: 'FILE-M2-01',
    title: 'Advanced Search Syntax & Boolean Query Matrix',
    filename: 'boolean_search_operators_matrix.pdf',
    fileType: 'pdf',
    sizeBytes: 310000,
    category: 'Reference Guide',
    moduleId: 'mod-2',
    moduleTitle: 'Internet, Web Browsing & Information Literacy',
    version: '3.0.1',
    dateAdded: '2026-10-01',
    tags: ['Search Operators', 'Boolean', 'Google Search', 'Research'],
    checksum: 'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    description: 'Complete reference for Boolean operators (AND, OR, NOT), site: filters, filetype: operators, and exact phrase quotation search.',
    previewContent: {
      type: 'table',
      data: {
        headers: ['Operator', 'Example Query', 'Search Engine Action'],
        rows: [
          ['"quotes"', '"entry level digital assistant"', 'Matches exact continuous phrase only'],
          ['site:', 'site:gov "youth employment"', 'Restricts search results exclusively to .gov domains'],
          ['filetype:', 'digital literacy curriculum filetype:pdf', 'Returns only direct PDF document links'],
          ['minus (-)', 'remote jobs -sales -telemarketing', 'Excludes unwanted keywords from query'],
          ['OR', '"resume template" (docx OR google doc)', 'Searches for either term interchangeably']
        ]
      }
    },
    sampleDownloadContent: `ADVANCED SEARCH & INFORMATION EVALUATION CHEAT SHEET
Youth Training & Employment Initiative

1. Essential Google Search Operators:
- "exact phrase" : Restricts to consecutive words.
- site:domain.org : Searches only within a specific web domain.
- filetype:pdf : Filters direct download filetypes.
- -term : Removes irrelevant noise.

2. The CRAAP Verification Test for Online Information:
- Currency: Is the data current or outdated?
- Relevance: Does it answer your specific need?
- Authority: Who wrote this? What are their credentials?
- Accuracy: Are claims supported by verifiable citations?
- Purpose: Is the page educating, or selling a product?
`
  },
  {
    id: 'FILE-M2-02',
    title: 'Online Source Evaluation & Fake News Checklist',
    filename: 'information_credibility_checklist.docx',
    fileType: 'docx',
    sizeBytes: 94000,
    category: 'Worksheet',
    moduleId: 'mod-2',
    moduleTitle: 'Internet, Web Browsing & Information Literacy',
    version: '1.1.0',
    dateAdded: '2026-10-03',
    tags: ['Media Literacy', 'Fact Checking', 'Digital Citizenship'],
    checksum: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
    description: 'Worksheet implementing the CRAAP test (Currency, Relevance, Authority, Accuracy, Purpose) for verifying online claims and news articles.',
    previewContent: {
      type: 'checklist',
      data: [
        { label: 'Check Domain Suffix', desc: 'Is it an established educational (.edu), government (.gov), or known journalistic entity vs clickbait domain clone?' },
        { label: 'Inspect Author Byline', desc: 'Is an author clearly credited? Can you verify their identity and subject-matter credentials?' },
        { label: 'Reverse Image Search', desc: 'Use Google Images or TinEye to check whether photos are recycled or taken out of context.' },
        { label: 'Lateral Reading', desc: 'Open adjacent browser tabs to see what independent fact-checkers (Snopes, AP, Reuters) say about the source.' }
      ]
    }
  },
  {
    id: 'FILE-M3-01',
    title: 'Workplace Email Templates & Professional Etiquette Starter',
    filename: 'workplace_email_templates_kit.docx',
    fileType: 'docx',
    sizeBytes: 156000,
    category: 'Template',
    moduleId: 'mod-3',
    moduleTitle: 'Professional Digital Communication & Email',
    version: '2.0.0',
    dateAdded: '2026-10-08',
    tags: ['Email Etiquette', 'Professional Writing', 'Templates', 'Job Search'],
    checksum: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    description: 'Collection of 8 copy-pasteable workplace email templates: follow-ups, interview confirmations, absence requests, and client introductions.',
    previewContent: {
      type: 'text',
      data: `TEMPLATE 1: Post-Interview Thank You\nSubject: Thank You - [Role Title] Interview - [Your Name]\n\nDear [Interviewer Name],\n\nThank you for taking the time to speak with me today regarding the [Role Title] position. I enjoyed learning more about [Specific Project/Goal Discussed] and remain enthusiastic about contributing to your team.\n\nBest regards,\n[Your Name] | [Phone] | [LinkedIn]`
    },
    sampleDownloadContent: `PROFESSIONAL EMAIL TEMPLATES BUNDLE
Youth Training & Employment Initiative

1. Job Application Follow-up
Subject: Follow-up on [Position Title] Application - [Your Full Name]

Dear [Hiring Manager Name / Hiring Team],
I hope this email finds you well. I am writing to reaffirm my strong interest in the [Position Title] role submitted on [Date]. With my training in digital office tools, customer communication, and data accuracy, I am excited about the opportunity to support your team.

Please let me know if you require any additional work samples or references.

Warm regards,
[Your Full Name]
[Phone Number]
[City, State]

2. Professional Sick Leave Notice
Subject: Unforeseen Absence - [Your Name] - [Date]

Dear [Supervisor Name],
Please accept this email as notification that I am feeling unwell today and will be unable to report to work on [Date]. I will keep you updated on my recovery and anticipate returning on [Expected Date].

Thank you for your understanding.
[Your Name]
`
  },
  {
    id: 'FILE-M3-02',
    title: 'Professional Communication Rubric & Tone Assessment',
    filename: 'email_communication_rubric.pdf',
    fileType: 'pdf',
    sizeBytes: 185000,
    category: 'Rubric',
    moduleId: 'mod-3',
    moduleTitle: 'Professional Digital Communication & Email',
    version: '1.0.0',
    dateAdded: '2026-10-10',
    tags: ['Rubric', 'Evaluation', 'Soft Skills', 'Email'],
    checksum: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    description: 'Instructor and peer evaluation rubric for email clarity, subject line precision, professional salutations, and proofreading.',
    previewContent: {
      type: 'table',
      data: {
        headers: ['Criteria', 'Emerging (1 pt)', 'Competent (3 pts)', 'Exemplary (5 pts)'],
        rows: [
          ['Subject Line', 'Vague ("help", "hi")', 'General topic indicated', 'Specific, actionable with name/context'],
          ['Salutation & Tone', 'Overly casual or missing', 'Polite but stiff', 'Warm, respectful, professionally tailored'],
          ['Call-to-Action', 'Unclear purpose or request', 'Request buried in text', 'Clear, polite single paragraph CTA'],
          ['Proofreading', 'Multiple typos, text-speak', 'Minor punctuation errors', 'Flawless grammar, professional sign-off']
        ]
      }
    }
  },
  {
    id: 'FILE-M4-01',
    title: 'Community Program Budget & Inventory Spreadsheet Starter',
    filename: 'community_budget_spreadsheet_exercise.xlsx',
    fileType: 'xlsx',
    sizeBytes: 198000,
    category: 'Exercise Starter',
    moduleId: 'mod-4',
    moduleTitle: 'Cloud Productivity, Docs & Spreadsheets',
    version: '2.2.0',
    dateAdded: '2026-10-12',
    tags: ['Excel', 'Google Sheets', 'Formulas', 'Budgeting'],
    checksum: '01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b',
    description: 'Hands-on spreadsheet starter file with simulated youth program expenses, inventory counters, SUM, AVERAGE, and IF formula exercises.',
    previewContent: {
      type: 'table',
      data: {
        headers: ['Item Description', 'Category', 'Unit Cost', 'Qty', 'Total Line Cost', 'Formula Needed'],
        rows: [
          ['Chromebook Laptops', 'Hardware', '$240.00', '12', '$2,880.00', '=C2*D2'],
          ['USB-C Multiport Adapters', 'Accessories', '$22.50', '15', '$337.50', '=C3*D3'],
          ['Student Workbooks', 'Printing', '$6.00', '40', '$240.00', '=C4*D4'],
          ['Total Program Budget', 'Summary', '-', '-', '$3,457.50', '=SUM(E2:E4)'],
          ['Average Expense per Category', 'Summary', '-', '-', '$1,152.50', '=AVERAGE(E2:E4)']
        ]
      }
    },
    sampleDownloadContent: `Item Description,Category,Unit Cost,Quantity,Formula
Chromebook Laptops,Hardware,240,12,=C2*D2
USB-C Hubs,Accessories,22.5,15,=C3*D3
Student Training Workbooks,Printing,6,40,=C4*D4
Cloud Storage Licenses,Software,12,25,=C5*D5
Total Budget,,,,"=SUM(E2:E5)"
Average Category Spend,,,,"=AVERAGE(E2:E5)"
`
  },
  {
    id: 'FILE-M4-02',
    title: 'Cloud Document Formatting & Style Guide',
    filename: 'cloud_docs_formatting_standards.pdf',
    fileType: 'pdf',
    sizeBytes: 280000,
    category: 'Reference Guide',
    moduleId: 'mod-4',
    moduleTitle: 'Cloud Productivity, Docs & Spreadsheets',
    version: '1.3.0',
    dateAdded: '2026-10-14',
    tags: ['Google Docs', 'Word', 'Typography', 'Collaboration'],
    checksum: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    description: 'Guide to semantic heading styles (H1, H2, H3), table of contents generation, comment mentions (@name), and document permissions (Viewer vs Editor).',
    previewContent: {
      type: 'checklist',
      data: [
        { label: 'Use Semantic Headings', desc: 'Never just make text bold and big; apply Heading 1, 2, 3 for screen reader accessibility and automatic tables of contents.' },
        { label: 'Cloud Sharing Permissions', desc: 'Choose "Restricted", "Commenter", or "Editor" deliberately to prevent accidental overwrites.' },
        { label: 'Version History Restores', desc: 'Use File -> Version History to review past edits and revert accidental changes.' },
        { label: 'Collaborative Assigning', desc: 'Use "@email" in comments to directly assign tasks and action items to team members.' }
      ]
    }
  },
  {
    id: 'FILE-M5-01',
    title: 'Password Management & 2FA Setup Playbook',
    filename: 'cybersecurity_passwords_2fa_playbook.pdf',
    fileType: 'pdf',
    sizeBytes: 340000,
    category: 'Reference Guide',
    moduleId: 'mod-5',
    moduleTitle: 'Cybersecurity, Passwords & Phishing Defense',
    version: '2.0.0',
    dateAdded: '2026-10-18',
    tags: ['Cybersecurity', 'Passkeys', '2FA', 'Password Managers'],
    checksum: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    description: 'Step-by-step instructions for creating passphrase formulas, utilizing Bitwarden/1Password, and enabling TOTP Authenticator apps.',
    previewContent: {
      type: 'text',
      data: `THE PASSPHRASE METHOD:\nInstead of "P@$$w0rd!", combine 4 random, memorable words with punctuation: "Ocean-Bicycle-Maple-Sunset#26".\n\nWHY PASSWORDS FAIL:\nReusing one password across 10 sites means 1 breach compromises your email, bank, and social accounts.\n\nTWO-FACTOR AUTHENTICATION (2FA):\n1. SMS Verification: Better than nothing, but vulnerable to SIM swapping.\n2. Authenticator Apps (Google/Microsoft Authenticator): Generates 30-second rotating TOTP codes.\n3. Hardware Keys (YubiKey): Gold standard for phishing resistance.`
    },
    sampleDownloadContent: `CYBERSECURITY ESSENTIALS PLAYBOOK
Youth Training & Employment Initiative

1. Golden Rules of Account Safety:
- Never use the same password on multiple websites.
- Use a passphrase of 16+ characters or a reputable password manager.
- Turn on 2-Step Verification on email, banking, and professional profiles.
- Never share verification codes sent to your phone or email.

2. Phishing Red Flags:
- Sense of artificial urgency ("Your account will be suspended in 24 hours!")
- Mismatched sender domain (e.g. support@paypa1-security.com)
- Requests for passwords, PIN numbers, or gift cards
- Generic greetings ("Dear Customer" instead of your name)
`
  },
  {
    id: 'FILE-M5-02',
    title: 'Phishing Detection Analysis Worksheet',
    filename: 'phishing_red_flags_worksheet.docx',
    fileType: 'docx',
    sizeBytes: 130000,
    category: 'Worksheet',
    moduleId: 'mod-5',
    moduleTitle: 'Cybersecurity, Passwords & Phishing Defense',
    version: '1.2.0',
    dateAdded: '2026-10-20',
    tags: ['Phishing', 'Scam Defense', 'Email Security'],
    checksum: 'fcde2b2edba56bf408686e9277004d5fbedf29c3211ddf45bd543ff5ea82d61f',
    description: 'Five real-world simulated phishing scenarios with guided questions for spotting spoofed domains, hidden URL redirects, and psychological manipulation.',
    previewContent: {
      type: 'table',
      data: {
        headers: ['Indicator', 'Legitimate Workplace Email', 'Phishing Attempt'],
        rows: [
          ['Sender Address', 'hr@youthtraining.org', 'hr-department@youth-training-verify.xyz'],
          ['Tone', 'Objective, documented deadline', 'Artificial panic, immediate threat of termination/loss'],
          ['Hyperlink Destination', 'https://youthtraining.org/portal', 'http://192.168.1.104/login-phish.html'],
          ['Attachments', 'Clean PDF with virus scan preview', 'Zip file, .scr, or macro-enabled .docm file']
        ]
      }
    }
  },
  {
    id: 'FILE-M6-01',
    title: 'ATS-Optimized Clean Digital Resume Template',
    filename: 'ats_friendly_resume_template.docx',
    fileType: 'docx',
    sizeBytes: 112000,
    category: 'Template',
    moduleId: 'mod-6',
    moduleTitle: 'Online Job Search, Digital Resumes & Portfolios',
    version: '3.1.0',
    dateAdded: '2026-10-22',
    tags: ['ATS', 'Resume', 'Job Search', 'Employment'],
    checksum: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    description: 'Single-column ATS-tested resume layout designed to pass automated hiring parsers without getting rejected due to tables or graphical text boxes.',
    previewContent: {
      type: 'text',
      data: `[FULL NAME]\n[City, State] | [Phone Number] | [Professional Email] | [LinkedIn URL]\n\nPROFESSIONAL SUMMARY\nDetail-oriented community training graduate with strong technical proficiencies in cloud collaboration (Google Workspace, Microsoft 365), data accuracy, and customer communication...\n\nCORE COMPETENCIES\n• Digital Office Tools: Google Docs, Sheets, Slides, Microsoft Office Suite\n• Data Management: Spreadsheet formulas (SUM, AVERAGE), inventory tracking\n• Communication: Professional correspondence, email inbox management\n• Cyber Hygiene: Passkey security, data privacy, phishing defense`
    },
    sampleDownloadContent: `[YOUR FULL NAME]
City, State, Zip | (555) 000-0000 | your.email@email.com | linkedin.com/in/yourname

PROFESSIONAL SUMMARY
Motivated and tech-proficient digital literacy training graduate with hands-on experience in cloud software, document organization, and customer support. Eager to contribute strong digital workflows and dependable communication skills to an entry-level administrative or tech support role.

CORE TECHNICAL SKILLS
- Software & Platforms: Google Workspace (Docs, Sheets, Drive), Microsoft Office (Word, Excel), Zoom, Slack
- Digital Administration: File hierarchy management, data verification, schedule coordination
- Professional Communication: Business email correspondence, customer service messaging

WORK & COMMUNITY EXPERIENCE
Youth Training & Employment Initiative - Tech Learning Lab | 2026
Digital Skills Participant & Project Contributor
- Completed 36 hours of rigorous digital literacy, spreadsheet modeling, and workplace communication training.
- Built automated inventory and budget tracking sheets utilizing standard arithmetic formulas.
- Practiced secure workplace correspondence and demonstrated 100% accuracy on cyber phishing defense simulations.

EDUCATION & CERTIFICATES
Certificate of Completion in Digital Literacy for Employment | 2026
Community Training Program
`
  },
  {
    id: 'FILE-M6-02',
    title: 'Job Search Application Tracker & Interview Checklist',
    filename: 'job_application_tracker_spreadsheet.xlsx',
    fileType: 'xlsx',
    sizeBytes: 164000,
    category: 'Template',
    moduleId: 'mod-6',
    moduleTitle: 'Online Job Search, Digital Resumes & Portfolios',
    version: '1.5.0',
    dateAdded: '2026-10-24',
    tags: ['Job Hunting', 'Interview Prep', 'Spreadsheet Tracker'],
    checksum: 'b3a8e0e1f9ab1bfe3a36f231f676f78bb30a519d2b21e6c530c0eee8ebb4a5d0',
    description: 'Structured spreadsheet for logging company applications, job portal URLs, salary ranges, contact persons, and follow-up milestones.',
    previewContent: {
      type: 'table',
      data: {
        headers: ['Company Name', 'Position Title', 'Date Applied', 'Portal/Source', 'Status', 'Follow-up Date'],
        rows: [
          ['Metro Health Services', 'Administrative Intake Clerk', '2026-10-18', 'LinkedIn', 'Under Review', '2026-10-25'],
          ['Civic Community Trust', 'Digital Program Assistant', '2026-10-20', 'Company Careers Page', 'Interview Scheduled', '2026-10-29'],
          ['Harbor Logistics', 'Inventory Data Entry Specialist', '2026-10-22', 'Indeed', 'Applied', '2026-10-29']
        ]
      }
    }
  }
];

export const PROFESSIONAL_RESOURCES: ProfessionalResourceLink[] = [
  {
    id: 'RES-01',
    title: 'Google Applied Digital Skills',
    organization: 'Google for Education / Grow with Google',
    url: 'https://applieddigitalskills.withgoogle.com/',
    description: 'Free video-based curriculum with practical project lessons for Google Docs, Sheets, Slides, and workplace problem-solving.',
    domain: 'applieddigitalskills.withgoogle.com',
    topics: ['Spreadsheets', 'Documents', 'Project Planning', 'Career Skills'],
    freeStatus: '100% Free',
    accreditedBy: 'Grow with Google'
  },
  {
    id: 'RES-02',
    title: 'Northstar Digital Literacy Project',
    organization: 'Literacy Minnesota',
    url: 'https://www.digitalliteracyassessment.org/',
    description: 'Industry-standard assessment modules and certifications for basic computer skills, internet navigation, and software competence.',
    domain: 'digitalliteracyassessment.org',
    topics: ['Standards Assessment', 'Essential Computer Skills', 'Certifications'],
    freeStatus: 'Free with Paid Cert',
    accreditedBy: 'Literacy Minnesota & National Workforce Boards'
  },
  {
    id: 'RES-03',
    title: 'GCFGlobal LearnFree: Computer Basics & Digital Media',
    organization: 'Goodwill Community Foundation',
    url: 'https://edu.gcfglobal.org/en/topics/computers/',
    description: 'Over 200 free, ad-free multimedia tutorials covering computer hardware, mouse tutorials, Windows/Mac navigation, and cloud tools.',
    domain: 'edu.gcfglobal.org',
    topics: ['Computer Basics', 'Operating Systems', 'Mouse & Keyboard Drills'],
    freeStatus: '100% Free'
  },
  {
    id: 'RES-04',
    title: 'UNESCO Digital Literacy Global Framework',
    organization: 'United Nations Educational, Scientific and Cultural Organization',
    url: 'https://unesdoc.unesco.org/ark:/48223/pf0000265993',
    description: 'Authoritative policy framework detailing digital competencies required for youth employment, civic participation, and economic growth.',
    domain: 'unesdoc.unesco.org',
    topics: ['International Standards', 'Competency Framework', 'Policy'],
    freeStatus: 'Open Source OER'
  },
  {
    id: 'RES-05',
    title: 'Mozilla Foundation: Web Literacy & Privacy Not Included',
    organization: 'Mozilla Foundation',
    url: 'https://foundation.mozilla.org/en/privacynotincluded/',
    description: 'In-depth consumer safety evaluations, privacy guides, and web literacy activities teaching youth how to protect their personal identity.',
    domain: 'foundation.mozilla.org',
    topics: ['Privacy', 'Cyber Hygiene', 'Digital Footprint'],
    freeStatus: '100% Free'
  },
  {
    id: 'RES-06',
    title: 'US Department of Labor: Skills to Pay the Bills',
    organization: 'U.S. Department of Labor (ODEP)',
    url: 'https://www.dol.gov/agencies/odep/program-areas/individuals/youth/soft-skills-pay-the-bills',
    description: 'Workplace readiness curriculum focused on mastering soft skills, professional communication, and digital workplace collaboration for youth.',
    domain: 'dol.gov',
    topics: ['Workforce Readiness', 'Communication', 'Youth Employment'],
    freeStatus: '100% Free',
    accreditedBy: 'U.S. Department of Labor'
  },
  {
    id: 'RES-07',
    title: 'W3C Web Accessibility Initiative (WAI)',
    organization: 'World Wide Web Consortium (W3C)',
    url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/',
    description: 'Core concepts of digital inclusion, color contrast, assistive technology (screen readers), and accessible digital document design.',
    domain: 'w3.org',
    topics: ['Accessibility', 'Inclusivity', 'WCAG Standards'],
    freeStatus: 'Open Source OER'
  },
  {
    id: 'RES-08',
    title: 'Cloudflare Learning Center: How Does the Internet Work?',
    organization: 'Cloudflare',
    url: 'https://www.cloudflare.com/learning/',
    description: 'Crystal-clear guides on DNS, IP addresses, SSL/TLS certificates, web hosting, and edge networking written for both beginners and engineers.',
    domain: 'cloudflare.com',
    topics: ['Internet Architecture', 'DNS & Hosting', 'Web Security'],
    freeStatus: '100% Free'
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod-1',
    slug: 'computer-fundamentals',
    order: 1,
    title: 'Computer Fundamentals & OS Navigation',
    subtitle: 'Hardware, Peripheral Mastery & Operating System File Hierarchies',
    durationHours: 6,
    level: 'Foundational',
    summary: 'Demystify physical computer components, master operating system windowing, and build rock-solid file organization habits.',
    competencies: [
      'Identify CPU, RAM, storage, and external I/O ports',
      'Manage multi-window desktops and keyboard shortcuts',
      'Implement ISO-8601 standardized file and folder hierarchies',
      'Perform basic system settings checks and peripheral troubleshooting'
    ],
    coverImage: '/src/assets/images/hero_digital_literacy_1793252992619.jpg',
    fileIds: ['FILE-M1-01', 'FILE-M1-02'],
    recommendedResourceIds: ['RES-03', 'RES-02'],
    lessons: [
      {
        id: 'les-1-1',
        title: 'Hardware vs Software: Understanding the Anatomy of a Workstation',
        readTimeMinutes: 8,
        overview: 'Explore what happens under the hood when a computer turns on, and how hardware connects to software.',
        keyPoints: [
          'The CPU executes calculations; RAM holds immediate application state; SSDs preserve permanent files.',
          'Ports are dedicated physical pathways: HDMI transmits video, USB-C handles power and bidirectional data.',
          'Input devices (mouse, keyboard, webcam) send commands; output devices (monitor, speakers, printer) return results.'
        ],
        detailedContent: [
          'In modern community training and workplace environments, computers are no longer black boxes. Understanding the boundary between physical hardware (the physical silicon and casing) and operating systems (the software managing memory and files) empowers you to troubleshoot without panic.',
          'When an application freezes, it is almost always a memory or thread bottleneck. Restarting an application or machine clears volatile RAM, resolving 80% of routine technical stalls.'
        ],
        tipsForCommunityLearners: [
          'Never yank a USB flash drive without selecting "Eject" in your file manager to prevent file corruption.',
          'Dust and blocked air vents cause fans to spin loudly and processors to throttle speeds.'
        ]
      },
      {
        id: 'les-1-2',
        title: 'Mastering the File System: Folders, Extensions & Naming Rules',
        readTimeMinutes: 10,
        overview: 'Stop losing downloads. Learn how professional administrative assistants organize drive directories.',
        keyPoints: [
          'File extensions (.pdf, .docx, .xlsx) instruct the OS which application is required to open the binary data.',
          'Hierarchical structures follow a tree layout: root -> department/category -> subproject -> dated file.',
          'Never name a document "resume_final_v2_edit.docx"; use ISO standard "2026-10-28_Resume_FirstNameLastName.docx".'
        ],
        detailedContent: [
          'Disorganized files waste an estimated 2.5 hours per week in corporate and non-profit settings. Files dropped onto the desktop or left in the "Downloads" folder quickly become unsearchable.',
          'By standardizing on clear dates (YYYY-MM-DD), systems automatically sort records in chronological order without needing complex search filters.'
        ],
        tipsForCommunityLearners: [
          'Create four top-level folders on your computer: Career, Personal Records, Community Training, and Archive.',
          'Use lowercase letters and hyphens or underscores instead of spaces if sharing files across web platforms.'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-1-1',
        title: 'Interactive Desktop File Organizer Sandbox',
        type: 'file_organizer',
        estimatedMinutes: 15,
        points: 100,
        objective: 'Clean up a chaotic workspace folder by creating structured directories, categorizing 6 files, and applying ISO naming rules.',
        instructions: [
          'Inspect the unorganized files in the virtual inbox.',
          'Create appropriate categorized folders (e.g. Career, Financial, Learning).',
          'Drag or move each file into its proper target folder.',
          'Rename messy files to follow the standard naming convention.',
          'Submit the cleaned directory to run the automated organizational audit.'
        ],
        rubricCriteria: [
          { criterion: 'Folder Categorization', weight: '40%', description: 'Files are placed into logical, non-overlapping directory buckets.' },
          { criterion: 'Naming Convention Precision', weight: '40%', description: 'Standard date prefix and clean descriptive words used.' },
          { criterion: 'Zero Leftover Clutter', weight: '20%', description: 'Virtual Downloads inbox is completely organized and cleared.' }
        ]
      },
      {
        id: 'ex-1-2',
        title: 'Module 1 Knowledge Check & Mastery Quiz',
        type: 'quiz_check',
        estimatedMinutes: 8,
        points: 50,
        objective: 'Demonstrate comprehension of computer hardware, ports, and operating system file systems.',
        instructions: ['Answer all 4 questions. You need at least 75% to earn the Foundational Badge.'],
        rubricCriteria: [
          { criterion: 'Accuracy', weight: '100%', description: 'Selecting correct conceptual answers.' }
        ],
        quizQuestions: [
          {
            id: 'q1-1',
            question: 'What is the primary difference between RAM and an SSD storage drive?',
            options: [
              'RAM holds permanent files even when powered off; SSD is temporary',
              'RAM is fast volatile memory for currently active apps; SSD is permanent non-volatile storage',
              'RAM connects monitors; SSD connects audio speakers',
              'There is no functional difference; they are different brand names for memory'
            ],
            correctAnswerIndex: 1,
            explanation: 'RAM (Random Access Memory) is ultra-fast temporary working memory that clears when turned off. Solid State Drives (SSDs) retain your files permanently.',
            contextTag: 'Hardware Architecture'
          },
          {
            id: 'q1-2',
            question: 'Which file naming pattern is considered best practice for professional file organization?',
            options: [
              'final_budget_version2_REAL_final.xlsx',
              '2026-10-28_YouthProgram_Budget_v02.xlsx',
              'budget!!! (1).xlsx',
              'New Document (copy).xlsx'
            ],
            correctAnswerIndex: 1,
            explanation: 'Using the ISO date format YYYY-MM-DD along with project and version details ensures automatic chronological sorting and prevents confusion.',
            contextTag: 'File System Management'
          },
          {
            id: 'q1-3',
            question: 'What happens if you accidentally change a file extension from ".xlsx" to ".txt"?',
            options: [
              'The file is automatically deleted from your hard drive',
              'The underlying data remains, but the OS might try to open it in a basic text editor rather than spreadsheet software',
              'The file will permanently turn into an image',
              'Nothing at all; extensions are purely decorative labels'
            ],
            correctAnswerIndex: 1,
            explanation: 'File extensions tell the operating system which program to launch. Changing it does not alter the binary data, but may cause the OS to pick the wrong default viewer.',
            contextTag: 'Operating System Fundamentals'
          },
          {
            id: 'q1-4',
            question: 'Which cable/port type is oval, reversible, and capable of delivering high-speed data, video, and power charging simultaneously?',
            options: [
              'VGA',
              'USB Type-A',
              'USB Type-C',
              'Serial DB-9'
            ],
            correctAnswerIndex: 2,
            explanation: 'USB Type-C is the modern universal reversible connector supporting high-speed data, DisplayPort video output, and Power Delivery up to 100W+.',
            contextTag: 'Peripherals & Ports'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    slug: 'internet-and-web-literacy',
    order: 2,
    title: 'Internet, Web Browsing & Information Literacy',
    subtitle: 'Search Mastery, Source Verification & Digital Footprints',
    durationHours: 6,
    level: 'Foundational',
    summary: 'Learn how the web functions, harness advanced search engine operators, evaluate online credibility, and guard your digital footprint.',
    competencies: [
      'Deconstruct URLs, protocols (HTTPS), domain suffixes (.gov, .org, .edu)',
      'Construct advanced Boolean queries using quotes, minus, and site: filters',
      'Apply the CRAAP test to verify online news and claims',
      'Understand digital footprints and private vs public browsing modes'
    ],
    coverImage: '/src/assets/images/hero_digital_literacy_1793252992619.jpg',
    fileIds: ['FILE-M2-01', 'FILE-M2-02'],
    recommendedResourceIds: ['RES-05', 'RES-08'],
    lessons: [
      {
        id: 'les-2-1',
        title: 'Deconstructing the Web: Domains, HTTPS & How Requests Work',
        readTimeMinutes: 9,
        overview: 'Understand how typing a web address contacts edge servers and why the padlock icon matters.',
        keyPoints: [
          'HTTPS encrypts data in transit between your browser and the web server, preventing eavesdropping on public Wi-Fi.',
          'Domains are hierarchical: "subdomain.domain.tld" (e.g., sites.google.com). Watch out for lookalike domains like "google-security-login.xyz".',
          'Search engines are not the internet itself—they are searchable indexes compiled by automated crawlers.'
        ],
        detailedContent: [
          'When you enter a website URL, your computer uses Domain Name System (DNS) to look up the server IP address. Modern hosting providers like Cloudflare distribute website copies to edge servers located close to users worldwide.',
          'A secure connection (HTTPS) means a third party cannot intercept your login password or credit card details while you are on public coffee shop Wi-Fi. However, HTTPS does not guarantee that the website content itself is truthful.'
        ],
        tipsForCommunityLearners: [
          'Always glance at the address bar before entering personal info. Make sure the domain name is the legitimate organization.',
          'Private or "Incognito" browsing stops your local computer from saving history and cookies, but does NOT make you anonymous on the network.'
        ]
      },
      {
        id: 'les-2-2',
        title: 'Information Literacy: The CRAAP Test for Evaluating Sources',
        readTimeMinutes: 11,
        overview: 'Learn how journalists and researchers verify online claims and spot sponsored misinformation.',
        keyPoints: [
          'Currency: Check publication dates—outdated news can be misleading when shared as current events.',
          'Relevance: Ensure the information is directly applicable to your research or job task.',
          'Authority: Determine whether the author has genuine subject-matter expertise or is an anonymous blogger.',
          'Accuracy: Corroborate claims with multiple independent, reputable sources.',
          'Purpose: Distinguish between educational content, personal opinion, and commercial sales pitches.'
        ],
        detailedContent: [
          'The digital era has made information abundant, but reliable verification is scarce. Search engines prioritize engagement and sponsored ad links at the top of query results.',
          'Practicing "lateral reading"—opening a new tab to research the organization making the claim rather than staying on their own "About" page—is the single most effective way to detect deceptive websites.'
        ],
        tipsForCommunityLearners: [
          'Sponsored results often appear at the very top of Google searches with a faint "Sponsored" tag; scroll past them to see organic resources.',
          'If a headline triggers extreme emotional shock or outrage, pause and verify with Snopes or Associated Press before sharing.'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-2-1',
        title: 'Search Query Optimizer & Fact-Checking Drill',
        type: 'quiz_check',
        estimatedMinutes: 10,
        points: 60,
        objective: 'Formulate precision search queries using Boolean operators and evaluate domain authenticity.',
        instructions: ['Evaluate the search strategies and identify trustworthy source indicators.'],
        rubricCriteria: [
          { criterion: 'Search Operator Logic', weight: '50%', description: 'Correct application of quotes, site:, and filetype: filters.' },
          { criterion: 'Source Evaluation', weight: '50%', description: 'Identification of reputable domains and verification methods.' }
        ],
        quizQuestions: [
          {
            id: 'q2-1',
            question: 'Which query will find official government reports on youth employment in PDF format?',
            options: [
              'youth employment government documents please help',
              '"youth employment" site:gov filetype:pdf',
              'search google for youth employment .gov',
              'youth employment -government'
            ],
            correctAnswerIndex: 1,
            explanation: '"youth employment" finds the exact phrase, site:gov restricts to government domains, and filetype:pdf returns only downloadable PDF reports.',
            contextTag: 'Advanced Search Syntax'
          },
          {
            id: 'q2-2',
            question: 'You receive a link "https://paypal.account-verify-login99.com/secure". What is the true root domain of this website?',
            options: [
              'paypal.com',
              'account-verify-login99.com',
              'secure.com',
              'google.com'
            ],
            correctAnswerIndex: 1,
            explanation: 'In domain names, the root domain is the part immediately before the top-level extension (.com). Here, "paypal" is merely a deceptive subdomain on the attacker-owned "account-verify-login99.com".',
            contextTag: 'URL Anatomy & Safety'
          },
          {
            id: 'q2-3',
            question: 'What is "lateral reading" when fact-checking an unfamiliar online article?',
            options: [
              'Reading the article from right to left',
              'Carefully inspecting the author\'s own "About Me" page on their own website',
              'Opening other tabs to search what independent fact-checkers and news sources say about the publisher',
              'Printing the web page out onto physical paper'
            ],
            correctAnswerIndex: 2,
            explanation: 'Lateral reading involves opening parallel tabs to investigate the source from outside sources, rather than relying on what the website claims about itself.',
            contextTag: 'Fact Checking Methodology'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    slug: 'professional-communication',
    order: 3,
    title: 'Professional Digital Communication & Email',
    subtitle: 'Workplace Correspondence, Tone Modulation & Inbox Management',
    durationHours: 6,
    level: 'Intermediate',
    summary: 'Write high-impact workplace emails, master CC vs BCC etiquette, organize communication threads, and communicate with professional tone.',
    competencies: [
      'Structure workplace emails with clear subject lines and actionable sign-offs',
      'Distinguish between CC (courtesy copy) and BCC (blind courtesy copy) usage',
      'Adjust communication tone for clients, managers, and peers',
      'Manage email attachments safely and maintain organized inbox labels'
    ],
    coverImage: '/src/assets/images/hero_digital_literacy_1793252992619.jpg',
    fileIds: ['FILE-M3-01', 'FILE-M3-02'],
    recommendedResourceIds: ['RES-06', 'RES-01'],
    lessons: [
      {
        id: 'les-3-1',
        title: 'The Anatomy of a Professional Workplace Email',
        readTimeMinutes: 10,
        overview: 'Deconstruct subject lines, salutations, body brevity, and call-to-action closures.',
        keyPoints: [
          'Subject lines should be specific and searchable: "[Action Needed] Monthly Inventory Report - Oct 2026".',
          'Use professional salutations ("Dear Mr. Jackson", "Good morning Team") instead of casual text slang ("Heyyy", "Sup").',
          'Keep messages scannable: use bullet points for lists and keep paragraphs under 3-4 sentences.'
        ],
        detailedContent: [
          'Email is the definitive paper trail of the modern workplace. Every email you send contributes to your professional reputation.',
          'When replying to an email thread, respect the "Reply" vs "Reply All" distinction. Only use "Reply All" when every recipient genuinely requires the information to execute their role.'
        ],
        tipsForCommunityLearners: [
          'Always attach files BEFORE writing the message so you never send the dreaded "oops, forgot the attachment" follow-up.',
          'Read your email aloud once before clicking send to catch missing words or unintended emotional sharpness.'
        ]
      },
      {
        id: 'les-3-2',
        title: 'CC, BCC, and Forwarding Etiquette',
        readTimeMinutes: 8,
        overview: 'When to keep colleagues in the loop and when to protect recipient privacy.',
        keyPoints: [
          'To: Primary individuals responsible for taking action or responding.',
          'CC (Carbon Copy): Individuals who need visibility for awareness but do not need to take immediate action.',
          'BCC (Blind Carbon Copy): Used when emailing large groups to keep email addresses confidential, or when introducing two parties.'
        ],
        detailedContent: [
          'Misusing CC and BCC can cause embarrassment or privacy violations. If you are sending a newsletter or announcement to 50 community members, placing everyone in the "To" line exposes every member\'s private email address to the entire list.',
          'Using BCC keeps all recipient addresses hidden, safeguarding privacy and preventing accidental "Reply All" storms.'
        ],
        tipsForCommunityLearners: [
          'Never use BCC to secretly spy on a colleague\'s conversation in bad faith.',
          'When someone introduces you via email and says "Moving Sarah to BCC to save her inbox", it is a polite cue that Sarah does not need subsequent replies.'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-3-1',
        title: 'Workplace Email Tone & Etiquette Assessment',
        type: 'quiz_check',
        estimatedMinutes: 10,
        points: 50,
        objective: 'Identify appropriate workplace email conventions and etiquette.',
        instructions: ['Review realistic workplace communication scenarios and choose the professional response.'],
        rubricCriteria: [
          { criterion: 'Professional Tone', weight: '50%', description: 'Distinguishing between casual messaging and workplace decorum.' },
          { criterion: 'Protocol Accuracy', weight: '50%', description: 'Correct application of CC, BCC, and subject lines.' }
        ],
        quizQuestions: [
          {
            id: 'q3-1',
            question: 'You need to send an announcement to 45 community youth participants. How should you address the email to protect their privacy?',
            options: [
              'Put all 45 email addresses in the "To" field so everyone knows who attended',
              'Put your own email in "To" and all 45 participant emails in "BCC"',
              'Put all addresses in "CC"',
              'Send 45 separate individual emails by hand'
            ],
            correctAnswerIndex: 1,
            explanation: 'Putting your own email in "To" and participants in "BCC" prevents everyone\'s email address from being visible to all recipients and prevents accidental reply-all storms.',
            contextTag: 'Email Privacy Protocols'
          },
          {
            id: 'q3-2',
            question: 'Which subject line is most effective when requesting time off from your workplace supervisor?',
            options: [
              'hey need to talk asap',
              'Time Off Request: Nov 14-15 - Jordan Taylor',
              'VACATION!!!',
              'urgent'
            ],
            correctAnswerIndex: 1,
            explanation: 'A descriptive subject line with the purpose, dates, and your name allows your manager to immediately understand and prioritize the request.',
            contextTag: 'Subject Line Precision'
          }
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    slug: 'cloud-productivity-and-spreadsheets',
    order: 4,
    title: 'Cloud Productivity, Docs & Spreadsheets',
    subtitle: 'Real-Time Collaboration, Word Processing & Spreadsheet Formulas',
    durationHours: 8,
    level: 'Intermediate',
    summary: 'Harness Google Workspace and Microsoft 365, collaborate with live comments, format professional documents, and write spreadsheet calculation formulas.',
    competencies: [
      'Organize and share cloud drives with precise permissions (Viewer, Commenter, Editor)',
      'Format professional documents with semantic heading styles and tables',
      'Create and calculate spreadsheets using =SUM, =AVERAGE, =COUNT, and arithmetic formulas',
      'Track changes, resolve comments, and restore earlier document revisions'
    ],
    coverImage: '/src/assets/images/module_cloud_tools_1793252992732.jpg',
    fileIds: ['FILE-M4-01', 'FILE-M4-02'],
    recommendedResourceIds: ['RES-01', 'RES-03'],
    lessons: [
      {
        id: 'les-4-1',
        title: 'Cloud Collaboration: Permissions, Sharing & Version History',
        readTimeMinutes: 10,
        overview: 'Work simultaneously on documents with teammates without overwriting each other.',
        keyPoints: [
          'Cloud storage automatically syncs edits across devices; no manual saving needed.',
          'Sharing permissions determine access: Viewer (read-only), Commenter (suggest edits), Editor (modify content).',
          'Version history acts as a time machine, allowing you to restore any previous draft.'
        ],
        detailedContent: [
          'Gone are the days of emailing Word attachments labeled "report_v1", "report_v2", and losing track of changes. Cloud office suites like Google Workspace and Microsoft 365 allow dozens of people to collaborate in real-time.',
          'Knowing how to set access permissions protects sensitive documents from accidental deletion or public leak.'
        ],
        tipsForCommunityLearners: [
          'When sharing a document externally, always check whether anyone with the link can edit or just view.',
          'Use comments and "@mention" tags to assign tasks directly to teammates.'
        ]
      },
      {
        id: 'les-4-2',
        title: 'Spreadsheet Foundations: Grid Anatomy & Essential Formulas',
        readTimeMinutes: 14,
        overview: 'Understand columns, rows, cell addresses, and build automated formulas.',
        keyPoints: [
          'Every cell has a coordinate: Column letter + Row number (e.g. B4 is Column B, Row 4).',
          'All formulas MUST start with an equals sign (=). Example: =A1+B1 or =SUM(C2:C10).',
          'Use SUM for totals, AVERAGE for means, and COUNT for tallying entries.'
        ],
        detailedContent: [
          'Spreadsheets are the backbone of modern business operations, handling everything from inventory logs to community event budgets. Rather than calculating numbers on a handheld calculator and typing the result, you write dynamic formulas.',
          'If a unit cost changes in cell C2, every formula downstream updates automatically. This eliminates human calculation errors.'
        ],
        tipsForCommunityLearners: [
          'Colon (:) denotes a range of cells: =SUM(A1:A10) sums all cells from A1 down through A10.',
          'Comma (,) separates individual arguments: =SUM(A1, B1, C1).'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-4-1',
        title: 'Live Interactive Spreadsheet Calculation Sandbox',
        type: 'spreadsheet_math',
        estimatedMinutes: 15,
        points: 100,
        objective: 'Practice entering formulas to calculate item totals, program budget sum, and average cost.',
        instructions: [
          'Review the community supply inventory table.',
          'In the Total column, enter arithmetic formulas to multiply Unit Cost by Quantity (e.g., =C2*D2).',
          'Calculate the overall program budget using =SUM().',
          'Calculate the average category expense using =AVERAGE().',
          'Click "Verify Formulas" to test calculation accuracy.'
        ],
        rubricCriteria: [
          { criterion: 'Arithmetic Formulas', weight: '40%', description: 'Multiplication formulas calculate correct line item subtotals.' },
          { criterion: 'SUM Function', weight: '30%', description: 'Grand total uses proper range syntax.' },
          { criterion: 'AVERAGE Function', weight: '30%', description: 'Mean cost formula matches expected benchmark.' }
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    slug: 'cybersecurity-and-privacy',
    order: 5,
    title: 'Cybersecurity, Passwords & Phishing Defense',
    subtitle: 'Threat Identification, Multi-Factor Authentication & Safe Browsing',
    durationHours: 6,
    level: 'Intermediate',
    summary: 'Protect personal and organizational assets, detect sophisticated phishing traps, implement 2FA, and maintain strong digital hygiene.',
    competencies: [
      'Identify social engineering tactics, deceptive URLs, and phishing emails',
      'Construct robust passphrases and implement password manager solutions',
      'Configure Multi-Factor Authentication (MFA / 2FA) across critical accounts',
      'Recognize public Wi-Fi vulnerabilities and manage device security settings'
    ],
    coverImage: '/src/assets/images/module_cybersecurity_1793252992698.jpg',
    fileIds: ['FILE-M5-01', 'FILE-M5-02'],
    recommendedResourceIds: ['RES-05', 'RES-08'],
    lessons: [
      {
        id: 'les-5-1',
        title: 'Social Engineering & The Psychology of Phishing',
        readTimeMinutes: 11,
        overview: 'Why attackers target human emotions—urgency, fear, curiosity—rather than cracking firewalls.',
        keyPoints: [
          'Phishing is an attempt to steal sensitive credentials by posing as a trustworthy entity.',
          'Common hooks: "Account Suspended in 24 Hours", "Direct Deposit Failed", "Urgent Invoice Attached".',
          'Always inspect the sender email domain after the "@" symbol, not just the display name.'
        ],
        detailedContent: [
          'Over 90% of successful corporate data breaches begin with a phishing email. Attackers do not need to be master hackers if an employee willingly types their password into a spoofed login page.',
          'Legitimate organizations (banks, government agencies, payroll providers) will never email you asking for your password, PIN, or Social Security Number via a clickable link.'
        ],
        tipsForCommunityLearners: [
          'Hover your mouse cursor over any hyperlink (without clicking) to inspect the true destination URL in your browser bottom status bar.',
          'When in doubt, never click the link in the email. Instead, open a new browser window and type the organization\'s official address directly.'
        ]
      },
      {
        id: 'les-5-2',
        title: 'Modern Password Hygiene & Multi-Factor Authentication (2FA)',
        readTimeMinutes: 9,
        overview: 'Move beyond short passwords to passphrases and cryptographic authenticator codes.',
        keyPoints: [
          'Length beats complexity: a 16-character passphrase is exponentially stronger than an 8-character complex password.',
          'Never reuse passwords across multiple services; use a password manager (Bitwarden, 1Password).',
          'Two-Factor Authentication requires something you know (password) + something you have (authenticator app code).'
        ],
        detailedContent: [
          'Automated botnets test billions of breached password combinations every day (credential stuffing). If your email password is the same as your gym membership password, a breach at the gym compromises your email.',
          'Enabling 2FA blocks over 99% of automated account takeover attempts, even if an attacker manages to acquire your password.'
        ],
        tipsForCommunityLearners: [
          'Prefer Authenticator apps (Google Authenticator, Microsoft Authenticator) over SMS text codes whenever available.',
          'Save backup recovery codes in a secure physical location or encrypted note.'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-5-1',
        title: 'Interactive Phishing Inbox Simulator',
        type: 'phishing_inbox',
        estimatedMinutes: 15,
        points: 100,
        objective: 'Inspect 5 simulated workplace emails, analyze sender domains and link destinations, and flag phishing threats.',
        instructions: [
          'Click on each email in the simulated inbox to view its headers and content.',
          'Inspect the sender address, subject line urgency, and hover over hyperlinks.',
          'Flag whether the email is "Legitimate" or "Phishing Threat".',
          'Identify specific red flags for each suspicious message.',
          'Submit your analysis to view the security audit report.'
        ],
        rubricCriteria: [
          { criterion: 'Threat Detection Accuracy', weight: '60%', description: 'Correctly classifies safe vs malicious emails.' },
          { criterion: 'Red Flag Identification', weight: '40%', description: 'Pinpoints deceptive domains, false urgency, or malicious attachments.' }
        ]
      }
    ]
  },
  {
    id: 'mod-6',
    slug: 'online-job-search-and-resumes',
    order: 6,
    title: 'Online Job Search, Digital Resumes & Portfolios',
    subtitle: 'ATS Optimization, Job Board Navigation & Virtual Interviewing',
    durationHours: 6,
    level: 'Workforce Ready',
    summary: 'Navigate online job portals (LinkedIn, Indeed), format ATS-compliant digital resumes, track applications, and prepare for virtual interviews.',
    competencies: [
      'Format single-column ATS-compliant resumes with tailored action verbs',
      'Optimize keyword density matching job descriptions',
      'Navigate online job portals, filter listings, and submit digital applications',
      'Organize application tracking spreadsheets and conduct virtual video interviews'
    ],
    coverImage: '/src/assets/images/hero_digital_literacy_1793252992619.jpg',
    fileIds: ['FILE-M6-01', 'FILE-M6-02'],
    recommendedResourceIds: ['RES-06', 'RES-02', 'RES-01'],
    lessons: [
      {
        id: 'les-6-1',
        title: 'Demystifying ATS: How Automated Systems Read Your Resume',
        readTimeMinutes: 12,
        overview: 'Understand why fancy graphics and tables cause Applicant Tracking Systems to reject resumes.',
        keyPoints: [
          'An Applicant Tracking System (ATS) is software that parses resume text into database fields.',
          'Complex multi-column layouts, tables, and icons can scramble text during automated parsing.',
          'Match keywords directly from the target job posting in your skills and experience sections.'
        ],
        detailedContent: [
          'When you apply for a job on Indeed, LinkedIn, or a corporate careers portal, a human recruiter is rarely the first entity to review your application. Software scans your resume looking for specific keywords and experience markers.',
          'Using standard section headings (e.g. "Work Experience", "Education", "Skills") and saving your resume as a clean, text-based PDF or .docx file ensures high readability scores.'
        ],
        tipsForCommunityLearners: [
          'Avoid putting critical contact information in document headers or footers, as some older ATS parsers ignore them.',
          'Use bullet points starting with strong action verbs: "Organized", "Calculated", "Managed", "Collaborated".'
        ]
      },
      {
        id: 'les-6-2',
        title: 'Mastering the Virtual Video Interview (Zoom, Teams, Google Meet)',
        readTimeMinutes: 8,
        overview: 'Camera positioning, lighting, audio testing, and professional virtual etiquette.',
        keyPoints: [
          'Position your camera at eye level, not looking up from your lap.',
          'Ensure front-facing light so your face is clearly visible; avoid sitting directly in front of a bright window.',
          'Test microphone and speaker audio 10 minutes prior to the scheduled call.'
        ],
        detailedContent: [
          'Remote and hybrid interviews are now standard for modern employment. Demonstrating comfortable digital presence during a video call signals that you are ready for a tech-enabled workplace.',
          'Keep your desktop clean and close unnecessary browser tabs before the interview in case you are asked to share your screen.'
        ],
        tipsForCommunityLearners: [
          'Look into the camera lens when speaking rather than only looking at the video box on your screen; this creates natural eye contact.',
          'Have a digital copy of your resume and the job posting open in an adjacent window for reference.'
        ]
      }
    ],
    exercises: [
      {
        id: 'ex-6-1',
        title: 'Interactive ATS Resume Keyword Scanner & Optimizer',
        type: 'ats_resume',
        estimatedMinutes: 15,
        points: 100,
        objective: 'Test a draft resume against real-world job posting criteria, diagnose layout red flags, and optimize keyword matches.',
        instructions: [
          'Select a sample entry-level job posting (e.g., Office Assistant or Tech Support).',
          'Load our sample resume or paste your own professional text.',
          'Run the ATS Diagnostic Parser.',
          'Review the keyword match score, formatting warnings, and action verb density.',
          'Implement recommendations to raise your ATS score above 85%.'
        ],
        rubricCriteria: [
          { criterion: 'Keyword Alignment', weight: '50%', description: 'Matches required digital tools and competencies.' },
          { criterion: 'Formatting Hygiene', weight: '30%', description: 'Absence of problematic tables, text boxes, and corrupt symbols.' },
          { criterion: 'Action Verb Strength', weight: '20%', description: 'Bullet points lead with impactful operational verbs.' }
        ]
      }
    ]
  }
];

export const IMPROVEMENT_RECOMMENDATIONS: ImprovementRecommendation[] = [
  {
    id: 'REC-01',
    category: 'Pedagogy & Engagement',
    title: 'Transform Passive Text into Hands-on Interactive Sandboxes',
    googleSitesLimitation: 'The original Google Sites page relies heavily on static reading passages and external links with zero in-browser interactivity, resulting in passive reading without tactile learning.',
    recommendedSolution: 'Embed client-side interactive sandboxes directly into every module: a real file-management simulator, interactive phishing inbox analyzer, live spreadsheet formula sandbox, and an ATS resume scanner.',
    technicalArchitecture: 'Built with React state engines, providing instant visual feedback, error diagnosis, and completion scoring without needing external third-party software.',
    impactScore: 'Critical',
    actionItems: [
      'Replace static text instructions with live interactive exercises where learners drag, drop, calculate, and test.',
      'Provide instant validation and contextual explanations when an answer or formula is submitted.',
      'Save learner progress in browser state or database so students can resume sessions seamlessly.'
    ]
  },
  {
    id: 'REC-02',
    category: 'Cloudflare & Edge Architecture',
    title: 'Deploy on Cloudflare Pages with Global CDN & Zero-Egress Storage',
    googleSitesLimitation: 'Google Sites is constrained by rigid template layouts, lacks custom API proxy support, cannot host structured file repositories cleanly, and offers limited custom domain DNS performance.',
    recommendedSolution: 'Host the web application on Cloudflare Pages using static edge distribution, storing courseware files and templates in Cloudflare R2 (zero egress fees), and managing learner progress via Cloudflare D1 or KV.',
    technicalArchitecture: 'Vite React SPA compiled to static assets deployed to Cloudflare Pages edge network, with wrangler.toml and _redirects rules for single-page routing.',
    impactScore: 'Critical',
    actionItems: [
      'Create Cloudflare Pages build pipeline with `npm run build` targeting the `dist` directory.',
      'Configure `_redirects` file for client-side routing fallback (`/* /index.html 200`).',
      'Leverage Cloudflare R2 object storage for hosting downloadable PDFs, DOCX, and XLSX course files.'
    ]
  },
  {
    id: 'REC-03',
    category: 'Accessibility & Inclusivity',
    title: 'Achieve WCAG 2.1 AA Compliance & Mobile Touch Optimization',
    googleSitesLimitation: 'Standard Google Sites templates frequently struggle with mobile viewport reflow, low color contrast on default themes, and poor screen-reader navigation for community learners with disabilities.',
    recommendedSolution: 'Implement semantic HTML5 landmarks, explicit ARIA labels, 4.5:1 minimum text contrast, keyboard-accessible focus rings, and touch targets >= 44px for mobile smartphones.',
    technicalArchitecture: 'Tailwind CSS utility tokens enforcing high contrast slate/sky palette, semantic landmark hierarchy, and zero-pill typographic metadata.',
    impactScore: 'High',
    actionItems: [
      'Audit color contrast ratios across all buttons, badges, and text blocks to exceed 4.5:1.',
      'Ensure every interactive element has full keyboard navigation support (Tab, Enter, Space).',
      'Implement mobile-first responsive layout that gracefully adapts to small smartphone screens used by youth in community centers.'
    ]
  },
  {
    id: 'REC-04',
    category: 'Assessment & Data Integrity',
    title: 'Structured File Database Schema & Automated Competency Rubrics',
    googleSitesLimitation: 'Files on Google Sites are typically scattered across arbitrary Google Drive links with broken permissions, inconsistent naming, and no centralized search or checksum verification.',
    recommendedSolution: 'Implement a centralized, typed CourseFile database schema with metadata (file size, SHA256 checksums, version history, categorization tags, and in-browser previewers).',
    technicalArchitecture: 'Typed JSON database store with in-memory search, tag filtering, file viewer modal, custom upload simulator, and JSON export/import for educators.',
    impactScore: 'Strategic',
    actionItems: [
      'Create structured schema for all courseware materials including checksums and preview data.',
      'Build in-browser file previewer allowing students to read documents and inspect spreadsheets without needing desktop Office licenses.',
      'Provide exportable progress reports and digital completion certificates aligned with UNESCO standards.'
    ]
  }
];
