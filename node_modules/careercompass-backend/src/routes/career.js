'use strict';

const express = require('express');
const { chatCompletionJSON, isLiveMode } = require('../services/openai');
const {
  demoRecommendCareers,
  demoAnalyzeSkillGap,
  demoGenerateRoadmap,
  demoCalculateJobReadiness,
} = require('../services/demoData');

const router = express.Router();

/**
 * POST /api/career/recommend
 * Body: StudentProfile JSON
 */
router.post('/recommend', async (req, res) => {
  try {
    const profile = req.body;
    if (!profile || !profile.name) {
      return res.status(400).json({ success: false, error: 'Profile data is required' });
    }

    let data;
    if (isLiveMode()) {
      const messages = [
        {
          role: 'system',
          content:
            'You are a career counselor AI. Based on the student profile, recommend 4 careers as a JSON array. Each item must have: career, matchScore (0-100), whyItMatches, existingRelevantSkills (array), missingImportantSkills (array), recommendedNextSteps (array), icon (emoji).',
        },
        { role: 'user', content: `Recommend careers for:\n${JSON.stringify(profile, null, 2)}` },
      ];
      data = await chatCompletionJSON(messages);
    }

    if (!data) data = demoRecommendCareers(profile);

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Career recommend error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to recommend careers' });
  }
});

/**
 * POST /api/career/skill-gap
 * Body: { targetCareer, currentSkills }
 */
router.post('/skill-gap', async (req, res) => {
  try {
    const { targetCareer, currentSkills } = req.body;
    if (!targetCareer) {
      return res.status(400).json({ success: false, error: 'targetCareer is required' });
    }

    let data;
    if (isLiveMode()) {
      const messages = [
        {
          role: 'system',
          content:
            'Return a JSON array of skill gaps. Each item: skill, currentLevel (0-100), requiredLevel (0-100), status ("have"|"need"|"improve").',
        },
        {
          role: 'user',
          content: `Target career: ${targetCareer}. Current skills: ${JSON.stringify(currentSkills || [])}`,
        },
      ];
      data = await chatCompletionJSON(messages);
    }

    if (!data) data = demoAnalyzeSkillGap(targetCareer, currentSkills || []);

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Skill gap error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to analyze skill gap' });
  }
});

/**
 * POST /api/career/roadmap
 * Body: { targetCareer, profile }
 */
router.post('/roadmap', async (req, res) => {
  try {
    const { targetCareer, profile } = req.body;
    if (!targetCareer) {
      return res.status(400).json({ success: false, error: 'targetCareer is required' });
    }

    let data;
    if (isLiveMode()) {
      const messages = [
        {
          role: 'system',
          content:
            'Return a JSON array of learning roadmap phases. Each phase: phase (number), title, skillsToLearn (array), resources (array of {title, type, url, free}), practiceTasks (array), projectIdeas (array), estimatedWeeks (number), priority ("high"|"medium"|"low").',
        },
        {
          role: 'user',
          content: `Create a learning roadmap for: ${targetCareer}. Student profile: ${JSON.stringify(profile || {})}`,
        },
      ];
      data = await chatCompletionJSON(messages);
    }

    if (!data) data = demoGenerateRoadmap(targetCareer);

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Roadmap error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to generate roadmap' });
  }
});

/**
 * POST /api/career/job-readiness
 * Body: { profile, targetCareer }
 */
router.post('/job-readiness', async (req, res) => {
  try {
    const { profile, targetCareer } = req.body;
    if (!profile) {
      return res.status(400).json({ success: false, error: 'Profile is required' });
    }

    let data;
    if (isLiveMode()) {
      const messages = [
        {
          role: 'system',
          content:
            'Evaluate job readiness. Return JSON with: totalScore (0-100), breakdown {technicalSkills, projects, requiredSkills, interviewPreparation}, level ("Entry"|"Junior"|"Mid"|"Senior"), recommendations (array of strings).',
        },
        {
          role: 'user',
          content: `Evaluate job readiness for ${targetCareer || 'Software Developer'}:\n${JSON.stringify(profile, null, 2)}`,
        },
      ];
      data = await chatCompletionJSON(messages);
    }

    if (!data) data = demoCalculateJobReadiness(profile, targetCareer || 'Software Developer');

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Job readiness error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to calculate job readiness' });
  }
});

module.exports = { careerRouter: router };
