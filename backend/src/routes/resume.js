'use strict';

const express = require('express');
const { chatCompletionJSON, isLiveMode } = require('../services/openai');

const router = express.Router();

/* ─── Shared AI system prompt ─────────────────────────────────────────────── */
const RESUME_SYSTEM_PROMPT = `You are a senior technical recruiter and resume coach with 15+ years of experience at FAANG companies.
Analyze the resume text provided by the user and return a JSON object with EXACTLY this structure (no extra keys, no markdown fences):

{
  "overallScore": <integer 0-100, based strictly on the actual resume content>,
  "atsScore": <integer 0-100, how well this resume would pass Applicant Tracking Systems>,
  "sections": {
    "summary":    { "present": <bool>, "score": <0-100 or null if absent>, "feedback": "<1-2 sentences based on actual content>" },
    "experience": { "present": <bool>, "score": <0-100 or null if absent>, "feedback": "<1-2 sentences based on actual content>" },
    "skills":     { "present": <bool>, "score": <0-100 or null if absent>, "feedback": "<1-2 sentences based on actual content>" },
    "education":  { "present": <bool>, "score": <0-100 or null if absent>, "feedback": "<1-2 sentences based on actual content>" },
    "projects":   { "present": <bool>, "score": <0-100 or null if absent>, "feedback": "<1-2 sentences based on actual content>" },
    "certifications": { "present": <bool>, "score": <0-100 or null if absent>, "feedback": "<1-2 sentences based on actual content>" }
  },
  "detectedSkills": [<array of skill strings actually found in the resume>],
  "missingKeySkills": [<array of 5-8 important skills absent from the resume, relevant to the target career>],
  "strengths": [<array of 3-4 specific strengths based on actual resume content>],
  "weaknesses": [<array of 3-4 specific weaknesses based on actual resume content>],
  "topImprovements": [<array of 5 specific, actionable improvement suggestions referencing actual resume content>],
  "atsKeywords": [<array of 8-12 ATS-friendly keywords the resume should include for the target career>],
  "experienceLevel": "<Fresher|Junior|Mid-Level|Senior — based on years/content>",
  "verdict": "<2-3 sentence honest overall verdict referencing what's actually in the resume>"
}

Rules:
- Base ALL feedback on the actual resume text. Never give generic advice that ignores the content.
- overallScore must reflect real quality: a weak 1-page resume with no metrics scores 35-55, not 80+.
- detectedSkills must only list skills ACTUALLY mentioned in the resume text.
- Be specific: reference job titles, project names, companies, technologies seen in the resume.`;

/* ─── Demo fallback: text-aware (not hardcoded) ───────────────────────────── */
function buildDemoAnalysis(resumeText, targetCareer) {
  const lower = resumeText.toLowerCase();
  const words = lower.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  // Detect common sections
  const hasExperience = /\b(experience|work history|employment|internship)\b/i.test(lower);
  const hasEducation  = /\b(education|university|college|degree|bachelor|master|b\.?tech|m\.?tech)\b/i.test(lower);
  const hasSkills     = /\b(skills|technologies|tech stack)\b/i.test(lower);
  const hasProjects   = /\b(project|built|developed|implemented)\b/i.test(lower);
  const hasSummary    = /\b(summary|objective|profile|about me)\b/i.test(lower);
  const hasCerts      = /\b(certification|certified|certificate)\b/i.test(lower);

  // Detect skills by keyword scan
  const KNOWN_SKILLS = [
    ['JavaScript','javascript','js '], ['TypeScript','typescript'], ['Python','python'],
    ['Java',' java '], ['React','react'], ['Node.js','node.js','nodejs'],
    ['SQL','sql'], ['MongoDB','mongodb'], ['PostgreSQL','postgresql','postgres'],
    ['Docker','docker'], ['AWS','aws '], ['Git','git '],
    ['CSS','css'], ['HTML','html'], ['C++','c++','cpp'],
    ['GraphQL','graphql'], ['REST APIs','rest api','restful'],
    ['Machine Learning','machine learning'], ['TensorFlow','tensorflow'],
    ['Spring Boot','spring boot'], ['Django','django'], ['Flask','flask'],
    ['Kubernetes','kubernetes','k8s'], ['Redis','redis'], ['Firebase','firebase'],
  ];
  const detectedSkills = KNOWN_SKILLS
    .filter(([, ...aliases]) => aliases.some(a => lower.includes(a)))
    .map(([canonical]) => canonical);

  const sectionCount = [hasExperience, hasEducation, hasSkills, hasProjects, hasSummary, hasCerts].filter(Boolean).length;
  const skillPts    = Math.min(40, Math.round((detectedSkills.length / 12) * 40));
  const sectionPts  = sectionCount * 5;
  const richPts     = Math.min(15, Math.round((wordCount / 300) * 15));
  const overallScore = Math.min(100, skillPts + sectionPts + richPts + (hasCerts ? 5 : 0));
  const atsScore = Math.min(100, overallScore + (detectedSkills.length > 6 ? 8 : 0));

  const career = targetCareer || 'Software Developer';
  const CAREER_KEYWORDS = {
    'Software Developer': ['REST API', 'Data Structures', 'Algorithms', 'OOP', 'Unit Testing', 'CI/CD', 'Agile', 'System Design'],
    'AI/ML Engineer':     ['Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'NumPy', 'Pandas', 'Statistics', 'Model Deployment'],
    'Data Analyst':       ['SQL', 'Power BI', 'Tableau', 'Excel', 'Pandas', 'Data Visualization', 'Statistics', 'ETL'],
    'Full-Stack Developer': ['React', 'Node.js', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Docker', 'CI/CD', 'Authentication'],
  };
  const atsKeywords = CAREER_KEYWORDS[career] || CAREER_KEYWORDS['Software Developer'];
  const missingKeySkills = atsKeywords.filter(k => !lower.includes(k.toLowerCase())).slice(0, 6);

  return {
    overallScore,
    atsScore,
    sections: {
      summary:      { present: hasSummary,    score: hasSummary ? 60 : null,    feedback: hasSummary ? 'Summary detected. Make it role-specific and results-oriented.' : 'No summary found. Add a 2-3 sentence professional summary targeting your desired role.' },
      experience:   { present: hasExperience, score: hasExperience ? 65 : null, feedback: hasExperience ? 'Experience section found. Quantify achievements with numbers and metrics.' : 'No work experience detected. Include internships, part-time roles, or freelance work.' },
      skills:       { present: hasSkills,     score: hasSkills ? 70 : null,     feedback: hasSkills ? 'Skills section present. Organise by category (Languages, Frameworks, Tools).' : 'Skills section missing. Add a dedicated skills section with categorised technical skills.' },
      education:    { present: hasEducation,  score: hasEducation ? 75 : null,  feedback: hasEducation ? 'Education found. Include GPA if above 3.0 and relevant coursework.' : 'Education section missing. Add your degree, institution, and graduation year.' },
      projects:     { present: hasProjects,   score: hasProjects ? 65 : null,   feedback: hasProjects ? 'Projects detected. Add GitHub links and describe the impact of each project.' : 'No projects found. Add 2-3 projects with tech stack, your role, and measurable outcomes.' },
      certifications: { present: hasCerts,   score: hasCerts ? 80 : null,      feedback: hasCerts ? 'Certifications present — great for ATS matching.' : 'No certifications found. Consider adding industry certs (Google, AWS, Meta) to improve ATS score.' },
    },
    detectedSkills,
    missingKeySkills,
    strengths: [
      detectedSkills.length > 5 ? `Solid technical breadth with ${detectedSkills.length} skills detected` : 'Shows some technical knowledge',
      hasProjects ? 'Project work demonstrates hands-on experience' : 'Resume structure is present',
      hasEducation ? 'Education credentials are documented' : 'Content is readable',
      hasCerts ? 'Certifications add credibility to your skills' : 'Skills keywords improve ATS matching',
    ].slice(0, 3),
    weaknesses: [
      !hasSummary    ? 'Missing professional summary — first thing recruiters look for' : null,
      wordCount < 200 ? 'Resume content is thin — aim for 400-600 words for a 1-page resume' : null,
      !hasExperience ? 'No work/internship experience listed' : null,
      missingKeySkills.length > 3 ? `Missing key ${career} skills: ${missingKeySkills.slice(0, 3).join(', ')}` : null,
    ].filter(Boolean).slice(0, 4),
    topImprovements: [
      'Add quantified achievements to every experience bullet (e.g., "increased performance by 30%")',
      !hasSummary ? 'Write a 2-3 sentence professional summary at the top targeting your desired role' : 'Sharpen your summary to mention the specific role and 2-3 key strengths',
      `Add missing ${career} keywords: ${missingKeySkills.slice(0, 3).join(', ')}`,
      'Include GitHub and LinkedIn URLs prominently at the top',
      wordCount < 300 ? 'Expand each experience/project entry with more detail on your contributions and impact' : 'Use the STAR method (Situation, Task, Action, Result) for experience bullets',
    ],
    atsKeywords,
    experienceLevel: hasExperience ? (wordCount > 500 ? 'Junior' : 'Fresher') : 'Fresher',
    verdict: `Resume scored ${overallScore}/100 in demo analysis. ${detectedSkills.length} skills detected out of a typical ${career} skillset. ${sectionCount}/6 key sections present. Connect a live OpenAI API key for a personalised, in-depth analysis.`,
  };
}

/**
 * POST /api/resume/improve
 * Body: { resumeText: string, targetCareer?: string }
 */
router.post('/improve', async (req, res) => {
  try {
    const { resumeText, targetCareer } = req.body;
    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({ success: false, error: 'resumeText is required and must be at least 30 characters.' });
    }

    let data = null;

    if (isLiveMode()) {
      const messages = [
        { role: 'system', content: RESUME_SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Target career: ${targetCareer || 'Software Developer'}\n\nResume text:\n${resumeText.slice(0, 8000)}`,
        },
      ];
      try {
        data = await chatCompletionJSON(messages);
      } catch (aiErr) {
        console.error('OpenAI resume analysis error:', aiErr.message);
        // Fall through to demo
      }
    }

    if (!data) {
      data = buildDemoAnalysis(resumeText, targetCareer);
    }

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Resume improve error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to analyze resume' });
  }
});

module.exports = { resumeRouter: router };
