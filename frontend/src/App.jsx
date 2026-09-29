import React, { useState } from 'react';
import {
  IndianRupee,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  CheckCircle2,
  ChevronRight,
  Zap,
  Building2,
  Clock,
  Briefcase,
  Layers,
  GraduationCap
} from 'lucide-react';
import Lottie from 'lottie-react';
import careerAnimation from './assets/career.json';
import ResumePage from './pages/ResumePage';
import CareerRoadmapTimeline from './pages/CareerRoadmapTimeline';
import CoursesPage, { COURSES_DATA } from './pages/CoursesPage';
import JobsPage, { ENRICHED_JOBS } from './pages/JobsPage';
import CareerPathsPage, { ENRICHED_CAREER_PATHS } from './pages/CareerPathsPage';
import { analyzeResume, extractTextFromFile } from './utils/resumeAnalyzer';

/** Thin wrapper kept for backwards-compatibility — delegates to shared engine */
function parseResume(text) {
  return analyzeResume(text, null);
}

/* ─────────────── DATA ─────────────── */

const CAREER_PATHS = ENRICHED_CAREER_PATHS;

const COURSES_LIST = COURSES_DATA;

// Build the default per-user course state: nothing enrolled, 0% progress
function buildDefaultCourseState() {
  return Object.fromEntries(COURSES_LIST.map(c => [c.id, { enrolled: false, progress: 0, completedModules: [] }]));
}

const JOBS = ENRICHED_JOBS;

const MARKET_TECH_TRENDS = [
  { id: 'nextjs', name: 'Next.js 15 & React 19', cat: 'frontend', icon: '⚛️', growth: '+48% YoY', demand: 96, salary: '₹20 – 35 LPA', hiring: ['Vercel', 'Meta', 'Netflix'], level: '🔥 High Demand', desc: 'Server Actions, React 19 compiler, streaming SSR architecture' },
  { id: 'pytorch', name: 'PyTorch & LLM RAG', cat: 'aiml', icon: '🤖', growth: '+72% YoY', demand: 98, salary: '₹26 – 45 LPA', hiring: ['OpenAI', 'Anthropic', 'Google'], level: '⚡ Surging', desc: 'Vector embeddings, LangChain agents, fine-tuning pipelines' },
  { id: 'typescript', name: 'TypeScript 5.5+', cat: 'frontend', icon: '🔷', growth: '+39% YoY', demand: 94, salary: '₹18 – 32 LPA', hiring: ['Microsoft', 'Stripe', 'Airbnb'], level: '💎 Core Standard', desc: 'Strict typing, inferred predicates, production enterprise code' },
  { id: 'docker', name: 'Docker & Kubernetes', cat: 'cloud', icon: '🐳', growth: '+36% YoY', demand: 90, salary: '₹22 – 38 LPA', hiring: ['AWS', 'Datadog', 'Uber'], level: '⚙️ Essential Infra', desc: 'Containerization, microservices deployment, CI/CD automation' },
  { id: 'postgres', name: 'PostgreSQL & Prisma ORM', cat: 'fullstack', icon: '🐘', growth: '+33% YoY', demand: 88, salary: '₹16 – 28 LPA', hiring: ['Supabase', 'GitHub', 'Shopify'], level: '🛡️ High Reliability', desc: 'Relational schema design, pgvector indexing, ACID transactions' },
  { id: 'security', name: 'Zero-Trust & Cloud Sec', cat: 'cybersec', icon: '🔒', growth: '+44% YoY', demand: 86, salary: '₹18 – 34 LPA', hiring: ['CrowdStrike', 'IBM', 'Palo Alto'], level: '🚨 Critical Need', desc: 'Identity governance, SOC incident response, OWASP remediation' },
];

/* ─────────────── INDIAN TECH PLACEMENT SIMULATOR DATA ─────────────── */
const INDIAN_SIMULATOR_DATA = {
  fullstack: {
    name: 'Full Stack Engineer',
    icon: '🖥️',
    tier1_product: {
      fresher_offcampus: { ctcMin: 14, ctcMax: 22, basePct: 75, weeksBase: 16, probBase: 78 },
      fresher_tier1:     { ctcMin: 18, ctcMax: 30, basePct: 72, weeksBase: 12, probBase: 88 },
      experienced:       { ctcMin: 26, ctcMax: 44, basePct: 75, weeksBase: 10, probBase: 92 },
    },
    unicorns: {
      fresher_offcampus: { ctcMin: 10, ctcMax: 17, basePct: 78, weeksBase: 14, probBase: 82 },
      fresher_tier1:     { ctcMin: 15, ctcMax: 24, basePct: 75, weeksBase: 10, probBase: 90 },
      experienced:       { ctcMin: 22, ctcMax: 36, basePct: 78, weeksBase: 8,  probBase: 94 },
    },
    gcc_services: {
      fresher_offcampus: { ctcMin: 6,  ctcMax: 9.5, basePct: 82, weeksBase: 10, probBase: 88 },
      fresher_tier1:     { ctcMin: 9,  ctcMax: 14,  basePct: 80, weeksBase: 8,  probBase: 94 },
      experienced:       { ctcMin: 14, ctcMax: 22,  basePct: 80, weeksBase: 6,  probBase: 96 },
    },
    advice: {
      tier1_product: 'To secure ₹18–30 LPA at top product firms: Master LeetCode 150 (Trees, Graphs, DP) and build 1 scalable Next.js microservices app with Docker and Redis.',
      unicorns: 'Unicorns look for rapid builders: showcase a live full-stack app with auth, Stripe/Razorpay webhooks, and sub-100ms API response latency.',
      gcc_services: 'GCCs prioritize clean OOP, SQL query indexing, Spring/Express design patterns, and solid relational database schema design.',
    }
  },
  aiml: {
    name: 'AI & Machine Learning Engineer',
    icon: '🤖',
    tier1_product: {
      fresher_offcampus: { ctcMin: 16, ctcMax: 26, basePct: 72, weeksBase: 18, probBase: 74 },
      fresher_tier1:     { ctcMin: 22, ctcMax: 38, basePct: 70, weeksBase: 14, probBase: 86 },
      experienced:       { ctcMin: 32, ctcMax: 55, basePct: 72, weeksBase: 11, probBase: 90 },
    },
    unicorns: {
      fresher_offcampus: { ctcMin: 12, ctcMax: 20, basePct: 75, weeksBase: 15, probBase: 80 },
      fresher_tier1:     { ctcMin: 18, ctcMax: 28, basePct: 73, weeksBase: 11, probBase: 88 },
      experienced:       { ctcMin: 26, ctcMax: 42, basePct: 75, weeksBase: 9,  probBase: 92 },
    },
    gcc_services: {
      fresher_offcampus: { ctcMin: 7,  ctcMax: 11,  basePct: 82, weeksBase: 12, probBase: 85 },
      fresher_tier1:     { ctcMin: 10, ctcMax: 16,  basePct: 80, weeksBase: 9,  probBase: 92 },
      experienced:       { ctcMin: 16, ctcMax: 26,  basePct: 80, weeksBase: 7,  probBase: 95 },
    },
    advice: {
      tier1_product: 'Product AI roles require linear algebra, PyTorch internals, evaluation harnesses, and sub-200ms latency inference pipelines.',
      unicorns: 'High-growth startups look for Generative AI engineers who have deployed real LLM agents with LangChain, pgvector, and FastAPI.',
      gcc_services: 'Global analytics centers test SQL data transformations, exploratory Python (Pandas/NumPy), and scikit-learn predictive models.',
    }
  },
  frontend: {
    name: 'Frontend Engineer',
    icon: '🎨',
    tier1_product: {
      fresher_offcampus: { ctcMin: 12, ctcMax: 20, basePct: 76, weeksBase: 14, probBase: 80 },
      fresher_tier1:     { ctcMin: 16, ctcMax: 26, basePct: 74, weeksBase: 10, probBase: 90 },
      experienced:       { ctcMin: 24, ctcMax: 38, basePct: 76, weeksBase: 8,  probBase: 94 },
    },
    unicorns: {
      fresher_offcampus: { ctcMin: 9,  ctcMax: 15, basePct: 78, weeksBase: 12, probBase: 84 },
      fresher_tier1:     { ctcMin: 13, ctcMax: 20, basePct: 76, weeksBase: 9,  probBase: 92 },
      experienced:       { ctcMin: 19, ctcMax: 30, basePct: 78, weeksBase: 7,  probBase: 95 },
    },
    gcc_services: {
      fresher_offcampus: { ctcMin: 5.5, ctcMax: 8.5, basePct: 84, weeksBase: 9, probBase: 90 },
      fresher_tier1:     { ctcMin: 8,   ctcMax: 12.5, basePct: 82, weeksBase: 7, probBase: 95 },
      experienced:       { ctcMin: 12,  ctcMax: 19, basePct: 82, weeksBase: 6,  probBase: 97 },
    },
    advice: {
      tier1_product: 'Targeting ₹16–26 LPA Frontend: Excel in React 19 compiler internals, browser rendering engines, Web Vitals, and accessible design system components.',
      unicorns: 'Startups want pixel-perfect craft: build slick responsive SPAs with Tailwind, Framer Motion, and optimistic state updates.',
      gcc_services: 'Master core JavaScript ES6+, HTML5 semantic accessibility (WCAG), and reusable component libraries.',
    }
  },
  clouddevops: {
    name: 'Cloud & DevOps Architect',
    icon: '☁️',
    tier1_product: {
      fresher_offcampus: { ctcMin: 14, ctcMax: 22, basePct: 74, weeksBase: 16, probBase: 76 },
      fresher_tier1:     { ctcMin: 18, ctcMax: 28, basePct: 72, weeksBase: 12, probBase: 88 },
      experienced:       { ctcMin: 28, ctcMax: 46, basePct: 75, weeksBase: 9,  probBase: 93 },
    },
    unicorns: {
      fresher_offcampus: { ctcMin: 10, ctcMax: 17, basePct: 76, weeksBase: 13, probBase: 82 },
      fresher_tier1:     { ctcMin: 14, ctcMax: 22, basePct: 74, weeksBase: 10, probBase: 90 },
      experienced:       { ctcMin: 22, ctcMax: 35, basePct: 76, weeksBase: 8,  probBase: 94 },
    },
    gcc_services: {
      fresher_offcampus: { ctcMin: 6,  ctcMax: 10,  basePct: 82, weeksBase: 10, probBase: 88 },
      fresher_tier1:     { ctcMin: 9,  ctcMax: 14,  basePct: 80, weeksBase: 8,  probBase: 94 },
      experienced:       { ctcMin: 14, ctcMax: 22,  basePct: 80, weeksBase: 6,  probBase: 96 },
    },
    advice: {
      tier1_product: 'Focus on multi-region AWS/GCP architecture, Terraform state locks, Kubernetes ingress, and 99.99% high-availability SLOs.',
      unicorns: 'Demonstrate zero-downtime automated GitHub Actions deployments, Docker multi-stage builds, and Prometheus observability.',
      gcc_services: 'Solid Linux CLI administration, bash scripting, basic cloud networking (VPC/Subnets), and CI/CD pipelines.',
    }
  },
  cybersec: {
    name: 'Cybersecurity & SOC Analyst',
    icon: '🔒',
    tier1_product: {
      fresher_offcampus: { ctcMin: 12, ctcMax: 19, basePct: 76, weeksBase: 16, probBase: 75 },
      fresher_tier1:     { ctcMin: 16, ctcMax: 24, basePct: 74, weeksBase: 12, probBase: 87 },
      experienced:       { ctcMin: 24, ctcMax: 38, basePct: 76, weeksBase: 9,  probBase: 92 },
    },
    unicorns: {
      fresher_offcampus: { ctcMin: 9,  ctcMax: 15, basePct: 78, weeksBase: 14, probBase: 80 },
      fresher_tier1:     { ctcMin: 13, ctcMax: 19, basePct: 76, weeksBase: 10, probBase: 89 },
      experienced:       { ctcMin: 18, ctcMax: 28, basePct: 78, weeksBase: 8,  probBase: 93 },
    },
    gcc_services: {
      fresher_offcampus: { ctcMin: 5.5, ctcMax: 9,   basePct: 84, weeksBase: 11, probBase: 88 },
      fresher_tier1:     { ctcMin: 8,   ctcMax: 13,  basePct: 82, weeksBase: 8,  probBase: 93 },
      experienced:       { ctcMin: 12,  ctcMax: 20,  basePct: 82, weeksBase: 6,  probBase: 96 },
    },
    advice: {
      tier1_product: 'Product security requires deep offensive pen-testing, OAuth2/JWT security auditing, and cloud security posture management.',
      unicorns: 'Focus on container security, API vulnerability hunting (OWASP Top 10), and automated SAST/DAST pipeline tooling.',
      gcc_services: 'Master SIEM alert triage in Splunk, Wireshark packet capture analysis, firewall policies, and NIST incident workflows.',
    }
  },
  dataeng: {
    name: 'Data Engineering Specialist',
    icon: '📊',
    tier1_product: {
      fresher_offcampus: { ctcMin: 13, ctcMax: 21, basePct: 75, weeksBase: 16, probBase: 76 },
      fresher_tier1:     { ctcMin: 17, ctcMax: 27, basePct: 73, weeksBase: 11, probBase: 88 },
      experienced:       { ctcMin: 26, ctcMax: 42, basePct: 75, weeksBase: 9,  probBase: 93 },
    },
    unicorns: {
      fresher_offcampus: { ctcMin: 10, ctcMax: 16, basePct: 78, weeksBase: 13, probBase: 81 },
      fresher_tier1:     { ctcMin: 14, ctcMax: 21, basePct: 75, weeksBase: 10, probBase: 89 },
      experienced:       { ctcMin: 20, ctcMax: 32, basePct: 78, weeksBase: 8,  probBase: 94 },
    },
    gcc_services: {
      fresher_offcampus: { ctcMin: 6,  ctcMax: 9.5, basePct: 84, weeksBase: 10, probBase: 88 },
      fresher_tier1:     { ctcMin: 8.5, ctcMax: 13.5, basePct: 82, weeksBase: 8, probBase: 94 },
      experienced:       { ctcMin: 13, ctcMax: 21,  basePct: 82, weeksBase: 6,  probBase: 96 },
    },
    advice: {
      tier1_product: 'Master Apache Spark distributed memory execution, Kafka partitioning, and streaming lakehouses (Delta Lake / Iceberg).',
      unicorns: 'Showcase hands-on real-time clickstream event consumers in Python and dbt dimensional data models in Snowflake/PostgreSQL.',
      gcc_services: 'Excel at complex analytical SQL window functions, relational database indexing, and automated Airflow ETL DAGs.',
    }
  }
};

/* ─────────────── HELPERS ─────────────── */
function matchBadgeColor(m) {
  if (m >= 85) return 'text-green-700 bg-green-50 border border-green-300';
  if (m >= 70) return 'text-amber-700 bg-amber-50 border border-amber-300';
  return 'text-red-700 bg-red-50 border border-red-300';
}

/* ─────────────── LOGIN PAGE ─────────────── */
function LoginPage({ onLogin, users, onRegister, startMode = 'register' }) {
  const [mode, setMode]         = useState(startMode); // 'login' | 'register'
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  function toMode(m) { setMode(m); setError(''); setSuccess(''); setEmail(''); setPassword(''); setConfirm(''); }

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please enter your email and password.'); return; }
    const key = email.toLowerCase().trim();
    const user = users[key];
    if (!user) { setError('No account found. Please register first.'); return; }
    if (user.password !== password) { setError('Incorrect password. Please try again.'); return; }
    const name = email.split('@')[0].replace(/[._-]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
    onLogin(name);
  }

  function handleRegister(e) {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim() || !confirm.trim()) { setError('Please fill in all fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Please enter a valid email address.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    const key = email.toLowerCase().trim();
    if (users[key]) { setError('An account with this email already exists. Please sign in.'); return; }
    onRegister(key, password);
    setSuccess('Account created! You can now sign in.');
    toMode('login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl">🧭</div>
            <span className="text-2xl font-extrabold text-white tracking-wide">CareerCompass</span>
            <span className="bg-blue-600/40 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/40">AI</span>
          </div>
          <p className="text-slate-400 text-sm">Your AI-powered career guidance platform</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {mode === 'login' ? 'Sign in to continue to your dashboard' : 'Register to get started with CareerCompass'}
            </p>
          </div>

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-xs text-green-700 font-medium">
              ✅ {success}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-xs text-red-600 font-medium">
                  ⚠️ {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20"
              >
                Sign In →
              </button>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Confirm password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e=>setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-xs text-red-600 font-medium">
                  ⚠️ {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/20"
              >
                Create Account →
              </button>
            </form>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"/></div>
            <div className="relative text-center"><span className="bg-white px-3 text-xs text-slate-400">or continue with</span></div>
          </div>

          <button
            onClick={()=>onLogin('Demo User')}
            className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-base">👤</span> Continue as Demo User
          </button>

          <p className="text-center text-xs text-slate-400">
            {mode === 'login' ? (
              <>Don't have an account?{' '}
                <button onClick={()=>toMode('register')} className="text-blue-600 hover:underline font-semibold">
                  Create one free
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button onClick={()=>toMode('login')} className="text-blue-600 hover:underline font-semibold">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── RESUME ONBOARDING ─────────────── */
function ResumeOnboarding({ userName, onComplete, onSkip }) {
  const [fileName, setFileName] = useState('');
  const [parsing, setParsing] = useState(false);
  const [result, setResult] = useState(null);
  const [parseError, setParseError] = useState(null);

  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setParsing(true);
    setParseError(null);
    setResult(null);
    try {
      const text = await extractTextFromFile(file);
      setResult(parseResume(text));
    } catch (err) {
      setParseError(err.message || 'Could not read resume. Please try a .txt or text-readable PDF.');
    } finally {
      setParsing(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl">🧭</div>
            <span className="text-2xl font-extrabold text-white">CareerCompass</span>
            <span className="bg-blue-600/40 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/40">AI</span>
          </div>
          <p className="text-slate-300 text-sm">Hi <span className="font-bold text-white">{userName}</span>! Let's set up your profile.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">📄 Upload Your Resume</h2>
            <p className="text-sm text-slate-500 mt-1">
              We'll scan your resume to personalise your dashboard stats, skill gaps, and course recommendations.
            </p>
          </div>

          {/* Upload zone */}
          {!result && (
            <div className="border-2 border-dashed border-blue-300 hover:border-blue-400 rounded-2xl p-8 text-center bg-blue-50/50 transition-colors cursor-pointer">
              <input type="file" accept=".txt,.md,.json,.csv,.pdf" onChange={handleFile} id="onboard-upload" className="hidden" />
              <label htmlFor="onboard-upload" className="cursor-pointer space-y-2 block">
                <div className="text-4xl">{parsing ? '⚙️' : '📤'}</div>
                {parsing ? (
                  <p className="text-sm font-semibold text-blue-600 animate-pulse">Analysing your resume…</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-blue-600">Click to upload your resume</p>
                    <p className="text-xs text-slate-400">Supports .txt, .md, .csv, .pdf formats</p>
                    {fileName && <p className="text-xs text-slate-500 font-medium mt-1">📎 {fileName}</p>}
                  </>
                )}
              </label>
            </div>
          )}

          {/* Parse error */}
          {parseError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
              ⚠️ {parseError}
            </div>
          )}

          {/* Analysis result */}
          {result && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-3xl font-black text-blue-600 w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center text-xl">{result.score}%</div>
                <div>
                  <p className="font-bold text-slate-800">{result.healthStatus}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{result.summaryText}</p>
                </div>
              </div>

              {/* Preview of stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
                  <p className="text-lg font-black text-blue-600">{result.readinessPct}%</p>
                  <p className="text-xs font-semibold text-slate-600">Job Readiness</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                  <p className="text-lg font-black text-purple-600">{result.skillsMatched}/{result.skillsTotal}</p>
                  <p className="text-xs font-semibold text-slate-600">Skills Matched</p>
                </div>
              </div>

              {result.detected.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-emerald-700 mb-1.5">✅ Detected Skills ({result.detected.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.detected.slice(0,10).map(s=>(
                      <span key={s} className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full border border-emerald-200">{s}</span>
                    ))}
                    {result.detected.length > 10 && <span className="text-xs text-slate-400">+{result.detected.length-10} more</span>}
                  </div>
                </div>
              )}

              {result.missing.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-red-600 mb-1.5">⚠️ Top Missing Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing.map(s=>(
                      <span key={s} className="bg-red-50 text-red-600 text-xs px-2.5 py-0.5 rounded-full border border-red-200">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              onClick={onSkip}
              className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold rounded-xl text-sm transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={() => onComplete(result)}
              disabled={!result && !parsing}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {result ? 'Go to Dashboard →' : 'Continue without resume'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────── APP ─────────────── */
export default function App() {
  // dark mode
  const [darkMode, setDarkMode] = useState(false);

  // auth / onboarding (defaults to 'app' so the entire dashboard & features load immediately)
  const [authStep, setAuthStep] = useState('app'); // 'login' | 'onboard' | 'app'
  const [userName, setUserName] = useState('Student');
  const [resumeStats, setResumeStats] = useState(null); // parsed resume data
  // registered users store: { emailKey: { password } } — persisted in localStorage
  const [users, setUsers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cc_users') || '{}'); } catch { return {}; }
  });

  function handleRegister(emailKey, password) {
    setUsers(prev => {
      const next = { ...prev, [emailKey]: { password } };
      try { localStorage.setItem('cc_users', JSON.stringify(next)); } catch {}
      return next;
    });
  }

  const [page, setPage] = useState('dashboard');
  const [clickedCard, setClickedCard] = useState(null); // tracks which feature card is bursting

  // Interactive UI state: Modals, Toasts & 3D Card States
  const [toasts, setToasts] = useState([]);
  const [selectedKpiModal, setSelectedKpiModal] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [radarCategory, setRadarCategory] = useState('all');
  const [simRole, setSimRole] = useState('fullstack');
  const [simCompanyTier, setSimCompanyTier] = useState('tier1_product');
  const [simCandidateTier, setSimCandidateTier] = useState('fresher_offcampus');
  const [simHours, setSimHours] = useState('12');
  const [simBoostActive, setSimBoostActive] = useState(false);

  function toggleCardFlip(id) {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  function showToast(message, type = 'success', icon = '✨') {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }

  function toggleJobBookmark(id) {
    setSavedJobs(s => {
      const exists = s.includes(id);
      const next = exists ? s.filter(x => x !== id) : [...s, id];
      showToast(exists ? 'Removed job from saved items.' : 'Job saved to favorites! ★', 'info', exists ? '🗑️' : '⭐');
      return next;
    });
  }

  // Animate card edges outward then navigate + scroll to top
  function navigateWithBurst(targetPage) {
    setClickedCard(targetPage);
    setTimeout(() => {
      setClickedCard(null);
      setPage(targetPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 320);
  }

  // career paths
  const [selPath, setSelPath] = useState(null);
  // courses — per-user state (enrolled + progress), fresh for every new user session
  const [courseState, setCourseState] = useState(buildDefaultCourseState);

  function enrollCourse(id, url) {
    const course = COURSES_LIST.find(c => c.id === id);
    setCourseState(prev => ({
      ...prev,
      [id]: { ...(prev[id] || {}), enrolled: true, progress: prev[id]?.progress || 0, completedModules: prev[id]?.completedModules || [] }
    }));
    showToast(`Enrolled in ${course?.title || 'course'}! 🚀`, 'success', '🎓');
    if (url) window.open(url, '_blank', 'noreferrer');
  }

  // job matching
  const [jobSearch, setJobSearch] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);

  // Computed dashboard stats from resume (or defaults)
  const stats = resumeStats
    ? {
        readiness: `${resumeStats.readinessPct}%`,
        readinessSub: resumeStats.readinessPct >= 70 ? 'Excellent match!' : 'Keep improving!',
        skills: `${resumeStats.skillsMatched}/${resumeStats.skillsTotal}`,
        skillsSub: 'Core skills verified',
        courses: `${Object.values(courseState).filter(c => c.enrolled || c.progress > 0).length || resumeStats.coursesSignal || COURSES_LIST.length}`,
        coursesSub: 'curated tracks active',
        jobs: `${JOBS.filter(j => j.match >= 75).length}`,
        jobsSub: 'high-match positions',
      }
    : {
        readiness: '0%', readinessSub: 'Upload resume to calculate',
        skills: '0/20',  skillsSub: 'Upload resume to calculate',
        courses: `${COURSES_LIST.length}`, coursesSub: 'curated tracks available',
        jobs: '12',     jobsSub: 'matching positions active',
      };

  // Login → onboard
  function handleLogin(name) { setUserName(name); setAuthStep('onboard'); }
  // Onboarding complete
  function handleOnboardComplete(result) { if(result) setResumeStats(result); setAuthStep('app'); }

  function goHome() {
    setPage('dashboard');
    setSelPath(null);
    setFlippedCards({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Show login or onboarding screens before the main app
  if (authStep === 'login') return <LoginPage onLogin={handleLogin} users={users} onRegister={handleRegister} startMode={Object.keys(users).length === 0 ? 'register' : 'login'} />;
  if (authStep === 'onboard') return <ResumeOnboarding userName={userName} onComplete={handleOnboardComplete} onSkip={() => setAuthStep('app')} />;

  /* ─── NAV ─── */
  function NavBar() {
    const navItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'analyzer', label: 'Resume Analyzer', icon: '📄' },
      { id: 'career-paths', label: 'Career Paths', icon: '🗺️' },
      { id: 'courses', label: 'Courses', icon: '🎓' },
      { id: 'jobs', label: 'Job Matches', icon: '💼' },
      { id: 'roadmap', label: 'Roadmap', icon: '🗓️' },
    ];

    return (
      <header className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {page !== 'dashboard' && (
              <button onClick={goHome} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all">
                ← Dashboard
              </button>
            )}
            <div onClick={goHome} className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">🧭</div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-white">Career<span className="text-blue-400">Compass</span></span>
              <span className="bg-blue-600/30 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">AI</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'dashboard') goHome();
                    else {
                      setSelPath(null);
                      setPage(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    page === item.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* ── Dark Mode Toggle ── */}
            <button
              onClick={()=>setDarkMode(d=>!d)}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`relative w-11 h-6 rounded-full border transition-all duration-300 focus:outline-none flex-shrink-0 ${darkMode ? 'bg-blue-600 border-blue-500' : 'bg-slate-700 border-slate-600'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow transition-transform duration-300 flex items-center justify-center text-[10px] ${darkMode ? 'translate-x-5 bg-slate-900' : 'translate-x-0 bg-white'}`}>
                {darkMode ? '🌙' : '☀️'}
              </span>
            </button>

            {/* ── User Profile / Switch Account ── */}
            <button
              onClick={() => setAuthStep('login')}
              title="Click to Switch User / Sign In"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition"
            >
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 flex items-center justify-center text-[10px] font-bold">
                {userName ? userName[0].toUpperCase() : 'S'}
              </span>
              <span className="hidden sm:inline">{userName || 'Student'}</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  /* ─── PAGE HEADER ─── */
  function PageHeader({ icon, title, desc, backLabel='← Back', onBack }) {
    return (
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{desc}</p>
          </div>
        </div>
        <button onClick={onBack} className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 rounded-xl">
          {backLabel}
        </button>
      </div>
    );
  }

  /* ─── ROADMAP PHASE ─── */
  function PhaseCard({ phase, accentClass }) {
    const circleClass = accentClass || 'bg-blue-600';
    return (
      <div className={`border-l-4 ${accentClass==='bg-blue-600'?'border-blue-400':accentClass==='bg-indigo-600'?'border-indigo-400':accentClass==='bg-purple-600'?'border-purple-400':'border-red-400'} pl-5 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-r-2xl`}>
        <div className="flex items-start justify-between gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white ${circleClass}`}>{phase.phase}</span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">{phase.title}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400">~{phase.weeks} weeks · Priority: {phase.priority}</p>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${phase.priority==='high'?'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400':'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>{phase.priority}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-sky-600 mb-1.5">📚 Skills to Learn</p>
            <div className="flex flex-wrap gap-1">{phase.skills.map(s=><span key={s} className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-xs px-2 py-0.5 rounded-full">{s}</span>)}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-purple-600 mb-1.5">🚀 Project Ideas</p>
            <ul className="space-y-0.5">{phase.projects.map((p,j)=><li key={j} className="text-xs text-slate-600 dark:text-slate-300">• {p}</li>)}</ul>
          </div>
        </div>
        {phase.resources.length>0&&(
          <div className="mt-3">
            <p className="text-xs font-semibold text-emerald-600 mb-1.5">🔗 Resources</p>
            <div className="flex flex-wrap gap-2">
              {phase.resources.map((r,j)=>(
                <a key={j} href={r.url} target="_blank" rel="noreferrer" className="text-xs border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-400 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 px-3 py-1 rounded-full transition-colors">
                  {r.free?'🆓':'💰'} {r.title}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  /* ═══════════════════════════════════════
       RENDER
  ═══════════════════════════════════════ */
  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      <NavBar />

      <main key={page} className="w-full px-6 py-6 space-y-6 page-enter">

        {/* ══ DASHBOARD ══ */}
        {page === 'dashboard' && (
          <div className="space-y-6">

            {/* Hero Banner with Pearlescent White Shade, Floating Glass Bubbles, Glow Auras & Lottie Compass */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/60 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-slate-800 dark:text-white p-8 sm:p-10 rounded-3xl border-2 border-indigo-200/90 dark:border-indigo-800/80 shadow-[0_12px_45px_-10px_rgba(99,102,241,0.22),0_0_25px_rgba(59,130,246,0.14)] card-glow-indigo">
              
              {/* Subtle Decorative Pattern Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

              {/* Ambient Pastel Glow Auras */}
              <div className="absolute -top-16 -left-16 w-80 h-80 bg-gradient-to-br from-blue-300/30 via-indigo-200/25 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 right-1/4 w-80 h-80 bg-gradient-to-tl from-purple-300/25 via-pink-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none" />

              {/* Authentic 3D Glass Sphere Bubbles (In Background Only, Gentle Movement & Speed) */}
              <div className="absolute top-6 right-1/3 w-16 h-16 bubble-3d animate-3d-bubble-1 pointer-events-none" />
              <div className="absolute -bottom-4 left-1/4 w-24 h-24 bubble-3d animate-3d-bubble-2 pointer-events-none" />
              <div className="absolute top-12 left-1/2 w-11 h-11 bubble-3d animate-3d-bubble-3 pointer-events-none" />
              <div className="absolute top-1/4 left-10 w-14 h-14 bubble-3d animate-3d-bubble-1 pointer-events-none" />
              <div className="absolute bottom-10 right-28 w-12 h-12 bubble-3d animate-3d-bubble-2 pointer-events-none" />
              <div className="absolute top-4 right-14 w-9 h-9 bubble-3d animate-3d-bubble-3 pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left side: User greeting & CTA buttons */}
                <div className="max-w-xl space-y-4 flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="w-2 h-2 -ml-3 rounded-full bg-emerald-500" />
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold">AI Copilot Active</span>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Welcome back 👋</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">{userName}</span>
                  </h1>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    Frontend &amp; Full Stack Developer • AI-driven career roadmaps, ATS resume analysis, personalized upskilling &amp; smart job placement.
                  </p>

                  <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
                    <button
                      onClick={()=>navigateWithBurst('analyzer')}
                      className="shimmer-btn px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/45 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                    >
                      <span>🔍 Analyze Resume</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button
                      onClick={()=>navigateWithBurst('career-paths')}
                      className="shimmer-btn px-6 py-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                    >
                      <span>🗺️ Explore Career Tracks</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                    <button
                      onClick={()=>navigateWithBurst('roadmap')}
                      className="px-5 py-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold text-xs rounded-xl border border-indigo-200 dark:border-indigo-800/60 shadow-sm transform hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
                    >
                      <span>🗓️ Milestone Roadmap</span>
                    </button>
                  </div>
                </div>

                {/* Right side: Career Lottie Showcase with proper alignment and position */}
                <div className="flex-shrink-0 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] flex items-center justify-center relative z-10">
                  <div className="w-full h-full flex items-center justify-center drop-shadow-[0_15px_35px_rgba(99,102,241,0.22)]">
                    <Lottie
                      src={careerAnimation}
                      animationData={careerAnimation}
                      loop
                      autoplay
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── SECTION 1: INTERACTIVE KPI DIAGNOSTIC CARDS ── */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Career Performance Metrics
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Click any metric for deep diagnostic</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { key:'readiness', icon:'🎯', val:stats.readiness,  label:'Job Readiness',   sub:stats.readinessSub,  color:'text-blue-600', glow:'card-glow-blue', topBorder:'from-blue-500 to-cyan-400' },
                  { key:'skills',    icon:'⚡', val:stats.skills,     label:'Skills Matched',  sub:stats.skillsSub,     color:'text-purple-600', glow:'card-glow-purple', topBorder:'from-purple-500 to-indigo-500' },
                  { key:'courses',   icon:'📚', val:stats.courses,    label:'Courses Done',    sub:stats.coursesSub,    color:'text-emerald-600', glow:'card-glow-emerald', topBorder:'from-emerald-500 to-teal-400' },
                  { key:'jobs',      icon:'💼', val:stats.jobs,       label:'Target Roles',    sub:stats.jobsSub,       color:'text-rose-600', glow:'card-glow-rose', topBorder:'from-rose-500 to-amber-400' },
                ].map(s=>(
                  <div
                    key={s.label}
                    onClick={() => setSelectedKpiModal(s.key)}
                    className={`group bg-white dark:bg-slate-800 p-5 rounded-2xl relative overflow-hidden cursor-pointer ${s.glow}`}
                    title="Click to view full breakdown"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${s.topBorder}`} />
                    <div className="flex items-start justify-between">
                      <div className="text-2xl group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300">{s.icon}</div>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors flex items-center gap-0.5">
                        Inspect ↗
                      </span>
                    </div>
                    <div className={`text-2xl font-black mt-2 tracking-tight ${s.color}`}>{s.val}</div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-200">{s.label}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-400">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SECTION 2: CORE AI ACCELERATION MODULES ── */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 px-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                    ⚡ Core Engines
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">AI Acceleration Modules</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Streamlined AI tools engineered for skill diagnosis, learning, and placement.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { page:'analyzer',      icon:'📄', badge:'ATS Radar',  bg:'bg-blue-500',    glow:'card-glow-blue',    label:'Resume Analyzer',       desc:'Instant ATS scoring, keyword extraction, and gap radar for engineering resumes.', tags:['ATS Score','Skill Radar'] },
                  { page:'career-paths',  icon:'🗺️', badge:'Roadmaps',   bg:'bg-indigo-500',  glow:'card-glow-indigo',  label:'Career Pathways',       desc:'Four comprehensive roadmaps across Frontend, Full Stack, AI/ML, and Security.', tags:['4 Tracks','Milestones'] },
                  { page:'courses',       icon:'🎓', badge:'Curated',    bg:'bg-teal-500',    glow:'card-glow-teal',    label:'Personalized Courses',  desc:'IBM SkillsBuild & top verified platforms mapped directly to your missing skills.', tags:['Free Certs','IBM Skills'] },
                  { page:'jobs',          icon:'💼', badge:'Ranked',     bg:'bg-rose-500',    glow:'card-glow-rose',    label:'Smart Job Matching',    desc:'Top tech positions scored with AI fit percentage and market salary ranges.', tags:['12 Live Roles','Salary Insights'] },
                ].map(f=>(
                  <div
                    key={f.page}
                    onClick={() => navigateWithBurst(f.page)}
                    className={`bg-white dark:bg-slate-800 rounded-2xl transition-all cursor-pointer group p-6 space-y-3 relative overflow-hidden flex flex-col justify-between ${f.glow}${clickedCard === f.page ? ' card-burst' : ''}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center text-2xl group-hover:scale-125 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
                          {f.icon}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                          {f.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {f.label}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {f.tags.map(t => (
                          <span key={t} className="text-[10px] bg-slate-50 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 px-2 py-0.5 rounded-md font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className={`mt-2 w-full py-2.5 ${f.bg} text-white text-xs font-semibold rounded-xl shadow-md group-hover:shadow-lg transition-all flex items-center justify-center gap-1.5`}>
                      <span>Launch Module</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Career Roadmap Timeline Wide Feature Card */}
              <div
                onClick={() => navigateWithBurst('roadmap')}
                className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 border-2 border-indigo-400/50 shadow-[0_12px_35px_-5px_rgba(99,102,241,0.35),0_0_25px_rgba(99,102,241,0.2)] cursor-pointer group card-glow-indigo relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5"
              >
                <div className="space-y-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
                    🗓️ Milestone Timeline
                  </div>
                  <h3 className="text-lg font-black text-white">Full-Spectrum Career Roadmap Timeline</h3>
                  <p className="text-xs text-slate-300 max-w-2xl">
                    Follow weekly milestone phases, unlock verified capstones, and log your mastery progression across each engineering track.
                  </p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2 flex-shrink-0 shimmer-btn">
                  <span>Open Roadmap Timeline</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* ── SECTION 3: INTERACTIVE 3D FLIP CARDS FOR CAREER TRACKS ── */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 px-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1">
                    🔄 3D Interactive Flip Cards
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Featured Career Blueprints</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Click any 3D card below to flip and inspect compensation, duration, and capstones. Click again to flip back.</p>
                </div>
                <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 shadow-sm">
                  <span>👆</span> Click Card to Flip
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CAREER_PATHS.map(cp => {
                  const isFlipped = !!flippedCards[cp.id];
                  return (
                    <div
                      key={cp.id}
                      className={`flip-card h-[380px] cursor-pointer ${isFlipped ? 'is-flipped' : ''}`}
                      onClick={() => toggleCardFlip(cp.id)}
                    >
                      <div className="flip-card-inner">
                        {/* ── Front Face ── */}
                        <div className={`flip-card-front bg-white dark:bg-slate-800 p-6 border-2 ${cp.border} rounded-2xl shadow-[0_4px_24px_-2px_rgba(99,102,241,0.18),0_0_15px_rgba(99,102,241,0.1)] hover:shadow-[0_12px_32px_-4px_rgba(99,102,241,0.32),0_0_24px_rgba(99,102,241,0.22)] flex flex-col justify-between transition-all group`}>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-4xl p-2 rounded-2xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">{cp.icon}</span>
                              <span className={`text-xs font-black px-3 py-1 rounded-full border ${cp.matchColor} shadow-sm`}>
                                {cp.match}% Fit
                              </span>
                            </div>
                            <div>
                              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {cp.title}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                                {cp.desc}
                              </p>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Stack:</span>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {cp.skills.map(s => (
                                  <span key={s} className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${cp.skillColor}`}>
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm">
                              <span>👆</span> Click card to flip
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md">
                              3D Details
                            </span>
                          </div>
                        </div>

                        {/* ── Back Face ── */}
                        <div className="flip-card-back bg-gradient-to-br from-slate-900 via-slate-850 to-indigo-950 text-white p-6 rounded-2xl border-2 border-indigo-400/80 shadow-[0_8px_32px_rgba(99,102,241,0.4),0_0_22px_rgba(99,102,241,0.25)] flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between border-b border-indigo-500/30 pb-2.5">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Blueprint Specs</span>
                                <h4 className="text-sm font-black text-white">{cp.title}</h4>
                              </div>
                              <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800/80 flex items-center gap-1">
                                <span>↺</span> Flip back
                              </span>
                            </div>

                            <div className="space-y-2.5 text-xs">
                              <div>
                                <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Salary Benchmark</span>
                                <p className="font-extrabold text-emerald-400 text-sm">{cp.salary}</p>
                              </div>
                              <div>
                                <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Estimated Timeline</span>
                                <p className="font-bold text-slate-200">{cp.duration}</p>
                              </div>
                              <div>
                                <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">Signature Capstone</span>
                                <p className="text-slate-300 text-[11px] leading-snug">{cp.capstone}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelPath(cp.id);
                                setPage('career-paths');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-1.5 shimmer-btn"
                            >
                              <span>Open Curriculum Roadmap</span>
                              <span>→</span>
                            </button>
                            <p className="text-center text-[10px] text-indigo-300/80">Click anywhere on card to flip back</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── SECTION 4: STRATEGIC ACTION & PLACEMENT MATRIX ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              {/* Profile Diagnostic Summary */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 space-y-4 card-glow-blue">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg shadow-sm">
                      🎯
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Profile Placement Readiness</h3>
                      <p className="text-[11px] text-slate-400">Current market readiness across top roles</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 shadow-sm">
                    {stats.readiness}
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: stats.readiness }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Top Aligned Track</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Full Stack Developer</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">92% Match Score</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 hover:border-blue-300 transition-colors">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Job Pipeline</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">12 Curated Positions</p>
                    <span className="text-[10px] text-blue-600 font-semibold">Remote &amp; Hybrid</span>
                  </div>
                </div>

                <button
                  onClick={() => navigateWithBurst('analyzer')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Re-analyze Resume with ATS Radar</span>
                  <span>→</span>
                </button>
              </div>

              {/* Recommended Action Next Steps */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 space-y-4 card-glow-emerald">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg shadow-sm">
                      📋
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Guided Career Action Checklist</h3>
                      <p className="text-[11px] text-slate-400">High-impact tasks to reach 90%+ readiness</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    Priority
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div
                    onClick={() => navigateWithBurst('analyzer')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-[10px]">1</span>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">Complete ATS Resume Scoring</p>
                        <p className="text-[10px] text-slate-400">Identify missing technical keywords &amp; format improvements</p>
                      </div>
                    </div>
                    <span className="text-slate-300 group-hover:text-blue-500 transition-colors">→</span>
                  </div>

                  <div
                    onClick={() => navigateWithBurst('courses')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-400 hover:bg-teal-50/30 dark:hover:bg-teal-950/20 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-[10px]">2</span>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 transition-colors">Enroll in an IBM SkillsBuild Track</p>
                        <p className="text-[10px] text-slate-400">Earn free credentials in Machine Learning or Web Development</p>
                      </div>
                    </div>
                    <span className="text-slate-300 group-hover:text-teal-500 transition-colors">→</span>
                  </div>

                  <div
                    onClick={() => navigateWithBurst('jobs')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-950/20 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-[10px]">3</span>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 transition-colors">Review Matched Roles &amp; Bookmark</p>
                        <p className="text-[10px] text-slate-400">Target 85%+ matched roles at Google, Meta, and IBM</p>
                      </div>
                    </div>
                    <span className="text-slate-300 group-hover:text-rose-500 transition-colors">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── SECTION 5: LIVE MARKET TECH DEMAND & SALARY RADAR ── */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                    📈 Market Intelligence
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Live Tech Demand &amp; Salary Radar</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Real-time hiring trends, demand index, and compensation benchmarks across industry leaders.</p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex-wrap">
                  {[
                    { id: 'all', label: 'All Tech' },
                    { id: 'frontend', label: 'Frontend' },
                    { id: 'aiml', label: 'AI & Data' },
                    { id: 'cloud', label: 'Cloud / DevOps' },
                    { id: 'fullstack', label: 'Full Stack' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setRadarCategory(tab.id)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${radarCategory === tab.id ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {MARKET_TECH_TRENDS.filter(item => radarCategory === 'all' || item.cat === radarCategory).map(item => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-5 space-y-3 card-glow-indigo group relative overflow-hidden flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 group-hover:scale-110 transition-transform">{item.icon}</span>
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{item.name}</h4>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                              {item.growth}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
                          {item.level}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">{item.desc}</p>

                      {/* Demand Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400 font-medium">Market Demand Index</span>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.demand}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-700" style={{ width: `${item.demand}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">Median Comp</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{item.salary}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-semibold">Top Hiring</span>
                        <div className="flex gap-1 justify-end">
                          {item.hiring.map(h => (
                            <span key={h} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── SECTION 6: INTERACTIVE INDIAN PLACEMENT & SALARY SIMULATOR ── */}
            <div className="space-y-5 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1 px-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-[11px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Placement &amp; Salary Simulator · Indian Tech Market Calibration</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                    <span>Interactive Placement &amp; Salary Simulator</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                      INR (₹ LPA) Live Engine
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    Simulate realistic CTC compensation packages, in-hand monthly take-home, offer likelihood, and preparation sprint timelines calibrated against Tier-1 Product, Unicorns, and GCCs in India.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white via-purple-50/20 to-indigo-50/30 dark:from-slate-900 dark:via-purple-950/25 dark:to-slate-900 rounded-3xl p-6 sm:p-8 border border-purple-200/70 dark:border-purple-800/60 shadow-xl card-glow-purple space-y-6">
                
                {/* ── Control Grids ── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Left Column: Track & Target Company Tier */}
                  <div className="space-y-4">
                    {/* 1. Track Selector */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <span>1. Target Engineering Track</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'fullstack', label: 'Full Stack', icon: '🖥️' },
                          { id: 'aiml', label: 'AI/ML Eng', icon: '🤖' },
                          { id: 'frontend', label: 'Frontend', icon: '🎨' },
                          { id: 'clouddevops', label: 'Cloud / DevOps', icon: '☁️' },
                          { id: 'cybersec', label: 'Cybersecurity', icon: '🔒' },
                          { id: 'dataeng', label: 'Data Engineer', icon: '📊' },
                        ].map(t => (
                          <button
                            key={t.id}
                            onClick={() => setSimRole(t.id)}
                            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                              simRole === t.id
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/30 scale-[1.02]'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600'
                            }`}
                          >
                            <span className="text-base">{t.icon}</span>
                            <span className="truncate">{t.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 2. Target Company Tier */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <span>2. Target Company Tier</span>
                      </label>
                      <div className="space-y-1.5">
                        {[
                          { id: 'tier1_product', title: 'Tier-1 Product / Top MNCs', desc: 'Google, Microsoft, Amazon, Adobe, Atlassian', icon: '🏛️' },
                          { id: 'unicorns', title: 'Unicorns & High-Growth Startups', desc: 'Swiggy, Zomato, Razorpay, CRED, Zepto', icon: '🦄' },
                          { id: 'gcc_services', title: 'GCCs & High-Value IT Services', desc: 'JPMorgan Chase GCC, Morgan Stanley, TCS Prime', icon: '🏢' },
                        ].map(comp => (
                          <button
                            key={comp.id}
                            onClick={() => setSimCompanyTier(comp.id)}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${
                              simCompanyTier === comp.id
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600'
                            }`}
                          >
                            <span className="text-xl p-1.5 rounded-lg bg-black/10 dark:bg-white/10">{comp.icon}</span>
                            <div className="flex-1 min-w-0">
                              <span className="font-extrabold block truncate">{comp.title}</span>
                              <span className={`text-[10px] block truncate ${simCompanyTier === comp.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                                {comp.desc}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Candidate Background & Dedicated Weekly Effort */}
                  <div className="space-y-4">
                    {/* 3. Candidate Background & College Tier */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <span>3. Candidate Background</span>
                      </label>
                      <div className="space-y-1.5">
                        {[
                          { id: 'fresher_offcampus', label: 'Off-Campus / Tier-3 Fresher', sub: '0–1 Yrs Experience · Resume & Project Focus', icon: '🎓' },
                          { id: 'fresher_tier1', label: 'Tier-1/2 Campus Fresher', sub: 'IIT/NIT/BITS/Top Regional · On-Campus Drive', icon: '🏛️' },
                          { id: 'experienced', label: 'Lateral Tech Switcher', sub: '2–4 Yrs Experience · SDE-1 to SDE-2 Promotion', icon: '🚀' },
                        ].map(bg => (
                          <button
                            key={bg.id}
                            onClick={() => setSimCandidateTier(bg.id)}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-3 ${
                              simCandidateTier === bg.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <span className="text-xl p-1.5 rounded-lg bg-black/10 dark:bg-white/10">{bg.icon}</span>
                            <div className="flex-1 min-w-0">
                              <span className="font-extrabold block truncate">{bg.label}</span>
                              <span className={`text-[10px] block truncate ${simCandidateTier === bg.id ? 'text-blue-100' : 'text-slate-400'}`}>
                                {bg.sub}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 4. Weekly Upskilling & Problem-Solving Effort */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                        <span>4. Weekly Dedicated Prep Effort</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: '5', label: '5 hrs/wk', pace: 'Paced Pace' },
                          { id: '12', label: '12 hrs/wk', pace: 'Recommended' },
                          { id: '25', label: '25+ hrs/wk', pace: 'Intensive Sprint' },
                        ].map(eff => (
                          <button
                            key={eff.id}
                            onClick={() => setSimHours(eff.id)}
                            className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-0.5 ${
                              simHours === eff.id
                                ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-500/25'
                                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600'
                            }`}
                          >
                            <span className="text-xs font-extrabold">{eff.label}</span>
                            <span className={`text-[9px] uppercase font-bold tracking-wider ${simHours === eff.id ? 'text-cyan-100' : 'text-slate-400'}`}>
                              {eff.pace}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Simulation Insight Pill */}
                    <div className="p-3 bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl border border-purple-200/60 dark:border-purple-800/50 text-[11px] text-purple-900 dark:text-purple-300 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">
                        <strong className="font-bold">Indian Tech Insight:</strong> Compensation in India is highly leveraged on DSA problem-solving speed &amp; verified project capstones over mere degree prestige.
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Computed Projections & In-Hand Breakdown */}
                  {(() => {
                    const trackData = INDIAN_SIMULATOR_DATA[simRole] || INDIAN_SIMULATOR_DATA.fullstack;
                    const tierData = trackData[simCompanyTier] || trackData.tier1_product;
                    const metrics = tierData[simCandidateTier] || tierData.fresher_offcampus;

                    // Compute dynamic timeline
                    const multiplier = simHours === '5' ? 1.5 : simHours === '25' ? 0.55 : 1.0;
                    const weeks = Math.max(4, Math.round(metrics.weeksBase * multiplier));

                    // Compute offer probability
                    const probEffortDelta = simHours === '5' ? -5 : simHours === '25' ? +8 : +2;
                    const baseProb = metrics.probBase + probEffortDelta + (simBoostActive ? 4 : 0);
                    const offerProb = Math.min(99, Math.max(50, baseProb));

                    // CTC Breakdown
                    const ctcMin = metrics.ctcMin;
                    const ctcMax = metrics.ctcMax;
                    const baseMin = (ctcMin * (metrics.basePct / 100)).toFixed(1);
                    const baseMax = (ctcMax * (metrics.basePct / 100)).toFixed(1);

                    // Estimated in-hand take-home monthly (after standard TDS slab & EPF deduction)
                    const monthlyMin = Math.round((Number(baseMin) * 100000 * 0.88) / 12);
                    const monthlyMax = Math.round((Number(baseMax) * 100000 * 0.84) / 12);

                    return (
                      <div className="space-y-4 flex flex-col justify-between">
                        {/* Primary Projection Card: CTC Range */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 border-purple-400 dark:border-purple-600 shadow-lg space-y-3 relative overflow-hidden">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                              <IndianRupee className="w-3.5 h-3.5" />
                              Estimated Annual CTC Range
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300">
                              LPA Benchmark
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                              ₹{ctcMin} – {ctcMax} LPA
                            </span>
                          </div>

                          {/* Components Breakdown */}
                          <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1.5 text-xs">
                            <div className="flex justify-between text-slate-600 dark:text-slate-300">
                              <span className="font-medium">Fixed Base Salary ({metrics.basePct}%):</span>
                              <span className="font-bold text-slate-900 dark:text-white">₹{baseMin} – {baseMax} LPA</span>
                            </div>
                            <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                              <span>Variable / Joining / ESOPs:</span>
                              <span className="font-semibold text-purple-600 dark:text-purple-400">~{100 - metrics.basePct}% of CTC</span>
                            </div>
                          </div>
                        </div>

                        {/* Secondary Split Cards: In-Hand Monthly + Prep Timeline */}
                        <div className="grid grid-cols-2 gap-3">
                          {/* In-Hand Monthly Take-Home */}
                          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                              <span>Monthly In-Hand</span>
                              <span>💰</span>
                            </div>
                            <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300">
                              ₹{(monthlyMin / 1000).toFixed(0)}k – {(monthlyMax / 1000).toFixed(0)}k
                            </div>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Est. post TDS &amp; PF</p>
                          </div>

                          {/* Est. Prep Timeline */}
                          <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                              <span>Prep to Offer</span>
                              <span>⏳</span>
                            </div>
                            <div className="text-base sm:text-lg font-black text-indigo-700 dark:text-indigo-300">
                              {weeks} Weeks
                            </div>
                            <p className="text-[10px] text-indigo-600 dark:text-indigo-400">
                              {simHours === '25' ? 'Fast-tracked ⚡' : simHours === '12' ? 'Standard Pace' : 'Part-time Pace'}
                            </p>
                          </div>
                        </div>

                        {/* Interview Readiness Probability Bar */}
                        <div className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                              <Target className="w-3.5 h-3.5 text-emerald-500" />
                              Interview Callback Probability:
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-black">{offerProb}%</span>
                          </div>
                          <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-700"
                              style={{ width: `${offerProb}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Bottom Row: AI Strategy Recommendation + Simulation Boost CTA */}
                {(() => {
                  const trackData = INDIAN_SIMULATOR_DATA[simRole] || INDIAN_SIMULATOR_DATA.fullstack;
                  const adviceText = trackData.advice[simCompanyTier];

                  return (
                    <div className="pt-4 border-t border-purple-200/60 dark:border-purple-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-start gap-2.5 max-w-2xl text-xs text-slate-700 dark:text-slate-300">
                        <span className="p-1 rounded-lg bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 text-sm mt-0.5">
                          💡
                        </span>
                        <div>
                          <span className="font-bold block text-slate-900 dark:text-white">
                            Tailored Hiring Strategy for {trackData.name}:
                          </span>
                          <span className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {adviceText}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSimBoostActive(true);
                          showToast('Simulated target calibrations applied to your roadmap & profile! 🚀', 'success', '⚡');
                          setTimeout(() => setSimBoostActive(false), 2500);
                        }}
                        className={`px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2 whitespace-nowrap shimmer-btn ${
                          simBoostActive ? 'scale-105 ring-4 ring-purple-400' : ''
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Apply Simulation to Roadmap</span>
                        <span>⚡</span>
                      </button>
                    </div>
                  );
                })()}

              </div>
            </div>

          </div>
        )}

        {/* ══ RESUME ANALYZER ══ */}
        {page === 'analyzer' && (
          <ResumePage
            onBack={goHome}
            resumeStats={resumeStats}
            onUpdateResumeStats={(stats) => {
              setResumeStats(stats);
              showToast('✨ Resume metrics synchronized with Career Dashboard!');
            }}
            userName={userName}
            onNavigateToCourses={() => navigateWithBurst('courses')}
            onNavigateToJobs={() => navigateWithBurst('jobs')}
            onNavigateToRoadmap={() => navigateWithBurst('roadmap')}
            onNavigateToCareerPaths={() => navigateWithBurst('career-paths')}
            showToast={showToast}
          />
        )}

        {/* ══ CAREER ROADMAP TIMELINE ══ */}
        {page === 'roadmap' && (
          <CareerRoadmapTimeline
            onBack={goHome}
            resumeStats={resumeStats}
            userName={userName}
            showToast={showToast}
          />
        )}

        {/* ══ CAREER PATHWAYS & BLUEPRINTS ══ */}
        {page === 'career-paths' && (
          <CareerPathsPage
            onBack={goHome}
            resumeStats={resumeStats}
            userName={userName}
            selPath={selPath}
            setSelPath={setSelPath}
            showToast={showToast}
            onNavigateToRoadmap={() => navigateWithBurst('roadmap')}
            onNavigateToCourses={() => navigateWithBurst('courses')}
            onNavigateToJobs={() => navigateWithBurst('jobs')}
          />
        )}

        {/* ══ PERSONALIZED COURSES ══ */}
        {page === 'courses' && (
          <CoursesPage
            courseState={courseState}
            setCourseState={setCourseState}
            resumeStats={resumeStats}
            userName={userName}
            onBack={goHome}
            showToast={showToast}
            enrollCourse={enrollCourse}
          />
        )}

        {/* ══ SMART JOB MATCHING ══ */}
        {page === 'jobs' && (
          <JobsPage
            onBack={goHome}
            resumeStats={resumeStats}
            userName={userName}
            savedJobs={savedJobs}
            setSavedJobs={setSavedJobs}
            showToast={showToast}
            onNavigateToCourses={() => navigateWithBurst('courses')}
          />
        )}

      </main>



      {/* ── KPI DIAGNOSTIC BREAKDOWN POPUP MODAL ── */}
      {selectedKpiModal && (() => {
        const kpiDetails = {
          readiness: {
            title: 'Job Readiness Diagnostic',
            icon: '🎯',
            score: stats.readiness,
            color: 'text-blue-500',
            glow: 'hover-glow-blue',
            desc: 'Your job readiness score measures resume depth, matched technical keywords, project experience, and target role alignment.',
            factors: [
              { name: 'Core Skill Coverage', status: resumeStats ? `${resumeStats.skillsMatched} skills detected` : 'Upload resume to calculate' },
              { name: 'Resume Health', status: resumeStats ? `${resumeStats.score}/100 points` : 'Pending scan' },
              { name: 'Target Role Alignment', status: `${JOBS.filter(j => j.match >= 75).length} roles aligned` },
            ],
            tips: [
              'Add quantifiable metric bullets to your projects (e.g. "reduced latency by 35%").',
              'Inspect required skills on desired job posts and prioritize corresponding courses.',
              'Enroll in recommended IBM SkillsBuild tracks to close critical skill gaps.',
            ],
            cta: 'Analyze Resume Now',
            action: () => { setSelectedKpiModal(null); navigateWithBurst('analyzer'); }
          },
          skills: {
            title: 'Skills Match Diagnostic',
            icon: '⚡',
            score: stats.skills,
            color: 'text-purple-500',
            glow: 'hover-glow-purple',
            desc: 'Calculated by comparing your detected technical skills against top hiring requirements for software engineering.',
            factors: [
              { name: 'Target Role', status: 'Full Stack & Frontend Developer' },
              { name: 'Identified Skills', status: resumeStats?.detected?.slice(0, 4).join(', ') || 'React, JS, CSS' },
              { name: 'Missing Priority Skills', status: resumeStats?.missing?.slice(0, 3).join(', ') || 'TypeScript, Docker, SQL' },
            ],
            tips: [
              'Build a portfolio project featuring databases (SQL/MongoDB) and REST APIs.',
              'Add modern cloud or container tools (Docker, AWS) to stand out.',
              'Highlight TypeScript in your project portfolio and resume to boost ATS detection.',
            ],
            cta: 'View Career Paths',
            action: () => { setSelectedKpiModal(null); navigateWithBurst('career-paths'); }
          },
          courses: {
            title: 'Course Progression Diagnostic',
            icon: '📚',
            score: `${stats.courses} Active`,
            color: 'text-emerald-500',
            glow: 'hover-glow-emerald',
            desc: 'Curated courses from IBM SkillsBuild and top universities tailored to address your specific missing technical skills.',
            factors: [
              { name: 'Enrolled Courses', status: `${Object.values(courseState).filter(c => c.enrolled).length} of ${COURSES_LIST.length} active` },
              { name: 'Completed Courses', status: `${Object.values(courseState).filter(c => c.progress >= 100).length} finished` },
            ],
            tips: [
              'Complete the Machine Learning Fundamentals IBM course for high-demand AI skills.',
              'Take System Design Interview Prep to prepare for mid-level technical screenings.',
              'Finish one course per month to consistently level up your job readiness.',
            ],
            cta: 'Explore Courses',
            action: () => { setSelectedKpiModal(null); navigateWithBurst('courses'); }
          },
          jobs: {
            title: 'Target Placement & Job Matching Diagnostic',
            icon: '💼',
            score: `${stats.jobs} Roles`,
            color: 'text-rose-500',
            glow: 'hover-glow-rose',
            desc: 'Tracks tech job openings that match your verified skill set with competitive salary benchmarks and direct learning links.',
            factors: [
              { name: 'High-Match Openings (≥75%)', status: `${JOBS.filter(j => j.match >= 75).length} matching roles` },
              { name: 'Saved Opportunities', status: `${savedJobs.length} bookmarked` },
            ],
            tips: [
              'Target roles with ≥85% match for the highest interview response rate.',
              'Inspect required skills on desired job posts and prioritize corresponding courses.',
              'Bookmark favorite roles to tailor your capstone projects directly to their requirements.',
            ],
            cta: 'Explore Job Matches',
            action: () => { setSelectedKpiModal(null); navigateWithBurst('jobs'); }
          },
        };

        const item = kpiDetails[selectedKpiModal] || kpiDetails.readiness;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-backdrop">
            <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-modal-pop ${item.glow} space-y-5`}>
              <button
                onClick={() => setSelectedKpiModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 flex items-center justify-center transition-colors text-sm font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 pr-8">
                <span className="text-4xl">{item.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className={`text-2xl font-black ${item.color}`}>{item.score}</p>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 space-y-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1">Diagnostic Factors</p>
                {item.factors.map((f, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{f.name}:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{f.status}</span>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">💡 Tips to Boost Score</p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {item.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">▸</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedKpiModal(null)}
                  className="flex-1 py-3 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={item.action}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-blue-500/25 shimmer-btn"
                >
                  {item.cta} →
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── INTERACTIVE FLOATING TOAST NOTIFICATIONS ── */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs font-semibold animate-toast hover-glow-blue"
          >
            <span className="text-xl">{t.icon}</span>
            <span className="flex-1">{t.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(item => item.id !== t.id))}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm ml-1 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
