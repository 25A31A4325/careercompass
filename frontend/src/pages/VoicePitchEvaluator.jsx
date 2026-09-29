import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Constants ──────────────────────────────────────────────────────────── */
const MAX_SECONDS = 60;
const MIN_SECONDS = 10; // minimum before analysis is meaningful

const TECH_KEYWORDS = [
  'react','node','nodejs','javascript','typescript','python','java','c++',
  'css','html','sql','mongodb','docker','kubernetes','aws','gcp','azure',
  'rest','api','graphql','redux','next','vue','angular','django','flask',
  'fastapi','spring','git','github','ci/cd','devops','machine learning',
  'deep learning','tensorflow','pytorch','full stack','frontend','backend',
  'database','microservices','agile','scrum','tailwind','figma',
];

const FILLER_WORDS = ['um','uh','ah','er','like','you know','basically',
                      'literally','honestly','actually','so','right'];

/* ─── Dummy analysis builder (used as fallback & as the real algo) ──────── */
function buildAnalysis(transcript, durationSec) {
  const lower = transcript.toLowerCase();
  const words  = transcript.trim().split(/\s+/).filter(Boolean);
  const wc     = words.length;
  const wpm    = durationSec > 0 ? Math.round((wc / durationSec) * 60) : 0;

  // Speech pace rating
  let paceRating, paceNote;
  if      (wpm < 80)  { paceRating = 'Too Slow';   paceNote = `${wpm} WPM — try to pick up the pace slightly.`; }
  else if (wpm < 120) { paceRating = 'Good';        paceNote = `${wpm} WPM — well-paced and easy to follow.`; }
  else if (wpm < 160) { paceRating = 'Ideal';       paceNote = `${wpm} WPM — confident, professional delivery.`; }
  else if (wpm < 200) { paceRating = 'Fast';        paceNote = `${wpm} WPM — slightly fast, slow down a touch.`; }
  else                { paceRating = 'Too Fast';    paceNote = `${wpm} WPM — too fast, clarity may suffer.`; }

  // Tech keywords detected
  const detectedKw = TECH_KEYWORDS.filter(kw => lower.includes(kw));

  // Filler words
  let fillerCount = 0;
  FILLER_WORDS.forEach(fw => {
    const re = new RegExp(`\\b${fw}\\b`, 'gi');
    const m  = lower.match(re);
    if (m) fillerCount += m.length;
  });

  // Confidence heuristic: short sentences + filler = low
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 5);
  const avgSentLen = sentences.length ? wc / sentences.length : 0;
  let confidence;
  if      (fillerCount > 6 || avgSentLen < 5)  confidence = 'Low';
  else if (fillerCount > 3 || avgSentLen < 10) confidence = 'Moderate';
  else                                          confidence = 'High';

  // Overall score (0–100)
  let score = 50;
  if (wpm >= 120 && wpm <= 160) score += 15;
  else if (wpm >= 80)           score += 8;
  score += Math.min(detectedKw.length * 3, 18);
  score -= Math.min(fillerCount * 3, 18);
  if (confidence === 'High')    score += 12;
  else if (confidence === 'Moderate') score += 5;
  if (durationSec >= 30 && durationSec <= 60) score += 5;
  score = Math.max(10, Math.min(100, Math.round(score)));

  // Strengths & improvements
  const strengths = [];
  const improvements = [];

  if (detectedKw.length >= 3) strengths.push(`Strong use of ${detectedKw.length} technical keywords (${detectedKw.slice(0,3).join(', ')}…).`);
  else improvements.push('Mention more specific tech skills (React, Node.js, AWS, etc.) to stand out.');

  if (confidence === 'High') strengths.push('Confident, structured delivery with clear sentences.');
  else if (confidence === 'Moderate') {
    strengths.push('Decent structure — a few filler words but mostly clear.');
    improvements.push(`Reduce filler words like "um", "uh", "like" (detected ${fillerCount} times).`);
  } else {
    improvements.push(`Reduce filler words — detected ${fillerCount} filler occurrences.`);
    improvements.push('Practice with shorter, punchier sentences to sound more confident.');
  }

  if (wpm >= 120 && wpm <= 160 && !strengths.find(s => s.includes('Confident')))
    strengths.push(`Ideal speaking pace at ${wpm} WPM — easy for listeners to follow.`);
  if (wpm > 160)
    improvements.push(`Slow down — speaking at ${wpm} WPM can overwhelm listeners.`);
  if (wpm < 80 && wpm > 0)
    improvements.push(`Pick up the pace — ${wpm} WPM feels too slow. Aim for 120–150 WPM.`);

  if (durationSec < 20)
    improvements.push('Pitch was very short. Aim for 30–45 seconds to cover your story fully.');

  // Trim to 2 each
  return {
    score,
    wpm,
    paceRating,
    paceNote,
    confidence,
    detectedKeywords: detectedKw.length > 0 ? detectedKw : [],
    fillerCount,
    strengths:    strengths.slice(0,2),
    improvements: improvements.slice(0,2),
    durationSec,
    wordCount: wc,
  };
}

/* ─── Dummy fallback when no mic / no SpeechRecognition ─────────────────── */
const DUMMY_TRANSCRIPT =
  'Hi, I am a full stack developer with experience in React, Node.js, and MongoDB. ' +
  'I have built REST APIs and deployed applications on AWS using Docker. ' +
  'I enjoy working on frontend interfaces with TypeScript and Tailwind CSS. ' +
  'Recently I completed a machine learning project using Python and TensorFlow. ' +
  'I am passionate about building scalable and user-friendly web applications.';

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function fmtTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2,'0');
  const sec = (s % 60).toString().padStart(2,'0');
  return `${m}:${sec}`;
}

function scoreColor(s) {
  if (s >= 80) return 'text-emerald-400';
  if (s >= 60) return 'text-amber-400';
  return 'text-red-400';
}
function scoreBg(s) {
  if (s >= 80) return 'border-emerald-500';
  if (s >= 60) return 'border-amber-500';
  return 'border-red-500';
}
function confColor(c) {
  return c === 'High' ? 'text-emerald-400' : c === 'Moderate' ? 'text-amber-400' : 'text-red-400';
}
function paceColor(p) {
  return p === 'Ideal' ? 'text-emerald-400' : p === 'Good' ? 'text-blue-400' : p === 'Too Fast' || p === 'Too Slow' ? 'text-red-400' : 'text-amber-400';
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function VoicePitchEvaluator({ onBack }) {
  /* ── state ── */
  const [phase, setPhase]         = useState('idle'); // idle | recording | stopped | analyzing | result
  const [timer, setTimer]         = useState(0);
  const [audioUrl, setAudioUrl]   = useState(null);
  const [analysis, setAnalysis]   = useState(null);
  const [transcript, setTranscript] = useState('');
  const [micError, setMicError]   = useState(null);
  const [bars, setBars]           = useState(Array(28).fill(4));
  const [usedFallback, setUsedFallback] = useState(false);

  /* ── refs ── */
  const mediaRecorderRef  = useRef(null);
  const chunksRef         = useRef([]);
  const timerRef          = useRef(null);
  const recognitionRef    = useRef(null);
  const transcriptRef     = useRef('');
  const animFrameRef      = useRef(null);
  const analyserRef       = useRef(null);
  const audioCtxRef       = useRef(null);

  /* ── cleanup on unmount ── */
  useEffect(() => () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animFrameRef.current);
    audioCtxRef.current?.close();
    recognitionRef.current?.stop();
  }, []);

  /* ── visualizer loop ── */
  const startVisualizer = useCallback((stream) => {
    try {
      const ctx     = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 64;
      const src = ctx.createMediaStreamSource(stream);
      src.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        analyser.getByteFrequencyData(data);
        const newBars = Array.from({ length: 28 }, (_, i) => {
          const idx = Math.floor((i / 28) * data.length);
          return Math.max(4, Math.round((data[idx] / 255) * 80));
        });
        setBars(newBars);
        animFrameRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch (_) {
      // visualizer not critical — ignore
    }
  }, []);

  const stopVisualizer = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    audioCtxRef.current?.close();
    setBars(Array(28).fill(4));
  }, []);

  /* ── Speech Recognition setup ── */
  const startRecognition = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.continuous     = true;
    r.interimResults = true;
    r.lang           = 'en-US';
    transcriptRef.current = '';
    r.onresult = (e) => {
      let full = '';
      for (let i = 0; i < e.results.length; i++) {
        full += e.results[i][0].transcript + ' ';
      }
      transcriptRef.current = full.trim();
      setTranscript(full.trim());
    };
    r.onerror = () => {}; // silent
    r.start();
    recognitionRef.current = r;
  }, []);

  /* ── Start Recording ── */
  const startRecording = useCallback(async () => {
    setMicError(null);
    setAudioUrl(null);
    setAnalysis(null);
    setTranscript('');
    setUsedFallback(false);
    transcriptRef.current = '';
    chunksRef.current = [];

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
      setMicError('Microphone access denied. Showing a demo analysis instead.');
      setUsedFallback(true);
      setPhase('stopped');
      setTimer(45);
      return;
    }

    startVisualizer(stream);
    startRecognition();

    const mr = new MediaRecorder(stream);
    mediaRecorderRef.current = mr;
    mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      setAudioUrl(URL.createObjectURL(blob));
      stream.getTracks().forEach(t => t.stop());
    };

    mr.start(200);
    setPhase('recording');
    setTimer(0);

    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t + 1 >= MAX_SECONDS) {
          stopRecording();
          return MAX_SECONDS;
        }
        return t + 1;
      });
    }, 1000);
  }, [startVisualizer, startRecognition]);

  /* ── Stop Recording ── */
  const stopRecording = useCallback(() => {
    clearInterval(timerRef.current);
    stopVisualizer();
    recognitionRef.current?.stop();
    mediaRecorderRef.current?.stop();
    setPhase('stopped');
  }, [stopVisualizer]);

  /* ── Re-record ── */
  const reRecord = useCallback(() => {
    setPhase('idle');
    setTimer(0);
    setAudioUrl(null);
    setAnalysis(null);
    setTranscript('');
    setMicError(null);
    setUsedFallback(false);
    setBars(Array(28).fill(4));
  }, []);

  /* ── Analyze ── */
  const analyze = useCallback(() => {
    setPhase('analyzing');
    const raw = transcriptRef.current || (usedFallback ? DUMMY_TRANSCRIPT : '');
    const dur = timer > 0 ? timer : 45;

    setTimeout(() => {
      const result = buildAnalysis(
        raw.length > 20 ? raw : DUMMY_TRANSCRIPT,
        dur
      );
      if (raw.length < 20) setUsedFallback(true);
      setAnalysis(result);
      setPhase('result');
    }, 1800);
  }, [timer, usedFallback]);

  /* ═══ RENDER ═══ */
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all"
        >
          ← Back to Dashboard
        </button>
        <span className="text-xs text-slate-500 font-medium hidden sm:block">CareerCompass AI · Voice Evaluator</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* ── HEADER ── */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-violet-300 uppercase tracking-wider">
            🎙️ AI Voice Evaluator
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Voice Pitch &amp; Elevator Pitch Evaluator
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Record a 30–60 second elevator pitch, then get instant AI-powered feedback on pace, confidence, tech keywords, and delivery.
          </p>
        </div>

        {/* ── PROMPT CARD ── */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 flex gap-4 items-start">
          <span className="text-2xl mt-0.5">💬</span>
          <div>
            <p className="text-xs font-bold text-violet-400 uppercase tracking-wide mb-1">Your Prompt</p>
            <p className="text-white font-semibold text-sm leading-relaxed">
              "Tell me about yourself — explain your background, key tech skills, and your top project in 45 seconds."
            </p>
            <p className="text-slate-500 text-xs mt-2">Target: 30–60 seconds · 120–150 WPM · Mention 3+ tech skills</p>
          </div>
        </div>

        {/* ── MIC ERROR BANNER ── */}
        {micError && (
          <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl p-4 flex gap-3 items-start text-sm text-amber-300">
            <span className="text-xl">⚠️</span>
            <p>{micError}</p>
          </div>
        )}

        {/* ── RECORDING CONTROLS ── */}
        {(phase === 'idle' || phase === 'recording' || phase === 'stopped') && (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 space-y-6">

            {/* Timer */}
            <div className="text-center">
              <span className={`text-5xl font-black tabular-nums tracking-tight transition-colors ${
                phase === 'recording'
                  ? timer >= 45 ? 'text-amber-400' : 'text-white'
                  : 'text-slate-500'
              }`}>
                {fmtTime(timer)}
              </span>
              {phase === 'recording' && (
                <p className="text-xs text-slate-500 mt-1">
                  {timer < 30 ? 'Keep going…' : timer <= 60 ? '✅ Good length — wrap up soon' : '⚠️ Max reached'}
                </p>
              )}
              {phase === 'stopped' && timer > 0 && (
                <p className="text-xs text-slate-500 mt-1">Recording complete · {timer}s</p>
              )}
            </div>

            {/* Visualizer bars */}
            <div className="flex items-end justify-center gap-[3px] h-20">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className={`w-2 rounded-full transition-all duration-75 ${
                    phase === 'recording' ? 'bg-violet-500' : 'bg-slate-700'
                  }`}
                  style={{ height: `${phase === 'recording' ? h : 4}px` }}
                />
              ))}
            </div>

            {/* Record / Stop button */}
            <div className="flex justify-center">
              {phase === 'idle' && (
                <button
                  onClick={startRecording}
                  className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 flex flex-col items-center justify-center gap-1 shadow-2xl shadow-red-900/60 transition-all"
                >
                  <span className="text-3xl">🎙️</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Record</span>
                </button>
              )}

              {phase === 'recording' && (
                <button
                  onClick={stopRecording}
                  className="w-24 h-24 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 flex flex-col items-center justify-center gap-1 shadow-2xl shadow-red-900/60 transition-all animate-pulse"
                >
                  <span className="text-3xl">⏹️</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">Stop</span>
                </button>
              )}

              {phase === 'stopped' && (
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="flex gap-4 justify-center flex-wrap">
                    {/* Playback */}
                    {audioUrl && (
                      <div className="flex flex-col items-center gap-1">
                        <audio
                          src={audioUrl}
                          controls
                          className="h-9 w-56 rounded-full accent-violet-500"
                        />
                        <span className="text-xs text-slate-500">Playback</span>
                      </div>
                    )}
                    {/* Re-record */}
                    <button
                      onClick={reRecord}
                      className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold rounded-xl border border-slate-600 transition-all"
                    >
                      🔄 Re-record
                    </button>
                  </div>

                  {/* Transcript preview */}
                  {transcript && (
                    <div className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-xs text-slate-300 leading-relaxed max-h-24 overflow-y-auto">
                      <span className="text-slate-500 font-semibold block mb-1">Transcript preview:</span>
                      {transcript}
                    </div>
                  )}

                  {/* Analyze button */}
                  <button
                    onClick={analyze}
                    disabled={timer < MIN_SECONDS && !usedFallback}
                    className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-2xl shadow-lg shadow-violet-900/50 transition-all"
                  >
                    🧠 Analyze My Pitch
                  </button>
                  {timer < MIN_SECONDS && !usedFallback && (
                    <p className="text-xs text-slate-500">Speak for at least {MIN_SECONDS}s to enable analysis.</p>
                  )}
                </div>
              )}
            </div>

            {/* Progress bar */}
            {phase === 'recording' && (
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-1.5 bg-violet-500 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((timer / MAX_SECONDS) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>
        )}

        {/* ── ANALYZING SPINNER ── */}
        {phase === 'analyzing' && (
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-14 text-center space-y-4">
            <div className="text-5xl animate-spin">⚙️</div>
            <p className="text-lg font-bold text-white">Analysing your pitch…</p>
            <p className="text-sm text-slate-400">Evaluating pace · confidence · keywords · filler words</p>
          </div>
        )}

        {/* ══ RESULTS DASHBOARD ══ */}
        {phase === 'result' && analysis && (
          <div className="space-y-5">

            {usedFallback && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-3 text-xs text-amber-300 flex gap-2">
                <span>ℹ️</span>
                <span>Demo analysis shown — microphone was unavailable or speech recognition did not capture enough text.</span>
              </div>
            )}

            {/* ── OVERALL SCORE ── */}
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-8">
              {/* Circle */}
              <div className={`relative w-36 h-36 rounded-full border-8 ${scoreBg(analysis.score)} flex items-center justify-center shrink-0`}
                   style={{ background: `conic-gradient(from 0deg, transparent ${100 - analysis.score}%, transparent)` }}>
                <div className="text-center">
                  <p className={`text-4xl font-black ${scoreColor(analysis.score)}`}>{analysis.score}</p>
                  <p className="text-xs text-slate-500 font-semibold">/100</p>
                </div>
              </div>
              <div className="text-center sm:text-left space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-violet-400">Overall Pitch Score</p>
                <h2 className={`text-3xl font-extrabold ${scoreColor(analysis.score)}`}>
                  {analysis.score >= 80 ? 'Excellent Pitch 🌟' :
                   analysis.score >= 65 ? 'Good Delivery 👍' :
                   analysis.score >= 50 ? 'Needs Polish ⚠️' : 'Needs Significant Work 🔧'}
                </h2>
                <p className="text-slate-400 text-sm">
                  {analysis.wordCount} words · {fmtTime(analysis.durationSec)} recorded · {analysis.wpm} WPM
                </p>
              </div>
            </div>

            {/* ── METRIC CARDS ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* 1 — Speech Clarity & Pace */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚡</span>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Speech Clarity &amp; Pace</p>
                </div>
                <p className={`text-2xl font-black ${paceColor(analysis.paceRating)}`}>
                  {analysis.paceRating}
                </p>
                <p className="text-slate-400 text-xs">{analysis.paceNote}</p>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2">
                  <div
                    className="h-1.5 bg-blue-500 rounded-full"
                    style={{ width: `${Math.min((analysis.wpm / 200) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-600">0 ────── 100 ────── 200 WPM</p>
              </div>

              {/* 2 — Confidence & Tone */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Confidence &amp; Tone</p>
                </div>
                <p className={`text-2xl font-black ${confColor(analysis.confidence)}`}>
                  {analysis.confidence}
                </p>
                <p className="text-slate-400 text-xs">
                  {analysis.confidence === 'High'     && 'Clear, structured and assertive delivery detected.'}
                  {analysis.confidence === 'Moderate' && 'Good effort — minor hesitations detected.'}
                  {analysis.confidence === 'Low'      && 'Short/fragmented sentences or heavy filler words.'}
                </p>
                <div className="flex gap-1.5 mt-2">
                  {['Low','Moderate','High'].map(c => (
                    <div key={c} className={`flex-1 h-2 rounded-full ${
                      analysis.confidence === c
                        ? c === 'High' ? 'bg-emerald-500' : c === 'Moderate' ? 'bg-amber-500' : 'bg-red-500'
                        : 'bg-slate-800'
                    }`} />
                  ))}
                </div>
                <div className="flex justify-between text-[10px] text-slate-600">
                  <span>Low</span><span>Moderate</span><span>High</span>
                </div>
              </div>

              {/* 3 — Tech Keywords */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔑</span>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Tech Keywords Detected</p>
                </div>
                <p className="text-2xl font-black text-blue-400">
                  {analysis.detectedKeywords.length} <span className="text-sm text-slate-500 font-normal">found</span>
                </p>
                {analysis.detectedKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {analysis.detectedKeywords.slice(0, 12).map(kw => (
                      <span key={kw} className="bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs px-2.5 py-0.5 rounded-full font-medium capitalize">
                        {kw}
                      </span>
                    ))}
                    {analysis.detectedKeywords.length > 12 && (
                      <span className="text-xs text-slate-500">+{analysis.detectedKeywords.length - 12} more</span>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No tech keywords detected — mention your stack explicitly.</p>
                )}
              </div>

              {/* 4 — Filler Words */}
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚧</span>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Filler Words Detected</p>
                </div>
                <p className={`text-2xl font-black ${
                  analysis.fillerCount === 0 ? 'text-emerald-400' :
                  analysis.fillerCount <= 3   ? 'text-amber-400'  : 'text-red-400'
                }`}>
                  {analysis.fillerCount} <span className="text-sm text-slate-500 font-normal">
                    {analysis.fillerCount === 0 ? '— clean!' : analysis.fillerCount === 1 ? 'occurrence' : 'occurrences'}
                  </span>
                </p>
                <p className="text-slate-400 text-xs">
                  {analysis.fillerCount === 0
                    ? 'Excellent — no filler words detected!'
                    : `"um", "uh", "like", "basically" etc. detected ${analysis.fillerCount} time${analysis.fillerCount !== 1 ? 's' : ''}.`}
                </p>
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: Math.min(analysis.fillerCount, 10) }).map((_,i) => (
                    <div key={i} className="w-4 h-4 rounded bg-red-500/70" />
                  ))}
                  {analysis.fillerCount === 0 && (
                    <div className="w-4 h-4 rounded bg-emerald-500/70" />
                  )}
                </div>
              </div>
            </div>

            {/* ── AI FEEDBACK SUMMARY ── */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
              <p className="text-xs font-bold uppercase tracking-wide text-violet-400">🤖 AI Feedback Summary</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* Strengths */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                    <span>✅</span> Strengths
                  </p>
                  {analysis.strengths.length > 0 ? (
                    <ul className="space-y-2">
                      {analysis.strengths.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                          <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">No specific strengths flagged — keep practising!</p>
                  )}
                </div>

                {/* Improvements */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <span>🎯</span> Actionable Improvements
                  </p>
                  {analysis.improvements.length > 0 ? (
                    <ul className="space-y-2">
                      {analysis.improvements.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                          <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">Great job — no major improvements flagged!</p>
                  )}
                </div>
              </div>
            </div>

            {/* ── ACTIONS ── */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={reRecord}
                className="flex-1 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-violet-900/40 transition-all"
              >
                🔄 Try Again
              </button>
              <button
                onClick={onBack}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-2xl border border-slate-700 transition-all"
              >
                🏠 Back to Dashboard
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
