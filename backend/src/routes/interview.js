'use strict';

const express = require('express');
const { chatCompletionJSON, isLiveMode } = require('../services/openai');
const { demoGetInterviewQuestion, demoEvaluateAnswer } = require('../services/demoData');

const router = express.Router();

/**
 * POST /api/interview/question
 * Body: { career, difficulty, previousQuestions }
 */
router.post('/question', async (req, res) => {
  try {
    const { career, difficulty, previousQuestions } = req.body;
    if (!career) {
      return res.status(400).json({ success: false, error: 'career is required' });
    }

    const diff = difficulty || 'Beginner';
    let data;

    if (isLiveMode()) {
      const asked = (previousQuestions || []).map(q => q.question);
      const messages = [
        {
          role: 'system',
          content:
            'Return a single interview question as JSON with: id, question, topic, difficulty, expectedPoints (array of key points the answer should cover).',
        },
        {
          role: 'user',
          content: `Generate a ${diff} interview question for: ${career}. Do NOT repeat these questions: ${JSON.stringify(asked)}`,
        },
      ];
      data = await chatCompletionJSON(messages);
      if (data && !data.id) data.id = `q_${Date.now()}`;
    }

    if (!data) data = demoGetInterviewQuestion(career, diff, previousQuestions || []);

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Interview question error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to get interview question' });
  }
});

/**
 * POST /api/interview/evaluate
 * Body: { question, answer }
 */
router.post('/evaluate', async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ success: false, error: 'question and answer are required' });
    }

    let data;

    if (isLiveMode()) {
      const messages = [
        {
          role: 'system',
          content:
            'Evaluate the interview answer and return JSON with: score (0-10), correctness (0-100), technicalUnderstanding (0-100), communication (0-100), completeness (0-100), whatYouDidWell (array), whatToImprove (array), betterApproach (string).',
        },
        {
          role: 'user',
          content: `Question: ${question.question}\nExpected key points: ${JSON.stringify(question.expectedPoints)}\nCandidate answer: ${answer}`,
        },
      ];
      data = await chatCompletionJSON(messages);
    }

    if (!data) data = demoEvaluateAnswer(question, answer);

    res.json({ success: true, data, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Interview evaluate error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to evaluate answer' });
  }
});

module.exports = { interviewRouter: router };
