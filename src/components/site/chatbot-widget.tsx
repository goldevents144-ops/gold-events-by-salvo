"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Headphones, Bot } from "lucide-react";
import { toast } from "sonner";

import { useLang } from "@/lib/i18n/use-lang";
import { cn } from "@/lib/utils";
import { HumanChatWidget } from "./human-chat-widget";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGES: Record<string, string> = {
  it: "Ciao! Sono l'assistente virtuale di Gold Events by Salvo. Posso aiutarti a scegliere il servizio giusto, capire i prezzi, o pianificare il tuo evento. Come posso aiutarti?",
  en: "Hi! I'm the virtual assistant of Gold Events by Salvo. I can help you choose the right service, understand pricing, or plan your event. How can I help you?",
  fr: "Bonjour ! Je suis l'assistant virtuel de Gold Events by Salvo. Je peux vous aider à choisir le bon service, comprendre les prix, ou planifier votre événement. Comment puis-je vous aider ?",
  de: "Hallo! Ich bin der virtuelle Assistent von Gold Events by Salvo. Ich kann Ihnen helfen, die richtige Service zu wählen, Preise zu verstehen oder Ihr Event zu planen. Wie kann ich helfen?",
  es: "¡Hola! Soy el asistente virtual de Gold Events by Salvo. Puedo ayudarte a elegir el servicio adecuado, entender los precios o planificar tu evento. ¿Cómo puedo ayudarte?",
  pt: "Olá! Sou o assistente virtual da Gold Events by Salvo. Posso ajudá-lo a escolher o serviço certo, entender os preços ou planejar o seu evento. Como posso ajudar?",
};

const FALLBACK_WELCOME =
  "Hi! I'm the Gold Events by Salvo assistant. How can I help you with your event?";

export function ChatbotWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [mode, setMode] = React.useState<"ai" | "human">("ai");

  const { lang } = useLang();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Welcome message when first opened
  React.useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: WELCOME_MESSAGES[lang] ?? FALLBACK_WELCOME,
        },
      ]);
    }
  }, [open, lang, messages.length]);

  // Auto-scroll to bottom on new message
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Focus input when opened
  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setLoading(true);
    setHasInteracted(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId,
          lang,
        }),
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data.sessionId) setSessionId(data.sessionId);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "(nessuna risposta)" },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            lang === "it"
              ? "Mi dispiace, c'è stato un errore. Riprova tra un momento, oppure contatta Salvo direttamente su WhatsApp +39 344 232 2176."
              : "Sorry, there was an error. Please try again in a moment, or contact Salvo directly on WhatsApp +39 344 232 2176.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Chiudi chat" : "Apri chat assistente"}
        className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0F0F0F] shadow-[0_10px_30px_-5px_rgba(212,175,55,0.6)] transition-all hover:scale-105 hover:bg-[#E5C75A] sm:bottom-6 sm:right-6 sm:size-16"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
      >
        {/* Pulsing ring to draw attention */}
        {!hasInteracted && !open && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#D4AF37]/40"
            style={{ animationDuration: "2.5s" }}
          />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="size-6" strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="size-6" strokeWidth={2.2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-3 z-50 flex h-[520px] w-[calc(100vw-1.5rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-[#0F0F0F] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] sm:bottom-28 sm:right-6"
          >
            {mode === "human" ? (
              <HumanChatWidget onBackToBot={() => setMode("ai")} />
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/8 bg-gradient-to-r from-[#1C1C1C] to-[#0F0F0F] px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Bot className="size-4" strokeWidth={2} />
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-white">
                        Assistente Gold Events
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-[#D4AF37]/80">
                        <span className="size-1.5 animate-pulse rounded-full bg-green-400" />
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setMode("human")}
                      aria-label="Parla con Salvo"
                      title="Parla con Salvo (chat umana)"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                    >
                      <Headphones className="size-3" />
                      Salvo
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Chiudi"
                      className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="gold-scroll flex-1 space-y-3 overflow-y-auto p-4"
                >
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex",
                        m.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                          m.role === "user"
                            ? "rounded-br-md bg-[#D4AF37] text-[#0F0F0F]"
                            : "rounded-bl-md border border-white/8 bg-[#1C1C1C] text-white/90",
                        )}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/8 bg-[#1C1C1C] px-3.5 py-2.5 text-sm text-[#A1A1A1]">
                        <Loader2 className="size-3.5 animate-spin text-[#D4AF37]" />
                        <span>Sto pensando…</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="border-t border-white/8 bg-[#0F0F0F] p-3">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          send();
                        }
                      }}
                      placeholder="Scrivi un messaggio…"
                      maxLength={500}
                      className="h-10 flex-1 rounded-full border border-white/12 bg-[#1C1C1C] px-4 text-sm text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none focus:ring-0"
                    />
                    <button
                      type="button"
                      onClick={send}
                      disabled={!input.trim() || loading}
                      aria-label="Invia"
                      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A] disabled:opacity-40 disabled:hover:bg-[#D4AF37]"
                    >
                      <Send className="size-4" strokeWidth={2.2} />
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-[#6B6B6B]">
                    Assistente AI · Per parlare con Salvo clicca "Salvo"
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
