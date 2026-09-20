import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { getInterviewQuestion, evaluateAnswer } from '../services/api';

const CAREERS = ['Software Developer', 'AI/ML Engineer', 'Data Analyst', 'Full-Stack Web Developer'];
const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced'];

const METRIC_COLOR = v => v >= 80 ? 'bg-emerald-500' : v >= 60 ? 'bg-amber-500' : 'bg-red-500';
const METRIC_TEXT = v => v >= 80 ? 'text-emerald-400' : v >= 60 ? 'text-amber-400' : 'text-red-400';

export default function InterviewPage() {
  const { profile } = useProfile();
  const [step, setStep] = useState('setup'); // setup | question | evaluation | summary
  const [career, setCareer] = useState(profile.targetCareer || 'Software Developer');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [currentQ, setCurrentQ] = useState(null);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [history, setHistory] = useState([]); // [{question, answer, evaluation}]
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function startSession() {
    setLoading(true); setError('');
    try {
      const res = await getInterviewQuestion(career, difficulty, []);
      if (res.success) {
        setCurrentQ(res.data);
        setAnswer('');
        setEvaluation(null);
        setHistory([]);
        setStep('question');
      }
    } catch { setError('Failed to get interview question. Please try again.'); }
    finally { setLoading(false); }
  }

  async function submitAnswer() {
    if (!answer.trim()) { setError('Please type your answer.'); return; }
    setLoading(true); setError('');
    try {
      const res = await evaluateAnswer(currentQ, answer);
      if (res.success) {
        setEvaluation(res.data);
        setStep('evaluation');
      }
    } catch { setError('Failed to evaluate. Please try again.'); }
    finally { setLoading(false); }
  }

  async function nextQuestion() {
    const done = [...history, { question: currentQ, answer, evaluation }];
    setHistory(done);
    setLoading(true); setError('');
    try {
      const res = await getInterviewQuestion(career, difficulty, done.map(h => h.question));
      if (res.success) {
        setCurrentQ(res.data);
        setAnswer('');
        setEvaluation(null);
        setStep('question');
      }
    } catch { setError('Failed to get next question.'); }
    finally { setLoading(false); }
  }

  function endSession() {
    const done = evaluation
      ? [...history, { question: currentQ, answer, evaluation }]
      : history;
    setHistory(done);
    setStep('summary');
  }

  const avgScore = history.length > 0
    ? Math.round(history.reduce((s, h) => s + (h.evaluation?.score || 0), 0) / history.length * 10)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🎙️ Mock Interview</h1>
          <p className="text-slate-400">Practice with AI-generated role-specific questions and get instant feedback.</p>
        </div>

        {/* SETUP */}
        {step === 'setup' && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-lg mx-auto">
            <h2 className="text-lg font-semibold text-sky-400 mb-6">Configure Your Session</h2>
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">Target Role</label>
              <select
                value={career}
                onChange={e => setCareer(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {CAREERS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
              <div className="grid grid-cols-3 gap-2">
                {DIFFICULTIES.map(d => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`py-2 rounded-lg text-sm font-medium transition-colors ${difficulty === d ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    {d === 'Beginner' ? '🌱' : d === 'Intermediate' ? '🔥' : '⚡'} {d}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-red-400 text-sm mb-4">⚠️ {error}</p>}
            <button
              onClick={startSession}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {loading ? '⏳ Loading...' : '🚀 Start Interview Session'}
            </button>
          </div>
        )}

        {/* QUESTION */}
        {step === 'question' && currentQ && (
          <div className="space-y-5">
            {/* Header */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs bg-indigo-700 text-indigo-200 px-2 py-0.5 rounded-full">{currentQ.topic}</span>
                <span className="text-xs text-slate-400">Q{history.length + 1} · {currentQ.difficulty}</span>
              </div>
              <h2 className="text-xl font-semibold mt-3 leading-relaxed">{currentQ.question}</h2>
            </div>

            {/* Answer */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">Your Answer</label>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={8}
                placeholder="Type your detailed answer here..."
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
              {error && <p className="text-red-400 text-sm mt-2">⚠️ {error}</p>}
              <div className="flex gap-3 mt-4">
                <button onClick={endSession} className="border border-slate-600 text-slate-300 px-4 py-2 rounded-lg text-sm hover:border-slate-400">
                  End Session
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={loading}
                  className="flex-1 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white font-semibold py-2 rounded-lg"
                >
                  {loading ? '⏳ Evaluating...' : '📊 Submit & Get Feedback'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EVALUATION */}
        {step === 'evaluation' && evaluation && (
          <div className="space-y-5">
            {/* Score */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
              <p className="text-slate-400 text-sm mb-2">Your Score</p>
              <div className={`text-6xl font-extrabold ${METRIC_TEXT(evaluation.score * 10)}`}>
                {evaluation.score}<span className="text-2xl">/10</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <h3 className="text-base font-semibold text-sky-400 mb-4">📊 Detailed Metrics</h3>
              {[
                ['Correctness', evaluation.correctness],
                ['Technical Understanding', evaluation.technicalUnderstanding],
                ['Communication', evaluation.communication],
                ['Completeness', evaluation.completeness],
              ].map(([label, val]) => (
                <div key={label} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span className={METRIC_TEXT(val)}>{val}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full">
                    <div className={`h-2 rounded-full ${METRIC_COLOR(val)}`} style={{ width: `${val}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-emerald-400 mb-3">✅ What You Did Well</h3>
                <ul className="space-y-1">
                  {(evaluation.whatYouDidWell || []).map((w, i) => <li key={i} className="text-sm text-slate-300">• {w}</li>)}
                </ul>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-amber-400 mb-3">⬆️ What to Improve</h3>
                <ul className="space-y-1">
                  {(evaluation.whatToImprove || []).map((w, i) => <li key={i} className="text-sm text-slate-300">• {w}</li>)}
                </ul>
              </div>
            </div>

            {evaluation.betterApproach && (
              <div className="bg-indigo-900/30 border border-indigo-700 rounded-2xl p-5">
                <h3 className="text-sm font-semibold text-indigo-300 mb-2">💡 Better Approach</h3>
                <p className="text-sm text-slate-300">{evaluation.betterApproach}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={endSession} className="flex-1 border border-slate-600 text-slate-300 py-3 rounded-xl text-sm hover:border-slate-400">
                📊 View Session Summary
              </button>
              <button
                onClick={nextQuestion}
                disabled={loading}
                className="flex-1 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl"
              >
                {loading ? '⏳ Loading...' : 'Next Question →'}
              </button>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        {step === 'summary' && (
          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold mb-2">Session Complete!</h2>
              <p className="text-slate-400 mb-4">{history.length} question{history.length !== 1 ? 's' : ''} attempted for {career}</p>
              <div className={`text-4xl font-extrabold ${METRIC_TEXT(avgScore)}`}>
                {avgScore}% <span className="text-lg font-normal text-slate-400">avg score</span>
              </div>
            </div>

            {history.map((h, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-sm">Q{i + 1}: {h.question.question}</p>
                  <span className={`text-lg font-bold ${METRIC_TEXT((h.evaluation?.score || 0) * 10)} ml-3 shrink-0`}>
                    {h.evaluation?.score || 0}/10
                  </span>
                </div>
                <p className="text-xs text-slate-400 italic border-t border-slate-700 pt-2 mt-2">{h.answer.slice(0, 120)}{h.answer.length > 120 ? '...' : ''}</p>
              </div>
            ))}

            <button
              onClick={() => { setStep('setup'); setHistory([]); setCurrentQ(null); setEvaluation(null); }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl"
            >
              🔄 Start New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
