import React, { useState, useRef, useEffect, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   LUT PRESET DEFINITIONS
   Each preset maps to a set of CSS filter values + optional extras.
═══════════════════════════════════════════════════════════════════ */
const LUT_PRESETS = [
  {
    id: 'none',
    label: 'Original',
    icon: '⬜',
    accentFrom: 'from-slate-600', accentTo: 'to-slate-800',
    filters: { brightness: 100, contrast: 100, saturation: 100, hueRotate: 0, sepia: 0, invert: 0 },
    css: '',
    desc: 'No grading applied',
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk Neon',
    icon: '🟣',
    accentFrom: 'from-purple-600', accentTo: 'to-cyan-600',
    filters: { brightness: 110, contrast: 140, saturation: 180, hueRotate: 270, sepia: 0, invert: 0 },
    css: 'brightness(1.1) contrast(1.4) saturate(1.8) hue-rotate(270deg)',
    desc: 'High-contrast neon magenta & cyan tones',
  },
  {
    id: 'warm',
    label: 'Cinematic Warm',
    icon: '🟠',
    accentFrom: 'from-orange-500', accentTo: 'to-yellow-600',
    filters: { brightness: 105, contrast: 115, saturation: 120, hueRotate: 15, sepia: 20, invert: 0 },
    css: 'brightness(1.05) contrast(1.15) saturate(1.2) hue-rotate(15deg) sepia(0.2)',
    desc: 'Warm amber tones, Hollywood look',
  },
  {
    id: 'tech',
    label: 'Tech Minimalist',
    icon: '⚪',
    accentFrom: 'from-slate-400', accentTo: 'to-blue-400',
    filters: { brightness: 95, contrast: 120, saturation: 60, hueRotate: 200, sepia: 0, invert: 0 },
    css: 'brightness(0.95) contrast(1.2) saturate(0.6) hue-rotate(200deg)',
    desc: 'Cool desaturated blue-grey tech look',
  },
  {
    id: 'noir',
    label: 'Film Noir',
    icon: '⬛',
    accentFrom: 'from-slate-700', accentTo: 'to-slate-900',
    filters: { brightness: 85, contrast: 150, saturation: 20, hueRotate: 0, sepia: 30, invert: 0 },
    css: 'brightness(0.85) contrast(1.5) saturate(0.2) sepia(0.3)',
    desc: 'Classic black & white noir, deep shadows',
  },
  {
    id: 'vivid',
    label: 'Vivid High Contrast',
    icon: '🔴',
    accentFrom: 'from-red-500', accentTo: 'to-yellow-400',
    filters: { brightness: 108, contrast: 160, saturation: 200, hueRotate: 5, sepia: 0, invert: 0 },
    css: 'brightness(1.08) contrast(1.6) saturate(2.0) hue-rotate(5deg)',
    desc: 'Punchy oversaturated colours, social-media pop',
  },
  {
    id: 'golden',
    label: 'Golden Hour',
    icon: '🟡',
    accentFrom: 'from-yellow-500', accentTo: 'to-orange-400',
    filters: { brightness: 112, contrast: 108, saturation: 130, hueRotate: 25, sepia: 35, invert: 0 },
    css: 'brightness(1.12) contrast(1.08) saturate(1.3) hue-rotate(25deg) sepia(0.35)',
    desc: 'Soft golden-hour warmth, sunset feel',
  },
];

const DEFAULT_ADJUSTMENTS = {
  brightness: 100,
  contrast:   100,
  saturation: 100,
  temperature: 0,   // -100 cool → +100 warm  (mapped to hue-rotate offset)
  tint:        0,   // -100 magenta → +100 green
  vignette:    0,   // 0–100
  grain:       0,   // 0–100
};

const SAMPLE_VIDEO_URL = 'https://www.w3schools.com/html/mov_bbb.mp4';

/* ═══════════════════════════════════════════════════════════════════
   LEARN MODULE DATA
   Structured lessons for cinematic video editing education.
═══════════════════════════════════════════════════════════════════ */
const LEARN_LESSONS = [
  {
    id: 'intro',
    title: 'What is Color Grading?',
    icon: '🎨',
    tag: 'Foundation',
    tagColor: 'bg-blue-600/30 text-blue-300 border-blue-500/40',
    duration: '5 min',
    summary: 'Understand the difference between color correction and color grading, and why it matters for storytelling.',
    theory: `Color grading is the process of altering and enhancing the color of a video to create a specific mood, tone, or visual style. It is different from color correction, which fixes technical problems (exposure, white balance). Grading is a creative choice.

Every Hollywood film has a distinctive look — the desaturated teal-orange of action blockbusters, the warm amber of period dramas, the cold sterile blues of thrillers. That look comes from a color grade.

A LUT (Look-Up Table) is essentially a mathematical preset that maps every pixel color in your source footage to a new output color. Professional colorists bake their grades into LUT files (.cube or .3dl) which can be applied in any editing software.`,
    steps: [
      { step: 1, title: 'Start with Correction', desc: 'Fix exposure and white balance first. Color grading looks bad on improperly exposed footage.', tip: 'A well-exposed shot with neutral color balance is the best canvas.' },
      { step: 2, title: 'Choose Your Story Mood', desc: 'Ask: is this scene romantic, tense, joyful, dystopian? Let the answer guide your palette.', tip: 'Warm oranges = comfort & nostalgia. Cool blues = isolation & tension.' },
      { step: 3, title: 'Apply a Base LUT', desc: 'Start with a cinematic LUT preset that matches your target mood. Think of it as the foundation layer.', tip: 'Never use 100% LUT intensity — blend it at 60–80% to preserve some natural skin tones.' },
      { step: 4, title: 'Fine-Tune Manually', desc: 'Use brightness, contrast and saturation sliders to push the look further without destroying detail.', tip: 'Contrast is the most powerful tool. Slight lift (raise blacks) gives a film-like matte look.' },
      { step: 5, title: 'Add Atmosphere', desc: 'Add vignette to draw attention to the center of frame. Add subtle grain to simulate film texture.', tip: 'Keep grain below 20 for digital-clean look; go 40+ for an analogue film feel.' },
    ],
    quiz: {
      question: 'Which preset would you choose for a scene meant to feel cold, isolated, and futuristic?',
      options: ['Cinematic Warm', 'Golden Hour', 'Tech Minimalist', 'Vivid High Contrast'],
      answer: 2,
      explanation: 'Tech Minimalist uses desaturated, cool blue-grey tones that convey isolation and a sterile, futuristic environment.'
    }
  },
  {
    id: 'contrast',
    title: 'Mastering Contrast & Exposure',
    icon: '☀️',
    tag: 'Core Skill',
    tagColor: 'bg-amber-600/30 text-amber-300 border-amber-500/40',
    duration: '7 min',
    summary: 'Learn how contrast shapes mood, how to lift blacks for a filmic matte, and when to crush them for drama.',
    theory: `Contrast is the ratio between the lightest and darkest areas of your image. High contrast creates drama and visual punch. Low contrast (flat/matte) feels subdued and cinematic, like film stock.

The "S-curve" is the industry-standard tool: you gently lift the shadows (brighten dark areas) and push the highlights (brighten bright areas) while keeping the mid-tones stable. This creates a natural "punchy" look without blowing out highlights.

Lifting blacks — raising the minimum shadow value above pure black — is the hallmark of a film-print look. It gives footage that distinctive "faded" or "matte" quality you see in indie films and music videos.`,
    steps: [
      { step: 1, title: 'Find Your Baseline', desc: 'Set contrast to 100% and brightness to 100%. This is your neutral starting point.', tip: 'Never grade blindly. Always start from neutral.' },
      { step: 2, title: 'Push Contrast for Drama', desc: 'Raise contrast to 130–160% for action, horror, or thriller content. This crushes shadows and pops highlights.', tip: 'Watch for blown highlights (pure white). If you lose sky detail, back off.' },
      { step: 3, title: 'Lift Blacks for Film Look', desc: 'Lower brightness slightly (90–95%) combined with moderate contrast (110–120%) for a matte film feel.', tip: 'The "matte" look comes from blacks that never reach 0,0,0. Increase brightness on Film Noir preset to see this.' },
      { step: 4, title: 'Use Temperature for Contrast', desc: 'Shifting temperature toward warm (+30 to +50) also increases perceived contrast in outdoor scenes.', tip: 'Human vision perceives warm colours as closer and cool colours as distant.' },
      { step: 5, title: 'Test on Your Preset', desc: 'Select "Cyberpunk Neon" and increase contrast to 180%. Then bring it back to 120%. Notice how mood shifts dramatically.', tip: 'High contrast + high saturation = aggressive, energetic feel.' },
    ],
    quiz: {
      question: 'You want a "matte film" look. Which slider combination achieves this?',
      options: [
        'Contrast 160%, Brightness 120%',
        'Contrast 115%, Brightness 90%',
        'Contrast 50%, Saturation 200%',
        'Contrast 200%, Brightness 50%'
      ],
      answer: 1,
      explanation: 'Moderate contrast (115%) combined with slightly reduced brightness (90%) lifts the blacks and gives the characteristic matte/faded film look.'
    }
  },
  {
    id: 'color-theory',
    title: 'Color Theory for Cinematic Looks',
    icon: '🌈',
    tag: 'Creative',
    tagColor: 'bg-purple-600/30 text-purple-300 border-purple-500/40',
    duration: '8 min',
    summary: 'Understand complementary colour palettes, teal-orange grading, and how Hollywood films create iconic looks.',
    theory: `The most famous cinematic look is teal-orange. It dominates blockbuster films because orange (skin tones) and teal (backgrounds, shadows) are complementary colours — they sit opposite on the colour wheel and create maximum visual contrast.

Other iconic cinematic palettes:
• Warm amber (period films, westerns) — nostalgia, comfort
• Desaturated blue-grey (sci-fi, thrillers) — cold, sterile, corporate
• High-contrast green (The Matrix) — digital, unreal
• Split-toning — warm highlights + cool shadows (or vice versa) for depth

Hue-rotate is the quickest way to shift your entire palette. A value of 180° inverts hues completely. Values like 270° push everything into the blue-purple range (Cyberpunk). Values of 15–30° shift slightly toward warmer amber tones.`,
    steps: [
      { step: 1, title: 'Understand Hue Rotate', desc: 'Open the Cyberpunk preset. Notice hue-rotate is 270° — this pushes neutral colors into blue-purple territory.', tip: 'Hue-rotate affects ALL colours equally. It is a global shift, not a selective one.' },
      { step: 2, title: 'Create Teal-Orange', desc: 'Start with "Tech Minimalist". Reduce saturation to 70%, set hue-rotate to 195°, and push temperature to +20.', tip: 'This desaturates the scene while pushing backgrounds into teal and preserving skin warmth.' },
      { step: 3, title: 'Warm vs Cool Split', desc: 'Compare "Golden Hour" (+35° hue, warm sepia) with "Tech Minimalist" (200° hue, cool blue). Feel the mood difference.', tip: 'Before you grade, decide the emotional temperature of your scene.' },
      { step: 4, title: 'Use Sepia for Period Feel', desc: 'Sepia adds a warm brown-yellow cast. Even 15–20% sepia with normal saturation creates a vintage, aged look.', tip: 'Sepia + slight grain = super convincing analogue film recreation.' },
      { step: 5, title: 'Practice: Recreate a Look', desc: 'Try to recreate a "Matrix green" look: set hue-rotate to 90°, saturation to 140%, contrast to 140%.', tip: 'Experiment! The best colorists develop an eye through thousands of hours of practice.' },
    ],
    quiz: {
      question: 'What makes the "teal-orange" look so popular in Hollywood blockbusters?',
      options: [
        'It is easy to apply in post-production',
        'Orange and teal are complementary colours — maximum visual contrast',
        'It is the default look of digital cameras',
        'It is required by cinema standards'
      ],
      answer: 1,
      explanation: 'Orange (skin tones) and teal (shadows/backgrounds) are complementary colours — opposite on the colour wheel — creating the most visually striking natural contrast.'
    }
  },
  {
    id: 'atmosphere',
    title: 'Vignette, Grain & Atmosphere',
    icon: '🌫️',
    tag: 'Atmosphere',
    tagColor: 'bg-slate-600/30 text-slate-300 border-slate-500/40',
    duration: '5 min',
    summary: 'Use vignette to control viewer attention and film grain to add texture and organic warmth to digital footage.',
    theory: `Vignette and grain are finishing tools — they add a physical, tactile quality to digital footage.

Vignette is a gradual darkening toward the edges of the frame. It is caused by optical lens distortion in film cameras. Audiences are trained by decades of cinema to read vignette as "cinematic." More importantly, it directs the eye toward the center of frame where your subject is.

Film grain is the visible texture created by silver halide crystals in analogue film. Digital cameras produce clean, grain-free images — which can actually feel clinical and sterile. Adding controlled digital grain mimics the warmth and "aliveness" of film stock.

Rule of thumb: less is more. Subtle vignette (20–35) and light grain (10–25) feel natural. Heavy application feels like a filter effect.`,
    steps: [
      { step: 1, title: 'Subtle Vignette First', desc: 'Set vignette to 20–25. This barely noticeable darkening draws attention toward the center without feeling artificial.', tip: 'If a viewer notices the vignette, it is too heavy.' },
      { step: 2, title: 'Dramatic Vignette', desc: 'Push vignette to 60–80 with Film Noir preset for a classic cinema close-up feel.', tip: 'Heavy vignette works well for portrait shots, monologues, and intimate scenes.' },
      { step: 3, title: 'Light Grain for Realism', desc: 'Set grain to 15. On any preset, this adds organic texture that makes digital footage feel warmer.', tip: 'Grain is more visible in dark areas (shadows). Good for noir and moody scenes.' },
      { step: 4, title: 'Heavy Grain for Style', desc: 'Push grain to 50–70 with Golden Hour for a Super-8 film aesthetic.', tip: 'Pair heavy grain with sepia and reduced saturation for a convincing vintage home-video look.' },
      { step: 5, title: 'Combine Both', desc: 'Set vignette to 30 and grain to 20. This is the "safe" professional finishing combination that works for almost any style.', tip: 'Most commercial colorists apply vignette and grain as the final step after all other grading.' },
    ],
    quiz: {
      question: 'At what grain level does digital footage start to feel like analogue film?',
      options: ['0–5 (invisible)', '10–25 (subtle texture)', '50–70 (heavy film)', '90–100 (noise)'],
      answer: 1,
      explanation: 'Grain in the 10–25 range adds just enough organic texture to warm digital footage without becoming distracting. This is the sweet spot for most cinematic applications.'
    }
  },
  {
    id: 'workflow',
    title: 'Professional Grading Workflow',
    icon: '🎬',
    tag: 'Workflow',
    tagColor: 'bg-cyan-600/30 text-cyan-300 border-cyan-500/40',
    duration: '10 min',
    summary: 'The step-by-step professional workflow colorists use: from primary correction to final LUT export.',
    theory: `Professional colorists follow a structured workflow to ensure consistency and flexibility across an entire film or video series.

The workflow has three phases:

1. Primary Correction — Fix technical exposure and white balance issues. This is non-creative and mandatory.
2. Secondary Grading — Apply the creative look: LUTs, colour palette, mood, tone. This is where art meets craft.
3. Finishing — Final vignette, grain, lens effects. The finishing touches that make a grade feel complete.

In professional software (DaVinci Resolve, Adobe Premiere, Final Cut Pro), these are handled in separate nodes/layers. Here we simulate them with our preset + adjustment + atmosphere system.

The CSS filter code this tool generates can be directly used in web video players, CSS animations, and video editing overlays.`,
    steps: [
      { step: 1, title: 'Phase 1: Primary Correction', desc: 'Reset all adjustments. Set brightness to match the natural exposure of your footage. Adjust contrast to neutralise any flatness.', tip: 'Aim for a "balanced" image — no blown highlights, no crushed blacks.' },
      { step: 2, title: 'Phase 2: Choose Your Look', desc: 'Select the LUT preset that fits your creative intent. Do not over-think it — your gut reaction to a preset is usually right.', tip: 'Professionals audition presets quickly, then refine. Do not spend 20 minutes picking a preset.' },
      { step: 3, title: 'Phase 2: Refine with Sliders', desc: 'Nudge brightness, contrast, and saturation to taste. Keep changes subtle — 5–15% from preset values only.', tip: 'If you are making large slider changes, you probably chose the wrong preset to start.' },
      { step: 4, title: 'Phase 3: Add Atmosphere', desc: 'Add vignette (15–30) and grain (10–20) last. These are the final polish steps.', tip: 'Think of vignette and grain as the frame around a painting — they complete the work.' },
      { step: 5, title: 'Export & Use the CSS', desc: 'Copy the generated CSS filter code. This exact filter can be applied to any HTML video element or used as a reference for professional software settings.', tip: 'CSS filter values map directly to DaVinci Resolve primary wheels: brightness = lift/gain, contrast = pivot, saturate = saturation.' },
    ],
    quiz: {
      question: 'In the professional grading workflow, what is the correct order of operations?',
      options: [
        'Apply LUT → Fix exposure → Add grain',
        'Fix exposure → Apply LUT → Add grain & vignette',
        'Add grain → Apply LUT → Fix exposure',
        'Apply LUT → Add grain → Fix exposure'
      ],
      answer: 1,
      explanation: 'Primary correction (exposure fix) comes first, then secondary creative grading (LUT/look), then finishing touches (grain, vignette). Applying a LUT to poorly exposed footage will amplify problems.'
    }
  },
];

const QUIZ_PRESET_CHALLENGE = {
  title: '🎯 Preset Challenge',
  desc: 'We apply a mystery filter to the video. Can you identify which LUT preset it is?',
  rounds: LUT_PRESETS.filter(p => p.id !== 'none').map(p => ({ presetId: p.id, label: p.label })),
};

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════ */
function buildCSSFilter(preset, adj) {
  const b   = (preset.filters.brightness / 100) * (adj.brightness / 100);
  const c   = (preset.filters.contrast   / 100) * (adj.contrast   / 100);
  const s   = (preset.filters.saturation / 100) * (adj.saturation / 100);
  const hr  = preset.filters.hueRotate + (adj.temperature * 0.4) + (adj.tint * -0.3);
  const sep = preset.filters.sepia / 100;
  return `brightness(${b.toFixed(3)}) contrast(${c.toFixed(3)}) saturate(${s.toFixed(3)}) hue-rotate(${hr.toFixed(1)}deg) sepia(${sep.toFixed(2)})`;
}

function buildCSSCode(preset, adj) {
  const filter = buildCSSFilter(preset, adj);
  const vignette = adj.vignette > 0
    ? `\n  /* vignette via box-shadow */\n  box-shadow: inset 0 0 ${adj.vignette * 2}px rgba(0,0,0,${(adj.vignette / 100).toFixed(2)});`
    : '';
  return `.my-video {\n  filter: ${filter};${vignette}\n}`;
}

/* ═══════════════════════════════════════════════════════════════════
   SLIDER CONTROL
═══════════════════════════════════════════════════════════════════ */
function AdjustSlider({ label, value, min, max, unit = '', onChange, accentColor = 'accent-cyan-500' }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
        <span className={`text-[11px] font-bold tabular-nums ${value !== (min + max) / 2 && value !== 100 && value !== 0 ? 'text-cyan-300' : 'text-slate-500'}`}>
          {value > 0 && min < 0 ? `+${value}` : value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={1}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={`w-full h-1.5 rounded-full cursor-pointer ${accentColor}`}
        style={{ background: `linear-gradient(to right, rgb(34 211 238) ${pct}%, rgb(51 65 85) ${pct}%)` }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PRESET THUMBNAIL CARD
═══════════════════════════════════════════════════════════════════ */
function PresetCard({ preset, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 text-left ${
        selected
          ? 'border-cyan-400 shadow-lg shadow-cyan-400/30 scale-[1.03]'
          : 'border-slate-700 hover:border-slate-500'
      }`}
    >
      {/* Gradient thumbnail */}
      <div className={`h-16 w-full bg-gradient-to-br ${preset.accentFrom} ${preset.accentTo} flex items-center justify-center text-2xl relative`}>
        {/* Filter overlay simulation */}
        <div className="absolute inset-0 opacity-40" style={{ filter: preset.css || 'none', background: 'inherit' }} />
        <span className="relative z-10 drop-shadow">{preset.icon}</span>
        {selected && (
          <div className="absolute top-1 right-1 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center text-[9px] text-slate-900 font-black">✓</div>
        )}
      </div>
      <div className="px-2 py-1.5 bg-slate-800">
        <p className="text-[11px] font-bold text-slate-200 truncate">{preset.label}</p>
        <p className="text-[9px] text-slate-500 truncate">{preset.desc}</p>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VIGNETTE & GRAIN OVERLAY
═══════════════════════════════════════════════════════════════════ */
function VideoOverlays({ vignette, grain }) {
  return (
    <>
      {vignette > 0 && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{
            boxShadow: `inset 0 0 ${vignette * 2.5}px ${vignette * 1.5}px rgba(0,0,0,${(vignette / 100).toFixed(2)})`,
          }}
        />
      )}
      {grain > 0 && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl opacity-[0.15] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            opacity: grain / 200,
          }}
        />
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LEARN TAB COMPONENTS
═══════════════════════════════════════════════════════════════════ */

/** Single quiz question with 4 options */
function LessonQuiz({ quiz, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const correct = selected === quiz.answer;

  function handleConfirm() {
    if (selected === null) return;
    setConfirmed(true);
    if (correct) setTimeout(() => onComplete && onComplete(), 1400);
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4">
      <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">✏️ Quick Check</p>
      <p className="text-sm text-slate-200 font-medium leading-relaxed">{quiz.question}</p>
      <div className="space-y-2">
        {quiz.options.map((opt, i) => {
          let cls = 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-400 hover:bg-slate-700';
          if (confirmed) {
            if (i === quiz.answer) cls = 'border-emerald-400 bg-emerald-500/20 text-emerald-200';
            else if (i === selected && i !== quiz.answer) cls = 'border-red-400 bg-red-500/20 text-red-300';
            else cls = 'border-slate-700 bg-slate-800/50 text-slate-500';
          } else if (selected === i) {
            cls = 'border-cyan-400 bg-cyan-500/20 text-cyan-200';
          }
          return (
            <button
              key={i}
              disabled={confirmed}
              onClick={() => setSelected(i)}
              className={`w-full text-left text-xs px-4 py-2.5 rounded-xl border-2 transition-all ${cls}`}
            >
              <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {!confirmed ? (
        <button
          onClick={handleConfirm}
          disabled={selected === null}
          className="w-full py-2 text-xs font-bold bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all"
        >
          Submit Answer
        </button>
      ) : (
        <div className={`flex items-start gap-3 p-3 rounded-xl text-xs leading-relaxed ${correct ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-200' : 'bg-red-500/15 border border-red-500/30 text-red-200'}`}>
          <span className="text-lg shrink-0">{correct ? '✅' : '❌'}</span>
          <div>
            <p className="font-bold mb-1">{correct ? 'Correct!' : 'Not quite.'}</p>
            <p className="text-slate-300">{quiz.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/** Lesson detail view */
function LessonDetail({ lesson, onBack, onComplete, completedIds }) {
  const [quizDone, setQuizDone] = useState(false);
  const alreadyDone = completedIds.includes(lesson.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-all"
        >
          ← Back to Lessons
        </button>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${lesson.tagColor}`}>{lesson.tag}</span>
        <span className="text-[10px] text-slate-500 ml-auto">⏱ {lesson.duration} read</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl">{lesson.icon}</span>
        <div>
          <h2 className="text-xl font-extrabold text-white">{lesson.title}</h2>
          <p className="text-sm text-slate-400 mt-0.5">{lesson.summary}</p>
        </div>
      </div>

      {/* Theory */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">📖 Theory</p>
        <div className="text-sm text-slate-300 leading-[1.75] whitespace-pre-line">{lesson.theory}</div>
      </div>

      {/* Step-by-step */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">🪜 Step-by-Step Practice</p>
        <div className="space-y-3">
          {lesson.steps.map((s) => (
            <div key={s.step} className="flex gap-4 p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl">
              <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-black text-white mt-0.5">
                {s.step}
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm font-bold text-slate-200">{s.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                <div className="flex items-start gap-2 mt-2 bg-amber-500/10 border border-amber-500/20 px-3 py-2 rounded-lg">
                  <span className="text-amber-400 text-[11px] shrink-0 mt-px">💡</span>
                  <p className="text-[11px] text-amber-200/80 leading-relaxed">{s.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz */}
      <LessonQuiz
        quiz={lesson.quiz}
        onComplete={() => { setQuizDone(true); if (!alreadyDone) onComplete(lesson.id); }}
      />

      {(quizDone || alreadyDone) && (
        <div className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-300">
          🎓 Lesson Complete! Head to the next lesson to keep learning.
        </div>
      )}
    </div>
  );
}

/** Build 4-option array for a given round index */
function buildOptions(rounds, idx) {
  const others = rounds.filter((_, i) => i !== idx);
  const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  return [...shuffled, rounds[idx]].sort(() => Math.random() - 0.5);
}

/** Preset identification challenge game */
function PresetChallenge({ videoSrc }) {
  const rounds = QUIZ_PRESET_CHALLENGE.rounds;
  const [roundIdx, setRoundIdx] = useState(() => Math.floor(Math.random() * rounds.length));
  const [roundOptions, setRoundOptions] = useState(() => buildOptions(rounds, Math.floor(Math.random() * rounds.length)));
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [played, setPlayed] = useState(0);

  const targetPresetId = rounds[roundIdx].presetId;
  const targetPreset   = LUT_PRESETS.find(p => p.id === targetPresetId);
  const cssFilter      = buildCSSFilter(targetPreset, DEFAULT_ADJUSTMENTS);

  function nextRound() {
    let next = Math.floor(Math.random() * rounds.length);
    if (next === roundIdx) next = (next + 1) % rounds.length;
    setRoundIdx(next);
    setRoundOptions(buildOptions(rounds, next));
    setSelected(null);
    setRevealed(false);
  }

  function handleGuess(id) {
    if (revealed) return;
    setSelected(id);
    setRevealed(true);
    setPlayed(p => p + 1);
    if (id === targetPresetId) setScore(s => s + 1);
  }

  return (
    <div className="space-y-5">
      {/* Score bar */}
      <div className="flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5">
        <span className="text-xs font-bold text-slate-400">🎯 Preset Challenge</span>
        <span className="text-xs font-bold text-cyan-300">{score}/{played} correct</span>
      </div>

      <p className="text-sm text-slate-300">
        A mystery LUT filter is applied to the video below. <span className="text-cyan-300 font-semibold">Can you identify which preset it is?</span>
      </p>

      {/* Video with mystery filter */}
      <div className="relative bg-black rounded-2xl overflow-hidden border border-slate-700">
        <video
          src={videoSrc}
          controls loop
          className="w-full max-h-[280px] object-contain"
          style={{ filter: cssFilter }}
        />
        <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
          🔍 Mystery Filter Applied
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {roundOptions.map(opt => {
          const isCorrect = opt.presetId === targetPresetId;
          const isSelected = selected === opt.presetId;
          let cls = 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-400';
          if (revealed) {
            if (isCorrect) cls = 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-bold';
            else if (isSelected) cls = 'border-red-400 bg-red-500/20 text-red-300';
            else cls = 'border-slate-700 bg-slate-800/50 text-slate-500';
          }
          const preset = LUT_PRESETS.find(p => p.id === opt.presetId);
          return (
            <button
              key={opt.presetId}
              onClick={() => handleGuess(opt.presetId)}
              disabled={revealed}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs transition-all ${cls}`}
            >
              <span className="text-lg">{preset?.icon}</span>
              <span className="font-semibold">{opt.label}</span>
              {revealed && isCorrect && <span className="ml-auto">✅</span>}
              {revealed && isSelected && !isCorrect && <span className="ml-auto">❌</span>}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="space-y-3">
          <div className={`text-xs p-3 rounded-xl border leading-relaxed ${selected === targetPresetId ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-orange-500/10 border-orange-500/30 text-orange-200'}`}>
            <span className="font-bold">{selected === targetPresetId ? '🎉 Spot on!' : '🤔 Not quite.'}</span>{' '}
            The filter was <span className="font-bold text-white">{targetPreset?.label}</span> — {targetPreset?.desc}
          </div>
          <button
            onClick={nextRound}
            className="w-full py-2.5 text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl transition-all"
          >
            Next Mystery Filter →
          </button>
        </div>
      )}
    </div>
  );
}

/** Full learn tab shell */
function LearnTab({ videoSrc }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  const [activeSection, setActiveSection] = useState('lessons'); // 'lessons' | 'challenge'

  function markComplete(id) {
    setCompletedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }

  if (activeLesson) {
    return (
      <LessonDetail
        lesson={activeLesson}
        onBack={() => setActiveLesson(null)}
        onComplete={markComplete}
        completedIds={completedIds}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Section tabs */}
      <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700 rounded-xl p-1 w-fit">
        {[['lessons', '📚 Lessons'], ['challenge', '🎯 Challenge']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeSection === key ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {activeSection === 'lessons' && (
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-slate-400">Learning Progress</span>
                <span className="text-cyan-300">{completedIds.length}/{LEARN_LESSONS.length} lessons</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${(completedIds.length / LEARN_LESSONS.length) * 100}%` }}
                />
              </div>
            </div>
            {completedIds.length === LEARN_LESSONS.length && (
              <span className="text-2xl animate-bounce">🏆</span>
            )}
          </div>

          {/* Lesson cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3">
            {LEARN_LESSONS.map((lesson, idx) => {
              const done = completedIds.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className="group text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-2xl p-4 transition-all duration-200 flex items-start gap-4"
                >
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 group-hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-xl transition-all relative">
                    {lesson.icon}
                    {done && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] text-white font-black">✓</div>
                    )}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{lesson.title}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${lesson.tagColor}`}>{lesson.tag}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{lesson.summary}</p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-[10px] text-slate-600">⏱ {lesson.duration}</span>
                      <span className="text-[10px] text-slate-600">•</span>
                      <span className="text-[10px] text-slate-600">{lesson.steps.length} steps</span>
                      {done && <span className="text-[10px] text-emerald-400 font-semibold ml-auto">Completed ✓</span>}
                    </div>
                  </div>
                  <span className="text-slate-600 group-hover:text-slate-300 text-sm shrink-0 mt-1 transition-colors">→</span>
                </button>
              );
            })}
          </div>

          {/* Cheat sheet */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">📋 Quick Reference Cheat Sheet</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Dramatic / Action', recipe: 'Vivid or Cyberpunk · Contrast 140–160 · Grain 15' },
                { label: 'Romantic / Nostalgic', recipe: 'Cinematic Warm · Sepia 15–20 · Vignette 25' },
                { label: 'Sci-Fi / Thriller', recipe: 'Tech Minimalist · Saturation 60 · Temp −30' },
                { label: 'Film Noir / Drama', recipe: 'Film Noir · Contrast 150 · Vignette 50 · Grain 30' },
                { label: 'Sunset / Travel', recipe: 'Golden Hour · Saturation 130 · Temp +25' },
                { label: 'Indie / Matte', recipe: 'Any preset · Brightness 92 · Contrast 112 · Grain 20' },
              ].map(item => (
                <div key={item.label} className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2.5">
                  <p className="text-[11px] font-bold text-cyan-300">{item.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.recipe}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'challenge' && (
        <PresetChallenge videoSrc={videoSrc} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function VideoColorGradingLUT({ onBack }) {
  const [activeTab, setActiveTab]     = useState('studio'); // 'studio' | 'learn'
  const [videoSrc, setVideoSrc]       = useState(SAMPLE_VIDEO_URL);
  const [isDragging, setIsDragging]   = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(LUT_PRESETS[0]);
  const [adjustments, setAdjustments] = useState({ ...DEFAULT_ADJUSTMENTS });
  const [compareMode, setCompareMode] = useState(false);
  const [comparePos, setComparePos]   = useState(50); // 0–100%
  const [rendering, setRendering]     = useState(false);
  const [renderPct, setRenderPct]     = useState(0);
  const [copied, setCopied]           = useState(false);
  const [videoError, setVideoError]   = useState(false);

  const videoRef      = useRef(null);
  const videoOrigRef  = useRef(null);
  const fileInputRef  = useRef(null);
  const compareRef    = useRef(null);

  const cssFilter = buildCSSFilter(selectedPreset, adjustments);

  /* ── sync both video elements ── */
  useEffect(() => {
    const v = videoRef.current;
    const o = videoOrigRef.current;
    if (!v || !o) return;
    const sync = () => { try { o.currentTime = v.currentTime; } catch {} };
    const syncPlay  = () => { try { o.play();  } catch {} };
    const syncPause = () => { try { o.pause(); } catch {} };
    v.addEventListener('timeupdate', sync);
    v.addEventListener('play',  syncPlay);
    v.addEventListener('pause', syncPause);
    v.addEventListener('seeked', sync);
    return () => {
      v.removeEventListener('timeupdate', sync);
      v.removeEventListener('play',  syncPlay);
      v.removeEventListener('pause', syncPause);
      v.removeEventListener('seeked', sync);
    };
  }, [videoSrc]);

  /* ── drag & drop ── */
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'video/mp4' || file.type === 'video/webm')) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoError(false);
    }
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoError(false);
    }
  };

  /* ── compare slider drag ── */
  const handleCompareMove = (e) => {
    if (!compareRef.current) return;
    const rect = compareRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setComparePos(pct);
  };

  /* ── adjustment helper ── */
  const setAdj = (key) => (val) => setAdjustments(a => ({ ...a, [key]: val }));

  /* ── reset ── */
  const resetAdjustments = () => { setAdjustments({ ...DEFAULT_ADJUSTMENTS }); setSelectedPreset(LUT_PRESETS[0]); };

  /* ── render simulation ── */
  async function handleRender() {
    setRendering(true);
    setRenderPct(0);
    const steps = ['Initialising renderer…', 'Decoding video frames…', 'Applying LUT filter…', 'Compositing grain & vignette…', 'Encoding output…', 'Finalising…'];
    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 400));
      setRenderPct(Math.round(((i + 1) / steps.length) * 100));
    }
    setRendering(false);
    // export mock file
    const blob = new Blob([`[mock export — preset: ${selectedPreset.label}, filter: ${cssFilter}]`], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `graded-video-${selectedPreset.id}.mp4`; a.click();
    URL.revokeObjectURL(url);
  }

  /* ── copy CSS ── */
  function handleCopyCSS() {
    const code = buildCSSCode(selectedPreset, adjustments);
    navigator.clipboard.writeText(code).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  }

  /* ═══ RENDER ═══ */
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">

      {/* ── TOP BAR ── */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-all"
        >
          ← Back to Dashboard
        </button>
        <span className="text-xs text-slate-500 font-medium hidden sm:block">CareerCompass AI · Color Grading</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-cyan-600/20 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-cyan-300 uppercase tracking-wider">
            🎨 Cinematic LUT Filters
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            Color Grading Presets & Cinematic LUT Filters
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Upload your video, apply cinematic LUT presets — or switch to <span className="text-cyan-300 font-semibold">Learn Mode</span> to study color grading theory, step-by-step techniques, and test your eye with challenges.
          </p>
        </div>

        {/* ── MAIN TAB NAV ── */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 w-fit mx-auto">
          {[
            ['studio', '🎬 Studio — Apply Filters'],
            ['learn',  '📚 Learn — Cinematic Editing'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === key
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── LEARN TAB ── */}
        {activeTab === 'learn' && (
          <LearnTab videoSrc={videoSrc} />
        )}

        {/* ── MAIN LAYOUT (studio) ── */}
        {activeTab === 'studio' && <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">

          {/* ══ LEFT: Video Preview ══ */}
          <div className="space-y-5">

            {/* Upload Zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl px-6 py-4 cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-500/10'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-500'
              }`}
            >
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl shrink-0">📁</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-300">Drop your video here, or click to browse</p>
                <p className="text-xs text-slate-500 mt-0.5">MP4 or WebM · Fallback sample loaded if no file selected</p>
              </div>
              <span className="ml-auto text-xs bg-slate-800 border border-slate-700 text-slate-400 px-3 py-1.5 rounded-xl shrink-0">Upload</span>
              <input ref={fileInputRef} type="file" accept="video/mp4,video/webm" className="hidden" onChange={handleFileInput} />
            </div>

            {/* Video Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center gap-3 px-4 py-2.5 border-b border-slate-800 bg-slate-900/80 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview</span>
                <div className="flex items-center gap-1 ml-auto bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                  <button
                    onClick={() => setCompareMode(false)}
                    className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${!compareMode ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Graded
                  </button>
                  <button
                    onClick={() => setCompareMode(true)}
                    className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${compareMode ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Before / After
                  </button>
                </div>
                {/* Active filter badge */}
                <div className={`px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gradient-to-r ${selectedPreset.accentFrom} ${selectedPreset.accentTo} text-white`}>
                  {selectedPreset.icon} {selectedPreset.label}
                </div>
              </div>

              {/* Single graded view */}
              {!compareMode && (
                <div className="relative bg-black">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    controls
                    loop
                    className="w-full max-h-[420px] object-contain rounded-b-2xl"
                    style={{ filter: cssFilter }}
                    onError={() => setVideoError(true)}
                    crossOrigin="anonymous"
                  />
                  <VideoOverlays vignette={adjustments.vignette} grain={adjustments.grain} />
                  {videoError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 text-slate-400 text-xs">
                      ⚠️ Could not load video. Try a local file.
                    </div>
                  )}
                </div>
              )}

              {/* Before / After slider */}
              {compareMode && (
                <div
                  ref={compareRef}
                  className="relative bg-black select-none cursor-col-resize overflow-hidden"
                  style={{ maxHeight: 420 }}
                  onMouseMove={handleCompareMove}
                  onTouchMove={handleCompareMove}
                >
                  {/* AFTER (graded) — full width behind */}
                  <video
                    src={videoSrc}
                    muted autoPlay loop playsInline
                    className="w-full object-contain"
                    style={{ filter: cssFilter, maxHeight: 420 }}
                    crossOrigin="anonymous"
                  />
                  <VideoOverlays vignette={adjustments.vignette} grain={adjustments.grain} />

                  {/* BEFORE (original) — clipped left portion */}
                  <div
                    className="absolute inset-0 overflow-hidden pointer-events-none"
                    style={{ width: `${comparePos}%` }}
                  >
                    <video
                      ref={videoOrigRef}
                      src={videoSrc}
                      muted playsInline
                      className="absolute inset-0 w-full object-contain"
                      style={{ width: `${100 / (comparePos / 100) || 100}%`, maxWidth: 'none', maxHeight: 420 }}
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* Divider line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none"
                    style={{ left: `${comparePos}%` }}
                  />
                  {/* Handle */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none"
                    style={{ left: `${comparePos}%` }}
                  >
                    <span className="text-slate-900 text-xs font-black">⇔</span>
                  </div>
                  {/* Labels */}
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">BEFORE</div>
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">AFTER</div>
                </div>
              )}
            </div>

            {/* ── PRESET GRID ── */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">🎞️ LUT Presets</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {LUT_PRESETS.map(p => (
                  <PresetCard
                    key={p.id}
                    preset={p}
                    selected={selectedPreset.id === p.id}
                    onClick={() => setSelectedPreset(p)}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* ══ RIGHT: Controls Panel ══ */}
          <div className="space-y-5">

            {/* Manual adjustments */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">🎚️ Manual Adjustments</h2>
                <button
                  onClick={resetAdjustments}
                  className="text-[11px] px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg transition-all font-semibold"
                >
                  ↺ Reset
                </button>
              </div>

              <div className="space-y-4">
                <AdjustSlider label="Brightness"   value={adjustments.brightness}  min={50}   max={150} unit="%" onChange={setAdj('brightness')}  />
                <AdjustSlider label="Contrast"     value={adjustments.contrast}    min={50}   max={200} unit="%" onChange={setAdj('contrast')}    />
                <AdjustSlider label="Saturation"   value={adjustments.saturation}  min={0}    max={300} unit="%" onChange={setAdj('saturation')}  />
                <AdjustSlider label="Temperature"  value={adjustments.temperature} min={-100} max={100} unit=""  onChange={setAdj('temperature')} />
                <AdjustSlider label="Tint"         value={adjustments.tint}        min={-100} max={100} unit=""  onChange={setAdj('tint')}        />
                <AdjustSlider label="Vignette"     value={adjustments.vignette}    min={0}    max={100} unit=""  onChange={setAdj('vignette')}    />
                <AdjustSlider label="Grain"        value={adjustments.grain}       min={0}    max={100} unit=""  onChange={setAdj('grain')}       />
              </div>
            </div>

            {/* CSS Filter Code */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">💻 CSS Filter Code</h2>
                <button
                  onClick={handleCopyCSS}
                  className={`text-[11px] px-3 py-1 rounded-lg border font-semibold transition-all ${
                    copied
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {copied ? '✅ Copied!' : '📋 Copy Code'}
                </button>
              </div>
              <pre className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-[10px] text-cyan-300 font-mono overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                {buildCSSCode(selectedPreset, adjustments)}
              </pre>
            </div>

            {/* Export */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">⬇️ Export</h2>

              {rendering && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300 animate-pulse">Rendering filtered video…</span>
                    <span className="text-cyan-400 font-bold">{renderPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${renderPct}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleRender}
                disabled={rendering}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all"
              >
                {rendering ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>🎬 Render & Download Filtered Video</>
                )}
              </button>

              {/* Active filter summary */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-1.5">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Settings</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {[
                    ['Preset',      selectedPreset.label],
                    ['Brightness',  adjustments.brightness + '%'],
                    ['Contrast',    adjustments.contrast + '%'],
                    ['Saturation',  adjustments.saturation + '%'],
                    ['Temperature', adjustments.temperature],
                    ['Tint',        adjustments.tint],
                    ['Vignette',    adjustments.vignette],
                    ['Grain',       adjustments.grain],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2">
                      <span className="text-[10px] text-slate-500">{k}</span>
                      <span className="text-[10px] font-bold text-slate-300 tabular-nums">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>}
      </div>
    </div>
  );
}
