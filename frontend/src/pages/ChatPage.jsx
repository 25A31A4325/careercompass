import React, { useState, useRef, useEffect } from 'react';
import { useProfile } from '../context/ProfileContext';
import { sendChatMessage } from '../services/api';
import ReactMarkdown from 'react-markdown';

const SUGGESTED = [
  'What should I learn next?',
  'How do I improve my resume?',
  'What projects should I build?',
  'Am I ready for internships?',
  'How to prepare for interviews?',
  'Why was that career recommended?',
];

export default function ChatPage() {
  const { profile } = useProfile();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: `Hi${profile.name ? ` ${profile.name}` : ''}! 👋 I'm your CareerCompass AI assistant. I'm here to help with your career journey — ask me about what to learn next, how to improve your resume, which projects to build, or how to prepare for interviews. 🎯`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text) {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    const userMsg = { id: Date.now(), role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const context = profile.name
        ? `Student: ${profile.name}, Target: ${profile.targetCareer}, Skills: ${[...(profile.programmingLanguages || []), ...(profile.technicalSkills || [])].join(', ')}`
        : '';
      const res = await sendChatMessage(msg, context);
      if (res.success) {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: res.data.reply }]);
      }
    } catch {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col" style={{ height: '100vh' }}>
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-bold">💬 AI Career Chat</h1>
          <p className="text-slate-400 text-sm">Get instant career advice powered by AI</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm shrink-0 mr-2 mt-1">
                  🤖
                </div>
              )}
              <div
                className={`max-w-lg px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-sky-600 text-white rounded-br-sm'
                    : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-sm'
                }`}
              >
                {m.role === 'assistant' ? (
                  <ReactMarkdown
                    components={{
                      strong: ({ children }) => <strong className="text-sky-400">{children}</strong>,
                      p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                    }}
                  >
                    {m.text}
                  </ReactMarkdown>
                ) : m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm shrink-0 mr-2">🤖</div>
              <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-bl-sm">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
            {SUGGESTED.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="bg-slate-800 border border-slate-700 hover:border-sky-600 text-slate-300 hover:text-sky-400 text-xs px-3 py-1.5 rounded-full transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-slate-900 border-t border-slate-700 px-4 py-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ask me anything about your career..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            style={{ minHeight: '46px', maxHeight: '120px' }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-colors shrink-0"
          >
            ➤
          </button>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}
