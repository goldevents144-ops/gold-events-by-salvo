"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Building2,
  Bot,
  ScrollText,
  LogOut,
  Loader2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contatti", label: "Contatti", icon: Users },
  { id: "partner", label: "Partner", icon: Building2 },
  { id: "ai", label: "AI Assistant", icon: Bot },
  { id: "audit", label: "Audit Log", icon: ScrollText },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authed, setAuthed] = React.useState<boolean | null>(null);
  const [tab, setTab] = React.useState<TabId>("dashboard");

  React.useEffect(() => {
    fetch("/api/admin/logout", { method: "GET" })
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F0F0F]">
        <Loader2 className="size-6 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!authed) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0F0F0F]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
              <Sparkles className="size-4" />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-sm font-semibold">Gold Events</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#D4AF37]">
                Admin Panel
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-[#A1A1A1] transition-colors hover:text-white sm:inline-flex"
            >
              Vedi sito <ExternalLink className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-white/12 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#A1A1A1] transition-colors hover:border-red-500/50 hover:text-red-300"
            >
              <LogOut className="size-3.5" /> Esci
            </button>
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <div className="border-b border-white/8 bg-[#0F0F0F]">
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
                  tab === t.id
                    ? "border-[#D4AF37] text-[#D4AF37]"
                    : "border-transparent text-[#A1A1A1] hover:text-white"
                }`}
              >
                <Icon className="size-3.5" />
                {t.label}
              </button>
            );
          })}
        </nav>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {tab === "dashboard" && <DashboardTab />}
        {tab === "contatti" && <ContattiTab />}
        {tab === "partner" && <PartnerTab />}
        {tab === "ai" && <AiTab />}
        {tab === "audit" && <AuditTab />}
      </main>
    </div>
  );
}

function DashboardTab() {
  const [counts, setCounts] = React.useState({
    newSubs: 0,
    newPartners: 0,
    chatSessions: 0,
  });
  React.useEffect(() => {
    Promise.all([
      fetch("/api/admin/submissions?status=new").then((r) => r.json()),
      fetch("/api/admin/partners").then((r) => r.json()),
    ]).then(([subs, parts]) => {
      setCounts({
        newSubs: subs.submissions?.length ?? 0,
        newPartners: parts.partners?.filter((p: any) => p.status === "new").length ?? 0,
        chatSessions: 0,
      });
    });
  }, []);

  const cards = [
    { label: "Nuove richieste", value: counts.newSubs, hint: "Da leggere" },
    { label: "Nuovi partner", value: counts.newPartners, hint: "In attesa" },
    { label: "Sessioni chat", value: counts.chatSessions, hint: "Ultime 24h" },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-6"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
            {c.label}
          </p>
          <p className="mt-3 font-serif text-4xl font-bold text-white">
            {c.value}
          </p>
          <p className="mt-1 text-xs text-[#A1A1A1]">{c.hint}</p>
        </div>
      ))}
    </div>
  );
}

function ContattiTab() {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const load = () => {
    setLoading(true);
    fetch("/api/admin/submissions")
      .then((r) => r.json())
      .then((d) => setItems(d.submissions ?? []))
      .finally(() => setLoading(false));
  };
  React.useEffect(load, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  };

  if (loading) {
    return <Loader2 className="size-6 animate-spin text-[#D4AF37]" />;
  }
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-white/8 bg-[#1C1C1C]/40 p-8 text-center text-sm text-[#A1A1A1]">
        Nessuna richiesta ancora. Le nuove richieste del form appariranno qui.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {items.map((s) => (
        <details
          key={s.id}
          className="group rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-4 transition-colors hover:border-[#D4AF37]/30"
        >
          <summary className="cursor-pointer list-none">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{s.fullName}</p>
                <p className="text-xs text-[#A1A1A1]">
                  {s.eventType} · {new Date(s.createdAt).toLocaleString("it-IT")}
                </p>
              </div>
              <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                {s.status}
              </span>
            </div>
          </summary>
          <div className="mt-4 grid gap-3 border-t border-white/8 pt-4 text-sm sm:grid-cols-2">
            <Field label="Data evento" value={s.eventDate} />
            <Field label="Location" value={s.location} />
            <Field label="Ospiti" value={String(s.guests)} />
            <Field label="Servizi" value={s.services} />
            {s.notes && <Field label="Note" value={s.notes} />}
            <div className="sm:col-span-2 flex flex-wrap gap-2 pt-2">
              {["new", "read", "contacted", "archived"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => updateStatus(s.id, st)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    s.status === st
                      ? "bg-[#D4AF37] text-[#0F0F0F]"
                      : "border border-white/12 text-[#A1A1A1] hover:border-[#D4AF37]/50 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}

function PartnerTab() {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("/api/admin/partners")
      .then((r) => r.json())
      .then((d) => setItems(d.partners ?? []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader2 className="size-6 animate-spin text-[#D4AF37]" />;
  if (items.length === 0) {
    return (
      <p className="rounded-xl border border-white/8 bg-[#1C1C1C]/40 p-8 text-center text-sm text-[#A1A1A1]">
        Nessuna candidatura partner ancora.
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-3">
      {items.map((p) => (
        <div
          key={p.id}
          className="rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{p.businessName}</p>
              <p className="text-xs text-[#A1A1A1]">
                {p.activityType} · {p.location}
              </p>
            </div>
            <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
              {p.status}
            </span>
          </div>
          <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <Field label="Referente" value={`${p.referentName} · ${p.referentPhone}`} />
            <Field label="Email" value={p.referentEmail} />
            <Field label="Capacità" value={p.capacity ?? "—"} />
            <Field label="Allaccio elettrico" value={p.hasPower} />
            {p.b2bRates && <Field label="Tariffe B2B" value={p.b2bRates} />}
          </div>
        </div>
      ))}
    </div>
  );
}

function AiTab() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([]);
  const [loading, setLoading] = React.useState(false);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "(errore)" },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Errore di connessione." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#1C1C1C]/40 p-5">
        <h2 className="font-serif text-lg font-semibold text-white">
          Assistente AI
        </h2>
        <p className="mt-1 text-sm text-[#A1A1A1]">
          Chiedimi come modificare il sito, quali prezzi aggiornare, come gestire i contenuti.
          Ti darò suggerimenti — ogni modifica deve essere confermata manualmente.
        </p>
      </div>
      <div className="flex max-h-[400px] min-h-[200px] flex-col gap-2 overflow-y-auto rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-[#A1A1A1]">
            Es: "Come posso aggiornare il prezzo di Luxury Wedding?"
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[#D4AF37] text-[#0F0F0F]"
                  : "border border-white/8 bg-[#0F0F0F] text-white/90"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-white/8 bg-[#0F0F0F] px-3.5 py-2.5 text-sm text-[#A1A1A1]">
              <Loader2 className="size-3.5 animate-spin text-[#D4AF37]" />
              Sto pensando…
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Scrivi una domanda…"
          className="h-11 flex-1 rounded-full border border-white/12 bg-[#1C1C1C] px-4 text-sm text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none"
        />
        <button
          type="button"
          onClick={send}
          disabled={!input.trim() || loading}
          className="inline-flex h-11 items-center justify-center rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#0F0F0F] disabled:opacity-40"
        >
          Invia
        </button>
      </div>
    </div>
  );
}

function AuditTab() {
  const [logs, setLogs] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch("/api/admin/audit")
      .then((r) => r.json())
      .then((d) => setLogs(d.logs ?? []));
  }, []);
  return (
    <div className="rounded-2xl border border-white/8 bg-[#1C1C1C]/40 p-4">
      {logs.length === 0 ? (
        <p className="text-center text-sm text-[#A1A1A1]">Nessun log ancora.</p>
      ) : (
        <ul className="flex flex-col gap-2 text-xs">
          {logs.map((l) => (
            <li
              key={l.id}
              className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-2"
            >
              <span className="font-mono text-[#A1A1A1]">
                {new Date(l.createdAt).toLocaleString("it-IT")}
              </span>
              <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-[#D4AF37]">
                {l.action}
              </span>
              {l.target && (
                <span className="text-[#A1A1A1]">→ {l.target}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1A1]">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-white/90">{value}</dd>
    </div>
  );
}
