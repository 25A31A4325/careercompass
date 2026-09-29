import React, { useState, useMemo } from 'react';
import {
  Search,
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  TrendingUp,
  Bookmark,
  Star,
  ExternalLink,
  Target,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Layers,
  GraduationCap,
  Copy,
  Check,
  FileText,
  Share2,
  Grid,
  Kanban
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   ENRICHED SMART JOB DATA ALIGNED WITH CAREERCOMPASS BENCHMARKS
═══════════════════════════════════════════════════════════════════════════ */
export const ENRICHED_JOBS = [
  {
    id: 1,
    title: 'React & Frontend Developer',
    company: 'Meta',
    companyLogo: '♾️',
    companyColor: 'text-blue-500',
    type: 'Remote',
    category: 'frontend',
    tier: 'junior',
    tierLabel: 'Junior / Associate',
    location: 'Menlo Park, CA (Remote)',
    salary: '₹22 – 32 LPA',
    salaryNum: 22,
    match: 92,
    posted: '1 day ago',
    skills: ['React', 'JavaScript', 'CSS', 'TypeScript', 'Jest'],
    matchedSkills: ['React', 'JavaScript', 'CSS'],
    missingGaps: ['TypeScript', 'Jest'],
    bridgeCourseId: 'ts-mastery',
    bridgeCourseTitle: 'TypeScript Mastery for Production',
    bridgeBoost: '+8% Match Boost',
    why: "Your verified React and JavaScript core align with Meta's high-traffic component standards. Adding TypeScript will elevate your match to 100%.",
    atsKeywords: ['React 19', 'Virtual DOM', 'Component Architecture', 'Custom Hooks', 'Jest Testing', 'TypeScript 5', 'Responsive Design'],
    description: 'Build responsive, scalable client-side features for Meta family of apps. Collaborate closely with product designers, implement state management patterns, and write robust unit tests.',
    responsibilities: [
      'Architect modular, accessible React user interfaces serving millions of daily active users.',
      'Optimize web performance, Core Web Vitals, and client-side rendering bottlenecks.',
      'Partner with cross-functional teams to translate Figma design systems into pixel-perfect components.'
    ],
    url: 'https://www.coursera.org/search?query=React+Developer'
  },
  {
    id: 2,
    title: 'Full Stack Software Engineer',
    company: 'Google',
    companyLogo: '🌐',
    companyColor: 'text-emerald-500',
    type: 'Hybrid',
    category: 'fullstack',
    tier: 'junior',
    tierLabel: 'Early Career L3',
    location: 'Mountain View, CA (Hybrid)',
    salary: '₹28 – 40 LPA',
    salaryNum: 28,
    match: 88,
    posted: '2 days ago',
    skills: ['Node.js', 'React', 'MongoDB', 'PostgreSQL', 'Docker'],
    matchedSkills: ['Node.js', 'React', 'MongoDB'],
    missingGaps: ['Docker', 'PostgreSQL'],
    bridgeCourseId: 'docker-k8s',
    bridgeCourseTitle: 'Docker & Kubernetes Cloud Native',
    bridgeBoost: '+10% Match Boost',
    why: "Your strong full-stack foundation in Node.js and React satisfies the primary tech stack requirements. Containerizing your apps with Docker closes the remaining gap.",
    atsKeywords: ['Full Stack', 'RESTful API', 'Node.js Runtime', 'Express', 'React', 'Docker Containerization', 'PostgreSQL Indexing'],
    description: 'Join Google core product engineering. Design and build robust web microservices and client interfaces powering Google Cloud developer tooling.',
    responsibilities: [
      'Design clean, RESTful and gRPC API endpoints with robust error handling.',
      'Develop reactive frontends with modern React and TypeScript tooling.',
      'Deploy containerized services across Kubernetes clusters with automated CI/CD.'
    ],
    url: 'https://www.coursera.org/search?query=Full+Stack+Engineer'
  },
  {
    id: 3,
    title: 'Front-End Web Developer',
    company: 'IBM',
    companyLogo: '💻',
    companyColor: 'text-blue-600',
    type: 'Remote',
    category: 'frontend',
    tier: 'junior',
    tierLabel: 'Associate Developer',
    location: 'Armonk, NY (Remote)',
    salary: '₹14 – 22 LPA',
    salaryNum: 14,
    match: 86,
    posted: '3 days ago',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Accessibility'],
    matchedSkills: ['HTML5', 'CSS3', 'JavaScript'],
    missingGaps: ['Tailwind CSS', 'WCAG Accessibility'],
    bridgeCourseId: 'fullstack-web',
    bridgeCourseTitle: 'IBM SkillsBuild Full Stack Web',
    bridgeBoost: '+12% Match Boost',
    why: "Your core front-end skills align closely with IBM's open developer roles. IBM SkillsBuild credentials directly accelerate this application.",
    atsKeywords: ['Semantic HTML5', 'WCAG Accessibility', 'Modern CSS', 'Tailwind', 'Cross-Browser Compatibility', 'Carbon Design System'],
    description: 'Help engineer enterprise design systems and web experiences using the IBM Carbon Design System, React components, and accessible standards.',
    responsibilities: [
      'Build reusable components adhering strictly to IBM Carbon accessibility standards.',
      'Ensure high visual fidelity and responsiveness across diverse enterprise browsers.',
      'Participate in agile sprints, peer code reviews, and automated end-to-end testing.'
    ],
    url: 'https://www.coursera.org/search?query=Front+End+Developer'
  },
  {
    id: 4,
    title: 'Data Scientist & AI Specialist',
    company: 'IBM watsonx',
    companyLogo: '🤖',
    companyColor: 'text-purple-600',
    type: 'Hybrid',
    category: 'aiml',
    tier: 'junior',
    tierLabel: 'Entry-Level Data Scientist',
    location: 'Austin, TX (Hybrid)',
    salary: '₹18 – 28 LPA',
    salaryNum: 18,
    match: 82,
    posted: 'Just now',
    skills: ['Python', 'SQL', 'Machine Learning', 'Pandas', 'watsonx'],
    matchedSkills: ['Python', 'SQL', 'Pandas'],
    missingGaps: ['Machine Learning', 'watsonx'],
    bridgeCourseId: 'ml-fund',
    bridgeCourseTitle: 'IBM SkillsBuild Machine Learning Fundamentals',
    bridgeBoost: '+14% Match Boost',
    why: "Your Python and relational data skills provide a solid foundation. Completing IBM's verified ML certification qualifies you directly for interview screening.",
    atsKeywords: ['Python 3', 'Pandas', 'NumPy', 'Supervised Learning', 'Exploratory Data Analysis', 'SQL Query Optimization', 'Model Evaluation'],
    description: 'Work with the IBM watsonx team to build predictive models, extract insights from multi-modal datasets, and deploy machine learning pipelines.',
    responsibilities: [
      'Conduct exploratory data analysis (EDA) across structured enterprise relational databases.',
      'Train, validate, and benchmark scikit-learn and deep learning classification models.',
      'Communicate data-driven findings clearly to stakeholders with interactive dashboards.'
    ],
    url: 'https://www.coursera.org/search?query=Data+Scientist'
  },
  {
    id: 5,
    title: 'Machine Learning Engineer',
    company: 'DeepLearning.AI',
    companyLogo: '🧠',
    companyColor: 'text-purple-500',
    type: 'Remote',
    category: 'aiml',
    tier: 'junior',
    tierLabel: 'Junior ML Engineer',
    location: 'Remote, Global',
    salary: '₹25 – 38 LPA',
    salaryNum: 25,
    match: 75,
    posted: '4 days ago',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'Vector DBs'],
    matchedSkills: ['Python', 'Machine Learning'],
    missingGaps: ['PyTorch', 'Vector DBs', 'LLMs'],
    bridgeCourseId: 'genai-llm',
    bridgeCourseTitle: 'Generative AI & LLM Application Engineering',
    bridgeBoost: '+15% Match Boost',
    why: "Your Python fundamentals partially align. Upgrading to PyTorch and Generative AI RAG architectures transforms this into a high-probability placement.",
    atsKeywords: ['PyTorch', 'Deep Learning', 'Generative AI', 'Vector Embeddings', 'RAG Pipelines', 'FastAPI Model Serving', 'LangChain'],
    description: 'Build state-of-the-art Generative AI educational tools, evaluate RAG architectures, and fine-tune transformer models for applied educational experiences.',
    responsibilities: [
      'Implement semantic search pipelines using vector databases (Pinecone, ChromaDB).',
      'Benchmark LLM reasoning capabilities with automated evaluation harnesses.',
      'Package PyTorch models into high-throughput asynchronous FastAPI microservices.'
    ],
    url: 'https://www.coursera.org/search?query=Machine+Learning+Engineer'
  },
  {
    id: 6,
    title: 'Cloud & Infrastructure Engineer',
    company: 'Google Cloud',
    companyLogo: '☁️',
    companyColor: 'text-blue-500',
    type: 'Remote',
    category: 'cloud',
    tier: 'junior',
    tierLabel: 'Cloud Associate',
    location: 'Seattle, WA (Remote)',
    salary: '₹20 – 34 LPA',
    salaryNum: 20,
    match: 80,
    posted: '3 days ago',
    skills: ['Linux', 'Networking', 'Docker', 'Kubernetes', 'GCP'],
    matchedSkills: ['Linux', 'Networking'],
    missingGaps: ['Docker', 'Kubernetes', 'GCP'],
    bridgeCourseId: 'docker-k8s',
    bridgeCourseTitle: 'IBM SkillsBuild Docker & Kubernetes',
    bridgeBoost: '+13% Match Boost',
    why: "Your Linux command line and networking background match the prerequisites. Adding container orchestration skills brings you to the top quartile of candidates.",
    atsKeywords: ['GCP Cloud', 'Docker Containers', 'Kubernetes Pods', 'Terraform IaC', 'Linux CLI', 'TCP/IP Networking', 'CI/CD Pipelines'],
    description: 'Support enterprise customers migrating mission-critical applications to Google Cloud Platform. Maintain high availability and automated infrastructure.',
    responsibilities: [
      'Write infrastructure-as-code manifests with Terraform and Kubernetes YAML.',
      'Troubleshoot cloud networking issues, VPC routing, and load balancer configurations.',
      'Build automated CI/CD deployment pipelines using Google Cloud Build.'
    ],
    url: 'https://www.coursera.org/search?query=Cloud+Engineer'
  },
  {
    id: 7,
    title: 'Cybersecurity SOC Analyst',
    company: 'IBM Security',
    companyLogo: '🛡️',
    companyColor: 'text-rose-600',
    type: 'Remote',
    category: 'cybersec',
    tier: 'junior',
    tierLabel: 'Tier-1 SOC Analyst',
    location: 'Cambridge, MA (Remote)',
    salary: '₹12 – 18 LPA',
    salaryNum: 12,
    match: 71,
    posted: '5 days ago',
    skills: ['Linux CLI', 'TCP/IP Networking', 'SIEM', 'Wireshark', 'Threat Hunting'],
    matchedSkills: ['Linux CLI', 'TCP/IP Networking'],
    missingGaps: ['SIEM', 'Wireshark', 'Threat Hunting'],
    bridgeCourseId: 'cybersec-ess',
    bridgeCourseTitle: 'IBM Cybersecurity Operations & Threat Defense',
    bridgeBoost: '+14% Match Boost',
    why: "Foundational networking and Linux skills verified. Mastering SIEM alert triage and packet inspection unlocks entry-level SOC tier-1 placement.",
    atsKeywords: ['SIEM Alert Triage', 'Splunk SPL', 'Wireshark Packet Analysis', 'NIST Framework', 'OWASP Top 10', 'Incident Response Playbooks'],
    description: 'Monitor, detect, and analyze cyber threats in real-time within IBM Security Operations Centers. Triage security alerts and coordinate incident response.',
    responsibilities: [
      'Investigate security event alerts generated by SIEM and endpoint detection tooling.',
      'Perform initial packet capture analysis using Wireshark to isolate malicious indicators.',
      'Author structured incident reports documenting timeline, impact, and remediation steps.'
    ],
    url: 'https://www.coursera.org/search?query=Cybersecurity+Analyst'
  },
  {
    id: 8,
    title: 'DevOps & Automation Engineer',
    company: 'Amazon Web Services',
    companyLogo: '📦',
    companyColor: 'text-amber-500',
    type: 'Hybrid',
    category: 'cloud',
    tier: 'junior',
    tierLabel: 'Associate DevOps',
    location: 'Arlington, VA (Hybrid)',
    salary: '₹24 – 36 LPA',
    salaryNum: 24,
    match: 78,
    posted: '1 day ago',
    skills: ['Docker', 'CI/CD Pipelines', 'AWS', 'Python', 'Terraform'],
    matchedSkills: ['Python', 'Docker'],
    missingGaps: ['CI/CD Pipelines', 'AWS', 'Terraform'],
    bridgeCourseId: 'docker-k8s',
    bridgeCourseTitle: 'Docker & Kubernetes Cloud Native',
    bridgeBoost: '+11% Match Boost',
    why: "Your scripting and container fundamentals align well. Adding infrastructure-as-code and CI/CD pipelines makes you a prime candidate for AWS.",
    atsKeywords: ['AWS Cloud', 'Docker Compose', 'GitHub Actions', 'Terraform', 'Python Scripting', 'Monitoring & Alarming', 'GitOps'],
    description: 'Maintain and scale AWS deployment automation systems. Build continuous integration workflows that enable rapid, zero-downtime releases.',
    responsibilities: [
      'Construct automated CI/CD pipelines utilizing GitHub Actions and AWS CodePipeline.',
      'Manage containerized microservices and automated cloud infrastructure.',
      'Implement observability metrics, alarms, and automatic scaling rules.'
    ],
    url: 'https://www.coursera.org/search?query=DevOps+Engineer'
  },
  {
    id: 9,
    title: 'Software Engineering Intern',
    company: 'Stripe',
    companyLogo: '💳',
    companyColor: 'text-indigo-500',
    type: 'Remote',
    category: 'fullstack',
    tier: 'internship',
    tierLabel: 'Paid Summer Internship',
    location: 'San Francisco, CA (Remote)',
    salary: '₹1,00,000/mo (₹12 LPA stipend)',
    salaryNum: 12,
    match: 94,
    posted: 'Just now',
    skills: ['JavaScript', 'React', 'REST APIs', 'Git', 'Problem Solving'],
    matchedSkills: ['JavaScript', 'React', 'REST APIs', 'Git'],
    missingGaps: ['Unit Testing'],
    bridgeCourseId: 'fullstack-web',
    bridgeCourseTitle: 'Full Stack Web Development',
    bridgeBoost: '+6% Match Boost',
    why: "Exceptional alignment with Stripe's student internship qualifications. Your core JavaScript and API skills put you directly into the top candidate tier.",
    atsKeywords: ['Data Structures', 'REST APIs', 'React', 'JavaScript ES6+', 'Git Workflow', 'Unit Testing', 'Clean Architecture'],
    description: 'Work alongside senior Stripe software engineers on financial infrastructure and merchant developer APIs. Complete a signature summer capstone.',
    responsibilities: [
      'Write clean, robust code for Stripe developer dashboard and customer billing APIs.',
      'Participate in team agile rituals, design document discussions, and pair programming.',
      'Ship production features to millions of global merchants during your 12-week internship.'
    ],
    url: 'https://www.coursera.org/search?query=Full+Stack+Engineer'
  },
  {
    id: 10,
    title: 'IBM Tech Apprenticeship: Cloud & Web',
    company: 'IBM',
    companyLogo: '💻',
    companyColor: 'text-blue-600',
    type: 'On-site',
    category: 'fullstack',
    tier: 'apprenticeship',
    tierLabel: 'Registered Apprenticeship',
    location: 'Raleigh, NC (On-site)',
    salary: '₹8 – 12 LPA',
    salaryNum: 8,
    match: 96,
    posted: '2 days ago',
    skills: ['HTML5', 'CSS', 'JavaScript', 'Growth Mindset', 'Team Collaboration'],
    matchedSkills: ['HTML5', 'CSS', 'JavaScript'],
    missingGaps: ['Cloud Fundamentals'],
    bridgeCourseId: 'fullstack-web',
    bridgeCourseTitle: 'IBM SkillsBuild Verified Track',
    bridgeBoost: '+4% Match Boost',
    why: "Perfect fit for IBM's official Apprenticeship program. No 4-year degree required; IBM specifically values candidates enrolled in IBM SkillsBuild.",
    atsKeywords: ['Apprenticeship', 'Web Development', 'JavaScript', 'Cloud Native', 'Continuous Learning', 'Pair Programming', 'IBM SkillsBuild'],
    description: 'A paid, full-time registered apprenticeship providing hands-on software development training, dedicated IBM mentorship, and a clear path to full-time career placement.',
    responsibilities: [
      'Complete intensive paid on-the-job training in enterprise cloud software engineering.',
      'Work with a dedicated senior IBM mentor to build real client web applications.',
      'Earn verified Department of Labor and IBM accredited professional credentials.'
    ],
    url: 'https://skillsbuild.org'
  },
  {
    id: 11,
    title: 'Junior Database & SQL Developer',
    company: 'IBM Data & AI',
    companyLogo: '📊',
    companyColor: 'text-teal-600',
    type: 'Hybrid',
    category: 'data',
    tier: 'junior',
    tierLabel: 'Junior Associate',
    location: 'San Jose, CA (Hybrid)',
    salary: '₹10 – 16 LPA',
    salaryNum: 10,
    match: 84,
    posted: '3 days ago',
    skills: ['SQL', 'PostgreSQL', 'Data Modeling', 'Python', 'ETL Pipelines'],
    matchedSkills: ['SQL', 'Python'],
    missingGaps: ['Data Modeling', 'PostgreSQL'],
    bridgeCourseId: 'data-sql',
    bridgeCourseTitle: 'IBM Modern SQL & Relational Engineering',
    bridgeBoost: '+11% Match Boost',
    why: "Your SQL querying and Python skills match foundational needs. Taking the IBM Data Engineering course validates your relational schema design competency.",
    atsKeywords: ['SQL Optimization', 'PostgreSQL', 'Relational Schemas', 'ETL Data Pipelines', 'Window Functions', 'ACID Transactions'],
    description: 'Design and optimize relational database schemas, write high-performance analytical queries, and maintain data pipelines powering enterprise applications.',
    responsibilities: [
      'Write optimized SQL queries, indexes, and stored procedures for data-intensive web apps.',
      'Design clean normalized relational schemas and document entity relationships (ERDs).',
      'Automate data transformation scripts with Python and PostgreSQL.'
    ],
    url: 'https://www.coursera.org/search?query=Data+Analyst'
  },
  {
    id: 12,
    title: 'Cloud & IT Systems Specialist',
    company: 'Google',
    companyLogo: '🌐',
    companyColor: 'text-emerald-500',
    type: 'Remote',
    category: 'cloud',
    tier: 'junior',
    tierLabel: 'Entry-Level Associate',
    location: 'Chicago, IL (Remote)',
    salary: '₹7 – 11 LPA',
    salaryNum: 7,
    match: 69,
    posted: '6 days ago',
    skills: ['Networking', 'Troubleshooting', 'Linux', 'Customer Focus'],
    matchedSkills: ['Networking', 'Linux'],
    missingGaps: ['Enterprise IT Troubleshooting'],
    bridgeCourseId: 'docker-k8s',
    bridgeCourseTitle: 'Cloud Native Containers',
    bridgeBoost: '+9% Match Boost',
    why: "Solid foundational entry-level role. Linux and networking fundamentals match Google's IT support and data center engineering requirements.",
    atsKeywords: ['Linux Administration', 'Network Protocols', 'Hardware Troubleshooting', 'Customer Service', 'Shell Scripting'],
    description: 'Provide technical support and infrastructure diagnostics for Google enterprise systems, network operations, and internal client workstations.',
    responsibilities: [
      'Diagnose and remediate network connectivity, DNS, and operating system issues.',
      'Automate repetitive system configuration tasks with bash and Python scripts.',
      'Maintain reliable service uptime across remote user endpoints.'
    ],
    url: 'https://www.coursera.org/search?query=IT+Support+Specialist'
  }
];

export default function JobsPage({
  onBack,
  resumeStats = null,
  userName = 'Alex Morgan',
  savedJobs = [],
  setSavedJobs,
  showToast,
  onNavigateToCourses
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'matrix' | 'kanban'
  const [searchQuery, setSearchQuery] = useState('');
  const [workTypeFilter, setWorkTypeFilter] = useState('all'); // 'all' | 'Remote' | 'Hybrid' | 'On-site'
  const [tierFilter, setTierFilter] = useState('all'); // 'all' | 'junior' | 'internship' | 'apprenticeship'
  const [matchThreshold, setMatchThreshold] = useState('all'); // 'all' | 'high' (>=85) | 'mid' (>=75)
  const [sortBy, setSortBy] = useState('match'); // 'match' | 'salary' | 'company'

  // Application Pipeline stages for Kanban tracking: { [jobId]: 'saved' | 'tailoring' | 'applied' }
  const [pipelineStages, setPipelineStages] = useState(() => {
    try {
      const stored = localStorage.getItem('cc_job_pipeline');
      return stored ? JSON.parse(stored) : { 1: 'saved', 9: 'tailoring', 10: 'applied' };
    } catch {
      return { 1: 'saved', 9: 'tailoring', 10: 'applied' };
    }
  });

  // Modal States
  const [selectedJobModal, setSelectedJobModal] = useState(null);
  const [atsAssistantJob, setAtsAssistantJob] = useState(null);
  const [copiedKeyword, setCopiedKeyword] = useState(false);

  // Bookmark toggle
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    if (setSavedJobs) {
      setSavedJobs(prev => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter(x => x !== id) : [...prev, id];
        if (showToast) {
          showToast(
            exists ? 'Removed job from bookmarks.' : 'Job saved to your opportunity watchlist! ★',
            'info',
            exists ? '🗑️' : '⭐'
          );
        }
        return next;
      });
    }
  };

  // Move job in pipeline
  const updatePipelineStage = (jobId, stage, e) => {
    if (e) e.stopPropagation();
    setPipelineStages(prev => {
      const next = { ...prev, [jobId]: stage };
      try {
        localStorage.setItem('cc_job_pipeline', JSON.stringify(next));
      } catch {}
      if (showToast) {
        const stageLabels = {
          saved: 'Added to Watchlist ⭐',
          tailoring: 'Moved to Resume Tailoring 📝',
          applied: 'Marked as Applied & Interviewing 🚀'
        };
        showToast(stageLabels[stage] || 'Pipeline updated!', 'success', '💼');
      }
      return next;
    });
  };

  // Dynamic Metrics
  const metrics = useMemo(() => {
    const total = ENRICHED_JOBS.length;
    const highFitCount = ENRICHED_JOBS.filter(j => j.match >= 85).length;
    const avgSalary = (
      ENRICHED_JOBS.reduce((acc, curr) => acc + curr.salaryNum, 0) / total
    ).toFixed(1);
    const savedCount = savedJobs.length;
    return { total, highFitCount, avgSalary, savedCount };
  }, [savedJobs]);

  // Filtered and Sorted Jobs
  const filteredJobs = useMemo(() => {
    return ENRICHED_JOBS.filter(job => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = job.title.toLowerCase().includes(q);
        const inCompany = job.company.toLowerCase().includes(q);
        const inSkills = job.skills.some(s => s.toLowerCase().includes(q));
        const inWhy = job.why.toLowerCase().includes(q);
        if (!inTitle && !inCompany && !inSkills && !inWhy) return false;
      }

      // Work Type
      if (workTypeFilter !== 'all' && job.type !== workTypeFilter) return false;

      // Tier (Junior, Internship, Apprenticeship)
      if (tierFilter !== 'all' && job.tier !== tierFilter) return false;

      // Match Threshold
      if (matchThreshold === 'high' && job.match < 85) return false;
      if (matchThreshold === 'mid' && job.match < 75) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') return b.match - a.match;
      if (sortBy === 'salary') return b.salaryNum - a.salaryNum;
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });
  }, [searchQuery, workTypeFilter, tierFilter, matchThreshold, sortBy]);

  // Match Badge Color Helper
  const matchColorClasses = (m) => {
    if (m >= 85) return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/15 border-emerald-500/40',
      ring: 'stroke-emerald-500',
      label: 'Interview Ready'
    };
    if (m >= 75) return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/15 border-amber-500/40',
      ring: 'stroke-amber-500',
      label: 'High Match'
    };
    return {
      text: 'text-rose-400',
      bg: 'bg-rose-500/15 border-rose-500/40',
      ring: 'stroke-rose-500',
      label: 'Bridge 1-2 Gaps'
    };
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* ══════════════════════════════════════════════════════════════════════
          HERO & LIVE PLACEMENT DIAGNOSTIC HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-white">
        {/* Ambient background glow orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-2xl shadow-lg shadow-rose-500/20">
                💼
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Smart Job Matching &amp; Placement
                  </h1>
                  <span className="bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-rose-400" />
                    AI ATS Match Radar
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Tech job openings ranked by verified skill compatibility with your resume. Inspect matching strengths, identify missing gaps, and take 1-click bridge courses to maximize your interview callback rate.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => {
                setMatchThreshold('high');
                setWorkTypeFilter('all');
                setTierFilter('all');
                if (showToast) showToast('Filtered for high-fit roles (≥85% match)!', 'success', '🎯');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
              title="Filter for highest probability roles"
            >
              <Target className="w-3.5 h-3.5 text-rose-400" />
              <span>Highest Match (≥85%)</span>
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 flex items-center gap-1.5"
              >
                <span>← Dashboard</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Placement Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: Verified Opportunities */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Total Opportunities</span>
              <Briefcase className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{metrics.total}</span>
              <span className="text-xs text-slate-400 font-medium">verified roles</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Google, Meta, IBM, AWS &amp; startups</p>
          </div>

          {/* Card 2: High-Fit Positions */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Interview Ready (≥85%)</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400">{metrics.highFitCount}</span>
              <span className="text-xs text-slate-400 font-medium">roles ready</span>
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" />
              Highest ATS callback probability
            </p>
          </div>

          {/* Card 3: Avg Salary */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Avg Target Salary</span>
              <IndianRupee className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-400">₹{metrics.avgSalary} LPA</span>
              <span className="text-xs text-slate-400 font-medium">annual benchmark</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Based on current technical verified skills</p>
          </div>

          {/* Card 4: Saved in Pipeline */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Application Pipeline</span>
              <Bookmark className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-rose-400">{savedJobs.length}</span>
              <span className="text-xs text-slate-400 font-medium">bookmarked</span>
            </div>
            <p className="text-[11px] text-rose-400/80 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Active tracked job applications
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTROLS, SEARCH, VIEW-MODE SWITCHER & TABS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        {/* Row 1: Search + View Switcher + Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by job title, company (Meta, IBM), or skill..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right tools: View Mode Switcher + Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="3D Match Cards"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>3D Grid</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="Skill-Gap Upskill Matrix"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Gap Matrix</span>
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="Application Kanban Pipeline"
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Pipeline</span>
              </button>
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-rose-500"
            >
              <option value="match">Sort: Match % (Highest)</option>
              <option value="salary">Sort: Compensation</option>
              <option value="company">Sort: Company Name</option>
            </select>
          </div>
        </div>

        {/* Row 2: Work Type Pills + Opportunity Tier Pills */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-wrap">
          {/* Work Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Type:</span>
            {[
              { id: 'all', label: 'All Types' },
              { id: 'Remote', label: 'Remote 🌍' },
              { id: 'Hybrid', label: 'Hybrid 🏢' },
              { id: 'On-site', label: 'On-site 📍' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setWorkTypeFilter(type.id)}
                className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                  workTypeFilter === type.id
                    ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Opportunity Tier Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tier:</span>
            {[
              { id: 'all', label: 'All Tiers' },
              { id: 'junior', label: 'Junior / Associate' },
              { id: 'internship', label: 'Internships 🎓' },
              { id: 'apprenticeship', label: 'Apprenticeships ⚡' }
            ].map(tier => (
              <button
                key={tier.id}
                onClick={() => setTierFilter(tier.id)}
                className={`px-3 py-1 rounded-full font-medium whitespace-nowrap transition-all ${
                  tierFilter === tier.id
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 1: INNOVATIVE 3D GRID VIEW
      ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === 'grid' && (
        <div>
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-4">
              <span className="text-5xl">🔍</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No matching opportunities found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try loosening your search filters or resetting work type preferences.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setWorkTypeFilter('all');
                  setTierFilter('all');
                  setMatchThreshold('all');
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition-all shadow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredJobs.map(job => {
                const isSaved = savedJobs.includes(job.id);
                const colorInfo = matchColorClasses(job.match);

                return (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-rose-500/60 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl relative overflow-hidden group card-glow-rose hover-glow-rose"
                  >
                    <div>
                      {/* Top Header: Company Branding + Match Gauge + Bookmark */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl shadow-sm">
                            {job.companyLogo}
                          </span>
                          <div>
                            <span className="text-xs font-black text-slate-900 dark:text-slate-100 block">
                              {job.company}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {job.location}
                            </span>
                          </div>
                        </div>

                        {/* Match Gauge */}
                        <div className="flex items-center gap-2">
                          <div className={`px-2.5 py-1 rounded-full border text-xs font-black flex items-center gap-1 shadow-sm ${colorInfo.bg} ${colorInfo.text}`}>
                            <span>{job.match}%</span>
                            <span className="text-[10px] font-normal text-slate-400">Match</span>
                          </div>

                          {/* Bookmark */}
                          <button
                            onClick={e => toggleBookmark(job.id, e)}
                            className={`p-1.5 rounded-xl border transition-all ${
                              isSaved
                                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-500'
                                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                            }`}
                            title={isSaved ? 'Remove bookmark' : 'Bookmark this opportunity'}
                          >
                            <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {/* Job Title & Compensation */}
                      <h3
                        onClick={() => setSelectedJobModal(job)}
                        className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors cursor-pointer leading-snug"
                      >
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
                          💰 {job.salary}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {job.tierLabel}
                        </span>
                      </div>

                      {/* Skills Matrix: Matched vs Missing Gaps */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                        {/* Matched Skills */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            Matched:
                          </span>
                          {job.matchedSkills.map(s => (
                            <span key={s} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 text-[10px] font-medium">
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Missing Gaps */}
                        {job.missingGaps.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 flex items-center gap-0.5">
                              <AlertCircle className="w-3 h-3" />
                              Missing Gaps:
                            </span>
                            {job.missingGaps.map(g => (
                              <span key={g} className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80 text-[10px] font-medium">
                                {g}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bridge Course Recommendation Banner */}
                      {job.bridgeCourseTitle && (
                        <div className="mt-3 p-2.5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800/80 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-blue-500 shrink-0" />
                            <div className="leading-tight">
                              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                                Recommended Upskilling Track
                              </span>
                              <span className="font-extrabold text-blue-700 dark:text-blue-300 text-xs">
                                {job.bridgeCourseTitle}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-300 shrink-0">
                            {job.bridgeBoost}
                          </span>
                        </div>
                      )}

                      {/* Match Rationale */}
                      <div className="mt-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span className="font-bold text-rose-600 dark:text-rose-400">✨ Match Insight: </span>
                        {job.why}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      {/* ATS Keyword Assistant Button */}
                      <button
                        onClick={() => setAtsAssistantJob(job)}
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-all"
                        title="Tailor Resume for this Job (ATS Keywords)"
                      >
                        <FileText className="w-4 h-4 text-blue-500" />
                      </button>

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedJobModal(job)}
                        className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all"
                      >
                        Inspect
                      </button>

                      {/* Apply Now */}
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-500/20 text-center transition-all flex items-center justify-center gap-1.5 shimmer-btn"
                      >
                        <span>Apply on Platform</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 2: SKILL-GAP UPSKILL MATRIX VIEW
      ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === 'matrix' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Layers className="w-5 h-5 text-rose-500" />
                Skill Gap &amp; Course Bridge Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Inspect which specific missing skills prevent 90%+ match and which course unlocks placement.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              Direct Learning Bridge
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Role &amp; Company</th>
                  <th className="py-3 px-3">Match</th>
                  <th className="py-3 px-3">Missing Skills</th>
                  <th className="py-3 px-3">Recommended Bridge Track</th>
                  <th className="py-3 px-3">Upskill Boost</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredJobs.map(job => {
                  const colorInfo = matchColorClasses(job.match);
                  return (
                    <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                          {job.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {job.company} · {job.type}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full border font-bold text-xs ${colorInfo.bg} ${colorInfo.text}`}>
                          {job.match}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {job.missingGaps.length > 0 ? (
                            job.missingGaps.map(g => (
                              <span key={g} className="px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px]">
                                {g}
                              </span>
                            ))
                          ) : (
                            <span className="text-emerald-500 font-medium">None (Full Fit)</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {job.bridgeCourseTitle}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 text-[10px]">
                          {job.bridgeBoost}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button
                          onClick={() => {
                            if (onNavigateToCourses) {
                              onNavigateToCourses();
                            } else {
                              setSelectedJobModal(job);
                            }
                          }}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-[11px] shadow transition-all"
                        >
                          Enroll Track →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 3: APPLICATION KANBAN PIPELINE
      ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'saved', label: '1. Watchlist & Saved', icon: '⭐', color: 'border-blue-500' },
            { id: 'tailoring', label: '2. Tailoring Resume', icon: '📝', color: 'border-purple-500' },
            { id: 'applied', label: '3. Applied & Interviewing', icon: '🚀', color: 'border-emerald-500' }
          ].map(stage => {
            const stageJobs = ENRICHED_JOBS.filter(j => pipelineStages[j.id] === stage.id);

            return (
              <div key={stage.id} className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{stage.icon}</span>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {stage.label}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {stageJobs.length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[300px]">
                  {stageJobs.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                      No jobs in this stage. Move opportunities here!
                    </div>
                  ) : (
                    stageJobs.map(job => (
                      <div
                        key={job.id}
                        className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:shadow-md transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            {job.company}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            {job.match}% Fit
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200">
                          {job.title}
                        </h4>
                        <div className="text-[11px] text-slate-500">
                          {job.salary}
                        </div>

                        {/* Pipeline Stage Movement Action */}
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-1 text-[11px]">
                          {stage.id !== 'saved' && (
                            <button
                              onClick={e => updatePipelineStage(job.id, 'saved', e)}
                              className="text-slate-400 hover:text-white"
                            >
                              ← Watchlist
                            </button>
                          )}
                          {stage.id !== 'tailoring' && (
                            <button
                              onClick={e => updatePipelineStage(job.id, 'tailoring', e)}
                              className="text-purple-400 hover:underline font-semibold"
                            >
                              Tailor →
                            </button>
                          )}
                          {stage.id !== 'applied' && (
                            <button
                              onClick={e => updatePipelineStage(job.id, 'applied', e)}
                              className="text-emerald-400 hover:underline font-semibold"
                            >
                              Applied ✓
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 1: JOB DETAILS & FULL INSIGHTS
      ══════════════════════════════════════════════════════════════════════ */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-backdrop">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative animate-modal-pop space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedJobModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 pr-8">
              <span className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-3xl border border-rose-500/20">
                {selectedJobModal.companyLogo}
              </span>
              <div>
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">{selectedJobModal.company}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedJobModal.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>📍 {selectedJobModal.location}</span>
                  <span>·</span>
                  <span className="text-emerald-500 font-bold">{selectedJobModal.salary}</span>
                </div>
              </div>
            </div>

            {/* Match breakdown block */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">AI Resume Fit Score</span>
                <span className="font-black text-emerald-500 text-sm">{selectedJobModal.match}% Match</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedJobModal.why}
              </p>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                Key Responsibilities:
              </h4>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                {selectedJobModal.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Skills Matrix */}
            <div className="space-y-2">
              <h4 className="font-bold uppercase tracking-wider text-slate-400 text-[11px]">
                Skills Compatibility Breakdown:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedJobModal.skills.map(s => {
                  const hasSkill = selectedJobModal.matchedSkills.includes(s);
                  return (
                    <span
                      key={s}
                      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${
                        hasSkill
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300'
                      }`}
                    >
                      {hasSkill ? '✓' : '⚠️'} {s}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  toggleBookmark(selectedJobModal.id);
                  setSelectedJobModal(null);
                }}
                className="px-4 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
              >
                <span>{savedJobs.includes(selectedJobModal.id) ? '★ Bookmarked' : '☆ Bookmark'}</span>
              </button>
              <a
                href={selectedJobModal.url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-xl text-xs text-center transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-1.5 shimmer-btn"
              >
                <span>Apply on Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 2: ATS RESUME KEYWORD ASSISTANT
      ══════════════════════════════════════════════════════════════════════ */}
      {atsAssistantJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-backdrop">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-modal-pop space-y-5">
            <button
              onClick={() => setAtsAssistantJob(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center text-2xl border border-blue-500/20">
                📝
              </span>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  ATS Resume Optimization
                </h3>
                <p className="text-xs text-slate-400">
                  Tailor your resume for {atsAssistantJob.title} at {atsAssistantJob.company}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Top Keywords Scanned by ATS:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {atsAssistantJob.atsKeywords.map(kw => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                💡 High-Impact Resume Bullet Formula:
              </span>
              <p className="text-slate-500 dark:text-slate-400 italic">
                "Engineered scalable {atsAssistantJob.skills[0]} components utilizing {atsAssistantJob.skills[1]}, resulting in 35% faster page load and zero regression bugs."
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(atsAssistantJob.atsKeywords.join(', '));
                  setCopiedKeyword(true);
                  if (showToast) showToast('ATS Keywords copied to clipboard!', 'success', '📋');
                  setTimeout(() => setCopiedKeyword(false), 2000);
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                {copiedKeyword ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKeyword ? 'Copied to Clipboard!' : 'Copy All ATS Keywords'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
