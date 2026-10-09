# Gold Events by Salvo — Backup & Ripristino

**Data backup:** 2026-10-09
**File:** `gold-events-backup-20261009.tar.gz` (8,7 MB)
**File totali:** 228

---

## COSA CONTIENE IL BACKUP

### Codice sorgente completo
- `src/` → tutto il codice Next.js 16 + TypeScript + React
  - `app/` → pagine (/, /gold-events, /sicily-experience, /admin, /api/*)
  - `components/` → componenti UI (site/ + ui/)
  - `lib/` → utility (auth, content, i18n, seo, utils)
  - `middleware.ts` → routing + i18n
- `public/` → immagini, manifest, service worker, icone
- `prisma/` → schema database
- `db/` → SQLite database file (già popolato se presente)
- `scripts/` → script di utilità
- `tests/` → test
- `examples/` → esempi

### Configurazione
- `package.json` + `bun.lock` → dipendenze
- `next.config.ts` → configurazione Next.js
- `tsconfig.json` → TypeScript
- `tailwind.config.ts` + `postcss.config.mjs` → styling
- `components.json` → shadcn/ui config
- `eslint.config.mjs` → linter
- `Caddyfile` → reverse proxy config (se serve in produzione)
- `DEPLOY.md` → istruzioni deploy

### Documentazione
- `worklog.md` → log completo di tutte le modifiche fatte (13 task completati)

---

## COSA NON CONTIENE (intenzionalmente)

- `node_modules/` (~1,4 GB) — si rigenera con `bun install`
- `.next/` — build artifacts, si rigenera con `bun run build`
- `.git/` — storia git (se presente, usare un repo GitHub separato)
- `dev.log`, `tool-results/`, `agent-ctx/` — file temporanei di sviluppo

---

## COME RIPRISTINARE IL PROGETTO (sempre, in 1 ora)

### Prerequisiti
- Node.js 20+ installato
- Bun installato (`curl -fsSL https://bun.sh/install | bash`)
- Account Vercel (gratis) — o qualsiasi hosting Node.js

### Step 1 — Estrai il backup
```bash
mkdir gold-events-restore
cd gold-events-restore
tar -xzf gold-events-backup-20261009.tar.gz
```

### Step 2 — Installa dipendenze
```bash
bun install
# oppure: npm install
```
(Tempo: ~3 minuti, scarica ~1,4 GB di node_modules)

### Step 3 — Avvia in locale
```bash
bun run dev
# Sito visibile su http://localhost:3000
```

### Step 4 — Deploy su Vercel (gratis)
1. Crea account su **vercel.com** (login con GitHub o email)
2. Installa Vercel CLI: `bun add -g vercel`
3. Nel folder del progetto: `vercel login` → `vercel`
4. Vercel carica tutto automaticamente
5. Ottieni URL tipo `goldeventsbysalvo.vercel.app`

### Step 5 — Collega dominio .it
1. Su Vercel dashboard → Settings → Domains
2. Aggiungi `goldeventsbysalvo.it`
3. Vercel ti dà i record DNS da inserire nel registrar
4. Inseriscili su Aruba/Cloudflare
5. SSL automatico, redirect www→nudo configurato

---

## BACKUP STRATEGY CONSIGLIATA (per Salvo)

### 1. Backup locale (questo file)
- Salva `gold-events-backup-20261009.tar.gz` su:
  - PC di Salvo
  - Pendrive USB
  - Google Drive / iCloud / Dropbox
- **Minimo 2 posti diversi**

### 2. Backup su GitHub (consigliato per sviluppatori)
- Crea repo privato `goldeventsbysalvo` su github.com
- Pusha il codice: `git init && git add . && git commit -m "initial" && git push`
- gratuito, versionato, accessibile da qualsiasi PC

### 3. Backup su Vercel (automatico)
- Vercel tiene storia di tutti i deploy
- Puoi fare rollback a qualsiasi versione precedente
- Gratuito, automatico ad ogni push

### 4. Backup database (se usato)
- Il file `db/gold-events.db` (SQLite) è già nel backup
- Se usi PostgreSQL/MySQL su Vercel/Neon, esportare periodicamente

---

## CONTATTI PER RIPRISTINO

Se il progetto va perso:
1. **Codice** → questo backup tar.gz o repo GitHub
2. **Dominio** → pannello Aruba/Cloudflare (Salvo ha le credenziali)
3. **Hosting** → account Vercel (login con email Salvo)
4. **Email aziendale** → pannello Outlook/Aruba
5. **WhatsApp numero** → sim fisica di Salvo, non collegata al dominio

Tutti questi 5 elementi sono **indipendenti**: se ne perdi uno, gli altri 4 continuano a funzionare.

---

## DIMENSIONE

- Backup tar.gz: **8,7 MB**
- Si invia via email (limite tipico 25 MB) ✓
- Si carica su Google Drive / Dropbox ✓
- Sta su qualsiasi pendrive USB ✓
