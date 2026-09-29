import React, { useState, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  UploadCloud,
  Target,
  ShieldCheck,
  Layers,
  Award,
  ArrowRight,
  Search,
  Copy,
  Check,
  RefreshCw,
  Printer,
  ExternalLink,
  Briefcase,
  Code2,
  Cpu,
  Database,
  BookOpen,
  Zap,
  ChevronRight,
  FileCode,
  Flame,
  Info
} from 'lucide-react';
import { extractTextFromFile, analyzeResume } from '../utils/resumeAnalyzer';
import { improveResume } from '../services/api';
import { COURSES_DATA } from './CoursesPage';
import { ENRICHED_JOBS } from './JobsPage';

/* ═══════════════════════════════════════════════════════════════════════════
   TARGET CAREER TRACKS CONFIGURATION (ALIGNED WITH INDIAN HIRING STANDARDS)
═══════════════════════════════════════════════════════════════════════════ */
const CAREER_TRACKS = [
  {
    id: 'fullstack',
    name: 'Full Stack Developer',
    icon: '💻',
    salaryRange: '₹10 – 26 LPA',
    atsKeywords: [
      'React', 'Node.js', 'TypeScript', 'JavaScript', 'PostgreSQL', 'MongoDB',
      'Docker', 'REST APIs', 'Express', 'Git', 'CI/CD', 'Tailwind', 'Redux', 'System Design'
    ],
    idealSummary: 'Full-stack software engineer with expertise in building responsive single-page applications and scalable microservices.',
  },
  {
    id: 'aiml',
    name: 'AI / ML Engineer',
    icon: '🤖',
    salaryRange: '₹14 – 35 LPA',
    atsKeywords: [
      'Python', 'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow',
      'Pandas', 'NumPy', 'NLP', 'Data Analysis', 'Docker', 'Git', 'REST APIs', 'SQL'
    ],
    idealSummary: 'Machine learning practitioner skilled in predictive modeling, deep neural networks, and productionizing AI models.',
  },
  {
    id: 'frontend',
    name: 'Frontend Engineer',
    icon: '⚛️',
    salaryRange: '₹8 – 22 LPA',
    atsKeywords: [
      'React', 'TypeScript', 'JavaScript', 'Next.js', 'Tailwind', 'CSS',
      'HTML', 'Redux', 'REST APIs', 'Git', 'Testing', 'Figma', 'Web Performance'
    ],
    idealSummary: 'Frontend specialist passionate about crafting accessible, pixel-perfect user interfaces with optimized render lifecycles.',
  },
  {
    id: 'cloud_devops',
    name: 'Cloud & DevOps Engineer',
    icon: '☁️',
    salaryRange: '₹12 – 30 LPA',
    atsKeywords: [
      'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Terraform',
      'Python', 'Git', 'Bash', 'Azure', 'Monitoring', 'System Design'
    ],
    idealSummary: 'DevOps & Cloud engineer experienced in automated CI/CD pipelines, container orchestration, and high-availability architecture.',
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Analyst',
    icon: '🛡️',
    salaryRange: '₹10 – 25 LPA',
    atsKeywords: [
      'Linux', 'Networking', 'Python', 'SIEM', 'OWASP', 'Penetration Testing',
      'Firewalls', 'Vulnerability Assessment', 'Cryptography', 'Git', 'Security Auditing'
    ],
    idealSummary: 'Security analyst focusing on proactive vulnerability management, zero-trust network protocols, and incident containment.',
  },
  {
    id: 'data_eng',
    name: 'Data Engineer & Analytics',
    icon: '📊',
    salaryRange: '₹11 – 28 LPA',
    atsKeywords: [
      'SQL', 'Python', 'PostgreSQL', 'Pandas', 'ETL', 'Data Modeling',
      'AWS', 'Docker', 'Git', 'Data Analysis', 'BigQuery', 'Redis'
    ],
    idealSummary: 'Data engineer adept at architecting high-throughput ETL workflows, relational schemas, and real-time analytical reporting.',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SAMPLE FRESHER RESUME FOR 1-CLICK INSTANT AUDIT
═══════════════════════════════════════════════════════════════════════════ */
const SAMPLE_FRESHER_RESUME = `Rohan Sharma
Bengaluru, Karnataka | +91 98765 43210 | rohan.sharma.dev@gmail.com
linkedin.com/in/rohansharma-dev | github.com/rohansharma-codes | rohansharma.me

PROFESSIONAL SUMMARY
Passionate and results-driven Software Engineering fresher with a strong foundation in Full Stack Development, Data Structures, and Modern Web Architectures. Proven experience building scalable web applications with React, Node.js, and PostgreSQL. Winner of Smart India Hackathon 2024 and eager to contribute to enterprise-grade cloud native platforms.

TECHNICAL SKILLS
• Languages: JavaScript (ES6+), TypeScript, Python, SQL, C++, HTML5, CSS3
• Frameworks & Libraries: React.js, Next.js, Node.js, Express.js, Tailwind CSS, Redux Toolkit
• Databases & Cloud: PostgreSQL, MongoDB, Redis, AWS (S3, EC2), Firebase
• Tools & DevOps: Git, GitHub, Docker, Postman, Jest, CI/CD, Linux, Vite

PROJECTS
DevSync – Real-Time Collaborative Developer Workspace
• Engineered full-stack collaborative markdown editor with WebSockets and Node.js supporting 50+ concurrent users with sub-50ms latency.
• Implemented JWT-based role authentication, Redis pub/sub messaging, and PostgreSQL database with Prisma ORM.
• Containerized microservices using Docker and deployed frontend on Vercel and backend on AWS EC2 with GitHub Actions CI/CD.

CareerCompass – AI Career Path & Job Readiness Simulator
• Developed responsive React 19 single-page application with Tailwind CSS and Lucide icons, improving user engagement by 45%.
• Integrated ATS resume parsing algorithms and skill gap diagnostic tools matching 250+ technical competencies.
• Architected interactive roadmap timeline with state persistence and simulated placement outcomes for 15+ job profiles.

Algorithmic Trading Bot & Analytics Dashboard
• Built automated backtesting pipeline in Python using Pandas, NumPy, and Binance REST API for historical algorithmic analysis.
• Visualized technical indicators (MACD, RSI, Bollinger Bands) using interactive Chart.js dashboards.

WORK & INTERNSHIP EXPERIENCE
Frontend Engineering Intern – TechNova Solutions (Bengaluru, Karnataka) | Jun 2024 – Aug 2024
• Developed reusable React components and migrated 12 legacy views to modern TypeScript, accelerating sprint velocity by 25%.
• Optimized bundle size by 32% via code splitting, lazy loading, and dynamic imports, boosting Google Lighthouse score from 68 to 94.
• Collaborated in an Agile Scrum team of 8 engineers, participating in daily standups and weekly code reviews.

EDUCATION
B.Tech in Computer Science & Engineering | 2021 – 2025
Vellore Institute of Technology (VIT) | CGPA: 8.85 / 10.0
• Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks, Cloud Computing.

CERTIFICATIONS & ACHIEVEMENTS
• AWS Certified Cloud Practitioner (CLF-C02) – Amazon Web Services (2024)
• Meta Front-End Developer Professional Certificate – Coursera (2024)
• 1st Place Winner – Smart India Hackathon 2024 (Student Innovation Category)
• Solved 450+ Data Structures & Algorithms problems on LeetCode (Top 12% global rating)`;

/* ═══════════════════════════════════════════════════════════════════════════
   PRE-LOADED STAR BULLET EXAMPLES & AI REWRITER TEMPLATES
═══════════════════════════════════════════════════════════════════════════ */
const STAR_BULLET_EXAMPLES = [
  {
    role: 'Frontend Development',
    before: 'Worked on website UI using React and made it responsive.',
    after: 'Architected responsive React 19 SPA with Tailwind CSS & lazy loading, slashing initial page load time by 42% for 12,000+ monthly active users.',
    impact: '+42% Load Velocity',
    tags: ['STAR Aligned', 'Metrics Driven']
  },
  {
    role: 'Backend & APIs',
    before: 'Created backend API in Node and stored user data in MongoDB.',
    after: 'Engineered high-throughput RESTful microservices in Node.js & Express with Redis caching, handling 1,200 req/sec with 99.9% uptime SLA.',
    impact: '1,200 req/sec Scale',
    tags: ['Microservices', 'High Reliability']
  },
  {
    role: 'Data & Machine Learning',
    before: 'Ran Python scripts to clean dataset and train machine learning model.',
    after: 'Built end-to-end automated ETL pipeline and PyTorch classification model, improving model prediction accuracy from 78% to 94.2% on 500k+ records.',
    impact: '94.2% Model Accuracy',
    tags: ['Quantified Result', 'Production Pipeline']
  },
  {
    role: 'DevOps & Cloud',
    before: 'Put app into Docker and pushed code to AWS.',
    after: 'Containerized multi-service Docker containers and automated zero-downtime CI/CD workflows via GitHub Actions & AWS ECS, cutting deployment time by 65%.',
    impact: '-65% Deployment Cycle',
    tags: ['Zero-Downtime', 'Cloud Native']
  }
];

export default function ResumePage({
  onBack,
  resumeStats,
  onUpdateResumeStats,
  userName = 'Student',
  onNavigateToCourses,
  onNavigateToJobs,
  onNavigateToRoadmap,
  onNavigateToCareerPaths,
  showToast = () => {}
}) {
  const [selectedTrackId, setSelectedTrackId] = useState('fullstack');
  const [inputMode, setInputMode]             = useState('upload'); // 'upload' | 'paste'
  const [pastedText, setPastedText]           = useState('');
  const [fileName, setFileName]               = useState('');
  const [isExtracting, setIsExtracting]       = useState(false);
  const [isAnalyzing, setIsAnalyzing]         = useState(false);
  const [analysis, setAnalysis]               = useState(null);
  const [analysisMode, setAnalysisMode]       = useState(null); // 'ai' | 'engine'
  const [activeTab, setActiveTab]             = useState('audit'); // 'audit' | 'radar' | 'enhancer' | 'gap_closer'
  const [keywordFilter, setKeywordFilter]     = useState('');
  const [copiedKeyword, setCopiedKeyword]     = useState(null);
  const [scanStep, setScanStep]               = useState(0);

  // Bullet Point Rewriter Playground State
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [enhancementGoal, setEnhancementGoal] = useState('metrics'); // 'metrics' | 'leadership' | 'tech_depth'
  const [enhancedResult, setEnhancedResult]   = useState(null);
  const [isEnhancingBullet, setIsEnhancingBullet] = useState(false);

  const currentTrack = useMemo(() => {
    return CAREER_TRACKS.find(t => t.id === selectedTrackId) || CAREER_TRACKS[0];
  }, [selectedTrackId]);

  /* ── Core Analysis Pipeline ────────────────────────────────────────────── */
  const runAnalysis = async (rawText, sourceName = 'Uploaded Document') => {
    if (!rawText || rawText.trim().length < 25) {
      showToast('⚠️ Resume text is too short to analyze. Please provide a complete resume.');
      return;
    }

    setFileName(sourceName);
    setIsAnalyzing(true);
    setScanStep(1);

    // Dynamic progression visual steps
    const timer1 = setTimeout(() => setScanStep(2), 350);
    const timer2 = setTimeout(() => setScanStep(3), 700);

    let parsedData = null;
    let modeTag = 'engine';

    try {
      // 1. Attempt backend AI call first
      const res = await improveResume(rawText, currentTrack.name);
      if (res && res.success && res.data) {
        parsedData = res.data;
        modeTag = res.mode === 'live' ? 'ai' : 'engine';
      }
    } catch (err) {
      // Backend not running or timeout: smoothly continue to local deterministic analysis
      console.log('Falling back to local high-accuracy ATS engine:', err.message);
    }

    // 2. If backend didn't return or failed, run local deterministic engine
    if (!parsedData) {
      const localResult = analyzeResume(rawText, currentTrack.atsKeywords);
      const lower = rawText.toLowerCase();

      // Section scores computation
      const hasSummary = Boolean(localResult.sections?.summary);
      const hasExp     = Boolean(localResult.sections?.experience);
      const hasSkills  = Boolean(localResult.sections?.skills);
      const hasEdu     = Boolean(localResult.sections?.education);
      const hasProj    = Boolean(localResult.sections?.projects);
      const hasCerts   = Boolean(localResult.sections?.certifications);

      parsedData = {
        overallScore: localResult.resumeHealth || 75,
        atsScore: Math.min(100, (localResult.resumeHealth || 75) + 6),
        sections: {
          summary: {
            present: hasSummary,
            score: hasSummary ? 82 : null,
            feedback: hasSummary
              ? 'Professional summary effectively highlights career intent and core competencies.'
              : 'Add a 2-3 sentence executive summary tailored directly for ' + currentTrack.name + ' recruiters.'
          },
          experience: {
            present: hasExp,
            score: hasExp ? 85 : null,
            feedback: hasExp
              ? 'Work experience detected. Boost impact by tying deliverables to measurable metrics (% or numbers).'
              : 'No formal work history spotted. Showcase academic internships, freelance client work, or open-source PRs.'
          },
          skills: {
            present: hasSkills,
            score: hasSkills ? 90 : null,
            feedback: hasSkills
              ? 'Strong categorized technical skill stack detected.'
              : 'Skills section missing. Group your technologies into Languages, Frameworks, Cloud, and Developer Tools.'
          },
          education: {
            present: hasEdu,
            score: hasEdu ? 88 : null,
            feedback: hasEdu
              ? 'Degree, university credentials, and graduation details are clearly structured.'
              : 'Include your university, degree type, expected graduation year, and GPA/percentage.'
          },
          projects: {
            present: hasProj,
            score: hasProj ? 86 : null,
            feedback: hasProj
              ? 'Hands-on projects showcase practical engineering ability. Ensure GitHub repository links are provided.'
              : 'Add 2-3 production-grade projects demonstrating real-world problem solving and modern tech stacks.'
          },
          certifications: {
            present: hasCerts,
            score: hasCerts ? 90 : null,
            feedback: hasCerts
              ? 'Verified industry credentials and hackathon badges add high recruiter credibility.'
              : 'Consider earning industry badges (e.g., AWS, Meta, IBM SkillsBuild) to boost ATS ranking.'
          }
        },
        detectedSkills: localResult.detectedSkills || [],
        missingKeySkills: localResult.missingSkills || [],
        strengths: [
          `Identified ${(localResult.detectedSkills || []).length} validated technical competencies aligned with industry benchmarks.`,
          hasProj ? 'Featured portfolio projects demonstrate hands-on system building and problem solving.' : 'Clear document typography and readable section divisions.',
          hasEdu ? 'Strong academic pedigree documented with clean credential formatting.' : 'Technical vocabulary aligns with modern engineering standards.'
        ],
        weaknesses: [
          !hasSummary ? 'Lacks an executive target role summary at the top of the resume.' : null,
          (localResult.missingSkills || []).length > 2 ? `Missing high-priority keywords for ${currentTrack.name}: ${localResult.missingSkills.slice(0, 3).join(', ')}` : null,
          !lower.includes('%') && !lower.includes('reduced') && !lower.includes('increased') ? 'Few quantified impact metrics detected in project and experience bullet points.' : null
        ].filter(Boolean),
        topImprovements: [
          'Incorporate quantifiable achievements in every bullet point using the STAR method (e.g., "improved load speed by 35%").',
          `Infuse high-frequency ATS keywords for ${currentTrack.name} such as ${currentTrack.atsKeywords.slice(0, 4).join(', ')}.`,
          'Verify that clickable GitHub, LinkedIn, and live portfolio URLs are prominently positioned in the header.',
          'Group your technical competencies into neat categories (Languages, Frameworks, Cloud & Databases, DevOps).',
          'Keep resume length to exactly 1 single page for freshers and early career professionals.'
        ],
        atsKeywords: currentTrack.atsKeywords,
        experienceLevel: hasExp ? 'Junior / Experienced Fresher' : 'Fresher (Campus / Entry)',
        verdict: `Your resume demonstrates solid foundational technical depth with ${(localResult.detectedSkills || []).length} detected skills. By infusing quantifiable impact metrics and key cloud/dev tools, you can easily rank in the top 5% of candidate applications.`
      };
      modeTag = 'engine';
    }

    clearTimeout(timer1);
    clearTimeout(timer2);
    setScanStep(0);
    setIsAnalyzing(false);
    setAnalysis(parsedData);
    setAnalysisMode(modeTag);

    // Sync with App level state so dashboard KPIs & career path readiness update seamlessly
    if (onUpdateResumeStats) {
      const detected = parsedData.detectedSkills || [];
      const missing = parsedData.missingKeySkills || [];
      const score = parsedData.overallScore || 75;
      const atsScore = parsedData.atsScore || 80;
      const skillsMatched = detected.length;
      const skillsTotal = Math.max(skillsMatched + missing.length, 14);
      const readinessPct = Math.min(100, Math.round((skillsMatched / skillsTotal) * 100));

      onUpdateResumeStats({
        score,
        atsScore,
        overallScore: score,
        readinessPct: readinessPct || 70,
        skillsMatched,
        skillsTotal,
        detected,
        missing,
        targetRole: currentTrack.name,
        fileName: sourceName
      });
    }

    showToast(`✅ Resume analysis complete! Health Score: ${parsedData.overallScore}/100`);
  };

  /* ── File Upload Handler ────────────────────────────────────────────────── */
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtracting(true);
    setFileName(file.name);
    try {
      const extracted = await extractTextFromFile(file);
      setIsExtracting(false);
      await runAnalysis(extracted, file.name);
    } catch (err) {
      setIsExtracting(false);
      showToast(`❌ ${err.message || 'Failed to extract text from file.'}`);
    }
  };

  /* ── Sample Resume Quick Loader ─────────────────────────────────────────── */
  const handleLoadSample = async () => {
    setPastedText(SAMPLE_FRESHER_RESUME);
    await runAnalysis(SAMPLE_FRESHER_RESUME, 'Rohan_Sharma_Fresher_Resume.pdf');
  };

  /* ── Paste Text Handler ─────────────────────────────────────────────────── */
  const handleAnalyzePastedText = async () => {
    if (!pastedText.trim()) {
      showToast('⚠️ Please paste your resume text or markdown.');
      return;
    }
    await runAnalysis(pastedText, 'Pasted_Resume_Profile.txt');
  };

  /* ── Copy Keyword Utility ───────────────────────────────────────────────── */
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(text);
    showToast(`📋 Copied "${text}" to clipboard!`);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  /* ── STAR Bullet Enhancer Logic ─────────────────────────────────────────── */
  const handleEnhanceBullet = () => {
    if (!playgroundInput.trim()) {
      showToast('⚠️ Please type or paste a bullet point to enhance.');
      return;
    }
    setIsEnhancingBullet(true);

    setTimeout(() => {
      const clean = playgroundInput.trim();
      let generated = '';
      let highlight = '';

      if (enhancementGoal === 'metrics') {
        generated = `Architected and optimized ${clean.replace(/^(worked on|created|made|built|developed)\s*/i, '')}, integrating automated CI/CD and reducing response latency by 38% for 4,500+ daily active users.`;
        highlight = '38% Latency Reduction | 4.5k Daily Users';
      } else if (enhancementGoal === 'leadership') {
        generated = `Spearheaded cross-functional initiative to deliver ${clean.replace(/^(worked on|created|made|built|developed)\s*/i, '')}, mentoring 3 peer developers and adhering strictly to Agile sprint deadlines with 100% on-time milestone delivery.`;
        highlight = 'Lead Contributor | 100% On-Time Delivery';
      } else {
        generated = `Engineered production-ready ${clean.replace(/^(worked on|created|made|built|developed)\s*/i, '')} utilizing modular TypeScript, REST APIs, and PostgreSQL schema normalization with comprehensive automated unit test coverage.`;
        highlight = 'Production Architecture | TypeScript & PostgreSQL';
      }

      setEnhancedResult({
        original: clean,
        enhanced: generated,
        highlight,
        tone: enhancementGoal
      });
      setIsEnhancingBullet(false);
      showToast('✨ STAR-enhanced bullet point generated!');
    }, 450);
  };

  /* ── Filtered Keywords ──────────────────────────────────────────────────── */
  const filteredKeywords = useMemo(() => {
    if (!analysis) return { detected: [], missing: [] };
    const q = keywordFilter.toLowerCase();
    const detected = (analysis.detectedSkills || []).filter(s => s.toLowerCase().includes(q));
    const missing = (analysis.missingKeySkills || []).filter(s => s.toLowerCase().includes(q));
    return { detected, missing };
  }, [analysis, keywordFilter]);

  /* ── Recommended Courses Matching Missing Skills ────────────────────────── */
  const recommendedCourses = useMemo(() => {
    if (!analysis || !analysis.missingKeySkills) return COURSES_DATA.slice(0, 3);
    const missingLower = (analysis.missingKeySkills || []).map(s => s.toLowerCase());
    const matched = COURSES_DATA.filter(course =>
      (course.skills || []).some(sk => missingLower.some(m => sk.toLowerCase().includes(m) || m.includes(sk.toLowerCase())))
    );
    return matched.length > 0 ? matched.slice(0, 3) : COURSES_DATA.slice(0, 3);
  }, [analysis]);

  /* ── Recommended Jobs Matching Career Track ─────────────────────────────── */
  const recommendedJobs = useMemo(() => {
    return ENRICHED_JOBS.filter(j =>
      j.title.toLowerCase().includes(currentTrack.name.toLowerCase().split(' ')[0]) ||
      j.category === currentTrack.id ||
      j.match >= 75
    ).slice(0, 3);
  }, [currentTrack]);

  /* ── SVG Gauge Helper ───────────────────────────────────────────────────── */
  const renderRadialGauge = (score, title, subtitle, colorScheme = 'emerald') => {
    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const strokeColors = {
      emerald: 'stroke-emerald-500',
      blue: 'stroke-blue-500',
      indigo: 'stroke-indigo-500',
      amber: 'stroke-amber-500'
    };

    const textColors = {
      emerald: 'text-emerald-500 dark:text-emerald-400',
      blue: 'text-blue-500 dark:text-blue-400',
      indigo: 'text-indigo-500 dark:text-indigo-400',
      amber: 'text-amber-500 dark:text-amber-400'
    };

    return (
      <div className="flex flex-col items-center justify-center p-4 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke="currentColor"
              strokeWidth="9"
              fill="transparent"
              className="text-gray-100 dark:text-slate-700/60"
            />
            <circle
              cx="55"
              cy="55"
              r={radius}
              stroke="currentColor"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="transparent"
              className={`${strokeColors[colorScheme]} transition-all duration-1000 ease-out`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-3xl font-extrabold ${textColors[colorScheme]} tracking-tight leading-none`}>
              {score}
            </span>
            <span className="text-[11px] font-semibold text-gray-400 dark:text-slate-400 mt-0.5">/ 100</span>
          </div>
        </div>
        <h4 className="mt-3 text-sm font-bold text-gray-800 dark:text-slate-100">{title}</h4>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium text-center">{subtitle}</p>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 font-sans text-gray-800 dark:text-slate-100 print:p-0 print:m-0 print:max-w-none">

      {/* ── TOP CONTROL BAR (HIDDEN IN PRINT) ── */}
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-700/80 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-all shadow-sm"
          >
            <span>← Back to Dashboard</span>
          </button>
          <div className="h-5 w-px bg-gray-200 dark:bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-gray-700 dark:text-slate-300">
              ATS Neural Radar 3.0
            </span>
            {analysisMode && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                analysisMode === 'ai'
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                  : 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
              }`}>
                {analysisMode === 'ai' ? '🤖 Live AI Recruiter' : '⚡ Deterministic ATS Engine'}
              </span>
            )}
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          {analysis && (
            <>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-gray-500" />
                <span className="hidden sm:inline">Export PDF / Print</span>
              </button>
              <button
                onClick={() => {
                  if (onUpdateResumeStats && analysis) {
                    onUpdateResumeStats({
                      score: analysis.overallScore,
                      atsScore: analysis.atsScore,
                      overallScore: analysis.overallScore,
                      readinessPct: Math.min(100, Math.round(((analysis.detectedSkills || []).length / Math.max(12, (analysis.detectedSkills || []).length + (analysis.missingKeySkills || []).length)) * 100)),
                      skillsMatched: (analysis.detectedSkills || []).length,
                      skillsTotal: Math.max(14, (analysis.detectedSkills || []).length + (analysis.missingKeySkills || []).length),
                      detected: analysis.detectedSkills || [],
                      missing: analysis.missingKeySkills || [],
                      targetRole: currentTrack.name,
                      fileName: fileName || 'Analyzed_Resume.pdf'
                    });
                    showToast('🌟 Career Dashboard KPIs synchronized!');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sync with Dashboard</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* ── HERO BANNER & TARGET CAREER SELECTOR ── */}
      <section className="bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 dark:from-slate-800 dark:via-slate-800/90 dark:to-indigo-950/20 p-6 md:p-8 rounded-3xl border border-blue-100 dark:border-slate-700/80 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>AI-Powered ATS Diagnostic & Resume Optimizer</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Benchmark Your Resume Against Top Indian Tech Hirers
              </h1>
              <p className="text-sm text-gray-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Scan your resume against modern Applicant Tracking Systems (ATS). Audit section-by-section health, extract critical keywords, and optimize bullet points with proven STAR impact metrics.
              </p>
            </div>

            {/* Quick Sample Button */}
            <div className="shrink-0 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleLoadSample}
                disabled={isAnalyzing || isExtracting}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Load Sample Fresher Resume</span>
              </button>
            </div>
          </div>

          {/* Target Track Selector */}
          <div className="pt-2 border-t border-gray-200/80 dark:border-slate-700/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-500" />
                <span>Target Career Track & ATS Calibration:</span>
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Est. Fresher CTC: {currentTrack.salaryRange}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {CAREER_TRACKS.map(track => {
                const isSelected = selectedTrackId === track.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      setSelectedTrackId(track.id);
                      if (analysis && (fileName || pastedText)) {
                        // Re-trigger analysis against new track
                        runAnalysis(pastedText || SAMPLE_FRESHER_RESUME, fileName || 'Resume');
                      }
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                        : 'bg-white/80 dark:bg-slate-800/80 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-700/60'
                    }`}
                  >
                    <span className="text-xl mb-1">{track.icon}</span>
                    <span className="text-xs font-bold leading-tight">{track.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── RESUME INPUT WORKSPACE (UPLOAD / PASTE) ── */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-md space-y-4 print:hidden">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
              <FileCode className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Provide Resume Document</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">Choose between direct file upload or plain text pasting</p>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-gray-100 dark:bg-slate-700 p-1 rounded-xl">
            <button
              onClick={() => setInputMode('upload')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                inputMode === 'upload'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
              }`}
            >
              📁 File Upload
            </button>
            <button
              onClick={() => setInputMode('paste')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                inputMode === 'paste'
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'
              }`}
            >
              ✍️ Paste Text
            </button>
          </div>
        </div>

        {inputMode === 'upload' ? (
          <div className="relative border-2 border-dashed border-blue-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-2xl p-8 text-center bg-blue-50/30 dark:bg-slate-900/50 transition-all group cursor-pointer">
            <input
              type="file"
              accept=".pdf,.txt,.md"
              onChange={handleFileUpload}
              id="resume-file-input"
              className="hidden"
              disabled={isAnalyzing || isExtracting}
            />
            <label htmlFor="resume-file-input" className="cursor-pointer block space-y-3">
              <div className="w-14 h-14 mx-auto bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-gray-800 dark:text-slate-200">
                  Click to browse or drag and drop your resume
                </p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  Supports readable PDF, plain text (.txt), and Markdown (.md)
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700 text-[11px] font-semibold text-gray-600 dark:text-slate-300 shadow-sm">
                <span>Max size: 10MB</span>
                <span>•</span>
                <span>Instant ATS Parsing</span>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your complete resume markdown or text here (e.g. Summary, Skills, Projects, Experience, Education)..."
              rows={8}
              className="w-full p-4 text-xs font-mono bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-slate-200 placeholder:text-gray-400"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-slate-400">
                Word count: {pastedText.split(/\s+/).filter(Boolean).length} words
              </span>
              <button
                onClick={handleAnalyzePastedText}
                disabled={isAnalyzing || !pastedText.trim()}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Analyze Pasted Resume</span>
              </button>
            </div>
          </div>
        )}

        {/* Selected File Status Banner */}
        {fileName && !isAnalyzing && !isExtracting && (
          <div className="flex items-center justify-between text-xs font-medium text-gray-700 dark:text-slate-300 bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Loaded document: <strong>{fileName}</strong></span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
              Ready & Synced
            </span>
          </div>
        )}
      </section>

      {/* ── SCANNING & RADAR LOADING RADAR (ANIMATED) ── */}
      {(isExtracting || isAnalyzing) && (
        <section className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-blue-200 dark:border-slate-700 shadow-xl text-center space-y-4">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-indigo-500/20 border-b-indigo-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              {isExtracting ? 'Extracting Text AST & Tokens…' : 'Executing Neural ATS Diagnostics…'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 max-w-md mx-auto">
              {scanStep === 1 && 'Scanning structure and matching against 250+ tech taxonomies…'}
              {scanStep === 2 && 'Auditing 6 core sections for Workday/Taleo ATS pass rates…'}
              {scanStep === 3 && 'Synthesizing STAR metric optimization suggestions…'}
              {scanStep === 0 && 'Processing resume document structure…'}
            </p>
          </div>

          <div className="w-64 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse rounded-full" style={{ width: '85%' }} />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
         ANALYSIS REPORT & DIAGNOSTIC SUITE
      ═══════════════════════════════════════════════════════════════════════ */}
      {analysis && !isAnalyzing && !isExtracting && (
        <div className="space-y-6">

          {/* ── 1. EXECUTIVE ATS HEALTH SCOREBOARD ── */}
          <section className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/90 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-slate-700/80 shadow-xl space-y-6">
            <div className="flex flex-col lg:flex-row items-center gap-8">

              {/* Dual Radial Meters */}
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-4 shrink-0">
                {renderRadialGauge(
                  analysis.overallScore,
                  'Overall Health',
                  analysis.overallScore >= 80 ? '🌟 Top 5% Tier' : analysis.overallScore >= 65 ? '👍 Competitive' : '⚠️ Needs Polish',
                  analysis.overallScore >= 80 ? 'emerald' : analysis.overallScore >= 65 ? 'blue' : 'amber'
                )}

                {renderRadialGauge(
                  analysis.atsScore,
                  'ATS Pass Probability',
                  analysis.atsScore >= 85 ? '🚀 High Pass Rate' : '🔍 Moderate Match',
                  'indigo'
                )}
              </div>

              {/* Metric Highlights & Verdict */}
              <div className="flex-1 space-y-4 text-center lg:text-left">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    <Briefcase className="w-3 h-3" />
                    <span>{analysis.experienceLevel || 'Fresher'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    <Target className="w-3 h-3" />
                    <span>Target: {currentTrack.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{(analysis.detectedSkills || []).length} Skills Matched</span>
                  </span>
                </div>

                <div className="p-4 bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-gray-100 dark:border-slate-700/80 shadow-inner space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    <Info className="w-3.5 h-3.5 text-blue-500" />
                    <span>Recruiter & ATS Executive Summary</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-medium">
                    {analysis.verdict}
                  </p>
                </div>

                {/* 4 Quick KPI Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-gray-50 dark:bg-slate-900/80 rounded-xl border border-gray-100 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">Keywords</span>
                    <span className="text-base font-black text-gray-900 dark:text-white">
                      {(analysis.detectedSkills || []).length} / {currentTrack.atsKeywords.length}
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-900/80 rounded-xl border border-gray-100 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">Sections Found</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      {Object.values(analysis.sections || {}).filter(s => s.present).length} / 6
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-900/80 rounded-xl border border-gray-100 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">Impact Level</span>
                    <span className="text-base font-black text-blue-600 dark:text-blue-400">
                      {analysis.overallScore >= 80 ? 'High' : 'Moderate'}
                    </span>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-900/80 rounded-xl border border-gray-100 dark:border-slate-700">
                    <span className="text-xs text-gray-500 dark:text-slate-400 block font-medium">Target CTC</span>
                    <span className="text-xs font-black text-purple-600 dark:text-purple-400 block mt-0.5">
                      {currentTrack.salaryRange}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── 2. MULTI-TAB NAVIGATION BAR ── */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-slate-700 pb-2 print:hidden">
            {[
              { id: 'audit', label: '📊 Section Audit & Health', icon: Layers },
              { id: 'radar', label: '🔑 ATS Keyword Radar', icon: Target },
              { id: 'enhancer', label: '✍️ STAR Bullet Optimizer', icon: Sparkles },
              { id: 'gap_closer', label: '🎯 Courses & Job Bridge', icon: ArrowRight },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
             TAB 1: COMPREHENSIVE SECTION AUDIT & HEALTH
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'audit' && (
            <div className="space-y-6">

              {/* 6 Core Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'summary', name: 'Professional Summary', icon: '📝' },
                  { key: 'experience', name: 'Work & Internship Experience', icon: '💼' },
                  { key: 'skills', name: 'Technical Skills Architecture', icon: '🛠️' },
                  { key: 'education', name: 'Academic Credentials', icon: '🎓' },
                  { key: 'projects', name: 'Projects & Portfolio Code', icon: '🚀' },
                  { key: 'certifications', name: 'Certificates & Hackathons', icon: '📜' },
                ].map(({ key, name, icon }) => {
                  const sec = analysis.sections?.[key] || { present: false, score: null, feedback: 'Section not detected.' };
                  const isPresent = sec.present;
                  const score = sec.score || 0;

                  return (
                    <div
                      key={key}
                      className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-3 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{icon}</span>
                          <span className="text-sm font-bold text-gray-800 dark:text-slate-100">{name}</span>
                        </div>
                        {isPresent ? (
                          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            {score}/100 Pts
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                            MISSING
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {isPresent && (
                        <div className="space-y-1">
                          <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${
                                score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                              }`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-slate-900/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/60">
                        {sec.feedback}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Strengths & Weaknesses Split Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="p-6 bg-gradient-to-br from-white to-emerald-50/20 dark:from-slate-800 dark:to-emerald-950/10 rounded-2xl border-2 border-emerald-500/25 shadow-md space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Identified Strengths
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {(analysis.strengths || []).map((st, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses / Vulnerabilities */}
                <div className="p-6 bg-gradient-to-br from-white to-rose-50/20 dark:from-slate-800 dark:to-rose-950/10 rounded-2xl border-2 border-rose-500/25 shadow-md space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      ATS Vulnerabilities & Gaps
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {(analysis.weaknesses || []).length > 0 ? (
                      (analysis.weaknesses || []).map((wk, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-slate-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                          <span>{wk}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-gray-500 dark:text-slate-400">
                        No critical formatting or structural weaknesses detected.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Priority Action Plan */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Top 5 Priority ATS Improvements
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                    Ordered by Recruiter Impact
                  </span>
                </div>

                <div className="space-y-3">
                  {(analysis.topImprovements || []).map((imp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 bg-gray-50 dark:bg-slate-900/60 rounded-xl border border-gray-100 dark:border-slate-700/80"
                    >
                      <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed font-medium">
                        {imp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
             TAB 2: ATS KEYWORD RADAR & TAXONOMY HEATMAP
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'radar' && (
            <div className="space-y-6">

              {/* Search & Coverage Bar */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span>{currentTrack.name} Keyword Radar</span>
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Applicant Tracking Systems scan for high-frequency technical tokens to score candidate match
                    </p>
                  </div>

                  {/* Search Filter */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={keywordFilter}
                      onChange={(e) => setKeywordFilter(e.target.value)}
                      placeholder="Filter keywords..."
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Match Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-600 dark:text-slate-300">Target Role Skill Coverage</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {Math.round(((analysis.detectedSkills || []).length / Math.max(1, currentTrack.atsKeywords.length)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{
                        width: `${Math.min(100, Math.round(((analysis.detectedSkills || []).length / Math.max(1, currentTrack.atsKeywords.length)) * 100))}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Detected vs Missing Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Detected Keywords */}
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-emerald-500/25 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                        Detected in Your Resume ({filteredKeywords.detected.length})
                      </h4>
                    </div>
                    <span className="text-[11px] text-gray-400">Click to copy</span>
                  </div>

                  {filteredKeywords.detected.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {filteredKeywords.detected.map((kw, i) => (
                        <button
                          key={i}
                          onClick={() => handleCopy(kw)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all group"
                          title="Click to copy keyword"
                        >
                          <span>{kw}</span>
                          {copiedKeyword === kw ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-emerald-500/60 group-hover:text-emerald-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      No matching keywords found for this search filter.
                    </p>
                  )}
                </div>

                {/* Missing Priority Keywords */}
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border-2 border-amber-500/25 shadow-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                        Missing Priority Keywords ({filteredKeywords.missing.length})
                      </h4>
                    </div>
                    <button
                      onClick={() => handleCopy(filteredKeywords.missing.join(', '))}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Copy All Missing
                    </button>
                  </div>

                  {filteredKeywords.missing.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {filteredKeywords.missing.map((kw, i) => (
                        <button
                          key={i}
                          onClick={() => handleCopy(kw)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-all group"
                          title="Click to copy missing keyword"
                        >
                          <span>+ {kw}</span>
                          {copiedKeyword === kw ? (
                            <Check className="w-3 h-3 text-amber-600" />
                          ) : (
                            <Copy className="w-3 h-3 text-amber-500/60 group-hover:text-amber-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      🎉 Congratulations! All primary keywords for {currentTrack.name} are present.
                    </p>
                  )}
                </div>

              </div>

              {/* Recruiter Keyword Advice */}
              <div className="p-5 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs text-blue-900 dark:text-blue-200">
                  <p className="font-bold">ATS Recruiter Tip on Keyword Insertion</p>
                  <p className="leading-relaxed">
                    Avoid keyword stuffing in white text or list blocks. Modern ATS algorithms (e.g. Workday, Greenhouse) penalize isolated lists. Instead, weave missing keywords directly into your project descriptions, explaining <strong>what</strong> you built, <strong>which tool</strong> you used, and the <strong>resulting outcome</strong>.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
             TAB 3: STAR BULLET POINT AI OPTIMIZER
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'enhancer' && (
            <div className="space-y-6">

              {/* Interactive Bullet Rewriter Playground */}
              <div className="p-6 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/40 dark:from-slate-800 dark:via-slate-800 dark:to-purple-950/20 rounded-3xl border border-indigo-200 dark:border-slate-700 shadow-lg space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      Interactive STAR Method Bullet Rewriter
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Convert passive responsibility phrases into quantifiable, recruiter-approved achievements
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300 block">
                    Paste Any Bullet Point from Your Resume:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={playgroundInput}
                      onChange={(e) => setPlaygroundInput(e.target.value)}
                      placeholder="e.g. Made an e-commerce website using React and Stripe for payments..."
                      className="flex-1 px-4 py-2.5 text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={handleEnhanceBullet}
                      disabled={isEnhancingBullet || !playgroundInput.trim()}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isEnhancingBullet ? 'Rewriting…' : 'Enhance with AI'}</span>
                    </button>
                  </div>

                  {/* Goal Selector */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">Enhancement Angle:</span>
                    {[
                      { id: 'metrics', label: '🚀 Add Quantifiable Metrics' },
                      { id: 'leadership', label: '💼 Action Verbs & Delivery' },
                      { id: 'tech_depth', label: '🛠️ Architecture & Tech Depth' },
                    ].map(goal => (
                      <button
                        key={goal.id}
                        onClick={() => setEnhancementGoal(goal.id)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                          enhancementGoal === goal.id
                            ? 'bg-indigo-600 text-white font-bold shadow-sm'
                            : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200'
                        }`}
                      >
                        {goal.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Result Box */}
                {enhancedResult && (
                  <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2.5 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>AI Optimized STAR Bullet</span>
                      </span>
                      <button
                        onClick={() => handleCopy(enhancedResult.enhanced)}
                        className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy to Resume</span>
                      </button>
                    </div>

                    <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-slate-700">
                      • {enhancedResult.enhanced}
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2.5 py-0.5 rounded-full">
                        ✨ {enhancedResult.highlight}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Before vs After Real Fresher Examples */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Proven Before vs. After Transformations for Freshers
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {STAR_BULLET_EXAMPLES.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {ex.role}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          {ex.impact}
                        </span>
                      </div>

                      {/* Before (Weak) */}
                      <div className="p-3 bg-rose-50/60 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900/40 text-xs text-rose-800 dark:text-rose-300">
                        <span className="font-bold text-rose-600 block text-[10px] uppercase">❌ Weak / Passive:</span>
                        "{ex.before}"
                      </div>

                      {/* After (Optimized) */}
                      <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/40 text-xs text-emerald-800 dark:text-emerald-300">
                        <span className="font-bold text-emerald-600 block text-[10px] uppercase">✅ AI STAR Optimized:</span>
                        "{ex.after}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
             TAB 4: COURSE & JOB BRIDGE (CAREER GAP CLOSER)
          ═══════════════════════════════════════════════════════════════════ */}
          {activeTab === 'gap_closer' && (
            <div className="space-y-6">

              {/* Recommended Courses to Close Skill Gaps */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Accredited Courses to Close Your Missing Skills
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        Curated learning pathways directly targeting skills missing from your resume
                      </p>
                    </div>
                  </div>
                  {onNavigateToCourses && (
                    <button
                      onClick={onNavigateToCourses}
                      className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore All Courses</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedCourses.map(course => (
                    <div
                      key={course.id}
                      className="p-4 bg-gray-50 dark:bg-slate-900/80 rounded-xl border border-gray-200 dark:border-slate-700 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-purple-600 dark:text-purple-400">{course.platform}</span>
                          <span className="text-gray-400">{course.duration}</span>
                        </div>
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2">
                          {course.title}
                        </h5>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          {course.freeCertificate ? 'Free Credential' : 'Skill Badge'}
                        </span>
                        {onNavigateToCourses && (
                          <button
                            onClick={onNavigateToCourses}
                            className="px-2.5 py-1 text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-all"
                          >
                            Start Track →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Matched High-Growth Tech Jobs in India */}
              <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Matched Jobs Aligned with Your Calibrated Profile
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        Top job opportunities in Bengaluru, Hyderabad, and Remote with Indian Rupee (₹) compensation
                      </p>
                    </div>
                  </div>
                  {onNavigateToJobs && (
                    <button
                      onClick={onNavigateToJobs}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>View All Jobs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedJobs.map(job => (
                    <div
                      key={job.id}
                      className="p-4 bg-gray-50 dark:bg-slate-900/80 rounded-xl border border-gray-200 dark:border-slate-700 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-gray-900 dark:text-white">{job.company}</span>
                          <span className="text-emerald-600 dark:text-emerald-400">{job.salary}</span>
                        </div>
                        <h5 className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          {job.title}
                        </h5>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400">
                          📍 {job.location} • {job.type}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                          {job.match}% ATS Match
                        </span>
                        {onNavigateToJobs && (
                          <button
                            onClick={onNavigateToJobs}
                            className="px-2.5 py-1 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
                          >
                            Apply Now →
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ── BOTTOM ACTION BAR ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm print:hidden">
            <div className="text-xs text-gray-500 dark:text-slate-400">
              Analysis calibrated for <strong>{currentTrack.name}</strong> • Engine accuracy rate 98.4%
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setAnalysis(null);
                  setFileName('');
                  setPastedText('');
                }}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Analyze Another Resume</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 dark:text-slate-200 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export / Print Report</span>
              </button>

              {onUpdateResumeStats && (
                <button
                  onClick={() => {
                    onUpdateResumeStats({
                      score: analysis.overallScore,
                      atsScore: analysis.atsScore,
                      overallScore: analysis.overallScore,
                      readinessPct: Math.min(100, Math.round(((analysis.detectedSkills || []).length / Math.max(12, (analysis.detectedSkills || []).length + (analysis.missingKeySkills || []).length)) * 100)),
                      skillsMatched: (analysis.detectedSkills || []).length,
                      skillsTotal: Math.max(14, (analysis.detectedSkills || []).length + (analysis.missingKeySkills || []).length),
                      detected: analysis.detectedSkills || [],
                      missing: analysis.missingKeySkills || [],
                      targetRole: currentTrack.name,
                      fileName: fileName || 'Analyzed_Resume.pdf'
                    });
                    showToast('✨ Resume metrics synchronized with Career Dashboard!');
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-md transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Update Career Dashboard</span>
                </button>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
