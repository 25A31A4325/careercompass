import React, { useState, useMemo } from 'react';
import {
  Search,
  Award,
  BookOpen,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Star,
  Trophy,
  Zap,
  Target,
  Layers,
  CheckCircle2,
  Circle,
  TrendingUp,
  Flame,
  ArrowRight,
  Download,
  Share2,
  Bookmark,
  Compass,
  Check,
  Grid,
  GitCommit,
  GraduationCap
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   ENRICHED CURATED COURSE DATA ALIGNED WITH CAREERCOMPASS & IBM SKILLSBUILD
═══════════════════════════════════════════════════════════════════════════ */
export const COURSES_DATA = [
  {
    id: 'ml-fund',
    platform: 'IBM SkillsBuild',
    platformColor: 'text-purple-600 dark:text-purple-400',
    platformBg: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
    level: 'Intermediate',
    category: 'aiml',
    title: 'Machine Learning Fundamentals',
    tag: '🔥 Python / TensorFlow',
    tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Neural Networks', 'Model Evaluation'],
    color: 'border-purple-400 dark:border-purple-600',
    glow: 'card-glow-purple hover-glow-purple',
    badgeGlow: 'from-purple-500 to-indigo-600',
    btnColor: 'bg-purple-600 hover:bg-purple-500',
    duration: '22 Hours',
    modulesCount: 4,
    rating: 4.9,
    reviews: '18.4k learners',
    targetSkillGap: 'Machine Learning',
    relatedGaps: ['Python', 'TensorFlow', 'Data Science', 'PyTorch'],
    readinessBoost: '+14%',
    desc: 'Master foundational and modern machine learning techniques from regression to deep neural networks using TensorFlow and scikit-learn.',
    freeBadge: 'Free IBM Digital Credential',
    instructor: 'IBM Cognitive Class Data Science Team',
    url: 'https://skillsbuild.org',
    modules: [
      { id: 1, title: 'Supervised Learning & Regression', hours: '5h', topics: ['Linear & Logistic Regression', 'Feature Scaling', 'Loss Functions'] },
      { id: 2, title: 'Classification & Decision Trees', hours: '6h', topics: ['Random Forests', 'SVMs', 'Confusion Matrix & ROC AUC'] },
      { id: 3, title: 'Neural Networks & Deep Learning', hours: '6h', topics: ['Perceptrons', 'Backpropagation', 'TensorFlow & Keras API'] },
      { id: 4, title: 'Capstone: End-to-End Prediction Model', hours: '5h', topics: ['Model Deployment', 'Hyperparameter Tuning', 'IBM Verified Assessment'] }
    ]
  },
  {
    id: 'fullstack-web',
    platform: 'IBM SkillsBuild',
    platformColor: 'text-blue-600 dark:text-blue-400',
    platformBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800',
    level: 'Beginner',
    category: 'fullstack',
    title: 'Full Stack Web Development',
    tag: '🔥 React / Node.js',
    tags: ['React 19', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Auth'],
    color: 'border-blue-400 dark:border-blue-600',
    glow: 'card-glow-blue hover-glow-blue',
    badgeGlow: 'from-blue-500 to-cyan-500',
    btnColor: 'bg-blue-600 hover:bg-blue-500',
    duration: '28 Hours',
    modulesCount: 4,
    rating: 4.9,
    reviews: '24.1k learners',
    targetSkillGap: 'React & Node.js',
    relatedGaps: ['React', 'JavaScript', 'Node.js', 'Express', 'REST APIs'],
    readinessBoost: '+15%',
    desc: 'Architect modern full-stack web applications with React frontend architecture, Express REST APIs, MongoDB data persistence, and secure authentication.',
    freeBadge: 'IBM SkillsBuild Verified Badge',
    instructor: 'IBM Software Group Academy',
    url: 'https://skillsbuild.org',
    modules: [
      { id: 1, title: 'Modern React Component Architecture', hours: '7h', topics: ['JSX & Virtual DOM', 'Hooks (useState, useEffect, useMemo)', 'State Management'] },
      { id: 2, title: 'Server-Side Node & Express APIs', hours: '7h', topics: ['Routing & Middleware', 'REST Principles', 'Error Handling & CORS'] },
      { id: 3, title: 'Database Integration with MongoDB', hours: '7h', topics: ['Mongoose Schemas', 'CRUD Operations', 'Aggregation Pipelines'] },
      { id: 4, title: 'Production Auth & Full Stack Capstone', hours: '7h', topics: ['JWT Token Authentication', 'Role-Based Access Control', 'Deployment to Cloud'] }
    ]
  },
  {
    id: 'ts-mastery',
    platform: 'Udemy',
    platformColor: 'text-cyan-600 dark:text-cyan-400',
    platformBg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
    level: 'Intermediate',
    category: 'fullstack',
    title: 'TypeScript Mastery for Production',
    tag: '🔥 TypeScript',
    tags: ['TypeScript 5.5', 'Generics', 'Utility Types', 'Strict Nulls', 'Design Patterns'],
    color: 'border-cyan-400 dark:border-cyan-600',
    glow: 'card-glow-teal hover-glow-teal',
    badgeGlow: 'from-cyan-500 to-blue-600',
    btnColor: 'bg-cyan-600 hover:bg-cyan-500',
    duration: '16 Hours',
    modulesCount: 4,
    rating: 4.8,
    reviews: '12.8k learners',
    targetSkillGap: 'TypeScript',
    relatedGaps: ['TypeScript', 'JavaScript', 'Design Patterns'],
    readinessBoost: '+11%',
    desc: 'Level up JavaScript to enterprise-grade strict TypeScript. Master generics, conditional types, discriminated unions, and typing complex React state.',
    freeBadge: 'Certificate of Completion',
    instructor: 'Stephen Grider & Maximillian Schwarzmüller',
    url: 'https://udemy.com',
    modules: [
      { id: 1, title: 'Type System Fundamentals & Primitives', hours: '4h', topics: ['Type Inference & Annotations', 'Interfaces vs Type Aliases', 'Union & Literal Types'] },
      { id: 2, title: 'Advanced Generics & Utility Types', hours: '4h', topics: ['Generic Constraints', 'Partial, Pick, Omit, Record', 'Keyof & Typeof Operators'] },
      { id: 3, title: 'TypeScript with React & Express', hours: '4h', topics: ['Typing Props & State', 'Generic Custom Hooks', 'Type-Safe API Request Handlers'] },
      { id: 4, title: 'Enterprise Patterns & Monorepo Setup', hours: '4h', topics: ['tsconfig Strict Optimization', 'Decorators', 'Publishing Type Declarations'] }
    ]
  },
  {
    id: 'docker-k8s',
    platform: 'IBM SkillsBuild',
    platformColor: 'text-amber-600 dark:text-amber-400',
    platformBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    level: 'Advanced',
    category: 'cloud',
    title: 'Docker & Kubernetes Cloud Native',
    tag: '🔥 DevOps',
    tags: ['Docker', 'Kubernetes', 'Helm', 'CI/CD Pipelines', 'Cloud Native'],
    color: 'border-amber-400 dark:border-amber-600',
    glow: 'card-glow-orange hover-glow-orange',
    badgeGlow: 'from-amber-500 to-orange-600',
    btnColor: 'bg-amber-600 hover:bg-amber-500',
    duration: '20 Hours',
    modulesCount: 4,
    rating: 4.9,
    reviews: '16.5k learners',
    targetSkillGap: 'Docker & Kubernetes',
    relatedGaps: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'AWS'],
    readinessBoost: '+13%',
    desc: 'Containerize microservices with multi-stage Dockerfiles and orchestrate scalable deployments with Kubernetes Pods, Services, Ingress, and Helm charts.',
    freeBadge: 'IBM Cloud Native Specialist Badge',
    instructor: 'IBM Cloud Architecture Team',
    url: 'https://skillsbuild.org',
    modules: [
      { id: 1, title: 'Containerization with Docker Engine', hours: '5h', topics: ['Images, Containers & Dockerfiles', 'Multi-Stage Builds', 'Networking & Volumes'] },
      { id: 2, title: 'Docker Compose Multi-Service Stacks', hours: '5h', topics: ['Orchestrating App + DB', 'Environment Variables', 'Volume Persistence'] },
      { id: 3, title: 'Kubernetes Cluster Architecture & Pods', hours: '5h', topics: ['Nodes, Pods, Deployments', 'ClusterIP & NodePort Services', 'ConfigMaps & Secrets'] },
      { id: 4, title: 'Production Ingress, Autoscaling & Helm', hours: '5h', topics: ['Horizontal Pod Autoscaler (HPA)', 'Helm Chart Packaging', 'CI/CD GitOps Pipeline'] }
    ]
  },
  {
    id: 'sysdesign',
    platform: 'Educative',
    platformColor: 'text-emerald-600 dark:text-emerald-400',
    platformBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    level: 'Advanced',
    category: 'architecture',
    title: 'System Design Interview & Architecture',
    tag: '🔥 Architecture',
    tags: ['System Design', 'Microservices', 'Caching', 'Kafka', 'Sharding', 'CAP Theorem'],
    color: 'border-emerald-400 dark:border-emerald-600',
    glow: 'card-glow-emerald hover-glow-emerald',
    badgeGlow: 'from-emerald-500 to-teal-600',
    btnColor: 'bg-emerald-600 hover:bg-emerald-500',
    duration: '24 Hours',
    modulesCount: 4,
    rating: 4.9,
    reviews: '19.2k learners',
    targetSkillGap: 'System Design',
    relatedGaps: ['System Design', 'Architecture', 'Microservices', 'SQL', 'Scalability'],
    readinessBoost: '+16%',
    desc: 'Prepare for senior engineering screenings: learn to scale systems to 10M+ users with caching layers (Redis), messaging (Kafka), database partitioning, and high availability.',
    freeBadge: 'Educative Certified Architect',
    instructor: 'Former Meta & Netflix Principal Engineers',
    url: 'https://educative.io',
    modules: [
      { id: 1, title: 'Distributed Systems Principles & CAP', hours: '6h', topics: ['Latency vs Throughput', 'CAP Theorem & PACELC', 'Consistent Hashing'] },
      { id: 2, title: 'Caching & Message Queues', hours: '6h', topics: ['Redis Cache Eviction Strategies', 'Apache Kafka / RabbitMQ Streams', 'Rate Limiting Algorithms'] },
      { id: 3, title: 'Data Partitioning & Replication', hours: '6h', topics: ['Horizontal Sharding', 'Master-Slave vs Multi-Master', 'ACID vs BASE Models'] },
      { id: 4, title: 'Real-World Architectures Case Studies', hours: '6h', topics: ['Design Twitter / X Feed', 'Design YouTube Video Transcoding', 'Design Uber Geolocation'] }
    ]
  },
  {
    id: 'cybersec-ess',
    platform: 'IBM SkillsBuild',
    platformColor: 'text-rose-600 dark:text-rose-400',
    platformBg: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    level: 'Beginner',
    category: 'cybersec',
    title: 'Cybersecurity Operations & Threat Defense',
    tag: '🔥 Security',
    tags: ['Network Defense', 'OWASP Top 10', 'SIEM', 'Threat Intelligence', 'Zero Trust'],
    color: 'border-rose-400 dark:border-rose-600',
    glow: 'card-glow-rose hover-glow-rose',
    badgeGlow: 'from-rose-500 to-red-600',
    btnColor: 'bg-rose-600 hover:bg-rose-500',
    duration: '18 Hours',
    modulesCount: 4,
    rating: 4.8,
    reviews: '15.3k learners',
    targetSkillGap: 'Cybersecurity',
    relatedGaps: ['Cybersecurity', 'Networking', 'Linux', 'SIEM', 'Security+'],
    readinessBoost: '+12%',
    desc: 'Learn practical defensive cybersecurity, vulnerability management, secure coding against OWASP Top 10 exploits, and SOC incident triage with SIEM tooling.',
    freeBadge: 'IBM Cybersecurity Fundamentals Credential',
    instructor: 'IBM Security Trusteer Engineers',
    url: 'https://skillsbuild.org',
    modules: [
      { id: 1, title: 'Cyber Threat Landscape & Attack Vectors', hours: '4h', topics: ['Social Engineering & Phishing', 'Malware Types & Ransomware', 'CIA Triad & Defense in Depth'] },
      { id: 2, title: 'Network Security & Firewalls', hours: '5h', topics: ['TCP/IP & Packet Inspection', 'Wireshark Traffic Analysis', 'VPNs & Zero-Trust Architecture'] },
      { id: 3, title: 'Application Security & OWASP Top 10', hours: '5h', topics: ['SQL Injection & XSS Mitigations', 'Authentication Flaws & CSRF', 'Secure API Design'] },
      { id: 4, title: 'SOC Incident Response & Threat Hunting', hours: '4h', topics: ['SIEM Alert Correlation', 'Incident Handling Framework (NIST)', 'Forensic Artifact Analysis'] }
    ]
  },
  {
    id: 'data-sql',
    platform: 'IBM SkillsBuild',
    platformColor: 'text-indigo-600 dark:text-indigo-400',
    platformBg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800',
    level: 'Intermediate',
    category: 'data',
    title: 'Modern SQL & Relational Engineering',
    tag: '🔥 SQL / PostgreSQL',
    tags: ['SQL', 'PostgreSQL', 'Indexing', 'Query Optimization', 'Schema Design', 'pgvector'],
    color: 'border-indigo-400 dark:border-indigo-600',
    glow: 'card-glow-indigo hover-glow-indigo',
    badgeGlow: 'from-indigo-500 to-blue-600',
    btnColor: 'bg-indigo-600 hover:bg-indigo-500',
    duration: '18 Hours',
    modulesCount: 4,
    rating: 4.9,
    reviews: '13.7k learners',
    targetSkillGap: 'SQL & Databases',
    relatedGaps: ['SQL', 'PostgreSQL', 'Data Analysis', 'Schema Design'],
    readinessBoost: '+10%',
    desc: 'Master production database design, complex window functions, query EXPLAIN ANALYZE optimization, transactions, and indexing strategies.',
    freeBadge: 'IBM Data Engineering Practitioner Badge',
    instructor: 'IBM Data & AI Learning Group',
    url: 'https://skillsbuild.org',
    modules: [
      { id: 1, title: 'Relational Modeling & Normalization', hours: '4h', topics: ['Entity Relationship Diagrams', '1NF, 2NF, 3NF Normalization', 'Constraints & Foreign Keys'] },
      { id: 2, title: 'Advanced Queries & Window Functions', hours: '5h', topics: ['ROW_NUMBER, RANK, DENSE_RANK', 'Common Table Expressions (CTEs)', 'Subqueries & Self Joins'] },
      { id: 3, title: 'Indexing & Performance Tuning', hours: '5h', topics: ['B-Tree, Hash, GIN Indexes', 'Analyzing Execution Plans', 'Deadlock & Concurrency Control'] },
      { id: 4, title: 'Transactions, ACID & Analytics Lab', hours: '4h', topics: ['ACID Guarantees & Isolation Levels', 'Stored Procedures & Triggers', 'Data Warehouse ETL Pipelines'] }
    ]
  },
  {
    id: 'genai-llm',
    platform: 'IBM SkillsBuild',
    platformColor: 'text-teal-600 dark:text-teal-400',
    platformBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    level: 'Intermediate',
    category: 'aiml',
    title: 'Generative AI & LLM Application Engineering',
    tag: '🔥 GenAI / LangChain',
    tags: ['Generative AI', 'Prompt Engineering', 'LangChain', 'Vector DBs', 'RAG Pipelines'],
    color: 'border-teal-400 dark:border-teal-600',
    glow: 'card-glow-teal hover-glow-teal',
    badgeGlow: 'from-teal-500 to-emerald-600',
    btnColor: 'bg-teal-600 hover:bg-teal-500',
    duration: '20 Hours',
    modulesCount: 4,
    rating: 4.95,
    reviews: '21.0k learners',
    targetSkillGap: 'Generative AI & LLMs',
    relatedGaps: ['Python', 'Machine Learning', 'AI/ML', 'PyTorch'],
    readinessBoost: '+15%',
    desc: 'Build next-gen AI applications with Large Language Models: implement Retrieval Augmented Generation (RAG), vector embeddings, LangChain agents, and guardrails.',
    freeBadge: 'IBM Generative AI Specialist Credential',
    instructor: 'IBM watsonx & Research Team',
    url: 'https://skillsbuild.org',
    modules: [
      { id: 1, title: 'LLM Foundations & Prompt Engineering', hours: '5h', topics: ['Transformer Architecture Overview', 'Few-Shot & Chain-of-Thought Prompting', 'System Prompts & Temperature'] },
      { id: 2, title: 'Embeddings & Vector Databases', hours: '5h', topics: ['Semantic Similarity', 'ChromaDB & Pinecone', 'Chunking Strategies & Indexing'] },
      { id: 3, title: 'Retrieval Augmented Generation (RAG)', hours: '5h', topics: ['RAG Pipeline Architecture', 'Context Window Management', 'Hallucination Reduction'] },
      { id: 4, title: 'Autonomous Agents & watsonx Deployment', hours: '5h', topics: ['LangChain Tools & ReAct Loops', 'Evaluation with RAGAS', 'Enterprise Guardrails & Security'] }
    ]
  }
];

export default function CoursesPage({
  courseState = {},
  setCourseState,
  resumeStats = null,
  userName = 'Alex Morgan',
  onBack,
  showToast,
  enrollCourse
}) {
  // Navigation & View Layout Mode
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'pathway' | 'kanban'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'enrolled' | 'completed' | 'saved'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyGaps, setOnlyGaps] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Interactive Bookmarks
  const [savedCourses, setSavedCourses] = useState(() => {
    try {
      const stored = localStorage.getItem('cc_saved_courses');
      return stored ? JSON.parse(stored) : ['ml-fund', 'fullstack-web'];
    } catch {
      return ['ml-fund', 'fullstack-web'];
    }
  });

  // Accordion state for in-card module checklists
  const [expandedCards, setExpandedCards] = useState({});

  // Active Modals
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const [certificateCourse, setCertificateCourse] = useState(null);
  const [celebrationCourse, setCelebrationCourse] = useState(null);

  // User's detected missing skills from Resume Analyzer
  const userMissingSkills = useMemo(() => {
    if (resumeStats?.missing && Array.isArray(resumeStats.missing) && resumeStats.missing.length > 0) {
      return resumeStats.missing.map(s => s.toLowerCase());
    }
    // Default high-demand benchmark gaps
    return ['docker', 'kubernetes', 'typescript', 'machine learning', 'system design', 'sql', 'security'];
  }, [resumeStats]);

  // Check if a course matches user's missing skills
  const isGapMatchingCourse = (course) => {
    const target = course.targetSkillGap.toLowerCase();
    const related = (course.relatedGaps || []).map(r => r.toLowerCase());
    return userMissingSkills.some(gap => target.includes(gap) || related.some(r => r.includes(gap) || gap.includes(r)));
  };

  // Toggle bookmark
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setSavedCourses(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('cc_saved_courses', JSON.stringify(next));
      } catch {}
      if (showToast) {
        showToast(
          exists ? 'Course removed from bookmarks.' : 'Course saved to your watchlist! ★',
          'info',
          exists ? '🔖' : '⭐'
        );
      }
      return next;
    });
  };

  // Toggle in-card module accordion
  const toggleCardAccordion = (id, e) => {
    if (e) e.stopPropagation();
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Update specific module completion
  const toggleModuleCompletion = (courseId, moduleId, e) => {
    if (e) e.stopPropagation();
    const current = courseState[courseId] || { enrolled: false, progress: 0, completedModules: [] };
    const currentCompleted = current.completedModules || [];
    const isCompleted = currentCompleted.includes(moduleId);
    const nextCompleted = isCompleted
      ? currentCompleted.filter(m => m !== moduleId)
      : [...currentCompleted, moduleId];

    const course = COURSES_DATA.find(c => c.id === courseId);
    const totalModules = course?.modules?.length || 4;
    const nextProgress = Math.min(100, Math.round((nextCompleted.length / totalModules) * 100));

    setCourseState(prev => ({
      ...prev,
      [courseId]: {
        ...current,
        enrolled: true,
        progress: nextProgress,
        completedModules: nextCompleted
      }
    }));

    if (nextProgress >= 100 && current.progress < 100) {
      setCelebrationCourse(course);
      if (showToast) {
        showToast(`🎉 100% Complete! You earned the ${course.title} Certificate!`, 'success', '🏆');
      }
    } else {
      if (showToast) {
        showToast(
          isCompleted ? `Module ${moduleId} uncompleted (${nextProgress}%)` : `Module ${moduleId} completed! (${nextProgress}%)`,
          'success',
          '✅'
        );
      }
    }
  };

  // Quick Advance Progress (+25% demo step)
  const advanceProgress = (courseId, e) => {
    if (e) e.stopPropagation();
    const course = COURSES_DATA.find(c => c.id === courseId);
    const current = courseState[courseId] || { enrolled: true, progress: 0, completedModules: [] };
    const step = 25;
    const next = Math.min(100, (current.progress || 0) + step);

    // Sync completed module ids
    const totalModules = course?.modules?.length || 4;
    const modulesToCompleteCount = Math.ceil((next / 100) * totalModules);
    const nextCompleted = [1, 2, 3, 4].slice(0, modulesToCompleteCount);

    setCourseState(prev => ({
      ...prev,
      [courseId]: {
        ...current,
        enrolled: true,
        progress: next,
        completedModules: nextCompleted
      }
    }));

    if (next >= 100 && current.progress < 100) {
      setCelebrationCourse(course);
      if (showToast) {
        showToast(`🎉 Course Completed! Verified Certificate Unlocked!`, 'success', '🏆');
      }
    } else {
      if (showToast) {
        showToast(`Advanced +25%! Current Progress: ${next}%`, 'info', '⚡');
      }
    }
  };

  // Handle Enrollment
  const handleEnroll = (course, e) => {
    if (e) e.stopPropagation();
    if (enrollCourse) {
      enrollCourse(course.id, course.url);
    } else {
      setCourseState(prev => ({
        ...prev,
        [course.id]: { enrolled: true, progress: 0, completedModules: [] }
      }));
      if (showToast) {
        showToast(`Enrolled in ${course.title}! 🚀`, 'success', '🎓');
      }
      window.open(course.url, '_blank', 'noreferrer');
    }
  };

  // Quick Reset Demo Data helper for testing
  const resetAllProgress = () => {
    const reset = Object.fromEntries(
      COURSES_DATA.map(c => [c.id, { enrolled: false, progress: 0, completedModules: [] }])
    );
    setCourseState(reset);
    if (showToast) showToast('Reset course progress to default clean state.', 'info', '↺');
  };

  // Quick Sample Progress helper for instant preview
  const populateSampleProgress = () => {
    setCourseState({
      'ml-fund': { enrolled: true, progress: 100, completedModules: [1, 2, 3, 4] },
      'fullstack-web': { enrolled: true, progress: 75, completedModules: [1, 2, 3] },
      'docker-k8s': { enrolled: true, progress: 50, completedModules: [1, 2] },
      'ts-mastery': { enrolled: true, progress: 25, completedModules: [1] },
      'sysdesign': { enrolled: false, progress: 0, completedModules: [] },
      'cybersec-ess': { enrolled: false, progress: 0, completedModules: [] },
      'data-sql': { enrolled: false, progress: 0, completedModules: [] },
      'genai-llm': { enrolled: false, progress: 0, completedModules: [] }
    });
    if (showToast) showToast('Sample learning journey loaded with active milestones!', 'success', '🚀');
  };

  // Derived Overall Learning Stats
  const metrics = useMemo(() => {
    let enrolled = 0;
    let completed = 0;
    let totalHours = 0;
    let readinessGain = 0;
    let gapsClosedCount = 0;

    COURSES_DATA.forEach(c => {
      const cs = courseState[c.id] || { enrolled: false, progress: 0 };
      if (cs.enrolled || cs.progress > 0) {
        enrolled += 1;
        const durHours = parseInt(c.duration) || 20;
        totalHours += Math.round((durHours * (cs.progress || 0)) / 100);
      }
      if (cs.progress >= 100) {
        completed += 1;
        readinessGain += parseInt(c.readinessBoost) || 12;
        if (isGapMatchingCourse(c)) {
          gapsClosedCount += 1;
        }
      }
    });

    return {
      enrolled,
      completed,
      totalHours,
      readinessGain: readinessGain > 0 ? `+${readinessGain}%` : '+0%',
      gapsClosedCount
    };
  }, [courseState, userMissingSkills]);

  // Filtered & Sorted Courses List
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter(course => {
      const cs = courseState[course.id] || { enrolled: false, progress: 0 };
      const isEnrolled = !!cs.enrolled || (cs.progress > 0);
      const isComplete = (cs.progress || 0) >= 100;
      const isSaved = savedCourses.includes(course.id);
      const isGap = isGapMatchingCourse(course);

      // Status Filter
      if (statusFilter === 'enrolled' && (!isEnrolled || isComplete)) return false;
      if (statusFilter === 'completed' && !isComplete) return false;
      if (statusFilter === 'saved' && !isSaved) return false;

      // Category Filter
      if (selectedCategory === 'ibm' && course.platform !== 'IBM SkillsBuild') return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'ibm' && course.category !== selectedCategory) return false;

      // Level Filter
      if (selectedLevel !== 'all' && course.level !== selectedLevel) return false;

      // Only Missing Gaps Filter
      if (onlyGaps && !isGap) return false;

      // Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = course.title.toLowerCase().includes(q);
        const inPlatform = course.platform.toLowerCase().includes(q);
        const inTag = course.tag.toLowerCase().includes(q);
        const inTags = (course.tags || []).some(t => t.toLowerCase().includes(q));
        const inDesc = course.desc.toLowerCase().includes(q);
        const inGap = course.targetSkillGap.toLowerCase().includes(q);
        if (!inTitle && !inPlatform && !inTag && !inTags && !inDesc && !inGap) return false;
      }

      return true;
    }).sort((a, b) => {
      const aGap = isGapMatchingCourse(a);
      const bGap = isGapMatchingCourse(b);
      if (sortBy === 'recommended') {
        if (aGap && !bGap) return -1;
        if (!aGap && bGap) return 1;
        return b.rating - a.rating;
      }
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') return parseInt(a.duration) - parseInt(b.duration);
      return 0;
    });
  }, [selectedCategory, selectedLevel, statusFilter, searchQuery, onlyGaps, sortBy, courseState, savedCourses, userMissingSkills]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ══════════════════════════════════════════════════════════════════════
          HERO & LIVE LEARNING DIAGNOSTIC HEADER
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 text-white">
        {/* Ambient background glow orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-teal-500/20">
                🎓
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Personalized Technical Tracks
                  </h1>
                  <span className="bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-teal-400" />
                    IBM SkillsBuild Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Bridge the exact skill gaps detected in your resume with accredited coursework, practical labs, and verifiable credentials aligned to tech industry benchmarks.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={populateSampleProgress}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
              title="Populate active learning demo state"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Demo Journey</span>
            </button>
            <button
              onClick={resetAllProgress}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1"
              title="Reset progress to 0%"
            >
              <span>↺</span>
              <span>Reset</span>
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

        {/* Live Learning Diagnostic Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: Active Enrollments */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Active Enrollments</span>
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-white">{metrics.enrolled}</span>
              <span className="text-xs text-slate-400 font-medium">of {COURSES_DATA.length} available</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2.5 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-700"
                style={{ width: `${(metrics.enrolled / COURSES_DATA.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Card 2: Completed Certifications */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Earned Credentials</span>
              <Trophy className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-emerald-400">{metrics.completed}</span>
              <span className="text-xs text-slate-400 font-medium">Digital Badges</span>
            </div>
            <p className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3" />
              {metrics.completed > 0 ? 'Verifiable on LinkedIn / ATS' : 'Complete 100% to unlock badge'}
            </p>
          </div>

          {/* Card 3: Hours Invested */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Learning Hours</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-purple-400">{metrics.totalHours} hrs</span>
              <span className="text-xs text-slate-400 font-medium">logged</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Hands-on interactive lab time</p>
          </div>

          {/* Card 4: Career Readiness Boost */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 rounded-2xl p-4 transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Readiness Score Boost</span>
              <TrendingUp className="w-4 h-4 text-teal-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-teal-400">{metrics.readinessGain}</span>
              <span className="text-xs text-teal-300/80 font-medium">gained</span>
            </div>
            <p className="text-[11px] text-teal-400/80 mt-1 flex items-center gap-1">
              <Target className="w-3 h-3" />
              {metrics.gapsClosedCount} resume gap{metrics.gapsClosedCount === 1 ? '' : 's'} mastered
            </p>
          </div>
        </div>

        {/* Skill Gap Auto-Detection Banner */}
        <div className="mt-5 p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
              <Flame className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-teal-300">Resume Gap Radar: </span>
              <span className="text-slate-300">
                Targeting identified skill gaps:{' '}
                <strong className="text-teal-200">{userMissingSkills.slice(0, 4).join(', ')}</strong>
              </span>
            </div>
          </div>
          <button
            onClick={() => setOnlyGaps(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 text-xs shadow-sm ${
              onlyGaps
                ? 'bg-teal-500 text-slate-950 shadow-teal-500/30'
                : 'bg-teal-900/60 text-teal-300 hover:bg-teal-800/80 border border-teal-600/40'
            }`}
          >
            <span>{onlyGaps ? '✓ Filtering By My Gaps' : '⚡ Filter Only My Skill Gaps'}</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          CONTROLS, SEARCH, VIEW-MODE SWITCHER & TABS
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        {/* Row 1: Search + View Switcher + Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search courses, skills (e.g. React, Docker, Python)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
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
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="Interactive 3D Grid"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>3D Grid</span>
              </button>
              <button
                onClick={() => setViewMode('pathway')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'pathway'
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="Curriculum Pathway Progression"
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Pathway</span>
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewMode === 'kanban'
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm font-bold'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
                title="My Learning Dashboard"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>My Learning</span>
              </button>
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2 px-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:border-teal-500"
            >
              <option value="recommended">Sort: Skill Gap Fit</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="duration">Sort: Shortest Duration</option>
            </select>
          </div>
        </div>

        {/* Row 2: Status Tabs + Category Pills */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'All Courses', count: COURSES_DATA.length },
              { id: 'enrolled', label: 'In Progress', count: metrics.enrolled - metrics.completed },
              { id: 'completed', label: 'Completed', count: metrics.completed },
              { id: 'saved', label: 'Watchlist', count: savedCourses.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === tab.id ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Level:</span>
            <select
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="py-1 px-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Row 3: Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs">
          {[
            { id: 'all', label: 'All Disciplines', icon: '🌐' },
            { id: 'ibm', label: 'IBM SkillsBuild Tracks', icon: '🎓' },
            { id: 'aiml', label: 'AI & Machine Learning', icon: '🤖' },
            { id: 'fullstack', label: 'Full Stack & Web', icon: '🖥️' },
            { id: 'cloud', label: 'Cloud & Containers', icon: '☁️' },
            { id: 'architecture', label: 'System Design', icon: '🏛️' },
            { id: 'cybersec', label: 'Cybersecurity', icon: '🔒' },
            { id: 'data', label: 'Data Engineering', icon: '📊' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 font-medium ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-500/25'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 1: INNOVATIVE 3D GRID VIEW
      ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === 'grid' && (
        <div>
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 p-8 space-y-4">
              <span className="text-5xl">🔍</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No courses match your active filters</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try resetting your search query, turning off gap filters, or selecting "All Courses".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setStatusFilter('all');
                  setOnlyGaps(false);
                }}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl transition-all shadow"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map(course => {
                const cs = courseState[course.id] || { enrolled: false, progress: 0, completedModules: [] };
                const isEnrolled = !!cs.enrolled || cs.progress > 0;
                const progress = cs.progress || 0;
                const isComplete = progress >= 100;
                const isSaved = savedCourses.includes(course.id);
                const isGapMatch = isGapMatchingCourse(course);
                const isExpanded = !!expandedCards[course.id];
                const completedModules = cs.completedModules || [];

                return (
                  <div
                    key={course.id}
                    className={`bg-white dark:bg-slate-900 border-2 ${course.color} rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl relative overflow-hidden group ${course.glow}`}
                  >
                    {/* Top ambient colored line */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${course.badgeGlow}`} />

                    <div>
                      {/* Platform header + Level + Bookmark */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-lg border ${course.platformBg} ${course.platformColor} flex items-center gap-1`}>
                            {course.platform === 'IBM SkillsBuild' && <ShieldCheck className="w-3 h-3 text-teal-500" />}
                            {course.platform}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                            {course.level}
                          </span>
                        </div>

                        <button
                          onClick={e => toggleBookmark(course.id, e)}
                          className={`p-1.5 rounded-xl border transition-all ${
                            isSaved
                              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-500'
                              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                          }`}
                          title={isSaved ? 'Remove bookmark' : 'Bookmark course'}
                        >
                          <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                        </button>
                      </div>

                      {/* Title & Tag */}
                      <h3
                        onClick={() => setSelectedCourseModal(course)}
                        className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors cursor-pointer leading-snug flex items-center justify-between"
                      >
                        <span>{course.title}</span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{course.tag}</p>

                      {/* Skill Gap Match Banner */}
                      <div className="mt-3">
                        {isGapMatch ? (
                          <div className="p-2.5 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/40 dark:to-emerald-950/30 border border-teal-300/80 dark:border-teal-700/80 flex items-center justify-between text-xs">
                            <span className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                              Closes Gap: {course.targetSkillGap}
                            </span>
                            <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-300/60">
                              {course.readinessBoost} Fit
                            </span>
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>Key Skill: {course.targetSkillGap}</span>
                            <span className="font-semibold text-slate-600 dark:text-slate-300">{course.readinessBoost} Boost</span>
                          </div>
                        )}
                      </div>

                      {/* Course Quick Attributes */}
                      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {course.rating}
                          <span className="text-slate-400 font-normal">({course.reviews})</span>
                        </span>
                        <span className="font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-0.5">
                          <GraduationCap className="w-3 h-3" />
                          Free Cert
                        </span>
                      </div>

                      {/* 4-Stage Visual Milestones Stepper */}
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            {isEnrolled ? (isComplete ? '100% Completed' : `${progress}% Progress`) : 'Curriculum Milestones'}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {completedModules.length} of 4 Modules
                          </span>
                        </div>

                        {/* Interactive stepper dots */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {[1, 2, 3, 4].map(step => {
                            const isStepDone = completedModules.includes(step) || isComplete;
                            return (
                              <button
                                key={step}
                                onClick={e => toggleModuleCompletion(course.id, step, e)}
                                title={`Module ${step}: Click to toggle completion`}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  isStepDone
                                    ? 'bg-emerald-500 shadow-sm shadow-emerald-500/40'
                                    : isEnrolled
                                    ? 'bg-slate-200 dark:bg-slate-700 hover:bg-teal-400'
                                    : 'bg-slate-200 dark:bg-slate-700'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Expandable Module Checklist Accordion */}
                      <div className="mt-3">
                        <button
                          onClick={e => toggleCardAccordion(course.id, e)}
                          className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                            {isExpanded ? 'Hide Modules & Labs' : 'Inspect 4 Modules & Labs'}
                          </span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 space-y-2 text-xs animate-fadeIn">
                            <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                              Click milestone to mark completed:
                            </p>
                            {course.modules.map(mod => {
                              const done = completedModules.includes(mod.id) || isComplete;
                              return (
                                <div
                                  key={mod.id}
                                  onClick={e => toggleModuleCompletion(course.id, mod.id, e)}
                                  className={`p-2 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                                    done
                                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-teal-400 text-slate-700 dark:text-slate-300'
                                  }`}
                                >
                                  <div className="mt-0.5">
                                    {done ? (
                                      <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 dark:fill-emerald-950" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-400 hover:text-teal-500" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between text-[11px] font-bold">
                                      <span>M{mod.id}: {mod.title}</span>
                                      <span className="text-[10px] text-slate-400">{mod.hours}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                      {mod.topics.join(' · ')}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      {/* Deep-dive Eye Button */}
                      <button
                        onClick={() => setSelectedCourseModal(course)}
                        className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-all"
                        title="View Full Syllabus & Lab Details"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>

                      {/* State Button */}
                      {isComplete ? (
                        <button
                          onClick={() => setCertificateCourse(course)}
                          className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 shimmer-btn"
                        >
                          <Trophy className="w-4 h-4 text-yellow-300" />
                          <span>View Certificate 🏆</span>
                        </button>
                      ) : isEnrolled ? (
                        <div className="flex-1 flex items-center gap-1.5">
                          <button
                            onClick={e => advanceProgress(course.id, e)}
                            className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all"
                            title="Simulate completing next lesson (+25%)"
                          >
                            +25%
                          </button>
                          <a
                            href={course.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-2.5 px-3 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow-md shadow-teal-500/20 text-center transition-all flex items-center justify-center gap-1"
                          >
                            <span>Resume</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      ) : (
                        <button
                          onClick={e => handleEnroll(course, e)}
                          className={`flex-1 py-2.5 px-4 ${course.btnColor} text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5 shimmer-btn`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Enroll Free Track →</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 2: MILESTONE PATHWAY ROADMAP VIEW
      ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === 'pathway' && (
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <GitCommit className="w-5 h-5 text-teal-500" />
                Engineering Competency Ladder
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Recommended sequential order from foundational core to enterprise system design.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
              Structured Trajectory
            </span>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-700 space-y-8 my-4">
            {filteredCourses.map((course, idx) => {
              const cs = courseState[course.id] || { enrolled: false, progress: 0 };
              const isEnrolled = !!cs.enrolled || cs.progress > 0;
              const isComplete = cs.progress >= 100;

              return (
                <div key={course.id} className="relative group">
                  {/* Step node dot */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-4 flex items-center justify-center text-[10px] font-black transition-all ${
                      isComplete
                        ? 'bg-emerald-500 border-emerald-200 dark:border-emerald-900 text-white'
                        : isEnrolled
                        ? 'bg-teal-500 border-teal-200 dark:border-teal-900 text-white'
                        : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-500'
                    }`}
                  >
                    {isComplete ? '✓' : idx + 1}
                  </div>

                  {/* Pathway Box */}
                  <div className={`p-5 rounded-2xl border-2 ${course.color} bg-slate-50 dark:bg-slate-800/80 hover:shadow-xl transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${course.platformBg} ${course.platformColor}`}>
                          {course.platform}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                          Phase {idx + 1}: {course.level}
                        </span>
                        {isGapMatchingCourse(course) && (
                          <span className="text-[10px] font-bold text-teal-600 bg-teal-100 dark:bg-teal-950 px-2 py-0.5 rounded-md border border-teal-300 dark:border-teal-700">
                            🎯 Closes Gap: {course.targetSkillGap}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {course.desc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                          {isComplete ? '100% Done' : isEnrolled ? `${cs.progress}% Active` : 'Not Started'}
                        </span>
                        <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-teal-500 rounded-full"
                            style={{ width: `${cs.progress || 0}%` }}
                          />
                        </div>
                      </div>

                      {isComplete ? (
                        <button
                          onClick={() => setCertificateCourse(course)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                        >
                          <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                          <span>Certificate</span>
                        </button>
                      ) : isEnrolled ? (
                        <button
                          onClick={() => advanceProgress(course.id)}
                          className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl shadow transition-all"
                        >
                          Advance (+25%)
                        </button>
                      ) : (
                        <button
                          onClick={e => handleEnroll(course, e)}
                          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow transition-all"
                        >
                          Enroll Track
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          VIEW 3: MY LEARNING ACTIVE KANBAN / DASHBOARD VIEW
      ══════════════════════════════════════════════════════════════════════ */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: In Progress Tracks */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center text-xs font-black">
                  ⏳
                </span>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  In Progress ({metrics.enrolled - metrics.completed})
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Active Study</span>
            </div>

            {COURSES_DATA.filter(c => {
              const cs = courseState[c.id];
              return cs && cs.enrolled && cs.progress < 100;
            }).length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No courses currently in progress. Enroll in a track from the 3D Grid!
              </div>
            ) : (
              COURSES_DATA.filter(c => {
                const cs = courseState[c.id];
                return cs && cs.enrolled && cs.progress < 100;
              }).map(course => {
                const cs = courseState[course.id];
                return (
                  <div key={course.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold ${course.platformColor}`}>{course.platform}</span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{cs.progress}%</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{course.title}</h4>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${cs.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <button
                        onClick={() => advanceProgress(course.id)}
                        className="px-2.5 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[11px]"
                      >
                        +25% Lesson Done
                      </button>
                      <a href={course.url} target="_blank" rel="noreferrer" className="text-teal-600 dark:text-teal-400 font-bold hover:underline flex items-center gap-1">
                        Go to Lab <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Column 2: Completed Certifications */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-xs font-black">
                  🏆
                </span>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                  Earned Credentials ({metrics.completed})
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Verified</span>
            </div>

            {COURSES_DATA.filter(c => {
              const cs = courseState[c.id];
              return cs && cs.progress >= 100;
            }).length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No completed tracks yet. Reach 100% on any course to unlock your verified IBM certificate!
              </div>
            ) : (
              COURSES_DATA.filter(c => {
                const cs = courseState[c.id];
                return cs && cs.progress >= 100;
              }).map(course => (
                <div key={course.id} className="p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                      ✓ Verified Credential
                    </span>
                    <span className="text-xs font-bold text-emerald-600">100%</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100">{course.title}</h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500">{course.freeBadge}</span>
                    <button
                      onClick={() => setCertificateCourse(course)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Trophy className="w-3.5 h-3.5 text-yellow-300" />
                      View Certificate
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 1: COURSE SYLLABUS & LAB DEEP-DIVE
      ══════════════════════════════════════════════════════════════════════ */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-backdrop">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative animate-modal-pop max-h-[90vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedCourseModal(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-start gap-4 pr-8">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center text-3xl border border-teal-500/20">
                🎓
              </div>
              <div>
                <span className={`text-xs font-bold ${selectedCourseModal.platformColor}`}>{selectedCourseModal.platform}</span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedCourseModal.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 px-2.5 py-0.5 rounded-full font-medium">
                    Level: {selectedCourseModal.level}
                  </span>
                  <span className="text-xs text-slate-500">⏱️ {selectedCourseModal.duration}</span>
                  <span className="text-xs text-amber-500 font-bold">⭐ {selectedCourseModal.rating}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedCourseModal.desc}
            </p>

            {/* What you'll learn */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Full 4-Stage Curriculum Breakdown
              </h4>
              <div className="space-y-2">
                {selectedCourseModal.modules.map(m => (
                  <div key={m.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-100">
                      <span>Module {m.id}: {m.title}</span>
                      <span className="text-slate-400 font-normal">{m.hours}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {m.topics.map(t => (
                        <span key={t} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => setSelectedCourseModal(null)}
                className="flex-1 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleEnroll(selectedCourseModal);
                  setSelectedCourseModal(null);
                }}
                className="flex-1 py-3 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs text-center transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-1.5 shimmer-btn"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch &amp; Enroll Track →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          MODAL 2: OFFICIAL VERIFIABLE DIGITAL CERTIFICATE
      ══════════════════════════════════════════════════════════════════════ */}
      {certificateCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-backdrop">
          <div className="bg-white dark:bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative animate-modal-pop text-slate-900 dark:text-slate-100 space-y-6">
            <button
              onClick={() => setCertificateCourse(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>

            {/* Certificate Canvas Box */}
            <div className="border-4 border-double border-amber-500/40 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/10 dark:from-slate-800/60 dark:via-slate-900 dark:to-slate-800/40 relative text-center space-y-4">
              {/* Crest Badge */}
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center text-3xl shadow-xl shadow-amber-400/30">
                🏆
              </div>

              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                  Verified Accredited Credential
                </p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Certificate of Achievement
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  This acknowledges that
                </p>
              </div>

              <div className="py-2 border-b-2 border-slate-300 dark:border-slate-700 max-w-sm mx-auto">
                <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 font-serif">
                  {userName || 'Alex Morgan'}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                has successfully completed all required curriculum modules, laboratory implementations, and capstone assessments for:
              </p>

              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl max-w-md mx-auto">
                <h4 className="font-black text-sm text-slate-900 dark:text-slate-100">
                  {certificateCourse.title}
                </h4>
                <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
                  Issued by {certificateCourse.platform} &amp; CareerCompass AI
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-400 max-w-md mx-auto pt-2">
                <span>Verification ID: CC-IBM-{certificateCourse.id.toUpperCase()}-2026</span>
                <span>Issue Date: September 2026</span>
              </div>
            </div>

            {/* Certificate Share Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (showToast) showToast('Verification link copied to clipboard!', 'success', '📋');
                }}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Shareable Link</span>
              </button>
              <button
                onClick={() => {
                  if (showToast) showToast('Certificate downloaded! Add it to your resume.', 'success', '📄');
                }}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Credential</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          CELEBRATION OVERLAY BURST (When hitting 100%)
      ══════════════════════════════════════════════════════════════════════ */}
      {celebrationCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-backdrop pointer-events-auto">
          <div className="bg-white dark:bg-slate-900 border-2 border-emerald-400 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-4 animate-modal-pop">
            <span className="text-6xl animate-bounce inline-block">🎉</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
              Track 100% Completed!
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Congratulations! You have mastered all modules for <strong className="text-emerald-600 dark:text-emerald-400">{celebrationCourse.title}</strong> and resolved your missing skill gap!
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              🏆 Verified Digital Credential Unlocked!
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCelebrationCourse(null)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl text-xs"
              >
                Continue Exploring
              </button>
              <button
                onClick={() => {
                  setCertificateCourse(celebrationCourse);
                  setCelebrationCourse(null);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-500/25"
              >
                View Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
