'use strict';

const express = require('express');
const multer = require('multer');
const { chatCompletionJSON, isLiveMode } = require('../services/openai');
const { demoAnalyzeProfile } = require('../services/demoData');

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: (parseInt(process.env.MAX_RESUME_SIZE_MB) || 5) * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed'));
  },
});

/**
 * POST /api/profile/analyze
 * Body: StudentProfile JSON
 */
router.post('/analyze', async (req, res) => {
  try {
    const profile = req.body;
    if (!profile || !profile.name) {
      return res.status(400).json({ success: false, error: 'Profile data is required' });
    }

    let data;
    const mode = isLiveMode() ? 'live' : 'demo';

    if (isLiveMode()) {
      const messages = [
        {
          role: 'system',
          content: 'You are a career counselor AI. Analyze the student profile and return a JSON object with: technicalSkills, programmingLanguages, tools, frameworks, projects, certifications, experienceLevel (Beginner/Intermediate/Advanced), strengths (array), improvementAreas (array), resumeSkillsDetected, resumeProjectsDetected, resumeMissingInfo, resumeSuggestedImprovements.',
        },
        { role: 'user', content: `Analyze this student profile:\n${JSON.stringify(profile, null, 2)}` },
      ];
      data = await chatCompletionJSON(messages);
    }

    if (!data) {
      data = demoAnalyzeProfile(profile);
    }

    res.json({ success: true, data, mode });
  } catch (err) {
    console.error('Profile analyze error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to analyze profile' });
  }
});

/**
 * POST /api/profile/upload-resume
 * Multipart: file field "resume"
 */
router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No resume file uploaded' });
    }

    let resumeText = '';
    try {
      const pdfParse = require('pdf-parse');
      const parsed = await pdfParse(req.file.buffer);
      resumeText = parsed.text || '';
    } catch (e) {
      resumeText = '[PDF text extraction failed — submit profile manually]';
    }

    res.json({ success: true, data: { resumeText: resumeText.slice(0, 5000) }, mode: 'live' });
  } catch (err) {
    console.error('Resume upload error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to process resume' });
  }
});

module.exports = { profileRouter: router };
