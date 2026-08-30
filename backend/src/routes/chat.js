'use strict';

const express = require('express');
const { chatCompletion, isLiveMode } = require('../services/openai');
const { demoChatResponse } = require('../services/demoData');

const router = express.Router();

/**
 * POST /api/chat
 * Body: { message, context }
 */
router.post('/', async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'message is required' });
    }

    let reply;

    if (isLiveMode()) {
      const systemPrompt =
        'You are CareerCompass AI, a helpful career counselor for students. ' +
        'Give concise, actionable advice about career paths, skills to learn, projects to build, and interview preparation. ' +
        'Keep responses under 200 words. Use markdown sparingly.';

      const messages = [
        { role: 'system', content: systemPrompt },
      ];

      if (context && typeof context === 'string' && context.trim()) {
        messages.push({ role: 'system', content: `Student context: ${context}` });
      }

      messages.push({ role: 'user', content: message });

      reply = await chatCompletion(messages);
    }

    if (!reply) {
      reply = demoChatResponse(message);
    }

    res.json({ success: true, data: { reply }, mode: isLiveMode() ? 'live' : 'demo' });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to process chat message' });
  }
});

module.exports = { chatRouter: router };
