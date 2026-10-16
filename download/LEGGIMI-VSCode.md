# Gold Events by Salvo — Codice Sorgente per Visual Studio Code

## 📦 Cosa hai ricevuto

Due file:

1. **Gold-Events-Sorgente-VSCode.zip** — Cartella completa pronta per VS Code (8.8 MB, 239 file)
2. **Codice-Sorgente-Gold-Events.txt** — Tutto il codice in un unico file di testo (980 KB, 146 file)

## 🚀 Come usare in Visual Studio Code

### Step 1 — Estrai lo ZIP

Estrai `Gold-Events-Sorgente-VSCode.zip` in una cartella sul tuo computer:
- Windows: Click destro → "Estrai tutto"
- Mac: Doppio click sul file ZIP

Otterrai una cartella con questa struttura:

```
gold-events/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Layout principale
│   │   ├── page.tsx           ← Home page (bivio)
│   │   ├── globals.css        ← Stili globali
│   │   ├── gold-events/       ← Pagina Gold Events
│   │   ├── gold-eventi/       ← Landing SEO "Gold Eventi"
│   │   ├── salvo-piemonte/    ← Landing SEO "Salvo Piemonte"
│   │   ├── eventi/            ← Landing SEO "Eventi"
│   │   ├── sicily-experience/ ← Pagina Sicily Experience
│   │   ├── dove-opero/        ← Pagina "Dove Opero" (37 comuni)
│   │   ├── prezzi/            ← Listino prezzi
│   │   ├── recensioni/       ← Recensioni clienti
│   │   ├── faq/               ← Domande frequenti
│   │   ├── admin/             ← Pannello admin
│   │   ├── api/               ← API backend
│   │   └── sitemap.ts         ← Sitemap.xml dinamica
│   ├── components/
│   │   └── site/              ← Tutti i componenti UI
│   ├── lib/
│   │   ├── i18n/              ← Sistema traduzioni (15 lingue)
│   │   ├── seo/               ← Structured data JSON-LD
│   │   ├── kv-store.ts        ← Database (Blob + memory fallback)
│   │   ├── memory-store.ts    ← Database in-memory
│   │   ├── admin-auth.ts      ← Autenticazione admin
│   │   └── site-content.ts    ← Contenuti del sito
│   └── middleware.ts           ← Sicurezza + rate limiting
├── public/                     ← Immagini, service worker, robots.txt
├── prisma/                     ← Schema database
├── package.json               ← Dipendenze
├── next.config.ts             ← Configurazione Next.js
├── tailwind.config.ts         ← Configurazione Tailwind CSS
├── tsconfig.json              ← Configurazione TypeScript
└── vercel.json                ← Configurazione Vercel
```

### Step 2 — Apri in VS Code

1. Apri Visual Studio Code
2. `File` → `Open Folder` → seleziona la cartella `gold-events`
3. VS Code carica tutto il progetto

### Step 3 — Installa le dipendenze

Per far girare il progetto in locale serve:
- **Node.js 20+** (https://nodejs.org)
- **Bun** (https://bun.sh) — installazione: `curl -fsSL https://bun.sh/install | bash`

Nel terminale di VS Code (`Terminal` → `New Terminal`):

```bash
bun install
```

Questo scarica tutte le librerie necessarie (circa 1.4 GB in `node_modules/`).

### Step 4 — Avvia il server di sviluppo

```bash
bun run dev
```

Il sito è disponibile su: **http://localhost:3000**

### Step 5 — Modifica il sito

Tutti i contenuti sono in:
- `src/lib/site-content.ts` — Servizi, prezzi, contatti, extras
- `src/app/layout.tsx` — Title, description, keywords SEO
- `src/lib/seo/structured-data.ts` — JSON-LD per Google
- `src/components/site/` — Tutti i componenti UI

### Step 6 — Deploy su Vercel

```bash
vercel --prod
```

## 📋 Cosa contiene il codice

### 11 pagine pubbliche
- Home con intro cinematica + bivio
- Gold Events (9 servizi, 3 bundle, 6 extra)
- Gold Eventi (landing SEO)
- Salvo Piemonte (landing SEO personale)
- Eventi (landing SEO generica)
- Sicily Experience
- Dove Opero (37 comuni)
- Prezzi trasparenti
- Recensioni clienti (10 testimonianze)
- FAQ (22 domande)
- Pannello admin (login + dashboard)

### Mini gestionale admin
- Tab Dashboard con stats
- Tab Contatti (richieste form)
- Tab Chat (conversazioni bidirezionali)
- Tab Partner
- Tab Media & File
- Tab AI Assistant
- Tab Audit Log

### Chat bidirezionale Salvo↔cliente
- Cliente chat dal widget in basso a destra
- Salvo risponde dal pannello admin
- Auto-refresh ogni 8 secondi
- Status: active → waiting → active → closed

### Sistema traduzioni
- 15 lingue (IT, EN, FR, DE, ES, PT, NL, RU, AR, ZH, JA, KO, PL, TR, HI)
- Switch istantaneo (no reload)
- Persistito in localStorage

### SEO ottimizzato
- 152 keyword (incluse 35 long-tail)
- 7 JSON-LD schemas (LocalBusiness, Person, Review, etc.)
- Sitemap.xml con 10 URL
- robots.txt con IndexNow
- Open Graph + Twitter Card

### Sicurezza
- Content-Security-Policy strict
- HSTS 2 anni + preload
- X-Frame-Options DENY
- Rate limiting API
- Honeypot anti-bot
- Admin auth con password + 2FA opzionale

### Performance
- TTFB 77-250ms (cache CDN HIT)
- Service Worker v2 con 3 strategie cache
- Image optimization AVIF/WebP
- Preconnect a Google Fonts
- 100/100 stress test (100 richieste simultanee)

## 🔐 Credenziali admin

- URL: `/admin`
- Password: `salvo2026`
- Cambiabile in `.env` → `ADMIN_PASSWORD=nuova-password`

## 📞 Contatti integrati

- WhatsApp: +39 344 232 2176
- Email: goldeventssicilyexperience@outlook.com
- Instagram: @goldeventsicily_experience

## ⚠️ Note importanti

1. **Il codice è protetto da copyright** © 2026 Gold Events by Salvo
2. **Non ridistribuire** il codice a terzi senza autorizzazione
3. **Per modificare** il sito, serve conoscenza di React + TypeScript
4. **Per deployare**, serve account Vercel (gratis)
5. **Il database in-memory** si resetta quando il server va in sleep (5-15 min). Per persistenza, configura Vercel Blob Store.

## 🆘 Supporto

Per problemi tecnici, contatta lo sviluppatore.
