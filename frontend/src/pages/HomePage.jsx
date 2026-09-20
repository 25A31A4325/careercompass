import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

const FEATURES = [
  {
    icon: '📄',
    title: 'Resume Analyzer',
    desc: 'Upload your resume and get AI-powered skill gap analysis instantly.',
    to: '/resume',
    color: 'bg-cyan-500',
  },
  {
    icon: '🎯',
    title: 'Career Recommendations',
    desc: 'Discover careers that perfectly match your skills and interests.',
    to: '/career',
    color: 'bg-indigo-500',
  },
  {
    icon: '🎙️',
    title: 'Mock Interview',
    desc: 'Practice with AI-generated role-specific interview questions.',
    to: '/interview',
    color: 'bg-emerald-500',
  },
  {
    icon: '💬',
    title: 'AI Career Chat',
    desc: 'Get instant answers about careers, skills, and next steps.',
    to: '/chat',
    color: 'bg-purple-500',
  },
  {
    icon: '💼',
    title: 'Smart Job Matching',
    desc: 'Find jobs that match your skills with AI percentage scoring.',
    to: '/jobs',
    color: 'bg-rose-500',
  },
  {
    icon: '🗺️',
    title: 'Learning Roadmap',
    desc: 'Get a personalized step-by-step roadmap to your dream career.',
    to: '/career',
    color: 'bg-amber-500',
  },
];

export default function HomePage() {
  const { profile, isProfileComplete } = useProfile();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-700 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-6">
            🚀 AI-Powered Career Guidance
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Navigate Your Career <br />
            <span className="text-sky-400">With Intelligence</span>
          </h1>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            CareerCompass AI analyzes your skills, recommends careers, preps you for interviews,
            and guides you step-by-step to your dream job.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isProfileComplete ? (
              <Link
                to="/career"
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                🎯 View Career Recommendations
              </Link>
            ) : (
              <Link
                to="/profile"
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                👤 Set Up Your Profile
              </Link>
            )}
            <Link
              to="/interview"
              className="border border-slate-600 hover:border-slate-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              🎙️ Start Mock Interview
            </Link>
          </div>
        </div>
      </section>

      {/* Stats row */}
      {isProfileComplete && (
        <section className="max-w-4xl mx-auto px-4 pb-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard emoji="👋" label="Welcome back" value={profile.name || 'Student'} sub={profile.targetCareer} />
          <StatCard emoji="🎯" label="Job Readiness" value="78%" sub="Good progress!" color="text-sky-400" />
          <StatCard emoji="⚡" label="Skills Matched" value="14/20" sub="Keep learning" color="text-purple-400" />
          <StatCard emoji="📄" label="Resume Score" value="62/100" sub="Needs improvement" color="text-amber-400" />
        </section>
      )}

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8 text-slate-200">Everything You Need to Land Your Dream Job</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(f => (
            <Link
              key={f.to + f.title}
              to={f.to}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-6 transition-all group"
            >
              <div className={`w-12 h-12 ${f.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-sky-400 transition-colors">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              <div className="mt-4 text-sky-400 text-sm font-medium">Open →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ emoji, label, value, sub, color = 'text-white' }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{emoji}</div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-slate-500">{sub}</p>
    </div>
  );
}
