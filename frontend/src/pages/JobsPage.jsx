import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { fetchJobs } from '../services/api';

const TABS = ['Jobs', 'Internships'];

const MOCK_JOBS = [
  {
    id: 1, type: 'job',
    title: 'React Developer', company: 'TechCorp', location: '🌍 Remote',
    salary: '$80,000/yr', match: 88, tags: ['React', 'JavaScript', 'CSS'],
    posted: '2 days ago', description: 'Build scalable web applications using React and modern tooling.',
  },
  {
    id: 2, type: 'job',
    title: 'Full Stack Engineer', company: 'Innovate AI', location: '🏢 Hybrid',
    salary: '$95,000/yr', match: 82, tags: ['Node.js', 'React', 'PostgreSQL'],
    posted: '1 day ago', description: 'Join a fast-growing AI startup building next-gen SaaS tools.',
  },
  {
    id: 3, type: 'job',
    title: 'Python Backend Developer', company: 'DataStream', location: '🏢 On-site',
    salary: '$90,000/yr', match: 75, tags: ['Python', 'Django', 'REST API'],
    posted: '3 days ago', description: 'Design and build robust backend services for our analytics platform.',
  },
  {
    id: 4, type: 'job',
    title: 'ML Engineer', company: 'NeuralTech', location: '🌍 Remote',
    salary: '$110,000/yr', match: 70, tags: ['Python', 'TensorFlow', 'MLOps'],
    posted: '5 days ago', description: 'Build and deploy production ML models at scale.',
  },
  {
    id: 5, type: 'internship',
    title: 'Frontend Intern', company: 'StartUp Inc', location: '🏢 On-site',
    salary: '$45,000/yr', match: 91, tags: ['React', 'Tailwind', 'TypeScript'],
    posted: '1 day ago', description: 'Hands-on experience building modern UI for millions of users.',
  },
  {
    id: 6, type: 'internship',
    title: 'Data Science Intern', company: 'Analytics Co', location: '🌍 Remote',
    salary: '$35,000/yr', match: 68, tags: ['Python', 'Pandas', 'SQL'],
    posted: '4 days ago', description: 'Work with data engineers to build predictive models.',
  },
  {
    id: 7, type: 'internship',
    title: 'Backend Engineering Intern', company: 'CloudBase', location: '🏢 Hybrid',
    salary: '$40,000/yr', match: 79, tags: ['Java', 'Spring Boot', 'AWS'],
    posted: '2 days ago', description: 'Build microservices and cloud infrastructure alongside senior engineers.',
  },
];

const MATCH_COLOR = m => m >= 85 ? 'text-emerald-400' : m >= 70 ? 'text-amber-400' : 'text-rose-400';
const MATCH_BG = m => m >= 85 ? 'bg-emerald-900/40 border-emerald-700' : m >= 70 ? 'bg-amber-900/40 border-amber-700' : 'bg-rose-900/40 border-rose-700';

export default function JobsPage() {
  const { profile } = useProfile();
  const [tab, setTab] = useState(0);
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('match');

  const filtered = jobs
    .filter(j => (tab === 0 ? j.type === 'job' : j.type === 'internship'))
    .filter(j => {
      const q = search.toLowerCase();
      return !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || (j.tags || []).some(t => t.toLowerCase().includes(q));
    })
    .sort((a, b) => sortBy === 'match' ? b.match - a.match : a.title.localeCompare(b.title));

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">💼 Smart Job Matching</h1>
          <p className="text-slate-400">AI-matched opportunities based on your skill profile.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === i ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {i === 0 ? '💼' : '🎓'} {t}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, company, or skill..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="match">Sort: Best Match</option>
            <option value="title">Sort: A–Z</option>
          </select>
        </div>

        {/* Results count */}
        <p className="text-slate-400 text-sm mb-4">{filtered.length} {tab === 0 ? 'jobs' : 'internships'} found</p>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map(job => (
            <div key={job.id} className="bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-2xl p-5 transition-colors flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-base">{job.title}</h3>
                  <p className="text-slate-400 text-sm">{job.company} · {job.location}</p>
                </div>
                <div className={`border rounded-lg px-2 py-1 text-center shrink-0 ml-2 ${MATCH_BG(job.match)}`}>
                  <p className={`text-lg font-extrabold ${MATCH_COLOR(job.match)}`}>{job.match}%</p>
                  <p className="text-xs text-slate-400">match</p>
                </div>
              </div>

              <p className="text-slate-400 text-sm mb-3 flex-1">{job.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {(job.tags || []).map(tag => (
                  <span key={tag} className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm border-t border-slate-700 pt-3">
                <span className="text-emerald-400 font-medium">{job.salary}</span>
                <span className="text-slate-500 text-xs">{job.posted}</span>
              </div>

              <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                Apply Now →
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-4">🔍</div>
            <p>No results found. Try a different search term.</p>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-10 bg-indigo-900/30 border border-indigo-700 rounded-2xl p-5 text-center">
          <p className="text-indigo-300 text-sm">
            🤖 Match percentages are calculated based on your skill profile. Complete your profile to see more accurate matches.
          </p>
          {!profile.name && (
            <a href="/profile" className="inline-block mt-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Set Up Profile →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
