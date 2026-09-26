"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Lock,
  Smartphone,
  Key,
  ArrowLeft,
  Copy,
  Check,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export default function SecurityPage() {
  const router = useRouter();
  const [authed, setAuthed] = React.useState<boolean | null>(null);
  const [status, setStatus] = React.useState<{
    has2FA: boolean;
    twoFactorEnrolledAt: string | null;
    hasRecoveryCodes: boolean;
    passwordLastChanged: string | null;
  } | null>(null);

  React.useEffect(() => {
    fetch("/api/admin/logout", { method: "GET" })
      .then((r) => r.json())
      .then((d) => {
        setAuthed(!!d.authenticated);
        if (d.authenticated) {
          return fetch("/api/admin/security/status").then((r) => r.json());
        }
        return null;
      })
      .then((s) => s && setStatus(s))
      .catch(() => setAuthed(false));
  }, []);

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
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0F0F0F]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A1A1A1] transition-colors hover:text-[#D4AF37]"
          >
            <ArrowLeft className="size-3.5" /> Torna alla dashboard
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="size-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.24em] text-[#D4AF37]">Sicurezza</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-bold sm:text-3xl">Sicurezza Account</h1>
          <p className="mt-2 text-sm text-[#A1A1A1]">
            Gestisci 2FA, password e recupero account. Tutte le azioni sono tracciate nell'Audit Log.
          </p>
        </div>

        <div className="space-y-6">
          <ChangePasswordCard onStatus={status} />
          <TwoFactorCard status={status} onRefresh={() => window.location.reload()} />
          <EmergencyCard />
        </div>
      </main>
    </div>
  );
}

// === Change Password Card ===
function ChangePasswordCard({ onStatus }: { onStatus: any }) {
  const [current, setCurrent] = React.useState("");
  const [next, setNext] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (next !== confirm) {
      toast.error("Le password nuove non corrispondono");
      return;
    }
    if (next.length < 8) {
      toast.error("La nuova password deve avere almeno 8 caratteri");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/security/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Errore");
      } else {
        toast.success("Password cambiata con successo");
        setCurrent("");
        setNext("");
        setConfirm("");
      }
    } catch {
      toast.error("Errore di connessione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Key className="size-5 text-[#D4AF37]" />
        <h2 className="font-serif text-lg font-semibold">Cambia Password</h2>
      </div>
      {onStatus?.passwordLastChanged && (
        <p className="mb-4 text-xs text-[#A1A1A1]">
          Ultimo cambio: {new Date(onStatus.passwordLastChanged).toLocaleString("it-IT")}
        </p>
      )}
      <form onSubmit={submit} className="space-y-3">
        <Input
          label="Password corrente"
          type="password"
          value={current}
          onChange={setCurrent}
          required
        />
        <Input
          label="Nuova password (min 8 caratteri)"
          type="password"
          value={next}
          onChange={setNext}
          required
        />
        <Input
          label="Conferma nuova password"
          type="password"
          value={confirm}
          onChange={setConfirm}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A] disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}
          Cambia password
        </button>
      </form>
    </div>
  );
}

// === 2FA Card ===
function TwoFactorCard({
  status,
  onRefresh,
}: {
  status: any;
  onRefresh: () => void;
}) {
  const [step, setStep] = React.useState<"idle" | "setup" | "verify" | "enrolled">(
    status?.has2FA ? "enrolled" : "idle",
  );
  const [setupData, setSetupData] = React.useState<{
    secret: string;
    otpauthUrl: string;
    recoveryCodes: string[];
  } | null>(null);
  const [password, setPassword] = React.useState("");
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState<string | null>(null);

  const startSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/security/setup-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Errore");
      } else {
        setSetupData(data);
        setStep("verify");
        toast.success("2FA setup avviato. Scansiona il QR con l'app autenticatrice");
      }
    } catch {
      toast.error("Errore di connessione");
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/security/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Token non valido");
      } else {
        setStep("enrolled");
        toast.success("2FA attivato con successo!");
        setTimeout(onRefresh, 1500);
      }
    } catch {
      toast.error("Errore di connessione");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  if (step === "enrolled") {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
        <div className="mb-3 flex items-center gap-3">
          <Check className="size-5 text-green-400" />
          <h2 className="font-serif text-lg font-semibold">2FA Attivo</h2>
        </div>
        <p className="text-sm text-[#A1A1A1]">
          Il tuo account è protetto con autenticazione a due fattori. Ogni login richiede la password + il codice TOTP dalla tua app autenticatrice (Google Authenticator, Authy, 1Password).
        </p>
        {status?.twoFactorEnrolledAt && (
          <p className="mt-3 text-xs text-[#6B6B6B]">
            Attivato il: {new Date(status.twoFactorEnrolledAt).toLocaleString("it-IT")}
          </p>
        )}
      </div>
    );
  }

  if (step === "verify" && setupData) {
    return (
      <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#1C1C1C]/60 p-6">
        <div className="mb-4 flex items-center gap-3">
          <Smartphone className="size-5 text-[#D4AF37]" />
          <h2 className="font-serif text-lg font-semibold">Verifica 2FA</h2>
        </div>
        <ol className="space-y-2 text-sm text-[#A1A1A1]">
          <li>1. Apri Google Authenticator, Authy o 1Password</li>
          <li>2. Aggiungi un nuovo account scansioando questo QR code o inserendo il secret</li>
          <li>3. Inserisci qui sotto il codice a 6 cifre generato dall'app</li>
        </ol>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Secret (manuale)</p>
            <button
              type="button"
              onClick={() => copy(setupData.secret, "secret")}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/8 bg-[#0F0F0F] px-3 py-2 text-left font-mono text-xs text-white/90 hover:border-[#D4AF37]/40"
            >
              <span className="truncate">{setupData.secret}</span>
              {copied === "secret" ? <Check className="size-3 shrink-0 text-green-400" /> : <Copy className="size-3 shrink-0 text-[#A1A1A1]" />}
            </button>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">QR URL</p>
            <button
              type="button"
              onClick={() => copy(setupData.otpauthUrl, "url")}
              className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/8 bg-[#0F0F0F] px-3 py-2 text-left font-mono text-xs text-white/90 hover:border-[#D4AF37]/40"
            >
              <span className="truncate">{setupData.otpauthUrl.substring(0, 50)}…</span>
              {copied === "url" ? <Check className="size-3 shrink-0 text-green-400" /> : <Copy className="size-3 shrink-0 text-[#A1A1A1]" />}
            </button>
          </div>
        </div>

        <form onSubmit={verifyToken} className="mt-5 space-y-3">
          <Input
            label="Codice TOTP (6 cifre)"
            type="text"
            value={token}
            onChange={(v) => setToken(v.replace(/\D/g, "").slice(0, 6))}
            required
            placeholder="123456"
          />
          <button
            type="submit"
            disabled={loading || token.length !== 6}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] hover:bg-[#E5C75A] disabled:opacity-50"
          >
            {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}
            Verifica e attiva 2FA
          </button>
        </form>

        <div className="mt-6 border-t border-white/8 pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Codici di recupero (10)</p>
          <p className="mt-1 text-xs text-[#A1A1A1]">Salvali in un posto sicuro. Ognuno può essere usato una sola volta se perdi il telefono.</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-5">
            {setupData.recoveryCodes.map((c, i) => (
              <div
                key={i}
                className="rounded border border-white/8 bg-[#0F0F0F] px-2 py-1 text-center font-mono text-[10px] text-white/90"
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // idle state — show "Enable 2FA" button
  return (
    <div className="rounded-2xl border border-white/8 bg-[#1C1C1C]/60 p-6">
      <div className="mb-4 flex items-center gap-3">
        <Shield className="size-5 text-[#D4AF37]" />
        <h2 className="font-serif text-lg font-semibold">Autenticazione a Due Fattori (2FA)</h2>
      </div>
      <p className="mb-4 text-sm text-[#A1A1A1]">
        Anche se qualcuno ruba la tua password, non può entrare senza il codice TOTP generato dalla tua app autenticatrice. Fortemente raccomandato.
      </p>
      <form onSubmit={startSetup} className="space-y-3">
        <Input
          label="Conferma con la password corrente"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] hover:bg-[#E5C75A] disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-3.5 animate-spin" /> : null}
          Attiva 2FA
        </button>
      </form>
    </div>
  );
}

// === Emergency Reset Card ===
function EmergencyCard() {
  return (
    <div className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] p-6">
      <div className="mb-3 flex items-center gap-3">
        <AlertTriangle className="size-5 text-[#D4AF37]" />
        <h2 className="font-serif text-lg font-semibold">Password dimenticata?</h2>
      </div>
      <p className="text-sm text-[#A1A1A1]">
        Se hai dimenticato la password, chiedi all'assistente AI (chat) di generarne una temporanea. L'AI genererà una password forte di 16 caratteri e te la comunicherà. Dovrai cambiarla subito al primo login.
      </p>
      <div className="mt-4 rounded-lg border border-[#D4AF37]/20 bg-[#0F0F0F]/60 p-3 text-xs text-white/85">
        <p className="font-semibold text-[#D4AF37]">Come richiedere reset:</p>
        <ol className="mt-2 space-y-1 text-[#A1A1A1]">
          <li>1. Scrivi qui in chat: "Genera password temporanea admin"</li>
          <li>2. L'AI verificherà la tua identità e genererà una password temporanea</li>
          <li>3. Usala per accedere, poi cambiala subito da questa pagina</li>
        </ol>
      </div>
    </div>
  );
}

function Input({
  label,
  type,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 px-3 text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none"
      />
    </div>
  );
}
