"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, User, Headphones, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "visitor" | "admin" | "system";
  text: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  status: string;
  unreadByVisitor: number;
  messages: ChatMessage[];
  visitorName?: string | null;
}

interface HumanChatWidgetProps {
  /** Called when user wants to switch back to AI bot */
  onBackToBot?: () => void;
}

/**
 * Human Chat Widget — chat bidirezionale con Salvo
 *
 * - Cliente (visitatore) manda messaggi in tempo reale
 * - Salvo risponde dal mini gestionale admin
 * - Polling ogni 8 secondi per nuovi messaggi
 * - Cookie persistente per ritrovare la conversazione
 */
export function HumanChatWidget({ onBackToBot }: HumanChatWidgetProps) {
  const [conversation, setConversation] = React.useState<Conversation | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const [dbUnavailable, setDbUnavailable] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const pollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Carica conversazione esistente all'avvio
  const loadConversation = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat/conversations", { cache: "no-store" });
      const data = await res.json();
      if (data.dbUnavailable) {
        setDbUnavailable(true);
        setLoading(false);
        return;
      }
      if (data.conversation) {
        setConversation(data.conversation);
        setMessages(data.conversation.messages ?? []);
      }
    } catch {
      // Silenzioso — fallback
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadConversation();
  }, [loadConversation]);

  // Polling per nuovi messaggi (solo se conversation esiste)
  React.useEffect(() => {
    if (!conversation) return;
    const poll = async () => {
      try {
        const res = await fetch("/api/chat/conversations", { cache: "no-store" });
        const data = await res.json();
        if (data.conversation) {
          setConversation(data.conversation);
          setMessages(data.conversation.messages ?? []);
        }
      } catch {}
    };
    pollIntervalRef.current = setInterval(poll, 8000); // 8 secondi
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [conversation?.id]);

  // Scroll to bottom su nuovo messaggio
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startConversation = async (meta?: {
    name?: string;
    email?: string;
    phone?: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName: meta?.name,
          visitorEmail: meta?.email,
          visitorPhone: meta?.phone,
        }),
      });
      const data = await res.json();
      if (data.conversation) {
        setConversation(data.conversation);
        setMessages(data.conversation.messages ?? []);
      }
    } catch {
      toast.error("Errore avvio chat. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || !conversation || sending) return;

    setInput("");
    setSending(true);
    try {
      const res = await fetch(
        `/api/chat/conversations/${conversation.id}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        },
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || "Errore invio messaggio");
        return;
      }
      const data = await res.json();
      if (data.message) {
        setMessages((m) => [...m, data.message]);
      }
      // Aggiorna conversazione (potrebbe essere cambiato lo status)
      loadConversation();
    } catch {
      toast.error("Errore connessione. Riprova.");
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="size-6 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (dbUnavailable) {
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
              <Headphones className="size-4 text-[#D4AF37]" />
            </span>
            <div>
              <p className="font-serif text-sm font-semibold text-white">Salvo Piemonte</p>
              <p className="text-[10px] text-[#A1A1A1]">Chat diretta</p>
            </div>
          </div>
          {onBackToBot && (
            <button
              type="button"
              onClick={onBackToBot}
              className="inline-flex size-7 items-center justify-center rounded-full text-[#A1A1A1] transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Torna all'assistente AI"
            >
              <ArrowLeft className="size-4" />
            </button>
          )}
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
          <div className="inline-flex size-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
            <MessageCircle className="size-7 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="font-serif text-base font-semibold text-white">
              Chat in allestimento
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A1A1A1]">
              La chat diretta con Salvo è in fase di configurazione.
              Nel frattempo, contattalo direttamente:
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full max-w-xs">
            <a
              href="https://wa.me/393442322176"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A]"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <a
              href="mailto:goldeventssicilyexperience@outlook.com"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/60 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
            >
              Email
            </a>
            <a
              href="tel:+393442322176"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/12 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#A1A1A1] transition-colors hover:border-[#D4AF37]/50 hover:text-white"
            >
              +39 344 232 2176
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!conversation) {
    return (
      <StartChatCard onStart={startConversation} onBackToBot={onBackToBot} />
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex size-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
            <Headphones className="size-4 text-[#D4AF37]" />
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#1C1C1C] bg-green-500" />
          </span>
          <div className="flex flex-col leading-tight">
            <p className="font-serif text-sm font-semibold text-white">
              Salvo Piemonte
            </p>
            <p className="flex items-center gap-1 text-[10px] text-[#A1A1A1]">
              <span className="size-1.5 rounded-full bg-green-500" />
              Online · risponde entro 24h
            </p>
          </div>
        </div>
        {onBackToBot && (
          <button
            type="button"
            onClick={onBackToBot}
            className="inline-flex size-7 items-center justify-center rounded-full text-[#A1A1A1] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Torna all'assistente AI"
            title="Torna all'assistente AI"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-2 overflow-y-auto px-4 py-3"
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.length === 0 && (
          <p className="py-4 text-center text-xs text-[#A1A1A1]">
            Inizia la conversazione scrivendo qui sotto 👇
          </p>
        )}
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-1 rounded-2xl border border-white/8 bg-[#0F0F0F] px-3.5 py-2.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-[#D4AF37]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info banner */}
      {conversation.status === "waiting" && (
        <div className="border-t border-[#D4AF37]/20 bg-[#D4AF37]/5 px-4 py-2">
          <p className="text-[10px] text-[#D4AF37]">
            ⏳ Messaggio inviato. Salvo risponderà appena possibile.
          </p>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/8 p-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Scrivi un messaggio…"
            maxLength={2000}
            disabled={sending || conversation.status === "closed"}
            className="h-10 flex-1 rounded-full border border-white/12 bg-[#0F0F0F] px-4 text-sm text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none disabled:opacity-60"
          />
          <button
            type="button"
            onClick={sendMessage}
            disabled={!input.trim() || sending || conversation.status === "closed"}
            className="inline-flex size-10 items-center justify-center rounded-full bg-[#D4AF37] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A] disabled:opacity-40"
            aria-label="Invia messaggio"
          >
            {sending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-[#6B6B6B]">
          {conversation.status === "closed"
            ? "Conversazione chiusa"
            : "Premi Invio per spedire · Auto-refresh ogni 8s"}
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  if (message.role === "system") {
    return (
      <div className="flex justify-center py-1">
        <span className="rounded-full border border-white/8 bg-[#1C1C1C]/80 px-3 py-1 text-[10px] italic text-[#A1A1A1]">
          {message.text}
        </span>
      </div>
    );
  }
  const isVisitor = message.role === "visitor";
  return (
    <div className={`flex ${isVisitor ? "justify-end" : "justify-start"}`}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isVisitor
            ? "rounded-br-md bg-[#D4AF37] text-[#0F0F0F]"
            : "rounded-bl-md border border-white/8 bg-[#0F0F0F] text-white/90",
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <p
          className={cn(
            "mt-1 text-[9px] uppercase tracking-wide",
            isVisitor ? "text-[#0F0F0F]/60" : "text-[#6B6B6B]",
          )}
        >
          {new Date(message.createdAt).toLocaleTimeString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

function StartChatCard({
  onStart,
  onBackToBot,
}: {
  onStart: (meta?: { name?: string; email?: string; phone?: string }) => void;
  onBackToBot?: () => void;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [starting, setStarting] = React.useState(false);

  const handleStart = async () => {
    setStarting(true);
    await onStart({
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
    });
    setStarting(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
            <Headphones className="size-4 text-[#D4AF37]" />
          </span>
          <div>
            <p className="font-serif text-sm font-semibold text-white">
              Parla con Salvo
            </p>
            <p className="text-[10px] text-[#A1A1A1]">Chat diretta</p>
          </div>
        </div>
        {onBackToBot && (
          <button
            type="button"
            onClick={onBackToBot}
            className="inline-flex size-7 items-center justify-center rounded-full text-[#A1A1A1] transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Torna all'assistente AI"
          >
            <ArrowLeft className="size-4" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mx-auto max-w-sm space-y-4">
          <div className="text-center">
            <div className="mx-auto mb-3 inline-flex size-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10">
              <User className="size-7 text-[#D4AF37]" />
            </div>
            <h3 className="font-serif text-base font-semibold text-white">
              Ciao, sono Salvo
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1A1]">
              Sono disponibile per rispondere a tutte le tue domande su matrimoni,
              eventi, prezzi e disponibilità. Rispondo entro 24 ore.
            </p>
          </div>

          <div className="space-y-3 rounded-xl border border-white/8 bg-[#0F0F0F]/60 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
              Come ti chiami? (opzionale)
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome e cognome"
              className="h-10 w-full rounded-lg border border-white/12 bg-[#1C1C1C] px-3 text-sm text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (opzionale)"
              className="h-10 w-full rounded-lg border border-white/12 bg-[#1C1C1C] px-3 text-sm text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none"
            />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefono (opzionale)"
              className="h-10 w-full rounded-lg border border-white/12 bg-[#1C1C1C] px-3 text-sm text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleStart}
              disabled={starting}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A] disabled:opacity-60"
            >
              {starting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Avvio…
                </>
              ) : (
                <>
                  <MessageCircle className="size-4" />
                  Inizia la chat
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-[#6B6B6B]">
              Puoi anche omettere i dati e iniziare subito
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
