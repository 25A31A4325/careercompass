import React, { useState, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  recommendCareers,
  analyzeSkillGap,
  generateRoadmap,
  calculateJobReadiness,
} from '../services/api';

const TABS = ['Recommendations', 'Skill Gap', 'Roadmap', 'Job Readiness'];

const SCORE_COLOR = s => s >= 80 ? 'bg-emerald-500' : s >= 60 ? 'bg-amber-500' : 'bg-red-500';
const TEXT_COLOR = s => s >= 80 ? 'text-emerald-400' : s >= 60 ? 'text-amber-400' : 'text-red-400';

export default function CareerPage() {
  const { profile, isProfileComplete } = useProfile();
  const [tab, setTab] = useState(0);
  const [careers, setCareers] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [readiness, setReadiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-load on mount if profile complete
  useEffect(() => {
    if (isProfileComplete && !careers) loadCareers();
    // eslint-disable-next-line
  }, [isProfileComplete]);

  async function loadCareers() {
    setLoading(true); setError('');
    try {
      const res = await recommendCareers(profile);
      if (res.success) {
        setCareers(res.data);
        const first = res.data[0]?.career || profile.targetCareer;
        setSelectedCareer(first);
        loadSkillGap(first);
        loadRoadmap(first);
        loadReadiness(first);
      }
    } catch { setError('Failed to load career recommendations.'); }
    finally { setLoading(false); }
  }

  async function loadSkillGap(career) {
    try {
      const skills = [...(profile.technicalSkills || []), ...(profile.programmingLanguages || [])];
      const res = await analyzeSkillGap(career, skills);
      if (res.success) setSkillGap(res.data);
    } catch {}
  }

  async function loadRoadmap(career) {
    try {
      const res = await generateRoadmap(career, profile);
      if (res.success) setRoadmap(res.data);
    } catch {}
  }

  async function loadReadiness(career) {
    try {
      const res = await calculateJobReadiness(profile, career);
      if (res.success) setReadiness(res.data);
    } catch {}
  }

  function selectCareer(career) {
    setSelectedCareer(career);
    setSkillGap(null); setRoadmap(null); setReadiness(null);
    loadSkillGap(career);
    loadRoadmap(career);
    loadReadiness(career);
  }

  if (!isProfileComplete) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-3">Profile Required</h2>
          <p className="text-slate-400 mb-6">Complete your profile to get personalized career recommendations.</p>
          <a href="/profile" className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg">
            👤 Set Up Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🎯 Career Intelligence</h1>
          <p className="text-slate-400">AI-powered career recommendations tailored to your skills.</p>
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="text-4xl animate-bounce mb-4">🤖</div>
            <p className="text-slate-400 animate-pulse">Analyzing your profile and generating recommendations...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl px-5 py-4 text-red-300 text-sm mb-6 text-center">
            ⚠️ {error}
            <button onClick={loadCareers} className="ml-3 underline">Retry</button>
          </div>
        )}

        {!loading && careers && (
          <>
            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto mb-6 pb-1">
              {TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTab(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === i ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* TAB 0: Recommendations */}
            {tab === 0 && (
              <div className="grid sm:grid-cols-2 gap-5">
                {careers.map((c, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-lg font-bold">
                        <span className="text-2xl">{c.icon}</span>
                        {c.career}
                      </div>
                      <div className={`text-xl font-extrabold ${TEXT_COLOR(c.matchScore)}`}>
                        {c.matchScore}%
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full mb-4">
                      <div className={`h-2 rounded-full ${SCORE_COLOR(c.matchScore)}`} style={{ width: `${c.matchScore}%` }} />
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{c.whyItMatches}</p>

                    <div className="mb-3">
                      <p className="text-xs font-semibold text-emerald-400 mb-1">✅ You Have</p>
                      <div className="flex flex-wrap gap-1">
                        {(c.existingRelevantSkills || []).map(s => (
                          <span key={s} className="bg-emerald-900/40 text-emerald-300 text-xs px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-rose-400 mb-1">❌ Missing</p>
                      <div className="flex flex-wrap gap-1">
                        {(c.missingImportantSkills || []).map(s => (
                          <span key={s} className="bg-rose-900/40 text-rose-300 text-xs px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => { selectCareer(c.career); setTab(1); }}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                    >
                      View Skill Gap & Roadmap →
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 1: Skill Gap */}
            {tab === 1 && (
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {careers.map(c => (
                    <button
                      key={c.career}
                      onClick={() => selectCareer(c.career)}
                      className={`px-3 py-1.5 rounded-lg text-sm ${selectedCareer === c.career ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                    >
                      {c.icon} {c.career}
                    </button>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-sky-400 mb-4">Skill Gap Analysis: {selectedCareer}</h2>
                {!skillGap ? (
                  <p className="text-slate-400 text-center py-8 animate-pulse">Loading skill gap data...</p>
                ) : (
                  <div className="space-y-4">
                    {skillGap.map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{item.skill}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'have' ? 'bg-emerald-900 text-emerald-300' : item.status === 'improve' ? 'bg-amber-900 text-amber-300' : 'bg-red-900 text-red-300'}`}>
                            {item.status === 'have' ? '✅ Have' : item.status === 'improve' ? '⬆️ Improve' : '❌ Need'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-3 bg-slate-700 rounded-full relative">
                            <div className="h-3 rounded-full bg-indigo-500/30 absolute" style={{ width: `${item.requiredLevel}%` }} />
                            <div
                              className={`h-3 rounded-full absolute ${item.status === 'have' ? 'bg-emerald-500' : item.status === 'improve' ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${item.currentLevel}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400 w-20 text-right">
                            {item.currentLevel}% / {item.requiredLevel}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Roadmap */}
            {tab === 2 && (
              <div className="space-y-4">
                {!roadmap ? (
                  <p className="text-slate-400 text-center py-8 animate-pulse">Generating your learning roadmap...</p>
                ) : roadmap.map((phase, i) => (
                  <div key={i} className={`bg-slate-800 border rounded-2xl p-5 ${phase.priority === 'high' ? 'border-sky-700' : 'border-slate-700'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-indigo-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                            {phase.phase}
                          </span>
                          <h3 className="font-bold text-lg">{phase.title}</h3>
                        </div>
                        <p className="text-xs text-slate-400 ml-9">~{phase.estimatedWeeks} weeks · Priority: {phase.priority}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${phase.priority === 'high' ? 'bg-red-900 text-red-300' : 'bg-slate-700 text-slate-300'}`}>
                        {phase.priority}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs font-semibold text-sky-400 mb-2">📚 Skills to Learn</p>
                        <div className="flex flex-wrap gap-1">
                          {(phase.skillsToLearn || []).map(s => (
                            <span key={s} className="bg-slate-700 text-slate-300 text-xs px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-purple-400 mb-2">🚀 Project Ideas</p>
                        <ul className="space-y-0.5">
                          {(phase.projectIdeas || []).map((p, j) => (
                            <li key={j} className="text-xs text-slate-400">• {p}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {phase.resources && phase.resources.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-emerald-400 mb-2">🔗 Resources</p>
                        <div className="flex flex-wrap gap-2">
                          {phase.resources.map((r, j) => (
                            <a
                              key={j}
                              href={r.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs bg-emerald-900/30 border border-emerald-800 text-emerald-300 px-3 py-1 rounded-full hover:bg-emerald-800/40 transition-colors"
                            >
                              {r.free ? '🆓' : '💰'} {r.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Job Readiness */}
            {tab === 3 && (
              <div className="space-y-6">
                {!readiness ? (
                  <p className="text-slate-400 text-center py-8 animate-pulse">Calculating job readiness...</p>
                ) : (
                  <>
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
                      <p className="text-slate-400 text-sm mb-1">Overall Job Readiness</p>
                      <div className={`text-6xl font-extrabold ${TEXT_COLOR(readiness.totalScore)} mb-2`}>
                        {readiness.totalScore}<span className="text-2xl">/100</span>
                      </div>
                      <div className="inline-block bg-indigo-700 text-white text-sm px-4 py-1 rounded-full font-medium">
                        {readiness.level} Level
                      </div>
                      <div className="w-64 h-3 bg-slate-700 rounded-full mx-auto mt-4">
                        <div className={`h-3 rounded-full ${SCORE_COLOR(readiness.totalScore)}`} style={{ width: `${readiness.totalScore}%` }} />
                      </div>
                    </div>

                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                      <h2 className="text-base font-semibold text-sky-400 mb-4">📊 Score Breakdown</h2>
                      {readiness.breakdown && Object.entries(readiness.breakdown).map(([key, val]) => (
                        <div key={key} className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className={TEXT_COLOR(val)}>{val}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-700 rounded-full">
                            <div className={`h-2 rounded-full ${SCORE_COLOR(val)}`} style={{ width: `${val}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                      <h2 className="text-base font-semibold text-amber-400 mb-3">💡 Recommendations</h2>
                      <ul className="space-y-2">
                        {(readiness.recommendations || []).map((r, i) => (
                          <li key={i} className="flex gap-2 text-sm text-slate-300">
                            <span className="text-amber-400 font-bold shrink-0">{i + 1}.</span> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}

        {!loading && !careers && !error && isProfileComplete && (
          <div className="text-center py-16">
            <button onClick={loadCareers} className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg">
              🚀 Generate Career Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
