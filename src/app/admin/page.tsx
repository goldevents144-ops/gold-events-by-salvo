"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MediaTab } from "./media-tab";
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
  Shield,
  ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "contatti", label: "Contatti", icon: Users },
  { id: "partner", label: "Partner", icon: Building2 },
  { id: "media", label: "Media & File", icon: ImageIcon },
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
              href="/admin/security"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-[#D4AF37]/40 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
            >
              <Shield className="size-3.5" /> Sicurezza
            </Link>
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
        {tab === "media" && <MediaTab />}
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
    <div className="flex flex-col gap-6">
      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-5 sm:p-6"
          >
            {c.value > 0 && (
              <span className="absolute right-3 top-3 inline-flex size-2.5 animate-pulse rounded-full bg-[#D4AF37]" />
            )}
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

      {/* Notifiche recenti */}
      <NotificationsCard />

      {/* Welcome + Guide */}
      <GuideCard />
    </div>
  );
}

function NotificationsCard() {
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadNotifications = React.useCallback(() => {
    fetch("/api/admin/audit")
      .then((r) => r.json())
      .then((d) => {
        const notifs = (d.logs || [])
          .filter((l: any) =>
            l.action === "notification_new_request" ||
            l.action === "notification_new_partner"
          )
          .slice(0, 5);
        setNotifications(notifs);
      })
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    loadNotifications();
    // Auto-refresh ogni 30 secondi per nuove notifiche
    const interval = setInterval(loadNotifications, 30_000);
    return () => clearInterval(interval);
  }, [loadNotifications]);

  return (
    <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#1C1C1C]/60 p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#D4AF37]/60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-[#D4AF37]" />
          </span>
          <h3 className="font-serif text-base font-semibold text-white sm:text-lg">
            Notifiche recenti
          </h3>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
          Auto-refresh 30s
        </span>
      </div>

      {loading ? (
        <p className="py-4 text-center text-sm text-[#A1A1A1]">Caricamento…</p>
      ) : notifications.length === 0 ? (
        <div className="py-6 text-center">
          <p className="text-sm text-[#A1A1A1]">Nessuna nuova richiesta.</p>
          <p className="mt-1 text-[11px] text-[#6B6B6B]">
            Quando un cliente compila il form, apparirà qui automaticamente.
          </p>
        </div>
      ) : (
        <ul className="space-y-2.5">
          {notifications.map((n) => {
            const meta = JSON.parse(n.meta || "{}");
            const isPartner = n.action === "notification_new_partner";
            return (
              <li
                key={n.id}
                className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#0F0F0F]/60 p-3"
              >
                <span
                  className={`mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-lg ${
                    isPartner
                      ? "border border-blue-500/30 bg-blue-500/10 text-blue-400"
                      : "border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#D4AF37]"
                  }`}
                >
                  {isPartner ? "🤝" : "📋"}
                </span>
                <div className="flex-1 text-sm">
                  <p className="font-medium text-white">
                    {isPartner
                      ? meta.businessName || "Nuovo partner"
                      : meta.fullName || "Nuova richiesta"}
                  </p>
                  <p className="text-xs text-[#A1A1A1]">
                    {isPartner
                      ? `${meta.activityType} · ${meta.location}`
                      : `${meta.eventType} · ${meta.eventDate} · ${meta.guests} ospiti · ${meta.location}`}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[#6B6B6B]">
                    {new Date(n.createdAt).toLocaleString("it-IT")}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function GuideCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F]">
      <div className="border-b border-white/8 px-6 py-4">
        <h2 className="font-serif text-xl font-semibold text-white sm:text-2xl">
          Benvenuto, Salvo 👑
        </h2>
        <p className="mt-1 text-sm text-[#A1A1A1]">
          Questo è il tuo pannello di controllo privato. Da qui gestisci tutto il sito pubblico.
        </p>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-2">
        {/* Section 1 — Navigazione */}
        <div className="rounded-xl border border-white/8 bg-[#0F0F0F]/60 p-5">
          <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
            <LayoutDashboard className="size-4" />
          </div>
          <h3 className="font-serif text-base font-semibold text-white">Le 5 sezioni</h3>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#A1A1A1] sm:text-sm">
            <li>
              <span className="font-semibold text-[#D4AF37]">Dashboard</span> — questa pagina, riepilogo generale.
            </li>
            <li>
              <span className="font-semibold text-[#D4AF37]">Contatti</span> — tutte le richieste di preventivo dei clienti. Cambia stato (new → read → contacted → archived).
            </li>
            <li>
              <span className="font-semibold text-[#D4AF37]">Partner</span> — candidature B2B (cantine, agriturismi, beach club). Il tuo profilo è già approvato.
            </li>
            <li>
              <span className="font-semibold text-[#D4AF37]">AI Assistant</span> — chiedi all'AI di modificare il sito pubblico (prezzi, testi, immagini) e lei esegue direttamente.
            </li>
            <li>
              <span className="font-semibold text-[#D4AF37]">Audit Log</span> — storico di tutte le azioni fatte qui (per sicurezza).
            </li>
          </ul>
        </div>

        {/* Section 2 — AI Assistant */}
        <div className="rounded-xl border border-white/8 bg-[#0F0F0F]/60 p-5">
          <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Bot className="size-4" />
          </div>
          <h3 className="font-serif text-base font-semibold text-white">Come usare l'AI Assistant</h3>
          <ol className="mt-3 space-y-2 text-xs leading-relaxed text-[#A1A1A1] sm:text-sm">
            <li>
              <span className="font-semibold text-white">1.</span> Clicca sul tab "AI Assistant" in alto.
            </li>
            <li>
              <span className="font-semibold text-white">2.</span> Scrivi in italiano cosa vuoi cambiare, es: <em className="text-[#D4AF37]">"Cambia il prezzo di Luxury Wedding a 700€"</em>.
            </li>
            <li>
              <span className="font-semibold text-white">3.</span> L'AI analizza la richiesta, propone la modifica e la <span className="font-semibold text-white">applica direttamente al sito pubblico</span>.
            </li>
            <li>
              <span className="font-semibold text-white">4.</span> Vedi il risultato immediatamente nel sito pubblico dopo refresh.
            </li>
          </ol>
          <p className="mt-3 text-[11px] text-[#6B6B6B]">
            Esempi: "Aggiungi un servizio per addii al nubilato", "Cambia la descrizione dell'Air Mirror", "Cambia il telefono nel footer".
          </p>
        </div>

        {/* Section 3 — Gestione richieste */}
        <div className="rounded-xl border border-white/8 bg-[#0F0F0F]/60 p-5 sm:col-span-2">
          <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
            <Users className="size-4" />
          </div>
          <h3 className="font-serif text-base font-semibold text-white">Come gestire le richieste dei clienti</h3>
          <div className="mt-3 grid gap-3 text-xs leading-relaxed text-[#A1A1A1] sm:grid-cols-2 sm:text-sm">
            <p>
              <span className="font-semibold text-white">Quando arriva una richiesta:</span> appare nella tab "Contatti" con stato <span className="text-[#D4AF37]">new</span>.
              Clicca sulla riga per espandere e vedere tutti i dettagli (tipo evento, data, ospiti, servizi richiesti, note).
            </p>
            <p>
              <span className="font-semibold text-white">Dopo averla letta:</span> cambia stato in <span className="text-[#D4AF37]">read</span>.
              Quando contatti il cliente: <span className="text-[#D4AF37]">contacted</span>.
              Quando chiusa: <span className="text-[#D4AF37]">archived</span>.
            </p>
          </div>
        </div>

        {/* Section 4 — Quick tips */}
        <div className="rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-5 sm:col-span-2">
          <h3 className="font-serif text-base font-semibold text-[#D4AF37]">⚡ Suggerimenti rapidi</h3>
          <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-white/85 sm:grid-cols-2 sm:text-sm">
            <li>✓ Usa il pulsante "VEDI SITO" in alto per aprire il sito pubblico in una nuova scheda</li>
            <li>✓ Dopo ogni modifica, ricarica il sito pubblico per vedere le modifiche</li>
            <li>✓ Per sicurezza, premi "ESCI" quando hai finito</li>
            <li>✓ Tutte le tue azioni vengono registrate nell'Audit Log</li>
          </ul>
        </div>
      </div>
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

// Media & File Tab — upload and manage images/files
