import React, { useState } from 'react';
import ResumePage from './pages/ResumePage';

/* ─────────────── SKILL MASTER LIST (shared) ─────────────── */
const MASTER_SKILLS = [
  'React','Node.js','JavaScript','Python','Java','C++','HTML','CSS',
  'Tailwind','SQL','MongoDB','Express','Git','GitHub','REST APIs',
  'TypeScript','Docker','AWS','System Design','Testing','CI/CD',
  'Angular','Vue','Django','Flask','PostgreSQL','MySQL','Redis',
  'Kubernetes','Azure','GCP','GraphQL','Spring','Next.js','Figma',
];

function parseResume(text) {
  const lower = text.toLowerCase();
  const detected = MASTER_SKILLS.filter(s => lower.includes(s.toLowerCase()));
  const missing  = MASTER_SKILLS.filter(s => !lower.includes(s.toLowerCase()));
  const score    = Math.min(100, Math.max(35, Math.round((detected.length / 8) * 100)));
  // Job readiness: skill coverage out of top 20 core skills
  const CORE_20 = MASTER_SKILLS.slice(0, 20);
  const matched = CORE_20.filter(s => lower.includes(s.toLowerCase()));
  // Courses: count how many course keywords appear (rough signal)
  const COURSE_KEYWORDS = ['machine learning','full stack','typescript','docker','system design','cybersecurity'];
  const coursesSignal = COURSE_KEYWORDS.filter(k => lower.includes(k)).length;
  const readinessPct = Math.min(100, Math.round((matched.length / CORE_20.length) * 100));
  return {
    score,
    detected,
    missing: missing.slice(0, 6),
    healthStatus: score >= 80 ? 'Excellent 🌟' : score >= 60 ? 'Good 👍' : 'Needs Improvement ⚠️',
    summaryText: score >= 80
      ? 'Your resume shows strong technical coverage and deep domain alignment!'
      : score >= 60
      ? 'Solid core skills detected. Add missing modern tools to reach top tier strength.'
      : 'Consider adding more core technical keywords and domain skills to boost your score.',
    // dashboard stats derived from resume
    readinessPct,
    skillsMatched: matched.length,
    skillsTotal: CORE_20.length,
    coursesSignal,
  };
}

/* ─────────────── DATA ─────────────── */

const CAREER_PATHS = [
  {
    id: 'fullstack',
    icon: '🖥️',
    title: 'Full Stack Developer',
    desc: 'Build end-to-end web apps with React & Node.js',
    match: 92,
    matchColor: 'text-blue-600 bg-blue-50 border-blue-200',
    border: 'border-blue-400',
    skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
    skillColor: 'bg-blue-50 text-blue-700 border-blue-200',
    phases: [
      { phase:1, title:'Frontend Core (React)', weeks:'4–5', priority:'high', skills:['React','React Router','Hooks','Axios','State Management'], projects:['Dashboard UI','Auth pages'], resources:[{title:'React Docs',url:'https://react.dev/',free:true}] },
      { phase:2, title:'Node.js & Express Backend', weeks:'4–6', priority:'high', skills:['Node.js','Express.js','REST API','Middleware','JWT Auth'], projects:['REST API for blog','Auth service'], resources:[{title:'Express.js Guide',url:'https://expressjs.com/',free:true},{title:'Node.js Docs',url:'https://nodejs.org/en/docs',free:true}] },
      { phase:3, title:'Databases', weeks:'3–4', priority:'high', skills:['MongoDB/Mongoose','PostgreSQL/Prisma','CRUD','Schema Design'], projects:['CRUD app MongoDB','Relational data model'], resources:[{title:'MongoDB University',url:'https://learn.mongodb.com/',free:true}] },
      { phase:4, title:'Full Stack Integration', weeks:'4–5', priority:'high', skills:['CORS','File Uploads','Email (Nodemailer)','Error Handling'], projects:['MERN e-commerce','Social media clone'], resources:[{title:'Traversy Media MERN',url:'https://www.youtube.com/@TraversyMedia',free:true}] },
      { phase:5, title:'DevOps & Deployment', weeks:'2–3', priority:'medium', skills:['Docker','CI/CD','Render/Railway','Env Management'], projects:['Dockerise MERN app','GitHub Actions pipeline'], resources:[{title:'Docker Getting Started',url:'https://docs.docker.com/get-started/',free:true}] },
    ],
  },
  {
    id: 'aiml',
    icon: '🤖',
    title: 'AI/ML Engineer',
    desc: 'Design machine learning models and AI pipelines',
    match: 78,
    matchColor: 'text-purple-600 bg-purple-50 border-purple-200',
    border: 'border-purple-400',
    skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'],
    skillColor: 'bg-purple-50 text-purple-700 border-purple-200',
    phases: [
      { phase:1, title:'Python for Data Science', weeks:'3–4', priority:'high', skills:['Python 3','NumPy','Pandas','Matplotlib','Jupyter'], projects:['EDA on Kaggle dataset','Data viz dashboard'], resources:[{title:'Kaggle Python Course',url:'https://www.kaggle.com/learn/python',free:true}] },
      { phase:2, title:'Machine Learning Fundamentals', weeks:'5–6', priority:'high', skills:['Scikit-learn','Supervised Learning','Model Evaluation','Feature Engineering'], projects:['House price prediction','Churn classifier'], resources:[{title:'fast.ai ML Course',url:'https://course.fast.ai/',free:true}] },
      { phase:3, title:'Deep Learning with PyTorch', weeks:'5–7', priority:'high', skills:['PyTorch Tensors','Neural Networks','CNNs','Transformers','Transfer Learning'], projects:['Image classifier (ResNet)','Sentiment analysis model'], resources:[{title:'PyTorch Tutorials',url:'https://pytorch.org/tutorials/',free:true}] },
      { phase:4, title:'LLMs & Generative AI', weeks:'4–5', priority:'high', skills:['Transformer Architecture','HuggingFace','Prompt Engineering','LangChain','RAG Pipelines'], projects:['Document Q&A chatbot (RAG)','AI summariser'], resources:[{title:'HuggingFace NLP Course',url:'https://huggingface.co/learn/nlp-course',free:true}] },
      { phase:5, title:'MLOps & Production AI', weeks:'3–4', priority:'medium', skills:['FastAPI for ML','Docker for ML','MLflow','Vector DBs','Monitoring'], projects:['Deploy ML model as REST API','Deploy LangChain agent'], resources:[{title:'MLflow Docs',url:'https://mlflow.org/docs/latest/index.html',free:true}] },
    ],
  },
  {
    id: 'frontend',
    icon: '🎨',
    title: 'Frontend Developer',
    desc: 'Craft pixel-perfect UIs with modern frameworks',
    match: 88,
    matchColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
    border: 'border-cyan-400',
    skills: ['React', 'TypeScript', 'Tailwind', 'Figma'],
    skillColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    phases: [
      { phase:1, title:'Web Foundations', weeks:'4–6', priority:'high', skills:['HTML5','CSS3','Flexbox','Grid','Responsive Design'], projects:['Personal portfolio','Landing page clone'], resources:[{title:'freeCodeCamp HTML & CSS',url:'https://www.freecodecamp.org/',free:true},{title:'The Odin Project',url:'https://www.theodinproject.com/',free:true}] },
      { phase:2, title:'JavaScript ES6+', weeks:'4–5', priority:'high', skills:['Arrow Functions','Promises/Async-Await','DOM Manipulation','Fetch API'], projects:['Todo app (vanilla JS)','Weather app using API'], resources:[{title:'javascript.info',url:'https://javascript.info/',free:true}] },
      { phase:3, title:'React & Component Architecture', weeks:'5–7', priority:'high', skills:['JSX','Hooks','Context API','React Router','Custom Hooks'], projects:['Movie search app','E-commerce product listing'], resources:[{title:'React Official Docs',url:'https://react.dev/',free:true}] },
      { phase:4, title:'Styling & Tooling', weeks:'2–3', priority:'medium', skills:['Tailwind CSS','CSS Modules','Vite/Webpack','ESLint & Prettier'], projects:['Redesign project with Tailwind','Component library'], resources:[{title:'Tailwind CSS Docs',url:'https://tailwindcss.com/docs',free:true}] },
      { phase:5, title:'Next.js & Production Skills', weeks:'4–5', priority:'medium', skills:['SSR/SSG','App Router','API Routes','TypeScript','Vercel Deployment'], projects:['Blog with Next.js + MDX','Full landing page with SEO'], resources:[{title:'Next.js Official Tutorial',url:'https://nextjs.org/learn',free:true}] },
    ],
  },
  {
    id: 'cybersec',
    icon: '🔒',
    title: 'Cybersecurity Engineer',
    desc: 'Protect systems with ethical hacking & security',
    match: 65,
    matchColor: 'text-red-600 bg-red-50 border-red-200',
    border: 'border-red-400',
    skills: ['Linux', 'Networking', 'Kali', 'SIEM'],
    skillColor: 'bg-red-50 text-red-700 border-red-200',
    phases: [
      { phase:1, title:'Networking Fundamentals', weeks:'4–5', priority:'high', skills:['TCP/IP','DNS/DHCP','OSI Model','Firewalls','VPN'], projects:['Home lab network setup','Packet capture with Wireshark'], resources:[{title:'CompTIA Network+ Guide',url:'https://www.comptia.org/certifications/network',free:false}] },
      { phase:2, title:'Linux & Command Line', weeks:'3–4', priority:'high', skills:['Bash Scripting','File Permissions','SSH','Cron Jobs','Log Analysis'], projects:['Automate system audit script','Set up secure SSH server'], resources:[{title:'OverTheWire Bandit',url:'https://overthewire.org/wargames/bandit/',free:true}] },
      { phase:3, title:'Ethical Hacking Basics', weeks:'5–6', priority:'high', skills:['Kali Linux','Nmap','Metasploit','SQLi/XSS','OWASP Top 10'], projects:['CTF challenges (HackTheBox)','Web app pen test on DVWA'], resources:[{title:'HackTheBox',url:'https://www.hackthebox.com/',free:true},{title:'TryHackMe',url:'https://tryhackme.com/',free:true}] },
      { phase:4, title:'SIEM & Incident Response', weeks:'3–4', priority:'medium', skills:['Splunk','ELK Stack','SOC Workflow','Threat Intelligence','Forensics Basics'], projects:['Set up ELK SIEM dashboard','Simulate phishing incident response'], resources:[{title:'Splunk Free Training',url:'https://www.splunk.com/en_us/training.html',free:true}] },
      { phase:5, title:'Certifications & Career', weeks:'4–6', priority:'medium', skills:['CompTIA Security+','CEH','OSCP Prep','Cloud Security','Zero Trust'], projects:['Security+ exam prep','Build security portfolio'], resources:[{title:'CompTIA Security+',url:'https://www.comptia.org/certifications/security',free:false}] },
    ],
  },
];

const COURSES_LIST = [
  { id:'ml-fund', platform:'IBM SkillsBuild', platformColor:'text-purple-600', level:'Intermediate', title:'Machine Learning Fundamentals', tag:'🔥 Python / TensorFlow', progress:45, enrolled:true, color:'border-purple-400', btnColor:'bg-purple-600 hover:bg-purple-500', url:'https://skillsbuild.org' },
  { id:'fullstack-web', platform:'IBM SkillsBuild', platformColor:'text-purple-600', level:'Beginner', title:'Full Stack Web Development', tag:'🔥 React / Node.js', progress:70, enrolled:true, color:'border-blue-400', btnColor:'bg-blue-600 hover:bg-blue-500', url:'https://skillsbuild.org' },
  { id:'ts-mastery', platform:'Udemy', platformColor:'text-orange-500', level:'Intermediate', title:'TypeScript Mastery', tag:'🔥 TypeScript', progress:30, enrolled:false, color:'border-cyan-400', btnColor:'bg-cyan-600 hover:bg-cyan-500', url:'https://udemy.com' },
  { id:'docker-k8s', platform:'IBM SkillsBuild', platformColor:'text-purple-600', level:'Advanced', title:'Docker & Kubernetes Basics', tag:'🔥 DevOps', progress:15, enrolled:false, color:'border-amber-400', btnColor:'bg-amber-500 hover:bg-amber-400', url:'https://skillsbuild.org' },
  { id:'sysdesign', platform:'Educative', platformColor:'text-green-600', level:'Advanced', title:'System Design Interview Prep', tag:'🔥 Architecture', progress:20, enrolled:false, color:'border-green-400', btnColor:'bg-green-600 hover:bg-green-500', url:'https://educative.io' },
  { id:'cybersec-ess', platform:'IBM SkillsBuild', platformColor:'text-purple-600', level:'Beginner', title:'Cybersecurity Essentials', tag:'🔥 Security', progress:55, enrolled:false, color:'border-red-400', btnColor:'bg-red-600 hover:bg-red-500', url:'https://skillsbuild.org' },
];

const JOBS = [
  { id:1, title:'React Developer', company:'TechCorp', type:'Remote', salary:'$90,000', match:92, matchColor:'text-green-700 bg-green-100 border-green-300', skills:['React','JavaScript','CSS'], why:"Your React and JavaScript skills align with this role's top requirements." },
  { id:2, title:'Full Stack Engineer', company:'InnovateLabs', type:'Hybrid', salary:'$105,000', match:87, matchColor:'text-green-700 bg-green-100 border-green-300', skills:['Node.js','React','MongoDB'], why:"Your Node.js and React skills align with this role's top requirements." },
  { id:3, title:'Frontend Developer', company:'PixelWorks', type:'Remote', salary:'$80,000', match:85, matchColor:'text-green-700 bg-green-100 border-green-300', skills:['Vue.js','TypeScript','Tailwind'], why:"Your Vue.js and TypeScript skills align with this role's top requirements." },
  { id:4, title:'AI/ML Engineer', company:'DeepMind Co.', type:'On-site', salary:'$130,000', match:74, matchColor:'text-amber-700 bg-amber-100 border-amber-300', skills:['Python','TensorFlow','PyTorch'], why:"Your Python and data analysis skills are partially aligned with this role." },
  { id:5, title:'Cybersecurity Analyst', company:'SecureNet', type:'Remote', salary:'$95,000', match:68, matchColor:'text-amber-700 bg-amber-100 border-amber-300', skills:['Networking','Ethical Hacking','Linux'], why:"You have foundational skills but need more security-specific experience." },
  { id:6, title:'DevOps Engineer', company:'CloudBase', type:'Hybrid', salary:'$115,000', match:79, matchColor:'text-green-700 bg-green-100 border-green-300', skills:['Docker','Kubernetes','AWS'], why:"Your deployment and containerisation exposure aligns well here." },
];

const INTERVIEW_ROLES = [
  { id:'react', label:'React Developer', color:'border-blue-400 text-blue-700', active:'bg-blue-600 text-white',
    rounds:[
      { title:'JavaScript Fundamentals', type:'Conceptual', qs:[
        {q:'What is the difference between var, let, and const?',hint:'Scope, hoisting, reassignment.'},
        {q:'Explain how closures work in JavaScript.',hint:'Function retaining access to its outer scope.'},
        {q:'What is the event loop and how does JS handle async operations?',hint:'Call stack, Web APIs, task queue, microtask queue.'},
        {q:'Explain prototypal inheritance in JavaScript.',hint:'Every object has a [[Prototype]] chain.'},
      ]},
      { title:'React & Component Model', type:'Conceptual', qs:[
        {q:'What is the Virtual DOM and how does reconciliation work?',hint:'Diffing algorithm, fiber, commit phase.'},
        {q:'Explain the difference between useEffect and useLayoutEffect.',hint:'Timing relative to browser paint.'},
        {q:'When would you use useReducer over useState?',hint:'Complex state transitions, multiple sub-values.'},
        {q:'What are React keys and why are they important?',hint:'Identity across re-renders, stable reference.'},
      ]},
      { title:'Coding Challenge', type:'Coding', qs:[
        {q:'Implement a debounce function from scratch.',hint:'clearTimeout + setTimeout inside a closure.'},
        {q:'Build useLocalStorage(key, initialValue) custom hook.',hint:'useState initialised from localStorage, sync on change.'},
        {q:'Flatten a deeply nested array without Array.flat().',hint:'Recursive reduce or stack-based approach.'},
        {q:'Deep-clone a JavaScript object.',hint:'Handle nested objects, arrays, null, and primitives.'},
      ]},
    ]
  },
  { id:'fullstack', label:'Full Stack Engineer', color:'border-indigo-400 text-indigo-700', active:'bg-indigo-600 text-white',
    rounds:[
      { title:'Backend & Node.js', type:'Conceptual', qs:[
        {q:'What is the Node.js event loop? How is it different from the browser?',hint:'libuv phases: timers → I/O → idle → poll → check → close.'},
        {q:'Explain middleware in Express.js and how the chain works.',hint:'next() passes control, error middleware takes 4 args.'},
        {q:'What is the difference between authentication and authorization?',hint:'Who you are vs. what you are allowed to do.'},
        {q:'How does JWT authentication work end-to-end?',hint:'Sign on login, send in header, verify on protected routes.'},
      ]},
      { title:'Databases & Data Modeling', type:'Conceptual', qs:[
        {q:'When would you choose SQL over NoSQL, and vice versa?',hint:'ACID, relations, schema vs. flexibility, scale.'},
        {q:'Explain database indexing and when to use composite indexes.',hint:'B-tree, query pattern, cardinality, write overhead.'},
        {q:'What is database normalization? Explain 1NF, 2NF, 3NF.',hint:'Eliminate redundancy, partial and transitive dependencies.'},
        {q:'How do you handle N+1 query problems in an ORM?',hint:'Eager loading, joins, DataLoader pattern.'},
      ]},
      { title:'System Design & Coding', type:'System Design + Coding', qs:[
        {q:'Design a URL shortener service (like bit.ly).',hint:'Hash function, collision handling, DB schema, redirect flow, caching.'},
        {q:'Implement rate limiting middleware for an Express API.',hint:'In-memory counter with TTL, or token bucket algorithm.'},
        {q:'How would you implement pagination in a REST API efficiently?',hint:'Cursor-based vs offset, index on sort column.'},
        {q:'Write a function to validate and sanitize user input before DB insert.',hint:'Whitelist approach, trim, type check, escape special chars.'},
      ]},
    ]
  },
  { id:'aiml', label:'AI/ML Engineer', color:'border-purple-400 text-purple-700', active:'bg-purple-600 text-white',
    rounds:[
      { title:'ML Fundamentals', type:'Conceptual', qs:[
        {q:'What is the bias-variance tradeoff?',hint:'Underfitting vs. overfitting, regularization, cross-validation.'},
        {q:'Explain gradient descent and its variants (SGD, Adam, RMSProp).',hint:'Learning rate, momentum, adaptive learning rates, convergence.'},
        {q:'What is overfitting and what techniques prevent it?',hint:'Dropout, regularization (L1/L2), early stopping, more data.'},
        {q:'How do you handle class imbalance in a classification problem?',hint:'SMOTE, class weights, threshold tuning, precision-recall tradeoff.'},
      ]},
      { title:'LLMs & Generative AI', type:'Conceptual', qs:[
        {q:'What is RAG and when would you use it over fine-tuning?',hint:'External knowledge base, embeddings, cosine similarity, freshness.'},
        {q:'Explain the difference between prompt engineering, fine-tuning, and RLHF.',hint:'Prompt: no training; fine-tune: supervised; RLHF: human reward signal.'},
        {q:'What are hallucinations in LLMs and how do you mitigate them?',hint:'Grounding, temperature, RAG, self-consistency, fact-checking chains.'},
        {q:'How do vector databases work? Compare Pinecone, Chroma, FAISS.',hint:'ANN indexing, HNSW, IVF, similarity metrics.'},
      ]},
      { title:'Coding & MLOps', type:'Coding + MLOps', qs:[
        {q:'Write Python code to load a CSV, handle missing values, and encode categoricals.',hint:'pandas dropna/fillna, LabelEncoder or pd.get_dummies.'},
        {q:'How would you serve an ML model as a REST API in production?',hint:'FastAPI, model loading at startup, pydantic input schema, async inference.'},
        {q:'Describe a full MLOps pipeline from data to deployment.',hint:'Data versioning (DVC), experiment tracking (MLflow), CI/CD, monitoring.'},
        {q:'How do you evaluate an LLM-based application beyond accuracy?',hint:'RAGAS, G-Eval, human eval, latency, cost, faithfulness, relevance.'},
      ]},
    ]
  },
  { id:'cybersec', label:'Cybersecurity Analyst', color:'border-red-400 text-red-700', active:'bg-red-600 text-white',
    rounds:[
      { title:'Security Fundamentals', type:'Conceptual', qs:[
        {q:'What is the difference between symmetric and asymmetric encryption?',hint:'AES vs RSA, key exchange, performance tradeoffs.'},
        {q:'Explain the CIA Triad in cybersecurity.',hint:'Confidentiality, Integrity, Availability.'},
        {q:'What is SQL Injection and how do you prevent it?',hint:'Parameterised queries, prepared statements, input validation.'},
        {q:'How does a man-in-the-middle attack work?',hint:'ARP spoofing, SSL stripping, certificate pinning as defence.'},
      ]},
      { title:'Network & System Security', type:'Conceptual', qs:[
        {q:'Explain the OSI model and where security applies at each layer.',hint:'Layer 3: firewalls, Layer 4: TCP filtering, Layer 7: WAF.'},
        {q:'What is a zero-day vulnerability?',hint:'Unknown to vendor, no patch available, exploit in the wild.'},
        {q:'How does penetration testing differ from vulnerability scanning?',hint:'Pen test: manual exploitation; vuln scan: automated detection.'},
        {q:'What is the principle of least privilege?',hint:'Grant minimum permissions needed for a task.'},
      ]},
    ]
  },
];

/* ─────────────── HELPERS ─────────────── */
function matchBadgeColor(m) {
  if (m >= 85) return 'text-green-700 bg-green-50 border border-green-300';
  if (m >= 70) return 'text-amber-700 bg-amber-50 border border-amber-300';
  return 'text-red-700 bg-red-50 border border-red-300';
}

/* ─────────────── LOGIN PAGE ─────────────── */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) { setError('Please enter your email and password.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setError('');
    // Derive a display name from email
    const name = email.split('@')[0].replace(/[._\-]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
    onLogin(name);
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
            <h2 className="text-2xl font-bold text-slate-800">Welcome back</h2>
            <p className="text-sm text-slate-500 mt-1">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
            Don't have an account?{' '}
            <button onClick={()=>onLogin('New User')} className="text-blue-600 hover:underline font-semibold">
              Create one free
            </button>
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

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setParsing(true);
    const reader = new FileReader();
    reader.onload = ev => {
      setTimeout(() => {
        setResult(parseResume(ev.target.result));
        setParsing(false);
      }, 600);
    };
    reader.readAsText(file);
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
              <input type="file" accept=".txt,.md,.json,.csv" onChange={handleFile} id="onboard-upload" className="hidden" />
              <label htmlFor="onboard-upload" className="cursor-pointer space-y-2 block">
                <div className="text-4xl">{parsing ? '⚙️' : '📤'}</div>
                {parsing ? (
                  <p className="text-sm font-semibold text-blue-600 animate-pulse">Analysing your resume…</p>
                ) : (
                  <>
                    <p className="text-sm font-semibold text-blue-600">Click to upload your resume</p>
                    <p className="text-xs text-slate-400">Supports .txt, .md, .csv formats</p>
                    {fileName && <p className="text-xs text-slate-500 font-medium mt-1">📎 {fileName}</p>}
                  </>
                )}
              </label>
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
  // auth / onboarding
  const [authStep, setAuthStep] = useState('login'); // 'login' | 'onboard' | 'app'
  const [userName, setUserName] = useState('Student');
  const [resumeStats, setResumeStats] = useState(null); // parsed resume data

  const [page, setPage] = useState('dashboard');
  // career paths
  const [selPath, setSelPath] = useState(null);
  // courses (no sub-state needed, just list)
  // github
  const [ghUsername, setGhUsername] = useState('https://github.com/hasikavasavi176/CareerCompass');
  const [ghLoading, setGhLoading] = useState(false);
  const [ghResult, setGhResult] = useState(null);
  // job matching
  const [jobSearch, setJobSearch] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  // interview
  const [intRole, setIntRole] = useState(null);
  const [intRound, setIntRound] = useState(0);
  const [intQ, setIntQ] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [interviewsDone, setInterviewsDone] = useState(0);

  // Computed dashboard stats from resume (or defaults)
  const stats = resumeStats
    ? {
        readiness: `${resumeStats.readinessPct}%`,
        readinessSub: resumeStats.readinessPct >= 70 ? 'Good progress!' : 'Keep improving!',
        skills: `${resumeStats.skillsMatched}/${resumeStats.skillsTotal}`,
        skillsSub: 'Keep learning',
        courses: `${resumeStats.coursesSignal}`,
        coursesSub: `out of 6 enrolled`,
        interviews: String(interviewsDone),
        interviewsSub: interviewsDone > 0 ? `${interviewsDone} completed!` : 'Start practising',
      }
    : {
        readiness: '0%', readinessSub: 'Upload resume to calculate',
        skills: '0/20',  skillsSub: 'Upload resume to calculate',
        courses: '0',    coursesSub: 'out of 6 enrolled',
        interviews: String(interviewsDone),
        interviewsSub: interviewsDone > 0 ? `${interviewsDone} completed!` : 'Start practising',
      };

  // Login → onboard
  function handleLogin(name) { setUserName(name); setAuthStep('onboard'); }
  // Onboarding complete
  function handleOnboardComplete(result) { if(result) setResumeStats(result); setAuthStep('app'); }

  function goHome() { setPage('dashboard'); setSelPath(null); setIntRole(null); setIntRound(0); setIntQ(0); setShowHint(false); }

  // Show login or onboarding screens before the main app
  if (authStep === 'login') return <LoginPage onLogin={handleLogin} />;
  if (authStep === 'onboard') return <ResumeOnboarding userName={userName} onComplete={handleOnboardComplete} onSkip={() => setAuthStep('app')} />;

  /* ─── NAV ─── */
  function NavBar() {
    return (
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {page !== 'dashboard' && (
              <button onClick={goHome} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all">
                ← Back to Dashboard
              </button>
            )}
            <div onClick={goHome} className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-sm">🧭</div>
              <span className="text-xl font-extrabold tracking-wide text-white">CareerCompass</span>
              <span className="bg-blue-600/30 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-1 bg-slate-800/60 p-1 rounded-xl border border-slate-700/50">
              <button onClick={goHome} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${page==='dashboard'?'bg-blue-600 text-white shadow':'text-slate-300 hover:text-white'}`}>🏠 Home</button>
              <button onClick={()=>setPage('analyzer')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${page==='analyzer'?'bg-blue-600 text-white shadow':'text-slate-300 hover:text-white'}`}>📄 Resume Analyzer</button>
            </nav>
            <span className="bg-slate-800 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700">Demo</span>
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
            <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
            <p className="text-sm text-slate-500">{desc}</p>
          </div>
        </div>
        <button onClick={onBack} className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl">
          {backLabel}
        </button>
      </div>
    );
  }

  /* ─── ROADMAP PHASE ─── */
  function PhaseCard({ phase, accentClass }) {
    const circleClass = accentClass || 'bg-blue-600';
    return (
      <div className={`border-l-4 ${accentClass==='bg-blue-600'?'border-blue-400':accentClass==='bg-indigo-600'?'border-indigo-400':accentClass==='bg-purple-600'?'border-purple-400':'border-red-400'} pl-5 pr-4 py-4 bg-slate-50 rounded-r-2xl`}>
        <div className="flex items-start justify-between gap-2 flex-wrap mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white ${circleClass}`}>{phase.phase}</span>
            <div>
              <h3 className="font-bold text-slate-800">{phase.title}</h3>
              <p className="text-xs text-slate-400">~{phase.weeks} weeks · Priority: {phase.priority}</p>
            </div>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${phase.priority==='high'?'bg-red-100 text-red-600':'bg-slate-200 text-slate-600'}`}>{phase.priority}</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-sky-600 mb-1.5">📚 Skills to Learn</p>
            <div className="flex flex-wrap gap-1">{phase.skills.map(s=><span key={s} className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full">{s}</span>)}</div>
          </div>
          <div>
            <p className="text-xs font-semibold text-purple-600 mb-1.5">🚀 Project Ideas</p>
            <ul className="space-y-0.5">{phase.projects.map((p,j)=><li key={j} className="text-xs text-slate-600">• {p}</li>)}</ul>
          </div>
        </div>
        {phase.resources.length>0&&(
          <div className="mt-3">
            <p className="text-xs font-semibold text-emerald-600 mb-1.5">🔗 Resources</p>
            <div className="flex flex-wrap gap-2">
              {phase.resources.map((r,j)=>(
                <a key={j} href={r.url} target="_blank" rel="noreferrer" className="text-xs border border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full transition-colors">
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <NavBar />

      <main className="max-w-7xl mx-auto p-6 space-y-6">

        {/* ══ DASHBOARD ══ */}
        {page === 'dashboard' && (
          <div className="space-y-6">

            {/* Hero */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Welcome back 👋</span>
                <h1 className="text-3xl font-extrabold tracking-tight">{userName}</h1>
                <p className="text-sm text-slate-300 font-medium">Frontend &amp; Full Stack Developer • Resume last updated recently</p>
                <div className="pt-3 flex flex-wrap gap-3">
                  <button onClick={()=>setPage('analyzer')} className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
                    🔍 Analyze Resume
                  </button>
                  <button onClick={()=>setPage('mock-interview')} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2">
                    🚀 Start Mock Interview
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {icon:'🎯',val:stats.readiness,  label:'Job Readiness',   sub:stats.readinessSub,  color:'text-blue-600'},
                {icon:'⚡',val:stats.skills,     label:'Skills Matched',  sub:stats.skillsSub,     color:'text-purple-600'},
                {icon:'📚',val:stats.courses,    label:'Courses Done',    sub:stats.coursesSub,    color:'text-emerald-600'},
                {icon:'🎤',val:stats.interviews, label:'Mock Interviews', sub:stats.interviewsSub, color:'text-amber-600'},
              ].map(s=>(
                <div key={s.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-2xl">{s.icon}</div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.val}</div>
                  <div className="text-xs font-bold text-slate-700">{s.label}</div>
                  <div className="text-[11px] text-slate-400">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Feature cards — 6 tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { page:'analyzer',     icon:'📄', bg:'bg-blue-500',   label:'Resume Analyzer',      desc:'Upload your resume and get AI-powered skill gap analysis instantly.' },
                { page:'career-paths', icon:'🗺️', bg:'bg-indigo-500', label:'Career Paths',         desc:'Discover the best career paths based on your skills and interests.' },
                { page:'courses',      icon:'🎓', bg:'bg-teal-500',   label:'Personalized Courses', desc:'IBM SkillsBuild & top courses curated for your missing skills.' },
                { page:'mock-interview',icon:'🎙️',bg:'bg-green-500',  label:'Mock Interview',       desc:'Practice with AI-generated role-specific interview questions.' },
                { page:'github',       icon:'🐙', bg:'bg-orange-500', label:'GitHub Analysis',      desc:'Connect your GitHub to auto-detect skills from your projects.' },
                { page:'jobs',         icon:'💼', bg:'bg-red-500',    label:'Smart Job Matching',   desc:'Find jobs that match your skills with AI percentage scoring.' },
              ].map(f=>(
                <div key={f.page} onClick={()=>setPage(f.page)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all cursor-pointer group p-6 space-y-3">
                  <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">{f.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  <button className={`mt-1 px-4 py-1.5 ${f.bg} text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-opacity`}>Open →</button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ══ RESUME ANALYZER ══ */}
        {page === 'analyzer' && (
          <ResumePage onBack={goHome} />
        )}

        {/* ══ CAREER PATHS — picker ══ */}
        {page === 'career-paths' && !selPath && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <PageHeader icon="🗺️" title="Career Paths" desc="Discover the best career paths based on your skills. Click a card to open the full roadmap." onBack={goHome} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {CAREER_PATHS.map(cp=>(
                <button key={cp.id} onClick={()=>setSelPath(cp.id)}
                  className={`text-left p-6 border-2 ${cp.border} rounded-2xl bg-white hover:shadow-lg transition-all group space-y-3`}>
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{cp.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:underline">{cp.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{cp.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cp.skills.map(s=><span key={s} className={`text-xs px-2.5 py-0.5 rounded-full border ${cp.skillColor}`}>{s}</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ══ CAREER PATHS — detail ══ */}
        {page === 'career-paths' && selPath && (()=>{
          const cp = CAREER_PATHS.find(c=>c.id===selPath);
          const accentMap = {frontend:'bg-cyan-600',fullstack:'bg-blue-600',aiml:'bg-purple-600',cybersec:'bg-red-600'};
          const accent = accentMap[selPath]||'bg-blue-600';
          return (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{cp.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{cp.title}</h2>
                    <p className="text-sm text-slate-500">{cp.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>setSelPath(null)} className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl">← All Paths</button>
                  <button onClick={goHome} className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl">🏠 Dashboard</button>
                </div>
              </div>
              <div className="space-y-4">
                {cp.phases.map(ph=><PhaseCard key={ph.phase} phase={ph} accentClass={accent} />)}
              </div>
            </div>
          );
        })()}

        {/* ══ PERSONALIZED COURSES ══ */}
        {page === 'courses' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <PageHeader icon="🎓" title="Personalized Courses" desc="IBM SkillsBuild & top platform courses curated for your skill gaps" onBack={goHome} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {COURSES_LIST.map(c=>(
                <div key={c.id} className={`border-2 ${c.color} rounded-2xl p-5 space-y-3 bg-white`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${c.platformColor}`}>{c.platform}</span>
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{c.level}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm">{c.title}</h3>
                  <p className="text-xs text-slate-500">{c.tag}</p>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-500">Progress</span>
                      <span className={`font-bold ${c.progress>=60?'text-emerald-600':c.progress>=30?'text-amber-600':'text-red-500'}`}>{c.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full">
                      <div className={`h-2 rounded-full ${c.progress>=60?'bg-emerald-500':c.progress>=30?'bg-amber-400':'bg-red-400'}`} style={{width:`${c.progress}%`}} />
                    </div>
                  </div>
                  {c.enrolled ? (
                    <a href={c.url} target="_blank" rel="noreferrer"
                      className="block w-full text-center py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-colors">
                      ✅ Enrolled · Continue
                    </a>
                  ) : (
                    <a href={c.url} target="_blank" rel="noreferrer"
                      className={`block w-full text-center py-2 ${c.btnColor} text-white text-xs font-semibold rounded-xl transition-colors`}>
                      + Enroll Now
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ GITHUB ANALYSIS ══ */}
        {page === 'github' && (()=>{
          // auto-run analysis when page opens for the first time
          async function runGhAnalysis(inputVal) {
            const raw = (inputVal ?? ghUsername).trim();
            if (!raw) return;
            // Extract username — first path segment after github.com
            const username = raw.replace(/^https?:\/\/github\.com\//i,'').split('/')[0].replace(/\/+$/,'');
            if (!username) return;
            setGhLoading(true); setGhResult(null);
            try {
              const userRes = await fetch(`https://api.github.com/users/${username}`);
              if(!userRes.ok) throw new Error('User not found');
              const userData = await userRes.json();
              const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
              const reposData = reposRes.ok ? await reposRes.json() : [];
              const totalStars = Array.isArray(reposData) ? reposData.reduce((sum,r)=>sum+(r.stargazers_count||0),0) : 0;
              const langCount = {};
              if(Array.isArray(reposData)){
                for(const repo of reposData){
                  if(repo.language) langCount[repo.language] = (langCount[repo.language]||0)+1;
                }
              }
              const totalLangRepos = Object.values(langCount).reduce((a,b)=>a+b,0)||1;
              const topLangs = Object.entries(langCount).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([lang,cnt])=>({lang,pct:Math.round((cnt/totalLangRepos)*100)}));
              const SKILL_KEYWORDS = ['JavaScript','TypeScript','Python','Java','C++','C','Go','Rust','Ruby','PHP','Swift','Kotlin',
                'React','Vue','Angular','Node.js','Express','Django','Flask','Spring','Next.js','Svelte',
                'HTML','CSS','Tailwind','Bootstrap','SQL','MongoDB','PostgreSQL','MySQL','Redis',
                'Docker','Kubernetes','AWS','Azure','GCP','Git','GraphQL','REST'];
              const detectedSet = new Set(Object.keys(langCount));
              if(Array.isArray(reposData)){
                for(const repo of reposData){
                  const searchText = ((repo.name||'')+' '+(repo.description||'')+' '+(Array.isArray(repo.topics)?repo.topics.join(' '):'')).toLowerCase();
                  for(const skill of SKILL_KEYWORDS){ if(searchText.includes(skill.toLowerCase())) detectedSet.add(skill); }
                }
              }
              const skills = [...detectedSet].filter(s=>SKILL_KEYWORDS.includes(s)||Object.keys(langCount).includes(s));
              setGhResult({ username, repos: userData.public_repos, stars: totalStars, skills: skills.length>0?skills:Object.keys(langCount), topLangs });
            } catch(err) {
              setGhResult({ error: err.message || 'Failed to fetch GitHub data' });
            } finally {
              setGhLoading(false);
            }
          }

          return (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <PageHeader icon="🐙" title="GitHub Skill Analysis" desc="Connect your GitHub profile to auto-detect skills from real projects" onBack={goHome} />
            <div className="max-w-xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-5">
                <div className="text-5xl">🐙</div>
                <h3 className="text-xl font-bold text-slate-800">Connect Your GitHub</h3>
                <p className="text-sm text-slate-500">We'll analyze your public repositories and extract your technology stack</p>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={ghUsername}
                    onChange={e=>setGhUsername(e.target.value)}
                    onKeyDown={e=>e.key==='Enter'&&runGhAnalysis()}
                    placeholder="https://github.com/username or just username"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  <button
                    onClick={()=>runGhAnalysis()}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {ghLoading ? <span className="animate-pulse">🔍 Analyzing...</span> : <><span>🔍</span> Analyze GitHub Profile</>}
                  </button>
                  {!ghResult && !ghLoading && (
                    <button
                      onClick={()=>runGhAnalysis()}
                      className="w-full py-2 text-xs text-blue-600 hover:underline"
                    >
                      ▶ Auto-analyze hasikavasavi176
                    </button>
                  )}
                </div>
              </div>

              {/* Result */}
              {ghResult && (
                ghResult.error ? (
                  <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-5 text-center">
                    <span className="text-2xl">❌</span>
                    <p className="text-sm font-semibold text-red-700 mt-2">{ghResult.error}</p>
                    <p className="text-xs text-slate-500 mt-1">Check the username/URL and try again.</p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">✅</span>
                        <div>
                          <h4 className="font-bold text-slate-800">@{ghResult.username}</h4>
                          <p className="text-xs text-slate-500">{ghResult.repos} public repos · {ghResult.stars} stars</p>
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-emerald-700 mb-2">🔍 Detected Skills from Repositories</p>
                      <div className="flex flex-wrap gap-1.5">
                        {ghResult.skills.length > 0
                          ? ghResult.skills.map(s=><span key={s} className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full border border-emerald-300">{s}</span>)
                          : <span className="text-xs text-slate-500">No languages detected in public repositories.</span>
                        }
                      </div>
                    </div>
                    {ghResult.topLangs && ghResult.topLangs.length > 0 && (
                      <div className="bg-white border border-slate-200 rounded-2xl p-5">
                        <p className="text-xs font-semibold text-slate-600 mb-3">📊 Language Distribution</p>
                        <div className="space-y-2">
                          {ghResult.topLangs.map(l=>(
                            <div key={l.lang}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-medium text-slate-700">{l.lang}</span>
                                <span className="text-slate-500">{l.pct}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full">
                                <div className="h-2 bg-blue-500 rounded-full" style={{width:`${l.pct}%`}} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
          );
        })()}

        {/* ══ SMART JOB MATCHING ══ */}
        {page === 'jobs' && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <PageHeader icon="💼" title="AI Smart Job Matching" desc="Jobs ranked by your skill match percentage" onBack={goHome} />
            {/* Search */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={jobSearch}
                onChange={e=>setJobSearch(e.target.value)}
                placeholder="Search jobs by title or company..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {JOBS.filter(j=>!jobSearch||j.title.toLowerCase().includes(jobSearch.toLowerCase())||j.company.toLowerCase().includes(jobSearch.toLowerCase())).map(j=>(
                <div key={j.id} className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-white hover:shadow-md transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-blue-600 text-sm">{j.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">🏢 {j.company}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${matchBadgeColor(j.match)}`}>{j.match}% Match</span>
                      <button onClick={()=>setSavedJobs(s=>s.includes(j.id)?s.filter(x=>x!==j.id):[...s,j.id])}
                        className={`text-lg ${savedJobs.includes(j.id)?'text-yellow-500':'text-slate-300 hover:text-yellow-400'} transition-colors`}>★</button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>📍 {j.type}</span>
                    <span>💰 {j.salary}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {j.skills.map(s=><span key={s} className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full">{s}</span>)}
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600">
                    ✨ <span className="font-medium">Why this matches you:</span> {j.why}
                  </div>
                  <button className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors">
                    View &amp; Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ MOCK INTERVIEW — role picker ══ */}
        {page === 'mock-interview' && !intRole && (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <PageHeader icon="🎙️" title="AI Mock Interview" desc="Practice role-specific interview questions with AI feedback" onBack={goHome} />
            <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="text-5xl">🎙️</div>
                <h3 className="text-xl font-bold text-slate-800">Choose Your Interview Role</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {INTERVIEW_ROLES.map(r=>(
                  <button key={r.id}
                    onClick={()=>{ setIntRole(r.id); setIntRound(0); setIntQ(0); setShowHint(false); }}
                    className={`px-5 py-4 border-2 rounded-xl font-semibold text-sm transition-all hover:shadow-md ${r.color}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ MOCK INTERVIEW — session ══ */}
        {page === 'mock-interview' && intRole && (()=>{
          const role = INTERVIEW_ROLES.find(r=>r.id===intRole);
          const round = role.rounds[intRound];
          const question = round.qs[intQ];
          const totalQ = round.qs.length;
          const isLastQ = intQ === totalQ - 1;
          const isLastRound = intRound === role.rounds.length - 1;

          function next() { setShowHint(false); if(!isLastQ) setIntQ(q=>q+1); else if(!isLastRound){ setIntRound(r=>r+1); setIntQ(0); } }
          function prev() { setShowHint(false); if(intQ>0) setIntQ(q=>q-1); else if(intRound>0){ setIntRound(r=>r-1); setIntQ(role.rounds[intRound-1].qs.length-1); } }

          return (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className={`text-xs font-bold ${role.color.split(' ')[1]}`}>🎙️ {role.label}</span>
                  <h2 className="text-2xl font-bold text-slate-800 mt-0.5">Mock Interview Session</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>{ setIntRole(null); setIntRound(0); setIntQ(0); setShowHint(false); }} className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl">← All Roles</button>
                  <button onClick={goHome} className="text-xs font-semibold px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl">🏠 Dashboard</button>
                </div>
              </div>

              {/* Round tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {role.rounds.map((r,i)=>(
                  <button key={i} onClick={()=>{ setIntRound(i); setIntQ(0); setShowHint(false); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${intRound===i? role.active : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    Round {i+1}: {r.title}
                  </button>
                ))}
              </div>

              {/* Meta & progress */}
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700`}>{round.type}</span>
                <span className="text-slate-500">Question {intQ+1} / {totalQ}</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full">
                <div className={`h-1.5 rounded-full transition-all ${role.active.split(' ')[0]}`} style={{width:`${((intQ+1)/totalQ)*100}%`}} />
              </div>

              {/* Question card */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-4">
                <p className="text-xs text-slate-400 uppercase tracking-wider">Round {intRound+1} · {round.title}</p>
                <h3 className="text-lg font-bold text-blue-300 leading-relaxed">"{question.q}"</h3>
                {showHint && (
                  <div className="bg-slate-800 border border-slate-600 rounded-xl p-4 text-sm text-amber-300">
                    💡 <span className="font-semibold">Hint:</span> {question.hint}
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button onClick={()=>setShowHint(h=>!h)} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded-lg transition-colors">
                    {showHint?'🙈 Hide Hint':'💡 Show Hint'}
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors">
                    🎙️ Record Answer
                  </button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button onClick={prev} disabled={intRound===0&&intQ===0}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  ← Previous
                </button>
                <div className="flex gap-1">
                  {round.qs.map((_,i)=>(
                    <button key={i} onClick={()=>{ setIntQ(i); setShowHint(false); }}
                      className={`w-2 h-2 rounded-full transition-colors ${i===intQ? role.active.split(' ')[0] : 'bg-slate-300 hover:bg-slate-400'}`} />
                  ))}
                </div>
                {isLastQ&&isLastRound ? (
                  <button onClick={()=>{ setInterviewsDone(n=>n+1); setIntRole(null); setIntRound(0); setIntQ(0); setShowHint(false); }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors">
                    ✅ Finish
                  </button>
                ) : (
                  <button onClick={next}
                    className={`px-4 py-2 text-white text-xs font-semibold rounded-lg transition-colors ${role.active.split(' ')[0]} hover:opacity-90`}>
                    {isLastQ?'Next Round →':'Next →'}
                  </button>
                )}
              </div>

              {/* Q list */}
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">All Questions — {round.title}</p>
                <div className="space-y-2">
                  {round.qs.map((rq,i)=>(
                    <button key={i} onClick={()=>{ setIntQ(i); setShowHint(false); }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs border transition-colors ${i===intQ?`border-current font-semibold ${role.color.split(' ')[1]} bg-slate-50`:'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      <span className="font-bold mr-2">{i+1}.</span>{rq.q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </main>
    </div>
  );
}
