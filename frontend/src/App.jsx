import React, { useEffect, useState, useRef } from 'react';

// ─── Sample Data ─────────────────────────────────────────────────────────────
const SAMPLE_JOBS = [
  { id: 1, title: 'React Developer', company: 'TechCorp', location: 'Remote', salary: '$90,000', match: 92, tags: ['React', 'JavaScript', 'CSS'] },
  { id: 2, title: 'Full Stack Engineer', company: 'InnovateLabs', location: 'Hybrid', salary: '$105,000', match: 87, tags: ['Node.js', 'React', 'MongoDB'] },
  { id: 3, title: 'Frontend Developer', company: 'PixelWorks', location: 'Remote', salary: '$80,000', match: 85, tags: ['Vue.js', 'TypeScript', 'Tailwind'] },
  { id: 4, title: 'AI/ML Engineer', company: 'DeepMind Co.', location: 'On-site', salary: '$130,000', match: 74, tags: ['Python', 'TensorFlow', 'PyTorch'] },
  { id: 5, title: 'Cybersecurity Analyst', company: 'SecureNet', location: 'Remote', salary: '$95,000', match: 68, tags: ['Networking', 'Ethical Hacking', 'Linux'] },
  { id: 6, title: 'DevOps Engineer', company: 'CloudBase', location: 'Hybrid', salary: '$115,000', match: 79, tags: ['Docker', 'Kubernetes', 'AWS'] },
];

const CAREER_PATHS = [
  { title: 'Full Stack Developer', match: 92, icon: '🖥️', color: '#3b82f6', desc: 'Build end-to-end web apps with React & Node.js', skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'] },
  { title: 'AI/ML Engineer', match: 78, icon: '🤖', color: '#8b5cf6', desc: 'Design machine learning models and AI pipelines', skills: ['Python', 'TensorFlow', 'Pandas', 'Scikit-learn'] },
  { title: 'Frontend Developer', match: 88, icon: '🎨', color: '#06b6d4', desc: 'Craft pixel-perfect UIs with modern frameworks', skills: ['React', 'TypeScript', 'Tailwind', 'Figma'] },
  { title: 'Cybersecurity Engineer', match: 65, icon: '🔐', color: '#ef4444', desc: 'Protect systems with ethical hacking & security', skills: ['Linux', 'Networking', 'Kali', 'SIEM'] },
];

const COURSES = [
  { title: 'Machine Learning Fundamentals', skill: 'Python / TensorFlow', difficulty: 'Intermediate', progress: 45, platform: 'IBM SkillsBuild', color: '#8b5cf6' },
  { title: 'Full Stack Web Development', skill: 'React / Node.js', difficulty: 'Beginner', progress: 70, platform: 'IBM SkillsBuild', color: '#3b82f6' },
  { title: 'TypeScript Mastery', skill: 'TypeScript', difficulty: 'Intermediate', progress: 30, platform: 'Udemy', color: '#06b6d4' },
  { title: 'Docker & Kubernetes Basics', skill: 'DevOps', difficulty: 'Advanced', progress: 15, platform: 'IBM SkillsBuild', color: '#f59e0b' },
  { title: 'System Design Interview Prep', skill: 'Architecture', difficulty: 'Advanced', progress: 20, platform: 'Educative', color: '#10b981' },
  { title: 'Cybersecurity Essentials', skill: 'Security', difficulty: 'Beginner', progress: 55, platform: 'IBM SkillsBuild', color: '#ef4444' },
];

const INTERVIEW_QUESTIONS = {
  'React Developer': [
    { q: 'Explain the Virtual DOM and how React uses it for efficient rendering.', hint: 'Mention reconciliation, diffing algorithm, and re-renders.' },
    { q: 'What are React hooks? Explain useState and useEffect with examples.', hint: 'Cover state management, side effects, and cleanup functions.' },
    { q: 'How would you optimize a slow React application?', hint: 'Talk about React.memo, useMemo, useCallback, code splitting.' },
    { q: 'Describe the difference between controlled and uncontrolled components.', hint: 'Focus on form handling and state control.' },
  ],
  'Full Stack Engineer': [
    { q: 'How do you design a RESTful API? What are the best practices?', hint: 'Mention HTTP methods, status codes, versioning, auth.' },
    { q: 'Explain the difference between SQL and NoSQL databases.', hint: 'Cover use cases, scalability, ACID vs BASE.' },
    { q: 'How would you handle authentication and authorization in a Node.js app?', hint: 'JWT, OAuth, session management, bcrypt.' },
    { q: 'What is microservices architecture and when would you use it?', hint: 'Contrast with monolith, mention Docker, communication patterns.' },
  ],
  'AI/ML Engineer': [
    { q: 'What is the difference between supervised, unsupervised, and reinforcement learning?', hint: 'Give real-world examples for each.' },
    { q: 'Explain overfitting and how you would prevent it.', hint: 'Dropout, regularization, cross-validation, more data.' },
    { q: 'Walk me through building a neural network from scratch.', hint: 'Layers, activation functions, backpropagation, optimizer.' },
    { q: 'How would you evaluate a machine learning model?', hint: 'Precision, recall, F1, ROC-AUC, confusion matrix.' },
  ],
  'Cybersecurity Analyst': [
    { q: 'What is the difference between symmetric and asymmetric encryption?', hint: 'AES vs RSA, key exchange, performance trade-offs.' },
    { q: 'How would you respond to a ransomware incident?', hint: 'Containment, eradication, recovery, post-incident analysis.' },
    { q: 'Explain SQL injection and how to prevent it.', hint: 'Parameterized queries, input validation, WAF.' },
    { q: 'What is Zero Trust security architecture?', hint: 'Never trust always verify, least privilege, microsegmentation.' },
  ],
};

const RESUME_STRENGTHS = ['React.js', 'JavaScript ES6+', 'Node.js', 'REST APIs', 'Git & GitHub', 'CSS/Tailwind'];
const RESUME_MISSING = ['TypeScript', 'Docker', 'System Design', 'AWS/Cloud', 'CI/CD Pipelines', 'Testing (Jest)'];

const GITHUB_SKILLS = ['JavaScript', 'Python', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML/CSS'];
const GITHUB_REPOS = [
  { name: 'ecommerce-app', lang: 'JavaScript', stars: 12, desc: 'Full stack e-commerce with React & Node' },
  { name: 'ml-classifier', lang: 'Python', stars: 8, desc: 'Image classifier using TensorFlow' },
  { name: 'portfolio-site', lang: 'TypeScript', stars: 5, desc: 'Personal portfolio with animations' },
  { name: 'chat-app', lang: 'JavaScript', stars: 19, desc: 'Real-time chat using Socket.io' },
];

// ─── Reusable Components ─────────────────────────────────────────────────────

function ProgressBar({ value, color = '#3b82f6', height = 8 }) {
  return (
    <div style={{ backgroundColor: '#e5e7eb', borderRadius: 999, height, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, backgroundColor: color, height: '100%', borderRadius: 999, transition: 'width 0.8s ease' }} />
    </div>
  );
}

function Badge({ label, color = '#3b82f6' }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: 999, fontSize: '0.75rem',
      fontWeight: 600, backgroundColor: color + '18', color, border: `1px solid ${color}40`, marginRight: 6, marginBottom: 6,
    }}>{label}</span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: 16, padding: '24px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
      border: '1px solid #f1f5f9', ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ icon, title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.6rem' }}>{icon}</span> {title}
      </h2>
      {subtitle && <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '0.9rem' }}>{subtitle}</p>}
    </div>
  );
}

function MatchBadge({ match }) {
  const color = match >= 85 ? '#16a34a' : match >= 70 ? '#d97706' : '#64748b';
  return (
    <span style={{ backgroundColor: color + '15', color, border: `1px solid ${color}40`, padding: '4px 10px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 700 }}>
      {match}% Match
    </span>
  );
}

// ─── Dashboard Overview ───────────────────────────────────────────────────────
function DashboardView({ setActiveTab }) {
  const stats = [
    { label: 'Job Readiness', value: '78%', icon: '🎯', color: '#3b82f6', sub: 'Good progress!' },
    { label: 'Skills Matched', value: '14/20', icon: '⚡', color: '#8b5cf6', sub: 'Keep learning' },
    { label: 'Courses Done', value: '3', icon: '📚', color: '#06b6d4', sub: 'out of 6 enrolled' },
    { label: 'Mock Interviews', value: '2', icon: '🎤', color: '#10b981', sub: 'Practice more' },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: 20, padding: '36px 32px', marginBottom: 28, color: '#fff', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'rgba(56,189,248,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -60, right: 80, width: 140, height: 140, background: 'rgba(139,92,246,0.08)', borderRadius: '50%' }} />
        <p style={{ margin: '0 0 4px', color: '#94a3b8', fontSize: '0.9rem' }}>Welcome back 👋</p>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.8rem', fontWeight: 800 }}>Student</h1>
        <p style={{ margin: '0 0 24px', color: '#cbd5e1' }}>Frontend & Full Stack Developer · Resume last updated 2 days ago</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => setActiveTab('resume')} style={heroBtn('#38bdf8', '#0f172a')}>🔍 Analyze Resume</button>
          <button onClick={() => setActiveTab('interview')} style={heroBtn('transparent', '#fff', '1px solid rgba(255,255,255,0.3)')}>🎤 Start Mock Interview</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <Card key={s.label} style={{ textAlign: 'center', padding: '20px 16px' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>{s.label}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {[
          { tab: 'resume', icon: '📄', title: 'Resume Analyzer', desc: 'Upload your resume and get AI-powered skill gap analysis instantly.', color: '#3b82f6' },
          { tab: 'career', icon: '🗺️', title: 'Career Paths', desc: 'Discover the best career paths based on your skills and interests.', color: '#8b5cf6' },
          { tab: 'courses', icon: '🎓', title: 'Personalized Courses', desc: 'IBM SkillsBuild & top courses curated for your missing skills.', color: '#06b6d4' },
          { tab: 'interview', icon: '🎤', title: 'Mock Interview', desc: 'Practice with AI-generated role-specific interview questions.', color: '#10b981' },
          { tab: 'github', icon: '🐙', title: 'GitHub Analysis', desc: 'Connect your GitHub to auto-detect skills from your projects.', color: '#f59e0b' },
          { tab: 'jobs', icon: '💼', title: 'Smart Job Matching', desc: 'Find jobs that match your skills with AI percentage scoring.', color: '#ef4444' },
        ].map(item => (
          <Card key={item.tab} style={{ cursor: 'pointer', transition: 'transform 0.15s', ':hover': { transform: 'translateY(-2px)' } }}
            onClick={() => setActiveTab(item.tab)}>
            <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: item.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 14 }}>{item.icon}</div>
            <h3 style={{ margin: '0 0 6px', color: '#0f172a', fontSize: '1rem', fontWeight: 700 }}>{item.title}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</p>
            <button onClick={() => setActiveTab(item.tab)} style={{ marginTop: 16, padding: '7px 16px', backgroundColor: item.color, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
              Open →
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function heroBtn(bg, color, border = 'none') {
  return {
    padding: '10px 22px', backgroundColor: bg, color, border, borderRadius: 10,
    cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem',
  };
}

// ─── Resume Analyzer ──────────────────────────────────────────────────────────
function ResumeAnalyzerView() {
  const [stage, setStage] = useState('upload'); // upload | analyzing | results
  const [fileName, setFileName] = useState('');
  const fileRef = useRef();

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    setStage('analyzing');
    setTimeout(() => setStage('results'), 2200);
  };

  return (
    <div>
      <SectionTitle icon="📄" title="Resume Analyzer" subtitle="Upload your resume and get instant AI-powered skill gap analysis" />

      {stage === 'upload' && (
        <Card style={{ textAlign: 'center', padding: '60px 40px', border: '2px dashed #cbd5e1' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>📂</div>
          <h3 style={{ margin: '0 0 8px', color: '#1e293b' }}>Upload Your Resume</h3>
          <p style={{ color: '#64748b', marginBottom: 28 }}>Supports PDF, DOCX, TXT — AI will extract and analyze your skills</p>
          <input type="file" ref={fileRef} onChange={handleFile} accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} />
          <button onClick={() => fileRef.current.click()} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>
            📎 Choose File
          </button>
          <p style={{ marginTop: 16, color: '#94a3b8', fontSize: '0.8rem' }}>Your data is secure and never shared</p>
        </Card>
      )}

      {stage === 'analyzing' && (
        <Card style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🤖</div>
          <h3 style={{ color: '#1e293b' }}>Analyzing <em>{fileName}</em>…</h3>
          <p style={{ color: '#64748b' }}>Our AI is scanning your skills, experience and projects</p>
          <div style={{ margin: '24px auto', width: '60%' }}>
            <ProgressBar value={75} color="#3b82f6" height={10} />
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Extracting skills · Comparing with market · Building roadmap</p>
        </Card>
      )}

      {stage === 'results' && (
        <div style={{ display: 'grid', gap: 20 }}>
          {/* Score */}
          <Card style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'conic-gradient(#3b82f6 0% 72%, #e5e7eb 72% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 76, height: 76, borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#3b82f6' }}>72%</span>
                <span style={{ fontSize: '0.65rem', color: '#64748b' }}>Score</span>
              </div>
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', color: '#0f172a' }}>Resume Health: Good 👍</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Your resume is strong in frontend skills. Improve backend and cloud skills to boost your score.</p>
            </div>
            <button onClick={() => setStage('upload')} style={{ marginLeft: 'auto', padding: '8px 18px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, color: '#475569' }}>
              Re-upload
            </button>
          </Card>

          {/* Strengths & Missing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Card>
              <h3 style={{ margin: '0 0 16px', color: '#16a34a', fontSize: '1rem' }}>✅ Strengths Detected</h3>
              <div>{RESUME_STRENGTHS.map(s => <Badge key={s} label={s} color="#16a34a" />)}</div>
            </Card>
            <Card>
              <h3 style={{ margin: '0 0 16px', color: '#ef4444', fontSize: '1rem' }}>⚠️ Missing Skills</h3>
              <div>{RESUME_MISSING.map(s => <Badge key={s} label={s} color="#ef4444" />)}</div>
            </Card>
          </div>

          {/* Roadmap */}
          <Card>
            <h3 style={{ margin: '0 0 20px', color: '#0f172a' }}>🗺️ AI Skill Gap Roadmap</h3>
            {RESUME_MISSING.map((skill, i) => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>{skill}</span>
                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{20 + i * 12}% needed</span>
                  </div>
                  <ProgressBar value={20 + i * 12} color="#3b82f6" />
                </div>
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── GitHub Analysis ──────────────────────────────────────────────────────────
function GitHubView() {
  const [stage, setStage] = useState('input');
  const [username, setUsername] = useState('');

  const handleAnalyze = () => {
    if (!username.trim()) return;
    setStage('analyzing');
    setTimeout(() => setStage('results'), 2000);
  };

  return (
    <div>
      <SectionTitle icon="🐙" title="GitHub Skill Analysis" subtitle="Connect your GitHub profile to auto-detect skills from real projects" />

      {stage === 'input' && (
        <Card style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '48px 36px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🐙</div>
          <h3 style={{ margin: '0 0 8px', color: '#1e293b' }}>Connect Your GitHub</h3>
          <p style={{ color: '#64748b', marginBottom: 24 }}>We'll analyze your public repositories and extract your technology stack</p>
          <input
            type="text"
            placeholder="Enter GitHub username (e.g. octocat)"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.95rem', marginBottom: 16, boxSizing: 'border-box' }}
          />
          <button onClick={handleAnalyze} style={{ width: '100%', backgroundColor: '#24292e', color: '#fff', border: 'none', padding: '12px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}>
            🔍 Analyze GitHub Profile
          </button>
        </Card>
      )}

      {stage === 'analyzing' && (
        <Card style={{ textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>⚙️</div>
          <h3 style={{ color: '#1e293b' }}>Scanning @{username}…</h3>
          <p style={{ color: '#64748b' }}>Cloning project data, detecting languages and frameworks</p>
          <div style={{ margin: '24px auto', width: '60%' }}><ProgressBar value={65} color="#24292e" height={10} /></div>
        </Card>
      )}

      {stage === 'results' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <Card style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: '#24292e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem' }}>🐙</div>
            <div>
              <h3 style={{ margin: 0, color: '#0f172a' }}>@{username || 'student'}</h3>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>4 public repos · 44 total stars · Active contributor</p>
            </div>
            <button onClick={() => setStage('input')} style={{ marginLeft: 'auto', padding: '8px 16px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>
              Change
            </button>
          </Card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Card>
              <h3 style={{ margin: '0 0 16px', color: '#0f172a', fontSize: '1rem' }}>🛠️ Detected Skills</h3>
              <div>{GITHUB_SKILLS.map(s => <Badge key={s} label={s} color="#24292e" />)}</div>
            </Card>
            <Card>
              <h3 style={{ margin: '0 0 16px', color: '#0f172a', fontSize: '1rem' }}>📊 Language Distribution</h3>
              {[['JavaScript', 55, '#f59e0b'], ['Python', 25, '#3b82f6'], ['TypeScript', 15, '#06b6d4'], ['Other', 5, '#e5e7eb']].map(([l, v, c]) => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontSize: '0.85rem', color: '#475569' }}>{l}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>{v}%</span>
                  </div>
                  <ProgressBar value={v} color={c} height={7} />
                </div>
              ))}
            </Card>
          </div>

          <Card>
            <h3 style={{ margin: '0 0 20px', color: '#0f172a' }}>📁 Top Repositories</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {GITHUB_REPOS.map(r => (
                <div key={r.name} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <strong style={{ color: '#3b82f6', fontSize: '0.9rem' }}>📦 {r.name}</strong>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>⭐ {r.stars}</span>
                  </div>
                  <p style={{ margin: '0 0 8px', color: '#64748b', fontSize: '0.82rem' }}>{r.desc}</p>
                  <Badge label={r.lang} color="#24292e" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ─── Career Paths ─────────────────────────────────────────────────────────────
function CareerPathView() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <SectionTitle icon="🗺️" title="AI Career Recommendations" subtitle="Based on your skills, experience, and market demand" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {CAREER_PATHS.map(c => (
          <Card key={c.title} style={{ borderTop: `4px solid ${c.color}`, cursor: 'pointer' }} onClick={() => setSelected(selected?.title === c.title ? null : c)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div style={{ fontSize: '2.4rem' }}>{c.icon}</div>
              <MatchBadge match={c.match} />
            </div>
            <h3 style={{ margin: '0 0 8px', color: '#0f172a' }}>{c.title}</h3>
            <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '0.88rem', lineHeight: 1.5 }}>{c.desc}</p>
            <ProgressBar value={c.match} color={c.color} />
            <div style={{ marginTop: 14 }}>
              {c.skills.map(s => <Badge key={s} label={s} color={c.color} />)}
            </div>
            {selected?.title === c.title && (
              <div style={{ marginTop: 16, padding: '14px', backgroundColor: c.color + '08', borderRadius: 10, border: `1px solid ${c.color}20` }}>
                <p style={{ margin: 0, color: '#475569', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  🎯 <strong>Why this fits you:</strong> Your React, JavaScript, and Node.js skills are a strong match. Learn {c.skills[2] || 'TypeScript'} to unlock higher-paying roles in this path.
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Courses ──────────────────────────────────────────────────────────────────
function CoursesView() {
  const [enrolled, setEnrolled] = useState([0, 1]);
  const toggle = i => setEnrolled(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div>
      <SectionTitle icon="🎓" title="Personalized Courses" subtitle="IBM SkillsBuild & top platform courses curated for your skill gaps" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {COURSES.map((c, i) => (
          <Card key={c.title} style={{ borderLeft: `4px solid ${c.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: c.color + '15', color: c.color, padding: '3px 10px', borderRadius: 999 }}>{c.platform}</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', backgroundColor: '#f1f5f9', padding: '3px 10px', borderRadius: 999 }}>{c.difficulty}</span>
            </div>
            <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem', color: '#0f172a' }}>{c.title}</h3>
            <p style={{ margin: '0 0 14px', fontSize: '0.82rem', color: '#64748b' }}>🏷️ {c.skill}</p>
            <div style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Progress</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: c.color }}>{c.progress}%</span>
            </div>
            <ProgressBar value={c.progress} color={c.color} />
            <button
              onClick={() => toggle(i)}
              style={{ marginTop: 16, width: '100%', padding: '9px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', backgroundColor: enrolled.includes(i) ? '#dcfce7' : c.color, color: enrolled.includes(i) ? '#16a34a' : '#fff', transition: 'all 0.2s' }}
            >
              {enrolled.includes(i) ? '✅ Enrolled · Continue' : '+ Enroll Now'}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Mock Interview ───────────────────────────────────────────────────────────
function MockInterviewView() {
  const roles = Object.keys(INTERVIEW_QUESTIONS);
  const [stage, setStage] = useState('select');
  const [role, setRole] = useState('');
  const [qi, setQi] = useState(0);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [scores, setScores] = useState([]);

  const qs = role ? INTERVIEW_QUESTIONS[role] : [];

  const handleSubmit = () => {
    const score = Math.floor(60 + Math.random() * 35);
    setScores(prev => [...prev, score]);
    setSubmitted(true);
  };

  const handleNext = () => {
    if (qi + 1 < qs.length) {
      setQi(qi + 1);
      setAnswer('');
      setSubmitted(false);
    } else {
      setStage('done');
    }
  };

  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <div>
      <SectionTitle icon="🎤" title="AI Mock Interview" subtitle="Practice role-specific interview questions with AI feedback" />

      {stage === 'select' && (
        <Card style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '40px 32px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎤</div>
          <h3 style={{ margin: '0 0 24px', color: '#0f172a' }}>Choose Your Interview Role</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {roles.map(r => (
              <button key={r} onClick={() => setRole(r)}
                style={{ padding: '14px 12px', borderRadius: 10, border: `2px solid ${role === r ? '#3b82f6' : '#e5e7eb'}`, backgroundColor: role === r ? '#eff6ff' : '#fff', cursor: 'pointer', fontWeight: 600, color: role === r ? '#3b82f6' : '#475569', fontSize: '0.88rem', transition: 'all 0.15s' }}>
                {r}
              </button>
            ))}
          </div>
          <button
            onClick={() => { if (role) { setQi(0); setAnswer(''); setSubmitted(false); setScores([]); setStage('interview'); } }}
            disabled={!role}
            style={{ width: '100%', padding: '13px', backgroundColor: role ? '#3b82f6' : '#e5e7eb', color: role ? '#fff' : '#94a3b8', border: 'none', borderRadius: 10, cursor: role ? 'pointer' : 'default', fontWeight: 700, fontSize: '0.95rem' }}>
            🚀 Start Interview
          </button>
        </Card>
      )}

      {stage === 'interview' && (
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Question {qi + 1} of {qs.length}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6' }}>{role}</span>
          </div>
          <ProgressBar value={((qi + (submitted ? 1 : 0)) / qs.length) * 100} color="#3b82f6" height={6} />

          <Card style={{ marginTop: 20 }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>💬</div>
            <h3 style={{ margin: '0 0 8px', color: '#0f172a', lineHeight: 1.5 }}>{qs[qi].q}</h3>
            <p style={{ margin: '0 0 20px', color: '#94a3b8', fontSize: '0.82rem' }}>💡 Hint: {qs[qi].hint}</p>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Type your answer here…"
              rows={5}
              disabled={submitted}
              style={{ width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box', backgroundColor: submitted ? '#f8fafc' : '#fff' }}
            />

            {!submitted ? (
              <button onClick={handleSubmit} disabled={!answer.trim()}
                style={{ marginTop: 12, width: '100%', padding: '12px', backgroundColor: answer.trim() ? '#3b82f6' : '#e5e7eb', color: answer.trim() ? '#fff' : '#94a3b8', border: 'none', borderRadius: 10, cursor: answer.trim() ? 'pointer' : 'default', fontWeight: 700, fontSize: '0.95rem' }}>
                ✅ Submit Answer
              </button>
            ) : (
              <div>
                <div style={{ margin: '16px 0', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: 10, border: '1px solid #bbf7d0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <strong style={{ color: '#15803d' }}>🤖 AI Feedback</strong>
                    <span style={{ fontWeight: 800, color: '#16a34a', fontSize: '1.1rem' }}>{scores[scores.length - 1]}%</span>
                  </div>
                  <p style={{ margin: 0, color: '#166534', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    Good answer! You covered the key concepts. To improve, add more specific examples from your project experience and mention real-world tradeoffs. Try to structure your answer using STAR method.
                  </p>
                </div>
                <button onClick={handleNext} style={{ width: '100%', padding: '12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem' }}>
                  {qi + 1 < qs.length ? `Next Question →` : '🏁 See Results'}
                </button>
              </div>
            )}
          </Card>
        </div>
      )}

      {stage === 'done' && (
        <Card style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', padding: '48px 36px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🏆</div>
          <h2 style={{ margin: '0 0 8px', color: '#0f172a' }}>Interview Complete!</h2>
          <p style={{ color: '#64748b', marginBottom: 24 }}>You answered all {qs.length} questions for <strong>{role}</strong></p>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: `conic-gradient(#3b82f6 0% ${avgScore}%, #e5e7eb ${avgScore}% 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#3b82f6' }}>{avgScore}%</span>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Avg Score</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
            {scores.map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: s >= 80 ? '#dcfce7' : s >= 65 ? '#fef9c3' : '#fee2e2', color: s >= 80 ? '#16a34a' : s >= 65 ? '#92400e' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem' }}>{s}</div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Q{i + 1}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setStage('select')} style={{ padding: '12px 32px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 700 }}>
            🔁 Practice Again
          </button>
        </Card>
      )}
    </div>
  );
}

// ─── Job Readiness Score ──────────────────────────────────────────────────────
function ReadinessView() {
  const metrics = [
    { label: 'Resume Strength', value: 72, color: '#3b82f6', icon: '📄' },
    { label: 'Technical Skills', value: 68, color: '#8b5cf6', icon: '⚡' },
    { label: 'Course Progress', value: 48, color: '#06b6d4', icon: '📚' },
    { label: 'Interview Performance', value: 75, color: '#10b981', icon: '🎤' },
  ];
  const overall = Math.round(metrics.reduce((s, m) => s + m.value, 0) / metrics.length);

  return (
    <div>
      <SectionTitle icon="🎯" title="Job Readiness Score" subtitle="Your overall career readiness based on all assessments" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20, alignItems: 'start', flexWrap: 'wrap' }}>
        {/* Big Score */}
        <Card style={{ textAlign: 'center', padding: '40px 24px' }}>
          <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 20px' }}>
            <svg viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="80" cy="80" r="68" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle cx="80" cy="80" r="68" fill="none" stroke="#3b82f6" strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 68 * overall / 100} ${2 * Math.PI * 68}`}
                strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>{overall}%</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Readiness</span>
            </div>
          </div>
          <h3 style={{ margin: '0 0 4px', color: '#0f172a' }}>{overall >= 75 ? 'Job Ready! 🎉' : overall >= 55 ? 'Almost There 💪' : 'Keep Going 🚀'}</h3>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>{overall >= 75 ? 'You are ready to apply for jobs!' : 'Complete more courses and practice interviews to improve.'}</p>
        </Card>

        {/* Breakdown */}
        <div style={{ display: 'grid', gap: 16 }}>
          {metrics.map(m => (
            <Card key={m.label} style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: m.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{m.label}</span>
                    <span style={{ fontWeight: 800, color: m.color, fontSize: '1.05rem' }}>{m.value}%</span>
                  </div>
                  <ProgressBar value={m.value} color={m.color} height={10} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips */}
      <Card style={{ marginTop: 20 }}>
        <h3 style={{ margin: '0 0 16px', color: '#0f172a' }}>💡 AI Improvement Tips</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {[
            { tip: 'Add TypeScript to your resume', impact: '+8%', color: '#3b82f6' },
            { tip: 'Complete the Docker course', impact: '+5%', color: '#06b6d4' },
            { tip: 'Do 3 more mock interviews', impact: '+10%', color: '#10b981' },
            { tip: 'Link your GitHub profile', impact: '+7%', color: '#f59e0b' },
          ].map(t => (
            <div key={t.tip} style={{ padding: '14px', borderRadius: 10, backgroundColor: t.color + '08', border: `1px solid ${t.color}20` }}>
              <p style={{ margin: '0 0 6px', color: '#1e293b', fontSize: '0.88rem', fontWeight: 600 }}>{t.tip}</p>
              <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>🔺 {t.impact} readiness score</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── Jobs / Smart Matching ────────────────────────────────────────────────────
function JobsView({ jobs, search, setSearch, savedJobs, toggleSaveJob, setSelectedJob, setApplied }) {
  const allJobs = jobs.length > 0
    ? jobs.map(j => ({ ...j, match: Math.floor(60 + Math.random() * 35), tags: [] }))
    : SAMPLE_JOBS;

  const filtered = allJobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SectionTitle icon="💼" title="AI Smart Job Matching" subtitle="Jobs ranked by your skill match percentage" />
      <div style={{ position: 'relative', marginBottom: 28 }}>
        <input
          type="text"
          placeholder="🔍 Search jobs by title or company…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '14px 20px', fontSize: '1rem', borderRadius: 12, border: '1px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {filtered.map(job => (
          <Card key={job.id} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
              <MatchBadge match={job.match} />
              <button onClick={() => toggleSaveJob(job)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                {savedJobs.some(j => j.id === job.id) ? '⭐️' : '☆'}
              </button>
            </div>
            <h4 style={{ margin: '0 0 6px', color: '#0284c7', paddingRight: 120 }}>{job.title}</h4>
            <p style={{ margin: '4px 0', color: '#475569', fontSize: '0.88rem' }}>🏢 {job.company}</p>
            <p style={{ margin: '4px 0', color: '#64748b', fontSize: '0.83rem' }}>📍 {job.location} · 💰 {job.salary}</p>
            {job.tags?.length > 0 && (
              <div style={{ marginTop: 10 }}>{job.tags.map(t => <Badge key={t} label={t} color="#3b82f6" />)}</div>
            )}
            <div style={{ marginTop: 14, padding: '10px 12px', backgroundColor: '#f8fafc', borderRadius: 8, border: '1px solid #e5e7eb' }}>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>
                ✨ <strong>Why this matches you:</strong> Your {job.tags?.[0] || 'React'} and {job.tags?.[1] || 'JavaScript'} skills align with this role's top requirements.
              </p>
            </div>
            <button
              onClick={() => { setSelectedJob(job); setApplied(false); }}
              style={{ marginTop: 14, backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '10px', borderRadius: 8, cursor: 'pointer', width: '100%', fontWeight: 700, fontSize: '0.88rem' }}>
              View & Apply
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [backendStatus, setBackendStatus] = useState('Checking…');
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [savedJobs, setSavedJobs] = useState([]);
  const [applied, setApplied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/health')
      .then(r => r.json())
      .then(d => setBackendStatus(d.status))
      .catch(() => setBackendStatus('Offline'));

    fetch('http://localhost:8080/api/jobs')
      .then(r => r.json())
      .then(d => setJobs(d))
      .catch(() => setJobs([]));
  }, []);

  const toggleSaveJob = job => {
    setSavedJobs(prev =>
      prev.some(j => j.id === job.id) ? prev.filter(j => j.id !== job.id) : [...prev, job]
    );
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'resume', label: 'Resume', icon: '📄' },
    { id: 'github', label: 'GitHub', icon: '🐙' },
    { id: 'career', label: 'Career Path', icon: '🗺️' },
    { id: 'courses', label: 'Courses', icon: '🎓' },
    { id: 'interview', label: 'Interview', icon: '🎤' },
    { id: 'readiness', label: 'Readiness', icon: '🎯' },
    { id: 'jobs', label: 'Jobs', icon: '💼' },
  ];

  return (
    <div style={{ fontFamily: '-apple-system, "Segoe UI", system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', margin: 0 }}>
      {/* NAV */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', backgroundColor: '#0f172a', color: '#fff', height: 62, position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.4rem' }}>🧭</span>
          <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#38bdf8' }}>CareerCompass</span>
          <span style={{ fontSize: '0.7rem', backgroundColor: '#6366f1', color: '#fff', padding: '2px 8px', borderRadius: 999, fontWeight: 700, marginLeft: 4 }}>AI</span>
        </div>
        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => { setActiveTab(n.id); setMobileMenuOpen(false); }}
              style={{ background: activeTab === n.id ? 'rgba(56,189,248,0.15)' : 'none', border: 'none', color: activeTab === n.id ? '#38bdf8' : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', padding: '8px 11px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.15s' }}>
              <span>{n.icon}</span> <span style={{ display: 'none', '@media(min-width:900px)': { display: 'inline' } }}>{n.label}</span>
            </button>
          ))}
          <span style={{ marginLeft: 10, fontSize: '0.72rem', backgroundColor: backendStatus === 'ok' ? '#16a34a' : '#94a3b8', padding: '4px 9px', borderRadius: 999, fontWeight: 700 }}>
            {backendStatus === 'ok' ? '🟢 Live' : '⚫ Demo'}
          </span>
        </div>
      </nav>

      {/* Page Content */}
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 20px' }}>
        {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
        {activeTab === 'resume' && <ResumeAnalyzerView />}
        {activeTab === 'github' && <GitHubView />}
        {activeTab === 'career' && <CareerPathView />}
        {activeTab === 'courses' && <CoursesView />}
        {activeTab === 'interview' && <MockInterviewView />}
        {activeTab === 'readiness' && <ReadinessView />}
        {activeTab === 'jobs' && (
          <JobsView jobs={jobs} search={search} setSearch={setSearch}
            savedJobs={savedJobs} toggleSaveJob={toggleSaveJob}
            setSelectedJob={setSelectedJob} setApplied={setApplied} />
        )}
      </main>

      {/* Apply Modal */}
      {selectedJob && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 200, padding: 20 }}>
          <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: 18, maxWidth: 440, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ margin: '0 0 4px', color: '#0f172a' }}>{selectedJob.title}</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>🏢 {selectedJob.company}</p>
              </div>
              <MatchBadge match={selectedJob.match || 85} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: 10 }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Location</p>
                <p style={{ margin: '4px 0 0', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>📍 {selectedJob.location}</p>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: 10 }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Salary</p>
                <p style={{ margin: '4px 0 0', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>💰 {selectedJob.salary}</p>
              </div>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: 10, marginBottom: 20, border: '1px solid #bfdbfe' }}>
              <p style={{ margin: 0, color: '#1d4ed8', fontSize: '0.85rem' }}>
                ✨ <strong>AI Note:</strong> Your React & JavaScript skills match 92% of the requirements. Highlight your project portfolio to stand out.
              </p>
            </div>
            {applied ? (
              <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '14px', borderRadius: 10, textAlign: 'center', marginBottom: 12, fontWeight: 700 }}>
                ✅ Application Submitted Successfully!
              </div>
            ) : (
              <button onClick={() => setApplied(true)} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '13px', borderRadius: 10, cursor: 'pointer', width: '100%', marginBottom: 10, fontWeight: 700, fontSize: '0.95rem' }}>
                🚀 Apply Now
              </button>
            )}
            <button onClick={() => setSelectedJob(null)} style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '11px', borderRadius: 10, cursor: 'pointer', width: '100%', fontWeight: 600 }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
