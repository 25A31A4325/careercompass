/**
 * resumeAnalyzer.js
 * ─────────────────
 * Single, deterministic resume analysis engine used by EVERY part of
 * CareerCompass.  Import analyzeResume() wherever you need scores.
 *
 * analyzeResume(text, selectedRoleSkills?)
 *   text              — raw text extracted from the resume
 *   selectedRoleSkills — optional string[] of required skills for a chosen role
 *
 * Returns a plain object that is IDENTICAL no matter where it is called.
 */

/* ─── 1. SKILL ALIASES ────────────────────────────────────────────────────── */
// Each entry: { canonical: string, aliases: string[] }
// A skill is detected if ANY alias appears in the lower-cased resume text.
const SKILL_DEFINITIONS = [
  // Web / UI
  { canonical: 'HTML',          aliases: ['html', 'html5'] },
  { canonical: 'CSS',           aliases: ['css', 'css3', 'stylesheet'] },
  { canonical: 'JavaScript',    aliases: ['javascript', 'js ', ' js,', ' js.', '\njs\n', 'ecmascript', 'es6', 'es2015', 'es2020'] },
  { canonical: 'TypeScript',    aliases: ['typescript', ' ts ', 'ts,', '.ts'] },
  { canonical: 'React',         aliases: ['react', 'react.js', 'reactjs', 'react native'] },
  { canonical: 'Vue',           aliases: ['vue', 'vue.js', 'vuejs', 'vue 3'] },
  { canonical: 'Angular',       aliases: ['angular', 'angularjs', 'angular.js'] },
  { canonical: 'Next.js',       aliases: ['next.js', 'nextjs', 'next js'] },
  { canonical: 'Svelte',        aliases: ['svelte', 'sveltekit'] },
  { canonical: 'Tailwind',      aliases: ['tailwind', 'tailwindcss', 'tailwind css'] },
  { canonical: 'Bootstrap',     aliases: ['bootstrap'] },
  { canonical: 'Sass',          aliases: ['sass', 'scss'] },
  // Back-end / runtime
  { canonical: 'Node.js',       aliases: ['node.js', 'nodejs', 'node js', 'npm', 'express.js'] },
  { canonical: 'Express',       aliases: ['express', 'express.js', 'expressjs'] },
  { canonical: 'Python',        aliases: ['python'] },
  { canonical: 'Django',        aliases: ['django'] },
  { canonical: 'Flask',         aliases: ['flask'] },
  { canonical: 'FastAPI',       aliases: ['fastapi', 'fast api'] },
  { canonical: 'Java',          aliases: [' java ', ' java,', ' java.', 'java\n', '\njava'] },
  { canonical: 'Spring',        aliases: ['spring boot', 'spring framework', 'spring mvc'] },
  { canonical: 'C++',           aliases: ['c++', 'cpp', 'c/c++', 'c plus plus'] },
  { canonical: 'C#',            aliases: ['c#', 'csharp', 'c sharp', '.net', 'asp.net'] },
  { canonical: 'Go',            aliases: [' go ', 'golang', 'go lang'] },
  { canonical: 'Rust',          aliases: ['rust', 'rustlang'] },
  { canonical: 'PHP',           aliases: ['php', 'laravel', 'symfony'] },
  { canonical: 'Ruby',          aliases: ['ruby', 'ruby on rails', 'rails'] },
  { canonical: 'Kotlin',        aliases: ['kotlin'] },
  { canonical: 'Swift',         aliases: ['swift', 'swiftui', 'ios development'] },
  // Data / ML / AI
  { canonical: 'Machine Learning', aliases: ['machine learning', 'ml ', 'ml,', 'scikit-learn', 'sklearn'] },
  { canonical: 'Deep Learning', aliases: ['deep learning', 'neural network', 'cnn', 'rnn', 'lstm', 'transformer'] },
  { canonical: 'TensorFlow',    aliases: ['tensorflow', 'tensor flow', 'tf.keras'] },
  { canonical: 'PyTorch',       aliases: ['pytorch', 'torch'] },
  { canonical: 'Pandas',        aliases: ['pandas'] },
  { canonical: 'NumPy',         aliases: ['numpy'] },
  { canonical: 'Data Analysis', aliases: ['data analysis', 'data analytics', 'data visualization', 'matplotlib', 'seaborn', 'tableau', 'power bi', 'powerbi'] },
  { canonical: 'NLP',           aliases: ['nlp', 'natural language processing', 'spacy', 'nltk', 'hugging face', 'huggingface'] },
  // Databases
  { canonical: 'SQL',           aliases: ['sql', 'structured query'] },
  { canonical: 'MySQL',         aliases: ['mysql'] },
  { canonical: 'PostgreSQL',    aliases: ['postgresql', 'postgres', 'psql'] },
  { canonical: 'MongoDB',       aliases: ['mongodb', 'mongo', 'mongoose'] },
  { canonical: 'Redis',         aliases: ['redis'] },
  { canonical: 'Firebase',      aliases: ['firebase', 'firestore'] },
  { canonical: 'SQLite',        aliases: ['sqlite'] },
  // Cloud / DevOps
  { canonical: 'AWS',           aliases: ['aws', 'amazon web services', 'ec2', 's3 bucket', 'lambda', 'amplify'] },
  { canonical: 'Azure',         aliases: ['azure', 'microsoft azure'] },
  { canonical: 'GCP',           aliases: ['gcp', 'google cloud', 'google cloud platform', 'bigquery'] },
  { canonical: 'Docker',        aliases: ['docker', 'dockerfile', 'containeriz'] },
  { canonical: 'Kubernetes',    aliases: ['kubernetes', 'k8s', 'kubectl'] },
  { canonical: 'CI/CD',         aliases: ['ci/cd', 'cicd', 'ci cd', 'github actions', 'jenkins', 'travis', 'circle ci'] },
  { canonical: 'Terraform',     aliases: ['terraform', 'infrastructure as code', 'iac'] },
  { canonical: 'Linux',         aliases: ['linux', 'unix', 'bash', 'shell script', 'ubuntu', 'centos'] },
  // Tools / VCS
  { canonical: 'Git',           aliases: ['git ', 'git,', 'git\n', 'git.', 'version control', 'source control'] },
  { canonical: 'GitHub',        aliases: ['github'] },
  { canonical: 'REST APIs',     aliases: ['rest api', 'restful', 'rest ', 'api development', 'api integration'] },
  { canonical: 'GraphQL',       aliases: ['graphql'] },
  { canonical: 'Figma',         aliases: ['figma', 'ui/ux', 'user interface design', 'wireframe', 'prototyping'] },
  { canonical: 'Agile / Scrum', aliases: ['agile', 'scrum', 'kanban', 'jira', 'sprint'] },
  { canonical: 'Testing',       aliases: ['unit test', 'jest', 'mocha', 'cypress', 'selenium', 'pytest', 'test automation', 'tdd', 'bdd'] },
  { canonical: 'System Design', aliases: ['system design', 'distributed system', 'microservices', 'scalability', 'load balancing'] },
  { canonical: 'Blockchain',    aliases: ['blockchain', 'solidity', 'web3', 'smart contract', 'ethereum'] },
];

/* ─── 2. SECTION DETECTOR ─────────────────────────────────────────────────── */
const SECTION_PATTERNS = {
  experience:      /\b(experience|work history|employment|internship|intern|job|professional background)\b/i,
  education:       /\b(education|academic|university|college|degree|bachelor|master|b\.?sc|m\.?sc|b\.?e\.?|m\.?e\.?|b\.?tech|m\.?tech|gpa)\b/i,
  projects:        /\b(project|projects|built|developed|created|implemented|deployed)\b/i,
  skills:          /\b(skills|technologies|tech stack|proficiencies|competencies|expertise)\b/i,
  certifications:  /\b(certification|certificate|certified|credential|course completion|badge)\b/i,
  achievements:    /\b(achievement|award|honor|recognition|scholarship|rank|winner|finalist|hackathon)\b/i,
  summary:         /\b(summary|objective|profile|about me|career objective)\b/i,
};

function detectSections(lower) {
  const found = {};
  for (const [key, re] of Object.entries(SECTION_PATTERNS)) {
    found[key] = re.test(lower);
  }
  return found;
}

/* ─── 3. CORE ANALYSIS ────────────────────────────────────────────────────── */
/**
 * @param {string} text               – plain text from resume
 * @param {string[]} [selectedRoleSkills] – canonical skill names required for a role
 * @returns {AnalysisResult}
 */
export function analyzeResume(text, selectedRoleSkills = null) {
  if (!text || text.trim().length < 20) {
    return _emptyResult('Resume text is too short or could not be extracted.');
  }

  const lower = text.toLowerCase();

  /* ── 3a. Detect skills ── */
  const detectedSkills = [];
  for (const def of SKILL_DEFINITIONS) {
    const found = def.aliases.some(alias => lower.includes(alias));
    if (found) detectedSkills.push(def.canonical);
  }

  /* ── 3b. Detect sections ── */
  const sections = detectSections(lower);
  const sectionCount = Object.values(sections).filter(Boolean).length;

  /* ── 3c. Resume Health Score (transparent, deterministic) ──
   *
   * Max 100 pts broken into weighted buckets:
   *   Skills coverage   40 pts  (scaled: detectedSkills / 12 * 40, cap 40)
   *   Sections present  35 pts  (5 pts each for up to 7 sections)
   *   Text richness     15 pts  (word count signal, capped)
   *   Certifications     5 pts  (binary)
   *   Achievements       5 pts  (binary)
   */
  const skillPts  = Math.min(40, Math.round((detectedSkills.length / 12) * 40));
  const sectionPts = sectionCount * 5;          // 0-35
  const wordCount  = lower.split(/\s+/).filter(Boolean).length;
  const richPts    = Math.min(15, Math.round((wordCount / 300) * 15)); // 300 words = full
  const certPts    = sections.certifications ? 5 : 0;
  const achPts     = sections.achievements   ? 5 : 0;

  const resumeHealth = Math.min(100, skillPts + sectionPts + richPts + certPts + achPts);

  /* ── 3d. Matched / Missing vs role (or general) ── */
  let matchedSkills, missingSkills, jobReadiness;

  if (selectedRoleSkills && selectedRoleSkills.length > 0) {
    // Compare against the specified role's skill list
    matchedSkills = selectedRoleSkills.filter(s =>
      detectedSkills.map(d => d.toLowerCase()).includes(s.toLowerCase())
    );
    missingSkills = selectedRoleSkills.filter(s =>
      !detectedSkills.map(d => d.toLowerCase()).includes(s.toLowerCase())
    );
    jobReadiness = Math.round((matchedSkills.length / selectedRoleSkills.length) * 100);
  } else {
    // No role selected — show what was found; recommended = common skills not present
    const GENERAL_RECOMMENDED = [
      'JavaScript','Python','React','Node.js','SQL','Git',
      'REST APIs','TypeScript','Docker','CSS','HTML','AWS',
    ];
    matchedSkills = detectedSkills; // everything detected counts
    missingSkills = GENERAL_RECOMMENDED.filter(s =>
      !detectedSkills.map(d => d.toLowerCase()).includes(s.toLowerCase())
    );
    // Job readiness without a role = skill coverage vs recommended list
    const coveredGeneral = GENERAL_RECOMMENDED.filter(s =>
      detectedSkills.map(d => d.toLowerCase()).includes(s.toLowerCase())
    );
    jobReadiness = Math.round((coveredGeneral.length / GENERAL_RECOMMENDED.length) * 100);
  }

  /* ── 3e. Human-readable labels ── */
  const healthLabel =
    resumeHealth >= 80 ? 'Excellent 🌟' :
    resumeHealth >= 60 ? 'Good 👍'       : 'Needs Improvement ⚠️';

  const summaryText =
    resumeHealth >= 80
      ? 'Your resume shows strong technical coverage and deep domain alignment!'
      : resumeHealth >= 60
      ? 'Solid core skills detected. Add missing modern tools to reach top tier strength.'
      : 'Consider adding more technical keywords, certifications, and domain skills to boost your score.';

  /* ── 3f. Score breakdown (for "Analysis Details") ── */
  const scoreBreakdown = [
    { label: 'Skills Coverage',   pts: skillPts,   max: 40, note: `${detectedSkills.length} skill(s) detected` },
    { label: 'Sections Present',  pts: sectionPts, max: 35, note: `${sectionCount}/7 section(s) found` },
    { label: 'Content Richness',  pts: richPts,    max: 15, note: `~${wordCount} words` },
    { label: 'Certifications',    pts: certPts,    max: 5,  note: sections.certifications ? 'Found' : 'Not found' },
    { label: 'Achievements',      pts: achPts,     max: 5,  note: sections.achievements   ? 'Found' : 'Not found' },
  ];

  return {
    resumeHealth,
    healthLabel,
    summaryText,
    jobReadiness,
    detectedSkills,
    matchedSkills,
    missingSkills: missingSkills.slice(0, 8),
    sections,
    sectionCount,
    scoreBreakdown,
    wordCount,
    // Legacy aliases so the existing dashboard stats still work
    score:          resumeHealth,
    healthStatus:   healthLabel,
    detected:       detectedSkills,
    missing:        missingSkills.slice(0, 6),
    readinessPct:   jobReadiness,
    skillsMatched:  matchedSkills.length,
    skillsTotal:    selectedRoleSkills ? selectedRoleSkills.length : 20,
    coursesSignal:  detectedSkills.filter(s =>
      ['Machine Learning','TypeScript','Docker','System Design','TensorFlow','NLP','Deep Learning'].includes(s)
    ).length,
    error: null,
  };
}

/* ─── 4. EMPTY / ERROR RESULT ─────────────────────────────────────────────── */
function _emptyResult(errorMsg) {
  return {
    resumeHealth: 0,
    healthLabel: 'Unable to Analyze',
    summaryText: errorMsg,
    jobReadiness: 0,
    detectedSkills: [],
    matchedSkills: [],
    missingSkills: [],
    sections: {},
    sectionCount: 0,
    scoreBreakdown: [],
    wordCount: 0,
    // Legacy aliases
    score: 0,
    healthStatus: 'Unable to Analyze',
    detected: [],
    missing: [],
    readinessPct: 0,
    skillsMatched: 0,
    skillsTotal: 20,
    coursesSignal: 0,
    error: errorMsg,
  };
}

/* ─── 5. PDF TEXT EXTRACTION (async) ─────────────────────────────────────── */
/**
 * extractTextFromFile(file) → Promise<string>
 *
 * Handles:
 *   .pdf  – uses pdfjs-dist to extract all text
 *   other – reads as plain UTF-8 text (txt, md, csv …)
 *
 * Throws a user-friendly Error if extraction fails.
 */
export async function extractTextFromFile(file) {
  if (!file) throw new Error('No file provided.');

  const isPDF = file.name.toLowerCase().endsWith('.pdf') ||
                file.type === 'application/pdf';

  if (isPDF) {
    return _extractPdfText(file);
  }

  // Plain text
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = e => resolve(e.target.result || '');
    reader.onerror = () => reject(new Error('Could not read file.'));
    reader.readAsText(file);
  });
}

async function _extractPdfText(file) {
  try {
    // Dynamic import so we don't bloat the bundle if PDF is never used
    const pdfjsLib = await import('pdfjs-dist');

    // pdfjs needs a worker; use the bundled legacy worker via CDN to keep it simple
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page    = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      pages.push(pageText);
    }

    const fullText = pages.join('\n');

    if (fullText.trim().length < 20) {
      throw new Error(
        'Unable to read resume content. The PDF may be image-based (scanned). ' +
        'Please upload a text-readable PDF or a .txt file.'
      );
    }

    return fullText;
  } catch (err) {
    if (err.message.includes('Unable to read')) throw err;
    throw new Error(
      'Unable to read resume content. Please upload a text-readable PDF or a .txt file.'
    );
  }
}
