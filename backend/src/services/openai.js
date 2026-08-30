'use strict';

/**
 * OpenAI service wrapper.
 * Returns null if DEMO_MODE=true or OPENAI_API_KEY is missing/placeholder.
 */

let _openai = null;

function getOpenAI() {
  if (_openai !== null) return _openai;

  const key = process.env.OPENAI_API_KEY;
  const isDemo = process.env.DEMO_MODE === 'true';
  const keyMissing = !key || key === 'your_openai_api_key_here' || key.trim() === '';

  if (isDemo || keyMissing) {
    _openai = false; // mark as checked but unavailable
    return null;
  }

  try {
    const OpenAI = require('openai');
    _openai = new OpenAI({ apiKey: key });
    return _openai;
  } catch (e) {
    console.warn('OpenAI SDK load failed:', e.message);
    _openai = false;
    return null;
  }
}

function isLiveMode() {
  return getOpenAI() !== null;
}

async function chatCompletion(messages, options) {
  const openai = getOpenAI();
  if (!openai) return null;

  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature: options && options.temperature !== undefined ? options.temperature : 0.7,
    max_tokens: options && options.max_tokens ? options.max_tokens : 2000,
  });
  return response.choices[0].message.content;
}

async function chatCompletionJSON(messages, options) {
  const text = await chatCompletion(messages, options);
  if (!text) return null;
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = match ? match[1].trim() : text.trim();
  return JSON.parse(jsonStr);
}

module.exports = { getOpenAI, isLiveMode, chatCompletion, chatCompletionJSON };
