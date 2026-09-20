import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { analyzeProfile } from '../services/api';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'];
const CAREERS = ['Software Developer', 'AI/ML Engineer', 'Data Analyst', 'Full-Stack Web Developer', 'DevOps Engineer', 'Cybersecurity Engineer', 'Cloud Engineer'];

function TagInput({ label, placeholder, value, onChange }) {
  const [input, setInput] = useState('');

  function add() {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput('');
  }

  function remove(item) {
    onChange(value.filter(v => v !== item));
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map(v => (
          <span key={v} className="flex items-center gap-1 bg-indigo-700 text-white text-xs px-2 py-1 rounded-full">
            {v}
            <button onClick={() => remove(v)} className="hover:text-red-300 text-white ml-1">✕</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          type="button"
          onClick={add}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default function ProfileSetupPage() {
  const { profile, saveProfile } = useProfile();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ ...profile });

  function set(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) { setError('Name is required'); return; }
    if (form.technicalSkills.length === 0 && form.programmingLanguages.length === 0) {
      setError('Add at least one skill or programming language'); return;
    }
    setError('');
    setLoading(true);
    try {
      saveProfile(form);
      await analyzeProfile(form);
      navigate('/career');
    } catch {
      saveProfile(form);
      navigate('/career');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">👤 Set Up Your Profile</h1>
          <p className="text-slate-400">Tell us about yourself to get personalized career recommendations.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6">
          {/* Basic Info */}
          <section>
            <h2 className="text-lg font-semibold text-sky-400 mb-4">📋 Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name *" value={form.name} onChange={v => set('name', v)} placeholder="e.g. Mohan Sai" />
              <Field label="Email" value={form.email} onChange={v => set('email', v)} placeholder="you@email.com" type="email" />
              <Field label="College / University" value={form.college} onChange={v => set('college', v)} placeholder="e.g. VIT University" />
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Year of Study</label>
                <select
                  value={form.year}
                  onChange={e => set('year', e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select year</option>
                  {YEARS.map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
              <Field label="Branch / Major" value={form.branch} onChange={v => set('branch', v)} placeholder="e.g. Computer Science" />
              <Field label="CGPA / GPA" value={form.cgpa} onChange={v => set('cgpa', v)} placeholder="e.g. 8.5" />
            </div>
          </section>

          {/* Target Career */}
          <section>
            <h2 className="text-lg font-semibold text-sky-400 mb-4">🎯 Target Career</h2>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Preferred Career Path</label>
              <select
                value={form.targetCareer}
                onChange={e => set('targetCareer', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {CAREERS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-lg font-semibold text-sky-400 mb-4">⚡ Skills & Technologies</h2>
            <TagInput
              label="Programming Languages"
              placeholder="e.g. Python (press Enter)"
              value={form.programmingLanguages}
              onChange={v => set('programmingLanguages', v)}
            />
            <TagInput
              label="Technical Skills"
              placeholder="e.g. HTML, CSS, SQL (press Enter)"
              value={form.technicalSkills}
              onChange={v => set('technicalSkills', v)}
            />
            <TagInput
              label="Frameworks & Libraries"
              placeholder="e.g. React, Spring Boot (press Enter)"
              value={form.frameworks}
              onChange={v => set('frameworks', v)}
            />
            <TagInput
              label="Tools"
              placeholder="e.g. Git, Docker (press Enter)"
              value={form.tools}
              onChange={v => set('tools', v)}
            />
          </section>

          {/* Projects & Interests */}
          <section>
            <h2 className="text-lg font-semibold text-sky-400 mb-4">🚀 Projects & Interests</h2>
            <TagInput
              label="Projects (press Enter to add each)"
              placeholder="e.g. Student Management System"
              value={form.projects}
              onChange={v => set('projects', v)}
            />
            <TagInput
              label="Interests"
              placeholder="e.g. AI, Machine Learning, Web Dev"
              value={form.interests}
              onChange={v => set('interests', v)}
            />
            <TagInput
              label="Certifications"
              placeholder="e.g. AWS Cloud Practitioner"
              value={form.certifications}
              onChange={v => set('certifications', v)}
            />
          </section>

          {error && (
            <div className="bg-red-900/40 border border-red-700 rounded-lg px-4 py-2 text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? '⏳ Analyzing your profile...' : '🚀 Save & Get Recommendations'}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );
}
