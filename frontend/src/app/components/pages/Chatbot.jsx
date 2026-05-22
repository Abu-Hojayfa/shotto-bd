import { useState, useEffect, useRef } from 'react';
import { Header } from '../shared/Header';
import { Footer } from '../shared/Footer';
import { Send, Scale, User, Loader2, RotateCcw, ShieldCheck, ChevronRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'motion/react';

// ── Groq API — free tier, fast Llama 3.3 70B model ───────────────────────────
// Get your free key at: https://console.groq.com
// Add to .env:  VITE_GROQ_API_KEY=your_key_here
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL   = 'llama-3.3-70b-versatile'; // free, fast, high quality

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Shotto-AI, a professional Digital Legal Advocate specialising exclusively in Bangladesh law. You help citizens understand their rights, navigate corruption, and take concrete legal action.

PERSONALITY:
- Authoritative but approachable. Like a senior lawyer who genuinely cares.
- Always cite specific laws: Article numbers, Act names, Section numbers (e.g. "Article 33 of the Constitution", "Section 161 of the Penal Code 1860").
- End every response with a clear "⚖ Your Action:" section that tells the user exactly what to do next.
- Keep responses focused and scannable — use numbered steps when listing actions.
- Write in English by default. If the user writes in Bangla, respond fully in Bangla.
- Never give vague advice. Always be specific about which law applies and what the user can do.
- If a question is outside Bangladesh law or your expertise, say so honestly and suggest where they can get help.

TOPICS YOU COVER:
- Constitutional rights (arrest, due process, freedom of speech)
- Anti-corruption laws (ACC Act 2004, Penal Code bribery sections)
- Right to Information Act 2009
- Land registration laws
- Whistleblower Protection Act 2011
- Labor laws and unfair dismissal
- Consumer rights
- Court procedures and how to file complaints

FORMAT RULES:
- Use line breaks generously for readability
- Wrap key legal terms in **double asterisks** for bold
- Keep responses under 300 words unless the topic truly demands more
- The "⚖ Your Action:" section must have 1-3 concrete, immediately doable steps
- Never use markdown headers (#, ##) — use plain text with line breaks instead`;

// ── Suggestion chips ──────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: 'Rights when arrested',     prompt: 'What are my rights if I am arrested by police?' },
  { label: 'Reporting a bribe',        prompt: 'An official asked me for a bribe. What can I do?' },
  { label: 'Whistleblower protection', prompt: 'Am I protected if I report corruption at my workplace?' },
  { label: 'Land registration fraud',  prompt: 'The sub-registrar is demanding extra money. Is this legal?' },
  { label: 'Right to Information',     prompt: 'How do I use the RTI Act to get government documents?' },
  { label: 'Unfair dismissal',         prompt: 'My employer fired me without notice. What are my rights?' },
];

const INITIAL_MESSAGE = {
  id: 'init',
  role: 'assistant',
  content: `Welcome. I am **Shotto-AI**, your Digital Legal Advocate.

I specialise in Bangladesh law — from constitutional rights to anti-corruption statutes. Tell me your situation and I will cite the exact law that applies and tell you what steps to take.

Everything you share here is confidential. How can I help you today?`,
  timestamp: new Date(),
};

// ── Markdown-lite renderer ────────────────────────────────────────────────────
function MessageText({ content }) {
  return (
    <div className="space-y-1.5 text-sm leading-relaxed">
      {content.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;

        const renderBold = (text) =>
          text.split(/\*\*(.*?)\*\*/g).map((part, j) =>
            j % 2 === 1
              ? <strong key={j} className="font-semibold text-foreground">{part}</strong>
              : part
          );

        // Action section
        if (line.startsWith('⚖')) {
          return (
            <div key={i} className="mt-3 pt-3 border-t border-border/60">
              <p className="font-semibold text-primary text-xs uppercase tracking-wider mb-1.5">
                {renderBold(line)}
              </p>
            </div>
          );
        }

        // Numbered list items
        if (/^\d+\./.test(line)) {
          const num   = line.match(/^\d+\./)[0];
          const rest  = line.slice(num.length);
          return (
            <div key={i} className="flex gap-2 ml-1">
              <span className="text-primary font-bold shrink-0">{num}</span>
              <span>{renderBold(rest)}</span>
            </div>
          );
        }

        return <p key={i}>{renderBold(line)}</p>;
      })}
    </div>
  );
}

// ── Groq API call ─────────────────────────────────────────────────────────────
async function callGroq(conversationHistory) {
  if (!GROQ_API_KEY) {
    throw new Error('VITE_GROQ_API_KEY is not set in  .env file. Get a free key at console.groq.com');
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 1024,
      temperature: 0.7,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        // Send full history except the initial greeting (covered by system prompt)
        ...conversationHistory
          .filter(m => m.id !== 'init')
          .map(m => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // Surface friendly Groq-specific errors
    if (res.status === 401) throw new Error('Invalid Groq API key. Check your VITE_GROQ_API_KEY in .env');
    if (res.status === 429) throw new Error('Rate limit reached. Please wait a moment and try again.');
    throw new Error(err.error?.message || `Groq API error ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response. Please try again.';
}

// ── Main component ────────────────────────────────────────────────────────────
export function Chatbot() {
  const [messages,   setMessages]   = useState([INITIAL_MESSAGE]);
  const [input,      setInput]      = useState('');
  const [isLoading,  setIsLoading]  = useState(false);
  const [error,      setError]      = useState(null);
  const scrollRef                   = useRef(null);
  const inputRef                    = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput('');

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    const history = [...messages, userMsg];
    setMessages(history);
    setIsLoading(true);

    try {
      const reply = await callGroq(history);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      }]);
    } catch (err) {
      setError(err.message || 'Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setError(null);
    setInput('');
  };

  const hasUserMessages = messages.some(m => m.role === 'user');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-bold uppercase tracking-widest mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              AI-Powered · Bangladesh Law · Confidential
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 tracking-tight">
              Digital Legal Advocate
            </h1>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
              Ask Shotto-AI about your legal rights in Bangladesh. Get specific law citations
              and concrete action steps — instantly.
            </p>
          </motion.div>

          {/* Chat window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div
              className="border border-border rounded-2xl overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl flex flex-col"
              style={{ height: '680px' }}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-card/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center">
                    <Scale style={{ width: 18, height: 18 }} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none mb-0.5">Shotto-AI</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      <span className="text-[10px] text-emerald-500 font-medium uppercase tracking-widest">
                        Live · Llama 3.3 · Advocate Mode
                      </span>
                    </div>
                  </div>
                </div>

                {hasUserMessages && (
                  <button
                    onClick={clearChat}
                    className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg hover:bg-muted/50"
                  >
                    <RotateCcw className="w-3 h-3" />
                    New session
                  </button>
                )}
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-5 scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border mt-0.5 ${
                        msg.role === 'assistant'
                          ? 'bg-primary/15 border-primary/25 text-primary'
                          : 'bg-muted border-border text-muted-foreground'
                      }`}>
                        {msg.role === 'assistant'
                          ? <Scale style={{ width: 14, height: 14 }} />
                          : <User style={{ width: 14, height: 14 }} />}
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[82%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`px-4 py-3 rounded-2xl ${
                          msg.role === 'assistant'
                            ? 'bg-muted/50 border border-border/60 text-foreground rounded-tl-sm'
                            : 'bg-primary text-primary-foreground rounded-tr-sm shadow-sm'
                        }`}>
                          {msg.role === 'assistant'
                            ? <MessageText content={msg.content} />
                            : <p className="text-sm leading-relaxed">{msg.content}</p>}
                        </div>
                        <span className="text-[10px] text-muted-foreground px-1 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border bg-primary/15 border-primary/25 text-primary mt-0.5">
                      <Scale style={{ width: 14, height: 14 }} />
                    </div>
                    <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-muted/50 border border-border/60 flex items-center gap-1">
                      {[0, 0.18, 0.36].map((delay, i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary/50 inline-block animate-bounce"
                          style={{ animationDelay: `${delay}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Error banner */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3"
                  >
                    <span className="shrink-0 mt-px">⚠</span>
                    <span className="flex-1">{error}</span>
                    <button
                      onClick={() => setError(null)}
                      className="shrink-0 underline underline-offset-2 hover:no-underline"
                    >
                      Dismiss
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Suggestion chips — only before first user message */}
              {!hasUserMessages && (
                <div className="px-5 pb-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => sendMessage(s.prompt)}
                      className="flex items-center justify-between gap-1 text-left text-[11px] text-muted-foreground hover:text-foreground bg-muted/30 hover:bg-muted/60 border border-border/50 hover:border-border px-3 py-2 rounded-xl transition-all group"
                    >
                      <span className="font-medium leading-snug">{s.label}</span>
                      <ChevronRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}

              {/* Input bar */}
              <div className="px-5 pb-5 pt-3 border-t border-border bg-card/30">
                <div className="flex items-center gap-2.5">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Describe your situation or ask a legal question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    disabled={isLoading}
                    className="h-11 bg-muted/40 border-border/60 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/30 rounded-xl text-sm"
                  />
                  <Button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 shrink-0 disabled:opacity-40"
                  >
                    {isLoading
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Send className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-center text-[10px] text-muted-foreground/50 mt-2.5">
                  For emergencies contact Ain o Salish Kendra (ASK) · 09678-774411
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}