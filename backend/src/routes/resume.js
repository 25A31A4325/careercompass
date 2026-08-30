'use strict';

const express = require('express');
const { chatCompletionJSON, isLiveMode } = require('../services/openai');

const router = express.Router();

/**
 * POST /api/resume/improve
 * Body: { resumeText, targetCareer }
 */
router.post('/improve', async (req, res) => {
  try {
    const { resumeText, targetCareer } = req.body;
    if (!resumeText) {
      return res.status(400).json({ success: false, error: 'resumeText is required' });
    }

    let data;

    if (isLiveMode()) {
      const messages = [
        {
          role: 'system',
          content:
            'You are a professional resume reviewer. Analyze the resume text and return JSON with: overallScore (0-100), sections {summary, experience, skills, education, projects} each with score and suggestions (array), topImprovements (array of strings), missingElements (array of strings), keywordsToAdd (array of strings).',
        },
        {
          role: 'user',
          content: `Resume text:\n${resumeText}\n\nTarget career: ${targetCareer || 'Software Developer'}`,
        },
      ];
      data = await chatCompletionJSON(messages);
    }

    if (!data) {
      data = {
        overallScore: 62,
        sections: {
          summary: { score: 55, suggestions: ['Add a professional summary at the top', 'Include your target role'] },
          experience: { score: 60, suggestions: ['Quantify your achievements', 'Use action verbs'] },
          skills: { score: 70, suggestions: ['Categorize skills by type', 'Add proficiency levels'] },
          education: { score: 80, suggestions: ['Add relevant coursework', 'Include GPA if above 3.0'] },
          projects: { score: 65, suggestions: ['Add GitHub links', 'Describe the impact of each project'] },
        },
        topImprovements: [
          'Add measurable outcomes to each project (e.g., "reduced load time by 40%")',
          'Include a professional summary targeting your desired role',
          'Add your GitHub profile link',
        ],
        missingElements: ['Professional summary', 'LinkedIn URL', 'Quantified achievements'],
        keywordsToAdd: ['REST API', 'Agile', 'Unit Testing', 'CI/CD'],
      };
    }

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Resume improve error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to analyze resume' });
  }
});

module.exports = { resumeRouter: router };
