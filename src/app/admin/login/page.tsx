"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Errore di login");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Errore di connessione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F0F] px-4">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A1A1A1] transition-colors hover:text-[#D4AF37]"
        >
          <ArrowLeft className="size-3.5" /> Torna al sito
        </Link>

        <div className="rounded-3xl border border-[#D4AF37]/20 bg-[#1C1C1C]/60 p-6 shadow-2xl sm:p-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-12 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#D4AF37]">
              <Lock className="size-6" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                Area Riservata
              </h1>
              <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
                Gold Events Admin
              </p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#A1A1A1]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                className="mt-2 h-11 w-full rounded-lg border border-white/12 bg-[#0F0F0F]/60 px-3 text-white placeholder:text-[#6B6B6B] focus:border-[#D4AF37] focus:outline-none focus:ring-0"
                placeholder="••••••••••••"
              />
            </div>

            {error && (
              <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#0F0F0F] transition-colors hover:bg-[#E5C75A] disabled:opacity-40"
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Verifica…
                </>
              ) : (
                "Accedi"
              )}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#6B6B6B]">
          Accesso riservato al proprietario · Tentativi limitati
        </p>
      </div>
    </div>
  );
}
