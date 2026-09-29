import React, { useState, useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════════════ */
const PRESETS = [
  {
    label: '30-sec Project Intro',
    script:
      "Hi, I'm a full-stack developer who built an AI-powered dashboard that helps teams track coding productivity in real time. Using React, Node.js, and machine learning models, my project reduces manual reporting by 80%. I'm passionate about clean code, teamwork, and delivering impactful software solutions.",
  },
  {
    label: 'Personal Portfolio Pitch',
    script:
      "Welcome to my portfolio! I specialise in frontend engineering, crafting pixel-perfect interfaces with React and Tailwind CSS. My work spans AI tools, data visualisation dashboards, and mobile-first design systems. Let me walk you through some of my best projects and show you what I can build for your team.",
  },
  {
    label: 'Career Transition Story',
    script:
      "Two years ago I was a graphic designer. Today I'm a software engineer at a product startup. I taught myself JavaScript, built three open-source projects on GitHub, and landed my first engineering role through a coding bootcamp. Here's my journey and the skills I picked up along the way.",
  },
];

const BROLL_LIBRARY = {
  coding:      { emoji: '💻', color: 'from-blue-700 to-blue-900',    label: 'Coding / Dev',       desc: 'Developer typing, IDE, terminal',         query: 'developer coding laptop computer' },
  ai:          { emoji: '🤖', color: 'from-purple-700 to-purple-900', label: 'AI / ML',            desc: 'Neural networks, data flow',              query: 'artificial intelligence technology futuristic' },
  teamwork:    { emoji: '🤝', color: 'from-green-700 to-green-900',   label: 'Teamwork',           desc: 'Collaboration, stand-up meeting',          query: 'business team collaboration office meeting' },
  dashboard:   { emoji: '📊', color: 'from-cyan-700 to-cyan-900',     label: 'Dashboard',          desc: 'Analytics, charts, metrics',              query: 'analytics dashboard data chart monitor' },
  portfolio:   { emoji: '🗂️', color: 'from-amber-700 to-amber-900',   label: 'Portfolio',          desc: 'Projects showcase, gallery',              query: 'creative portfolio design projects workspace' },
  design:      { emoji: '🎨', color: 'from-pink-700 to-pink-900',     label: 'Design / UI',        desc: 'Figma, design systems',                   query: 'ui ux design figma creative interface' },
  javascript:  { emoji: '⚡', color: 'from-yellow-600 to-yellow-800', label: 'JavaScript',         desc: 'JS code, browser, console',               query: 'javascript programming code screen' },
  react:       { emoji: '⚛️', color: 'from-sky-600 to-sky-900',       label: 'React',              desc: 'Component tree, hooks diagram',           query: 'react web development frontend code' },
  github:      { emoji: '🐙', color: 'from-slate-600 to-slate-900',   label: 'GitHub',             desc: 'Repo, commits, pull requests',            query: 'github open source code repository developer' },
  machine:     { emoji: '🧠', color: 'from-violet-700 to-violet-900', label: 'Machine Learning',   desc: 'Model training, accuracy chart',          query: 'machine learning neural network data science' },
  startup:     { emoji: '🚀', color: 'from-orange-600 to-orange-900', label: 'Startup / Launch',   desc: 'Pitch deck, product launch',              query: 'startup entrepreneur business launch success' },
  engineer:    { emoji: '🔧', color: 'from-teal-700 to-teal-900',     label: 'Engineering',        desc: 'Architecture diagram, server',            query: 'software engineer server architecture technology' },
  // ── Character / narrative B-roll ──
  person:      { emoji: '🧑', color: 'from-rose-700 to-rose-900',     label: 'Person / Character', desc: 'Realistic person cinematic',              query: 'cinematic portrait person realistic photography' },
  woman:       { emoji: '👩', color: 'from-pink-700 to-rose-900',      label: 'Woman',              desc: 'Realistic woman cinematic',               query: 'woman portrait cinematic realistic photography' },
  man:         { emoji: '👨', color: 'from-blue-800 to-slate-900',     label: 'Man',                desc: 'Realistic man cinematic',                 query: 'man portrait cinematic realistic photography' },
  walking:     { emoji: '🚶', color: 'from-slate-700 to-slate-950',    label: 'Walking / Road',     desc: 'Person walking on road cinematic',        query: 'person walking road cinematic dramatic' },
  rain:        { emoji: '🌧️', color: 'from-slate-600 to-blue-950',     label: 'Rain / Weather',     desc: 'Rain cinematic outdoor',                  query: 'rain cinematic street moody dramatic' },
  sunset:      { emoji: '🌅', color: 'from-orange-700 to-rose-900',    label: 'Sunset / Golden',    desc: 'Sunset golden hour outdoor',              query: 'sunset golden hour cinematic landscape' },
  nature:      { emoji: '🌿', color: 'from-green-800 to-emerald-950',  label: 'Nature / Outdoor',   desc: 'Nature outdoor cinematic',                query: 'nature outdoor landscape cinematic' },
  city:        { emoji: '🏙️', color: 'from-slate-700 to-blue-950',     label: 'City / Urban',       desc: 'City urban cinematic',                    query: 'city urban cinematic night lights' },
  emotion:     { emoji: '💭', color: 'from-indigo-700 to-purple-950',  label: 'Emotion / Story',    desc: 'Emotional cinematic moment',              query: 'emotional cinematic dramatic storytelling' },
  memory:      { emoji: '📸', color: 'from-amber-800 to-yellow-950',   label: 'Memory / Nostalgia', desc: 'Nostalgic memory cinematic',              query: 'nostalgic memory vintage cinematic' },
  hope:        { emoji: '✨', color: 'from-sky-700 to-indigo-900',     label: 'Hope / Light',       desc: 'Hope light optimism cinematic',           query: 'hope light sunlight cinematic optimism' },
};

const KEYWORD_MAP = {
  // tech
  coding: 'coding', code: 'coding', developer: 'coding', programming: 'coding', software: 'coding',
  ai: 'ai', 'artificial intelligence': 'ai', 'machine learning': 'machine', ml: 'machine',
  teamwork: 'teamwork', team: 'teamwork', collaboration: 'teamwork', meeting: 'teamwork',
  dashboard: 'dashboard', analytics: 'dashboard', metrics: 'dashboard', chart: 'dashboard',
  portfolio: 'portfolio', projects: 'portfolio', showcase: 'portfolio',
  design: 'design', ui: 'design', figma: 'design', interface: 'design',
  javascript: 'javascript', js: 'javascript', typescript: 'javascript',
  react: 'react', 'node.js': 'coding', nodejs: 'coding',
  github: 'github', 'open-source': 'github', repository: 'github',
  startup: 'startup', launch: 'startup', product: 'startup',
  engineer: 'engineer', engineering: 'engineer', architecture: 'engineer',
  // narrative / character
  girl: 'woman', woman: 'woman', she: 'woman', her: 'woman',
  boy: 'man', man: 'man', he: 'man', his: 'man',
  person: 'person', character: 'person', someone: 'person',
  walking: 'walking', walk: 'walking', road: 'walking', path: 'walking', street: 'walking',
  rain: 'rain', raining: 'rain', storm: 'rain', wet: 'rain', umbrella: 'rain',
  sunset: 'sunset', sunlight: 'sunset', golden: 'sunset', sun: 'sunset',
  nature: 'nature', forest: 'nature', tree: 'nature', green: 'nature',
  city: 'city', urban: 'city', night: 'city', lights: 'city',
  emotion: 'emotion', feeling: 'emotion', sad: 'emotion', happy: 'emotion', crying: 'emotion',
  memory: 'memory', memories: 'memory', past: 'memory', nostalgia: 'memory', remember: 'memory',
  hope: 'hope', light: 'hope', future: 'hope', dream: 'hope', promise: 'hope',
};

const PROGRESS_STEPS = [
  'Analysing script structure…',
  'Detecting B-Roll keywords…',
  'Matching cinematic clips…',
  'Generating subtitle track…',
  'Compositing video layers…',
  'Encoding final output…',
  'Finalising export…',
];

/* ═══════════════════════════════════════════════════════════════════
   IMAGE STYLE PRESETS
   Controls the visual rendering style of each scene frame.
═══════════════════════════════════════════════════════════════════ */
const IMAGE_STYLES = {
  cinematic: {
    label: 'Cinematic Realistic',
    emoji: '🎬',
    desc: 'Real photography, dramatic lighting, cinematic colour grade',
    overlay: 'from-black/60 via-transparent to-black/70',
    tint: 'bg-blue-950/20',
    promptSuffix: 'cinematic photography, dramatic lighting, film grain, 4K ultra realistic',
  },
  anime: {
    label: 'Anime / Illustrated',
    emoji: '🎌',
    desc: 'Japanese animation style, vibrant colours, stylised art',
    overlay: 'from-violet-950/50 via-transparent to-indigo-950/60',
    tint: 'bg-violet-500/15',
    promptSuffix: 'anime art style, Studio Ghibli inspired, detailed illustration, vibrant colours, soft lighting',
  },
  watercolour: {
    label: 'Watercolour Art',
    emoji: '🎨',
    desc: 'Soft painted watercolour illustration style',
    overlay: 'from-amber-900/40 via-transparent to-rose-900/40',
    tint: 'bg-rose-400/10',
    promptSuffix: 'watercolour painting, soft brushstrokes, artistic illustration, pastel tones',
  },
  noir: {
    label: 'Film Noir',
    emoji: '🕵️',
    desc: 'High-contrast black & white, dramatic shadows',
    overlay: 'from-black/70 via-transparent to-black/80',
    tint: 'bg-slate-500/30',
    promptSuffix: 'film noir, black and white photography, dramatic shadows, high contrast, moody',
  },
  cyberpunk: {
    label: 'Cyberpunk / Neon',
    emoji: '🌃',
    desc: 'Neon-lit futuristic urban, vibrant synthwave palette',
    overlay: 'from-purple-950/50 via-transparent to-cyan-950/50',
    tint: 'bg-purple-500/20',
    promptSuffix: 'cyberpunk aesthetic, neon lights, synthwave colours, futuristic cityscape, purple cyan glow',
  },
};

/* ═══════════════════════════════════════════════════════════════════
   SCENE DESCRIPTION PARSER
   Extracts subject, setting, mood, action from free-form scene text
   and builds an AI image prompt for real image generators.
═══════════════════════════════════════════════════════════════════ */

// Subject keywords → descriptive phrases for AI prompts
const SUBJECT_MAP = {
  'anime girl': 'young anime girl',
  'anime boy': 'young anime boy',
  'girl': 'young woman',
  'boy': 'young man',
  'woman': 'woman',
  'man': 'man',
  'person': 'person',
  'friends': 'two friends',
  'couple': 'couple',
  'child': 'child',
  'children': 'children',
  'figure': 'silhouetted figure',
};

const SETTING_MAP = {
  'quiet road': 'empty road stretching into the horizon',
  'road': 'empty road',
  'street': 'quiet street',
  'cherry blossom': 'cherry blossom tree in full bloom',
  'park': 'peaceful park',
  'rooftop': 'rooftop at dusk',
  'rain': 'rain-soaked street',
  'forest': 'misty forest path',
  'beach': 'serene beach',
  'city': 'glowing city at night',
  'classroom': 'empty classroom',
  'café': 'cosy café corner',
  'train': 'train platform at night',
  'window': 'rain-streaked window',
  'field': 'golden wheat field',
  'mountain': 'misty mountain vista',
};

const MOOD_MAP = {
  'sunset': 'golden sunset light',
  'dawn': 'soft morning light',
  'night': 'moonlit night',
  'rain': 'overcast rainy atmosphere',
  'foggy': 'foggy cinematic atmosphere',
  'dark': 'dramatic low-key lighting',
  'bright': 'bright natural lighting',
  'warm': 'warm golden hour lighting',
  'cold': 'cold blue-tinted lighting',
  'dreamy': 'dreamy soft-focus bokeh',
};

const ACTION_MAP = {
  'walking alone': 'walking alone',
  'running': 'running',
  'sitting': 'sitting quietly',
  'standing': 'standing',
  'looking': 'gazing into the distance',
  'laughing': 'laughing together',
  'crying': 'tears in eyes',
  'hugging': 'embracing',
  'reaching': 'reaching out',
  'looking back': 'looking back over shoulder',
  'reading': 'reading',
  'writing': 'writing in a notebook',
};

/**
 * Parses a scene description string and returns:
 * { subject, action, setting, mood, aiPrompt, brollSuggestion }
 */
function parseSceneDescription(text, styleKey = 'cinematic') {
  const lower = text.toLowerCase();
  const style = IMAGE_STYLES[styleKey] || IMAGE_STYLES.cinematic;

  let subject = '';
  let action  = '';
  let setting = '';
  let mood    = '';

  for (const [kw, val] of Object.entries(SUBJECT_MAP)) {
    if (lower.includes(kw)) { subject = val; break; }
  }
  for (const [kw, val] of Object.entries(ACTION_MAP)) {
    if (lower.includes(kw)) { action = val; break; }
  }
  for (const [kw, val] of Object.entries(SETTING_MAP)) {
    if (lower.includes(kw)) { setting = val; break; }
  }
  for (const [kw, val] of Object.entries(MOOD_MAP)) {
    if (lower.includes(kw)) { mood = val; break; }
  }

  // Determine best B-roll tag based on detected elements
  let brollSuggestion = 'emotion';
  if (lower.includes('anime') || lower.includes('illustrated')) brollSuggestion = 'emotion';
  else if (lower.includes('cherry blossom') || lower.includes('tree')) brollSuggestion = 'nature';
  else if (lower.includes('road') || lower.includes('walking')) brollSuggestion = 'walking';
  else if (lower.includes('rain')) brollSuggestion = 'rain';
  else if (lower.includes('sunset') || lower.includes('golden')) brollSuggestion = 'sunset';
  else if (lower.includes('city') || lower.includes('night')) brollSuggestion = 'city';
  else if (lower.includes('woman') || lower.includes('girl')) brollSuggestion = 'woman';
  else if (lower.includes('man') || lower.includes('boy')) brollSuggestion = 'man';
  else if (lower.includes('memory') || lower.includes('past')) brollSuggestion = 'memory';
  else if (lower.includes('hope') || lower.includes('light') || lower.includes('dream')) brollSuggestion = 'hope';

  // Build AI prompt
  const parts = [];
  if (subject) parts.push(subject);
  if (action)  parts.push(action);
  if (setting) parts.push(`on a ${setting}`);
  if (mood)    parts.push(mood);
  if (!parts.length) parts.push(text.slice(0, 60));

  const aiPrompt = `${parts.join(', ')}, ${style.promptSuffix}`;

  return { subject, action, setting, mood, aiPrompt, brollSuggestion };
}

/* ═══════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════ */
function detectKeywords(text) {
  const lower = text.toLowerCase();
  const found = new Set();
  Object.entries(KEYWORD_MAP).forEach(([kw, tag]) => {
    if (lower.includes(kw)) found.add(tag);
  });
  return [...found].slice(0, 6);
}

function splitIntoSegments(text) {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const segments = [];
  let start = 0;
  sentences.forEach((s, i) => {
    const trimmed = s.trim();
    if (!trimmed) return;
    const dur = Math.max(3, Math.round(trimmed.split(' ').length / 2.5));
    const kws = detectKeywords(trimmed);
    segments.push({
      id: i,
      text: trimmed,
      start,
      duration: dur,
      broll: kws[0] || Object.keys(BROLL_LIBRARY)[i % Object.keys(BROLL_LIBRARY).length],
    });
    start += dur;
  });
  return segments;
}

function highlightKeywords(text) {
  let result = text;
  Object.keys(KEYWORD_MAP).forEach(kw => {
    const regex = new RegExp(`\\b(${kw})\\b`, 'gi');
    result = result.replace(regex, `<mark class="bg-yellow-400/30 text-yellow-200 rounded px-0.5">$1</mark>`);
  });
  return result;
}

/* ═══════════════════════════════════════════════════════════════════
   IMAGE RESOLUTION
   Uses Picsum Photos with curated IDs per tag — always works, no API key.
   Per-style pools ensure anime/cinematic/noir look different.
═══════════════════════════════════════════════════════════════════ */

// Per-tag, per-style image pools. Picsum IDs chosen to visually match mood.
// 'default' pool is used when style has no specific override.
const BROLL_IMAGES = {
  coding:     { default: [1181, 574, 160, 270, 503],   anime: [270, 503, 574, 160, 488],  noir: [160, 270, 503, 574, 1181] },
  ai:         { default: [450,  373, 325, 180, 487],   anime: [487, 325, 180, 450, 373],  noir: [373, 450, 180, 325, 487]  },
  teamwork:   { default: [1181, 593, 247, 433, 574],   anime: [574, 247, 433, 593, 1181], noir: [433, 593, 247, 1181, 574] },
  dashboard:  { default: [373,  450, 503, 276, 1181],  anime: [276, 503, 450, 373, 1181], noir: [503, 276, 373, 450, 1181] },
  portfolio:  { default: [326,  447, 260, 279, 380],   anime: [260, 279, 447, 326, 380],  noir: [279, 326, 447, 260, 380]  },
  design:     { default: [326,  283, 447, 368, 260],   anime: [368, 283, 447, 326, 260],  noir: [283, 447, 368, 260, 326]  },
  javascript: { default: [160,  270, 574, 503, 1181],  anime: [503, 270, 574, 160, 1181], noir: [270, 503, 160, 574, 1181] },
  react:      { default: [270,  574, 1181,160, 488],   anime: [488, 160, 574, 270, 1181], noir: [160, 488, 270, 574, 1181] },
  github:     { default: [503,  160, 270, 1181,488],   anime: [488, 270, 160, 503, 1181], noir: [270, 488, 503, 160, 1181] },
  machine:    { default: [450,  373, 487, 180, 325],   anime: [325, 180, 487, 450, 373],  noir: [180, 325, 450, 373, 487]  },
  startup:    { default: [593,  247, 1181,574, 380],   anime: [380, 247, 574, 593, 1181], noir: [247, 380, 593, 574, 1181] },
  engineer:   { default: [1076, 1166,450, 373, 487],   anime: [373, 487, 450, 1076,1166], noir: [450, 373, 1076,1166,487]  },
  // Character / narrative — real people & cinematic scenes
  person:     { default: [64,   91,  338, 453, 614],   anime: [338, 453, 614, 64,  91],   noir: [91,  64,  453, 614, 338]  },
  woman:      { default: [64,   338, 819, 453, 1062],  anime: [819, 338, 453, 64,  1062], noir: [338, 64,  819, 453, 1062] },
  man:        { default: [91,   614, 453, 700, 823],   anime: [614, 453, 700, 91,  823],  noir: [700, 91,  614, 453, 823]  },
  // Walking / road — person on empty road at sunset/dusk
  walking:    { default: [107,  166, 338, 614, 401],   anime: [338, 614, 107, 166, 401],  noir: [166, 107, 338, 614, 401]  },
  // Rain — moody wet street scenes
  rain:       { default: [39,   586, 305, 206, 443],   anime: [305, 206, 586, 39,  443],  noir: [206, 39,  305, 586, 443]  },
  // Sunset — warm golden hour outdoor roads & landscapes
  sunset:     { default: [15,   21,  167, 547, 401],   anime: [167, 547, 21,  15,  401],  noir: [547, 167, 15,  21,  401]  },
  nature:     { default: [15,   107, 166, 547, 401],   anime: [166, 547, 107, 15,  401],  noir: [107, 166, 547, 15,  401]  },
  city:       { default: [39,   414, 206, 586, 443],   anime: [206, 586, 414, 39,  443],  noir: [414, 39,  206, 586, 443]  },
  emotion:    { default: [64,   338, 819, 1062,453],   anime: [1062,819, 338, 64,  453],  noir: [338, 64,  1062,819, 453]  },
  memory:     { default: [167,  401, 547, 15,  21],    anime: [547, 15,  401, 167, 21],   noir: [15,  167, 401, 547, 21]   },
  hope:       { default: [21,   167, 547, 15,  401],   anime: [547, 167, 15,  21,  401],  noir: [167, 21,  547, 401, 15]   },
};

/**
 * Returns a Picsum URL for a given broll tag, style, and segment index.
 * Style-specific pools give anime/noir scenes visually different images.
 */
function getImageUrl(tag, segmentIndex, width, height, styleKey = 'cinematic') {
  const tagPools = BROLL_IMAGES[tag] || BROLL_IMAGES.coding;
  // Use style-specific pool if available, else fall back to default
  const stylePoolKey = (styleKey === 'anime') ? 'anime' : (styleKey === 'noir') ? 'noir' : 'default';
  const pool = tagPools[stylePoolKey] || tagPools.default || Object.values(tagPools)[0];
  const id   = pool[segmentIndex % pool.length];
  return `https://picsum.photos/id/${id}/${width}/${height}`;
}

function BRollClip({ tag, size = 'md', selected, onClick, poolIndex = 0, styleKey = 'cinematic' }) {
  const clip = BROLL_LIBRARY[tag] || BROLL_LIBRARY.coding;
  const sizes = { sm: 'h-16', md: 'h-24', lg: 'h-32' };
  const imgUrl = getImageUrl(tag, poolIndex, 300, 200, styleKey);
  return (
    <button
      onClick={onClick}
      title={clip.desc}
      className={`relative w-full ${sizes[size]} rounded-xl overflow-hidden border-2 transition-all duration-200 ${
        selected ? 'border-yellow-400 shadow-lg shadow-yellow-400/30 scale-105' : 'border-transparent hover:border-slate-500'
      }`}
    >
      <img
        src={imgUrl}
        alt={clip.label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${clip.color} opacity-50`} />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-0.5">
        <span className="text-lg">{clip.emoji}</span>
        <span className="text-[9px] font-bold text-white/90 uppercase tracking-wider drop-shadow px-1 text-center leading-tight">{clip.label}</span>
      </div>
      {selected && (
        <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[8px] text-slate-900 font-black z-20">✓</span>
      )}
    </button>
  );
}

function AnimatedPreviewFrame({ segment, aspectRatio, isPlaying, currentTime, styleKey = 'cinematic' }) {
  const clip   = BROLL_LIBRARY[segment?.broll] || BROLL_LIBRARY.coding;
  const style  = IMAGE_STYLES[styleKey] || IMAGE_STYLES.cinematic;
  const isActive = segment && currentTime >= segment.start && currentTime < segment.start + segment.duration;

  const segIdx = segment ? segment.id : 0;
  const w = aspectRatio === '9:16' ? 540 : 1280;
  const h = aspectRatio === '9:16' ? 960 : 720;
  const imgUrl = getImageUrl(segment?.broll || 'coding', segIdx, w, h, styleKey);

  // CSS filter by style
  const styleFilter = {
    cinematic:   'saturate(1.1) contrast(1.1)',
    anime:       'saturate(1.4) hue-rotate(5deg) brightness(1.05)',
    watercolour: 'saturate(0.8) brightness(1.1) sepia(0.2)',
    noir:        'grayscale(1) contrast(1.3) brightness(0.9)',
    cyberpunk:   'saturate(1.8) hue-rotate(270deg) contrast(1.3) brightness(1.1)',
  }[styleKey] || '';

  return (
    <div
      className={`relative overflow-hidden transition-all duration-500 bg-slate-950 ${
        aspectRatio === '9:16' ? 'w-full max-w-[200px] mx-auto' : 'w-full'
      }`}
      style={{ aspectRatio: aspectRatio === '9:16' ? '9/16' : '16/9' }}
    >
      {/* Background image with style filter */}
      <img
        key={imgUrl}
        src={imgUrl}
        alt={clip.label}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: 1, filter: styleFilter }}
        onError={e => { e.target.style.opacity = '0'; }}
      />

      {/* Style-specific tint overlay */}
      <div className={`absolute inset-0 ${style.tint} mix-blend-overlay pointer-events-none`} />

      {/* Style vignette */}
      <div className={`absolute inset-0 bg-gradient-to-t ${style.overlay} pointer-events-none`} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />

      {/* Scan-line when playing */}
      {isPlaying && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-full h-[2px] bg-white/10" style={{ animation: 'scanline 3s linear infinite', top: 0 }} />
        </div>
      )}

      {/* B-Roll + style badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1">
        <div className="bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
          {clip.emoji} {clip.label}
        </div>
        <div className="bg-black/50 backdrop-blur-sm text-violet-300 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          {style.emoji} {style.label}
        </div>
      </div>

      {/* Subtitle bar */}
      {segment && (
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6 bg-gradient-to-t from-black/90 to-transparent">
          <p
            className={`text-white text-center font-bold leading-snug transition-all duration-300 ${
              isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-[0.98]'
            }`}
            style={{
              fontSize: aspectRatio === '9:16' ? '10px' : '13px',
              textShadow: '0 1px 6px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.8)',
            }}
          >
            {segment.text.length > 90 ? segment.text.slice(0, 90) + '…' : segment.text}
          </p>
        </div>
      )}

      {/* Play button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-xl">
            <span className="text-white text-2xl ml-1">▶</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VIDEO LEARN TAB
   Teaches AI image prompting, scene description writing, B-roll selection
═══════════════════════════════════════════════════════════════════ */
const VIDEO_LESSONS = [
  {
    id: 'scene-desc',
    icon: '✍️',
    title: 'Writing Great Scene Descriptions',
    tag: 'Foundation',
    tagColor: 'bg-violet-600/30 text-violet-300 border-violet-500/40',
    duration: '5 min',
    summary: 'Learn how to write scene descriptions that AI can parse into real visual prompts.',
    theory: `A scene description is the text you write to describe what the viewer should see in a shot. Great scene descriptions have four elements:

1. Subject — Who or what is in the frame? Be specific: "anime girl", "silhouetted figure", "two friends"
2. Action — What are they doing? "walking alone", "laughing", "reaching out"
3. Setting — Where does it take place? "quiet road at sunset", "cherry blossom tree", "rainy city street"
4. Mood — What is the emotional atmosphere? "golden hour", "moonlit night", "dreamy soft light"

The more specific your description, the better the AI can match the right image — and the more accurate a Stable Diffusion/DALL-E prompt becomes.

Bad: "Person walking."
Good: "Anime girl walking alone on a quiet road at sunset, golden light behind her."`,
    steps: [
      { step: 1, title: 'Name Your Subject Specifically', desc: 'Write "anime girl" not "character". Write "young woman" not "person". Specificity is the difference between a generic stock photo and an intentional scene.', tip: 'If you want anime style, literally write "anime" in your description. Our parser detects it.' },
      { step: 2, title: 'Include the Action', desc: 'Add what they are doing: "walking alone", "looking back over shoulder", "crying", "laughing together". Action creates narrative.', tip: 'Action verbs trigger better B-roll matching. "Walking" maps to the Walking/Road B-roll category.' },
      { step: 3, title: 'Set the Scene with Location', desc: 'Include the setting: "quiet road", "cherry blossom tree", "rain-soaked street". This determines the background of the generated image.', tip: 'Multi-word settings like "cherry blossom" work — the parser checks for compound phrases first.' },
      { step: 4, title: 'Add Mood Keywords', desc: 'Mood words like "sunset", "moonlit", "dreamy", "foggy" affect the lighting and atmosphere of the generated image.', tip: '"Sunset" and "golden" both map to warm golden-hour lighting in the AI prompt.' },
      { step: 5, title: 'Click "AI Prompt" on Each Segment', desc: 'After generating your video, click the "🤖 AI Prompt" button on any segment to see exactly what prompt would be sent to Stable Diffusion or DALL-E for that scene.', tip: 'Copy this prompt directly into any AI image generator to create the exact image for your scene.' },
    ],
  },
  {
    id: 'image-styles',
    icon: '🎨',
    title: 'Image Styles & AI Art Generation',
    tag: 'AI Tools',
    tagColor: 'bg-cyan-600/30 text-cyan-300 border-cyan-500/40',
    duration: '7 min',
    summary: 'Understand how image style presets change your AI prompt and what each style looks like.',
    theory: `When you select an image style (Cinematic, Anime, Watercolour, Noir, Cyberpunk), the system appends a "prompt suffix" to your scene description. This suffix is the technical instruction that tells AI image generators which visual style to render in.

How professional AI image prompts are structured:
[Subject] + [Action] + [Setting] + [Mood] + [Style Suffix]

Example for "Anime girl walking alone on a quiet road at sunset" with Anime style:
"young anime girl, walking alone, on a empty road stretching into the horizon, golden sunset light, anime art style, Studio Ghibli inspired, detailed illustration, vibrant colours, soft lighting"

This exact string is what Stable Diffusion or DALL-E receives. The more detailed and well-structured the prompt, the more accurate the generated image.

Each style also applies a CSS filter to preview images — greyscale for Noir, saturated hue-shift for Cyberpunk — so you can see the mood immediately.`,
    steps: [
      { step: 1, title: 'Select Your Style Before Generating', desc: 'Choose your image style BEFORE clicking Generate. The style affects both the visual filter and the AI prompt that gets built for each segment.', tip: 'Anime style adds Ghibli-like prompt terms. Noir adds grayscale + dramatic shadow prompts.' },
      { step: 2, title: 'Understand the Prompt Suffix', desc: 'Each style has a "prompt suffix" — see it under the style selector. This is appended to every scene\'s AI prompt automatically.', tip: 'You can copy the suffix and use it manually in Midjourney or Stable Diffusion.' },
      { step: 3, title: 'CSS Filters vs Real AI Images', desc: 'In the preview, CSS filters simulate the style (grayscale for Noir, saturation shift for Anime). In real production, you would replace each frame with an actual AI-generated image.', tip: 'CSS filter: grayscale(1) = Noir. saturate(1.8) hue-rotate(270deg) = Cyberpunk. These are real CSS properties.' },
      { step: 4, title: 'Use AI Image Tools', desc: 'Take the generated prompt from the "🤖 AI Prompt" panel and paste it into: Stable Diffusion, DALL-E 3, Midjourney (/imagine), or Adobe Firefly.', tip: 'For Midjourney: paste prompt after /imagine. Add --ar 16:9 for landscape or --ar 9:16 for shorts.' },
      { step: 5, title: 'Replace Preview with Real Images', desc: 'In a real pipeline, you would generate all scene images with AI, then edit them into your video editor (Premiere, DaVinci Resolve, CapCut) as separate clips.', tip: 'Export the .wfp file and import to Filmora, then replace placeholder clips with your AI-generated images.' },
    ],
  },
  {
    id: 'broll',
    icon: '🎞️',
    title: 'What is B-Roll & How to Use It',
    tag: 'Video Production',
    tagColor: 'bg-amber-600/30 text-amber-300 border-amber-500/40',
    duration: '6 min',
    summary: 'Learn the professional concept of B-Roll, why it matters, and how auto-detection works.',
    theory: `B-Roll is footage that plays over a narrator's voice (the "A-roll"). It provides visual context, covers cuts, and keeps viewers engaged during voiceover.

In a career pitch video:
• A-Roll: Your talking-head footage or voiceover
• B-Roll: Footage of code, dashboards, projects, or cinematic scenes that illustrate what you're saying

The best B-roll is:
1. Relevant — If you say "I built a dashboard", show a dashboard
2. Varied — Don't use the same clip repeatedly
3. Timed — B-roll cuts should match the rhythm of the voiceover

Our AI detects B-roll keywords from your script text: "coding" → Coding/Dev clip, "team" → Teamwork clip, "anime girl walking" → Walking/Road clip. This automates what a video editor does manually.`,
    steps: [
      { step: 1, title: 'Understand A-Roll vs B-Roll', desc: 'Your voiceover or talking-head is A-Roll. Every visual that plays behind it is B-Roll. Most YouTube videos are 90% B-Roll during the intro.', tip: 'A strong career pitch video = 60% B-Roll + 40% on-camera time.' },
      { step: 2, title: 'Match B-Roll to Keywords', desc: 'If your script says "I built a React dashboard", the system maps "react" → React clip, "dashboard" → Dashboard clip. The first detected keyword wins.', tip: 'You can override any segment\'s B-Roll by clicking 🔄 Swap after generating.' },
      { step: 3, title: 'Use Character B-Roll for Narrative', desc: 'For story-driven scripts (like "The Last Promise"), use Woman/Man/Walking/Emotion B-Roll categories instead of tech categories.', tip: 'Mix cinematic character shots with abstract mood shots (hope, memory, city) for an emotional video.' },
      { step: 4, title: 'Control Timing', desc: 'Shorter sentences = shorter B-Roll duration. Long sentences = longer clips. The duration is calculated from word count.', tip: 'Edit your script to control timing: split long sentences for quicker cuts, merge short ones for slower pacing.' },
      { step: 5, title: 'Export for Real Editing', desc: 'The .wfp export creates a Filmora project file with all timing, B-roll tag names, and subtitles. Import into Filmora to replace placeholders with real footage.', tip: 'In Filmora, right-click each placeholder clip → Replace → browse to your actual B-Roll video files.' },
    ],
  },
  {
    id: 'prompt-engineering',
    icon: '🤖',
    title: 'AI Prompt Engineering for Images',
    tag: 'Advanced',
    tagColor: 'bg-rose-600/30 text-rose-300 border-rose-500/40',
    duration: '8 min',
    summary: 'Learn how to craft AI image prompts that generate exactly what your scene description asks for.',
    theory: `Prompt engineering is the skill of writing instructions to AI models to get the output you want. For image generation, a prompt is a text string describing the desired image.

Prompt anatomy for Stable Diffusion / DALL-E / Midjourney:

[Main subject and action], [setting and background], [lighting and mood], [artistic style], [technical quality], [negative prompt]

Example:
"young anime girl walking alone on an empty road, cherry blossom petals falling, golden sunset light from behind, Studio Ghibli art style, soft warm colours, detailed illustration, 4K"

Negative prompt (what to exclude): "blur, lowres, ugly, distorted, modern clothing, cars"

Key techniques:
• Be specific — vague prompts get generic results
• Stack descriptors — more terms = more control
• Use artist/style references — "Studio Ghibli", "cinematic like Blade Runner 2049"
• Control quality — "4K", "ultra detailed", "professional photography"
• Use aspect ratio — --ar 16:9 in Midjourney`,
    steps: [
      { step: 1, title: 'Start with Subject + Action', desc: 'Always begin with the most important element: who/what is doing what. "Young anime girl walking alone" is your anchor.', tip: 'Front-load the most important terms. AI models weight earlier tokens more heavily.' },
      { step: 2, title: 'Add Setting Details', desc: 'Describe the background and environment: "empty road stretching to the horizon", "cherry blossom petals falling around her".', tip: 'Specific settings produce better results than generic ones. "Quiet country road at dusk" > "road at sunset".' },
      { step: 3, title: 'Define Lighting', desc: 'Lighting dramatically changes mood. "Golden hour backlight", "overcast soft light", "harsh neon glow" all produce very different images.', tip: 'Golden hour + anime style = warm Ghibli-like feel. Blue moonlight + anime = melancholic Makoto Shinkai feel.' },
      { step: 4, title: 'Name Your Art Style', desc: 'Reference a style explicitly: "Studio Ghibli", "Makoto Shinkai", "film noir", "cyberpunk neon", "watercolour painting".', tip: 'For anime: try "anime key visual", "manga illustration", "hand-drawn animation cel" for different sub-styles.' },
      { step: 5, title: 'Use Negative Prompts', desc: 'Tell AI what NOT to generate: "no text, no watermark, no distorted faces, no modern cars". This prevents common AI artefacts.', tip: 'Standard negative prompt: "blurry, low quality, distorted, extra limbs, bad anatomy, watermark, signature".' },
    ],
  },
];

function VideoLearnTab() {
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  // quizAnswers reserved for future quiz feature

  function markComplete(id) {
    setCompletedIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }

  if (activeLesson) {
    return (
      <div className="space-y-6">
        {/* back */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveLesson(null)}
            className="text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-lg transition-all"
          >← Back to Lessons</button>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${activeLesson.tagColor}`}>{activeLesson.tag}</span>
          <span className="text-[10px] text-slate-500 ml-auto">⏱ {activeLesson.duration}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl">{activeLesson.icon}</span>
          <div>
            <h2 className="text-xl font-extrabold text-white">{activeLesson.title}</h2>
            <p className="text-sm text-slate-400 mt-0.5">{activeLesson.summary}</p>
          </div>
        </div>

        {/* Theory */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">📖 Theory</p>
          <div className="text-sm text-slate-300 leading-[1.75] whitespace-pre-line">{activeLesson.theory}</div>
        </div>

        {/* Steps */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">🪜 Step-by-Step</p>
          <div className="space-y-3">
            {activeLesson.steps.map(s => (
              <div key={s.step} className="flex gap-4 p-4 bg-slate-800/60 border border-slate-700/60 rounded-xl">
                <div className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-600 flex items-center justify-center text-xs font-black text-white mt-0.5">{s.step}</div>
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

        {/* Mark complete */}
        {!completedIds.includes(activeLesson.id) ? (
          <button
            onClick={() => markComplete(activeLesson.id)}
            className="w-full py-3 text-sm font-bold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-2xl transition-all shadow-lg shadow-violet-500/20"
          >
            ✅ Mark Lesson Complete
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-bold text-emerald-300">
            🎓 Lesson Complete! Pick the next one to continue.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex justify-between text-[11px] font-semibold">
            <span className="text-slate-400">Learning Progress</span>
            <span className="text-violet-300">{completedIds.length}/{VIDEO_LESSONS.length} lessons</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
              style={{ width: `${(completedIds.length / VIDEO_LESSONS.length) * 100}%` }}
            />
          </div>
        </div>
        {completedIds.length === VIDEO_LESSONS.length && <span className="text-2xl animate-bounce">🏆</span>}
      </div>

      {/* Lesson cards */}
      <div className="space-y-3">
        {VIDEO_LESSONS.map(lesson => {
          const done = completedIds.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className="group w-full text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 rounded-2xl p-4 transition-all duration-200 flex items-start gap-4"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-800 group-hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-xl transition-all relative">
                {lesson.icon}
                {done && <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] text-white font-black">✓</div>}
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{lesson.title}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${lesson.tagColor}`}>{lesson.tag}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{lesson.summary}</p>
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

      {/* Quick reference */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">📋 AI Image Tools Quick Reference</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { tool: 'Stable Diffusion', use: 'Free, local, full control. Best for batch generation.', link: 'https://stability.ai' },
            { tool: 'DALL-E 3 (ChatGPT)', use: 'Easy to use, great for described scenes. No technical setup.', link: 'https://openai.com/dall-e-3' },
            { tool: 'Midjourney', use: 'Highest quality artistic output. Add --ar 16:9 for landscape.', link: 'https://midjourney.com' },
            { tool: 'Adobe Firefly', use: 'Best for commercial use. Integrates with Premiere/After Effects.', link: 'https://firefly.adobe.com' },
          ].map(item => (
            <div key={item.tool} className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2.5">
              <p className="text-[11px] font-bold text-violet-300">{item.tool}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.use}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function TextToVideoBroll({ onBack }) {
  const [script, setScript]             = useState('');
  const [keywords, setKeywords]         = useState([]);
  const [highlighted, setHighlighted]   = useState(false);
  const [aspectRatio, setAspectRatio]   = useState('16:9');
  const [imageStyle, setImageStyle]     = useState('cinematic'); // NEW: image style key
  const [activeTab, setActiveTab]       = useState('studio');    // 'studio' | 'learn'
  const [segments, setSegments]         = useState([]);
  const [generating, setGenerating]     = useState(false);
  const [progress, setProgress]         = useState(0);
  const [progressMsg, setProgressMsg]   = useState('');
  const [videoReady, setVideoReady]     = useState(false);
  const [isPlaying, setIsPlaying]       = useState(false);
  const [currentTime, setCurrentTime]   = useState(0);
  const [activeSegIdx, setActiveSegIdx] = useState(0);
  const [swapTarget, setSwapTarget]     = useState(null);
  const [promptTarget, setPromptTarget] = useState(null); // segment id showing AI prompt
  const timerRef = useRef(null);
  const totalDuration = segments.reduce((s, sg) => s + sg.duration, 0);

  /* ── playback simulation ── */
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(t => {
          const next = t + 0.25;
          if (next >= totalDuration) { setIsPlaying(false); return 0; }
          return next;
        });
      }, 250);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, totalDuration]);

  useEffect(() => {
    const idx = segments.findIndex(s => currentTime >= s.start && currentTime < s.start + s.duration);
    if (idx !== -1) setActiveSegIdx(idx);
  }, [currentTime, segments]);

  /* ── auto-detect keywords ── */
  function handleDetectKeywords() {
    if (!script.trim()) return;
    const kws = detectKeywords(script);
    setKeywords(kws);
    setHighlighted(true);
  }

  /* ── generate ── */
  async function handleGenerate() {
    if (!script.trim()) return;
    // Use scene parser to improve B-roll suggestion for each segment
    const rawSegs = splitIntoSegments(script);
    const segs = rawSegs.map(seg => {
      const parsed = parseSceneDescription(seg.text, imageStyle);
      return {
        ...seg,
        broll: parsed.brollSuggestion || seg.broll,
        aiPrompt: parsed.aiPrompt,
        parsedSubject: parsed.subject,
        parsedSetting: parsed.setting,
        parsedMood: parsed.mood,
        parsedAction: parsed.action,
      };
    });
    setSegments(segs);
    setVideoReady(false);
    setGenerating(true);
    setProgress(0);
    setCurrentTime(0);
    setIsPlaying(false);

    for (let i = 0; i < PROGRESS_STEPS.length; i++) {
      setProgressMsg(PROGRESS_STEPS[i]);
      await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
      setProgress(Math.round(((i + 1) / PROGRESS_STEPS.length) * 100));
    }
    setGenerating(false);
    setVideoReady(true);
  }

  /* ── swap b-roll tag ── */
  function swapBRoll(segId, newTag) {
    setSegments(prev => prev.map(s => s.id === segId ? { ...s, broll: newTag } : s));
    setSwapTarget(null);
  }

  /* ── move segment up/down ── */
  function moveSegment(idx, dir) {
    setSegments(prev => {
      const next = [...prev];
      const swapIdx = idx + dir;
      if (swapIdx < 0 || swapIdx >= next.length) return next;
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      // recalculate start times
      let t = 0;
      return next.map(s => { const ns = { ...s, start: t }; t += s.duration; return ns; });
    });
  }

  /* ── export mock ── */
  function handleExportMP4() {
    const blob = new Blob(['[mock MP4 export — CareerCompass AI Video]'], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'career-video.mp4'; a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportWFP() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<FilmoraProject version="1.0">
  <Timeline aspectRatio="${aspectRatio}">
    ${segments.map(s => `<Clip start="${s.start}" duration="${s.duration}" broll="${s.broll}" subtitle="${s.text.replace(/"/g, "'")}" />`).join('\n    ')}
  </Timeline>
</FilmoraProject>`;
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'career-video.wfp'; a.click();
    URL.revokeObjectURL(url);
  }

  const activeSegment = segments[activeSegIdx] || segments[0];

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
        <span className="text-xs text-slate-500 font-medium hidden sm:block">CareerCompass AI · Video Creator</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        {/* ── PAGE HEADER ── */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 border border-violet-500/30 px-4 py-1.5 rounded-full text-xs font-bold text-violet-300 uppercase tracking-wider">
            🖼️ AI Video Creator
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
            AI Text-to-Video & B-Roll Creator
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Write your scene descriptions — AI reads them to pick the right image style. Switch to <span className="text-violet-300 font-semibold">Learn Mode</span> to understand how AI image prompting works.
          </p>
        </div>

        {/* ── MAIN TAB NAV ── */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-1.5 w-fit mx-auto">
          {[
            ['studio', '🎬 Studio'],
            ['learn',  '📚 Learn — AI Prompting'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === key
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── LEARN TAB ── */}
        {activeTab === 'learn' && <VideoLearnTab />}

        {activeTab === 'studio' && <>

        {/* ── IMAGE STYLE PICKER ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">🎨 Image Style — affects how scene images are rendered</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {Object.entries(IMAGE_STYLES).map(([key, s]) => (
              <button
                key={key}
                onClick={() => setImageStyle(key)}
                className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                  imageStyle === key
                    ? 'border-violet-400 bg-violet-500/15 text-violet-200 shadow-lg shadow-violet-500/20'
                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-bold leading-tight text-center">{s.label}</span>
                <span className="text-[9px] text-slate-500 leading-tight text-center hidden sm:block">{s.desc}</span>
              </button>
            ))}
          </div>
          {imageStyle && (
            <p className="text-[11px] text-slate-500 mt-1">
              AI prompt suffix for <span className="text-violet-300 font-semibold">{IMAGE_STYLES[imageStyle].label}</span>:{' '}
              <span className="text-slate-400 italic">"{IMAGE_STYLES[imageStyle].promptSuffix}"</span>
            </p>
          )}
        </div>

        {/* ── PRESET BUTTONS ── */}
        <div className="flex flex-wrap gap-2 justify-center">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => { setScript(p.script); setHighlighted(false); setKeywords([]); setVideoReady(false); setSegments([]); }}
              className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all"
            >
              📋 {p.label}
            </button>
          ))}
        </div>

        {/* ── SCRIPT INPUT + CONTROLS ── */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">📝 Video Script</h2>
            {/* Aspect ratio toggle */}
            <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1 border border-slate-700">
              {['9:16', '16:9'].map(r => (
                <button
                  key={r}
                  onClick={() => setAspectRatio(r)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    aspectRatio === r
                      ? 'bg-violet-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r === '9:16' ? '📱 9:16 Shorts' : '🖥️ 16:9 Landscape'}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            {highlighted && script ? (
              <div
                className="w-full min-h-[140px] px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: highlightKeywords(script) }}
              />
            ) : (
              <textarea
                value={script}
                onChange={e => { setScript(e.target.value); setHighlighted(false); setKeywords([]); }}
                rows={6}
                placeholder="Paste your video script here… e.g. 'Hi, I'm a full-stack developer who built an AI-powered dashboard…'"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl outline-none focus:border-violet-500 transition-colors placeholder-slate-600 resize-none"
              />
            )}
            <span className="absolute bottom-2 right-3 text-[10px] text-slate-600">{script.length} chars</span>
          </div>

          {/* Detected keywords */}
          {keywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Detected B-Roll:</span>
              {keywords.map(k => {
                const clip = BROLL_LIBRARY[k];
                return (
                  <span key={k} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r ${clip.color} text-white`}>
                    {clip.emoji} {clip.label}
                  </span>
                );
              })}
            </div>
          )}

          {/* Action row */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDetectKeywords}
              disabled={!script.trim()}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 text-xs font-bold rounded-xl transition-all"
            >
              🔍 Auto-Detect B-Roll Keywords
            </button>
            {highlighted && (
              <button
                onClick={() => setHighlighted(false)}
                className="px-4 py-2.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700 transition-all"
              >
                ✏️ Edit Script
              </button>
            )}
          </div>
        </div>

        {/* ── GENERATE BUTTON ── */}
        <div className="text-center">
          <button
            onClick={handleGenerate}
            disabled={!script.trim() || generating}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-2xl shadow-xl shadow-violet-500/25 transition-all"
          >
            {generating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Generating…
              </>
            ) : (
              <>🎬 Generate AI Video</>
            )}
          </button>
        </div>

        {/* ── PROGRESS LOADER ── */}
        {generating && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300 animate-pulse">{progressMsg}</span>
              <span className="text-violet-400 font-bold">{progress}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between">
              {PROGRESS_STEPS.map((s, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    progress >= Math.round(((i + 1) / PROGRESS_STEPS.length) * 100)
                      ? 'bg-cyan-400'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── TIMELINE & B-ROLL GRID ── */}
        {segments.length > 0 && !generating && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">🎞️ Timeline & B-Roll Segments</h2>
              <span className="text-xs text-slate-500">{segments.length} segments · {totalDuration}s total</span>
            </div>

            <div className="space-y-3">
              {segments.map((seg, idx) => {
                const clip = BROLL_LIBRARY[seg.broll] || BROLL_LIBRARY.coding;
                const isActive = currentTime >= seg.start && currentTime < seg.start + seg.duration;
                return (
                  <div
                    key={seg.id}
                    className={`border rounded-2xl p-4 transition-all duration-200 ${
                      isActive
                        ? 'border-violet-500/60 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                        : 'border-slate-800 bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-4 flex-wrap">

                      {/* Segment meta */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white bg-gradient-to-br ${clip.color}`}>
                          {idx + 1}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{seg.start}s–{seg.start + seg.duration}s</div>
                      </div>

                      {/* Subtitle text */}
                      <p className="flex-1 text-xs text-slate-300 leading-relaxed min-w-0">
                        {seg.text}
                      </p>

                      {/* B-Roll chip */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-gradient-to-r ${clip.color} text-white`}>
                          {clip.emoji} {clip.label}
                        </span>
                        <button
                          onClick={() => setSwapTarget(swapTarget === seg.id ? null : seg.id)}
                          className="text-[10px] px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg border border-slate-600 transition-all"
                        >
                          🔄 Swap
                        </button>
                        {seg.aiPrompt && (
                          <button
                            onClick={() => setPromptTarget(promptTarget === seg.id ? null : seg.id)}
                            className={`text-[10px] px-2 py-1 rounded-lg border transition-all ${
                              promptTarget === seg.id
                                ? 'bg-violet-600 border-violet-500 text-white'
                                : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600'
                            }`}
                          >
                            🤖 AI Prompt
                          </button>
                        )}
                        <button onClick={() => moveSegment(idx, -1)} disabled={idx === 0} className="text-[11px] px-2 py-1 bg-slate-700 disabled:opacity-30 hover:bg-slate-600 text-slate-300 rounded-lg border border-slate-600 transition-all">↑</button>
                        <button onClick={() => moveSegment(idx, 1)} disabled={idx === segments.length - 1} className="text-[11px] px-2 py-1 bg-slate-700 disabled:opacity-30 hover:bg-slate-600 text-slate-300 rounded-lg border border-slate-600 transition-all">↓</button>
                      </div>
                    </div>

                    {/* AI Prompt panel */}
                    {promptTarget === seg.id && seg.aiPrompt && (
                      <div className="mt-3 pt-3 border-t border-slate-700 space-y-3">
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">🤖 AI Image Prompt — what a real image generator would receive:</p>
                        {/* Parsed scene breakdown */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            ['Subject', seg.parsedSubject || '—'],
                            ['Action',  seg.parsedAction  || '—'],
                            ['Setting', seg.parsedSetting || '—'],
                            ['Mood',    seg.parsedMood    || '—'],
                          ].map(([label, val]) => (
                            <div key={label} className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{val}</p>
                            </div>
                          ))}
                        </div>
                        {/* Full prompt */}
                        <div className="bg-slate-800/80 border border-violet-500/30 rounded-xl p-3 space-y-2">
                          <p className="text-[9px] font-bold text-violet-400 uppercase tracking-wider">Full Prompt</p>
                          <p className="text-[11px] text-violet-200 font-mono leading-relaxed break-words">{seg.aiPrompt}</p>
                        </div>
                        {/* Tool suggestions */}
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider self-center">Use with →</span>
                          {['Stable Diffusion', 'DALL-E 3', 'Midjourney', 'Adobe Firefly'].map(tool => (
                            <span key={tool} className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 font-semibold">{tool}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Swap picker */}
                    {swapTarget === seg.id && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-2">Choose replacement B-Roll:</p>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                          {Object.keys(BROLL_LIBRARY).map(tag => (
                            <BRollClip
                              key={tag}
                              tag={tag}
                              size="sm"
                              selected={seg.broll === tag}
                              onClick={() => swapBRoll(seg.id, tag)}
                              styleKey={imageStyle}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── VIDEO PLAYER ── */}
        {videoReady && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">▶️ Video Preview</h2>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                aspectRatio === '9:16'
                  ? 'text-pink-300 bg-pink-500/10 border-pink-500/30'
                  : 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30'
              }`}>
                {aspectRatio === '9:16' ? '📱 Shorts / Reels' : '🖥️ Landscape'}
              </span>
            </div>

            {/* Preview frame */}
            <div className={aspectRatio === '9:16' ? 'flex justify-center' : ''}>
              <div className={aspectRatio === '9:16' ? 'w-48' : 'w-full'}>
                <AnimatedPreviewFrame
                  segment={activeSegment}
                  aspectRatio={aspectRatio}
                  isPlaying={isPlaying}
                  currentTime={currentTime}
                  styleKey={imageStyle}
                />
              </div>
            </div>

            {/* Playback controls */}
            <div className="space-y-2">
              {/* Seek bar */}
              <input
                type="range"
                min={0}
                max={totalDuration}
                step={0.25}
                value={currentTime}
                onChange={e => { setCurrentTime(Number(e.target.value)); setIsPlaying(false); }}
                className="w-full accent-violet-500 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{currentTime.toFixed(1)}s</span>
                <span>{totalDuration}s</span>
              </div>

              {/* Play / Pause / Restart */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
                >
                  ⏮ Restart
                </button>
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-violet-500/25"
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>
              </div>
            </div>

            {/* Segment progress indicator */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              {segments.map((seg, i) => {
                const clip = BROLL_LIBRARY[seg.broll] || BROLL_LIBRARY.coding;
                const isActive = currentTime >= seg.start && currentTime < seg.start + seg.duration;
                return (
                  <button
                    key={seg.id}
                    onClick={() => { setCurrentTime(seg.start); setIsPlaying(false); }}
                    className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                      isActive
                        ? 'bg-violet-600 border-violet-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {clip.emoji} {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Export options */}
            <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-3">
              <button
                onClick={handleExportMP4}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20"
              >
                ⬇️ Download MP4 Video
              </button>
              <button
                onClick={handleExportWFP}
                className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
              >
                🎬 Export to Filmora (.wfp)
              </button>
            </div>
          </div>
        )}

        </>}

      </div>
    </div>
  );
}
