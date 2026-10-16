# Gold Events by Salvo — Sito Web Ufficiale

**URL del sito online:** https://goldeventsbysalvo.vercel.app

---

## 📋 Cos'è questo repository

Questo repository contiene **TUTTO il codice sorgente** del sito web Gold Events by Salvo, sviluppato per Salvo Piemonte.

Il sito è online e funzionante su: **https://goldeventsbysalvo.vercel.app**

---

## ⚠️ IMPORTANTE — NON MODIFICARE IL CODICE DA SOLO

Se apri i file e cambi anche solo una virgola, una parentesi o una lettera senza sapere esattamente cosa stai facendo, **IL SITO SI ROMPE COMPLETAMENTE**.

Per qualsiasi modifica (anche solo cambiare una parola o un prezzo), contatta un programmatore o lo sviluppatore originale.

---

## 📦 Come scaricare il codice

### Opzione 1 — Download ZIP (più semplice)

1. Clicca il pulsante verde **"<> Code"** in alto a destra
2. Seleziona **"Download ZIP"**
3. Estrai il file ZIP sul tuo computer
4. Hai tutte le cartelle pronte

### Opzione 2 — Clone con Git (per programmatori)

```bash
git clone https://github.com/goldevents144-ops/gold-events-by-salvo.git
```

### Opzione 3 — Apri direttamente in Visual Studio Code

Clicca questo link (richiede VS Code installato):

```
vscode://github.com/goldevents144-ops/gold-events-by-salvo
```

---

## 🛠️ Linguaggi utilizzati

Il sito è stato scritto con:

- **TypeScript** (`.tsx`, `.ts`) — linguaggio principale
- **Tailwind CSS** — stili
- **React / Next.js 16** — framework

Questi sono gli standard professionali moderni del web. NON è HTML semplice perché il sito ha funzionalità dinamiche (pannello admin, chat bidirezionale, form persistente, 15 lingue).

---

## 📂 Struttura del progetto

```
gold-events-by-salvo/
├── src/
│   ├── app/                    ← Tutte le pagine
│   │   ├── layout.tsx          ← SEO + title + keywords
│   │   ├── page.tsx            ← Home page
│   │   ├── gold-eventi/        ← Landing SEO "Gold Eventi"
│   │   ├── salvo-piemonte/     ← Landing SEO "Salvo Piemonte"
│   │   ├── eventi/             ← Landing SEO "Eventi"
│   │   ├── gold-events/        ← Pagina Gold Events
│   │   ├── sicily-experience/ ← Pagina Sicily Experience
│   │   ├── dove-opero/        ← 37 comuni serviti
│   │   ├── prezzi/            ← Listino prezzi
│   │   ├── recensioni/        ← Recensioni clienti
│   │   ├── faq/               ← Domande frequenti
│   │   ├── admin/             ← Pannello admin (login)
│   │   └── api/               ← Backend API
│   ├── components/site/       ← Componenti UI
│   ├── lib/                   ← Logica + traduzioni + SEO
│   │   ├── i18n/              ← 15 lingue
│   │   ├── seo/               ← Structured data JSON-LD
│   │   ├── kv-store.ts        ← Database
│   │   ├── memory-store.ts    ← Database in-memory
│   │   └── site-content.ts    ← Contenuti del sito
│   └── middleware.ts           ← Sicurezza + rate limiting
├── public/                     ← Immagini + service worker + robots
├── package.json               ← Dipendenze
├── next.config.ts             ← Configurazione Next.js
└── vercel.json                ← Configurazione Vercel
```

---

## 🚀 Come avviare il sito in locale

### Prerequisiti

- **Node.js 20+**: https://nodejs.org
- **Bun**: https://bun.sh (installazione: `curl -fsSL https://bun.sh/install | bash`)

### Avvio

```bash
# 1. Entra nella cartella del progetto
cd gold-events-by-salvo

# 2. Installa le dipendenze
bun install

# 3. Avvia il server di sviluppo
bun run dev
```

Il sito sarà disponibile su: **http://localhost:3000**

---

## 🔐 Credenziali Admin

- **URL**: https://goldeventsbysalvo.vercel.app/admin
- **Password**: `salvo2026`

---

## 📊 Cosa contiene il sito

### 11 pagine pubbliche

1. Home (intro cinematica + bivio)
2. Gold Events (9 servizi, 3 bundle, 6 extra)
3. Gold Eventi (landing SEO)
4. Salvo Piemonte (landing SEO personale)
5. Eventi (landing SEO generica)
6. Sicily Experience
7. Dove Opero (37 comuni)
8. Prezzi trasparenti
9. Recensioni clienti (10 testimonianze)
10. FAQ (22 domande)
11. Pannello admin (login + dashboard)

### Mini gestionale admin

- Tab Dashboard con stats
- Tab Contatti (richieste form con WhatsApp/Email)
- Tab Chat (conversazioni bidirezionali Salvo ↔ cliente)
- Tab Partner
- Tab Media & File
- Tab AI Assistant
- Tab Audit Log

### Chat bidirezionale

- Cliente chat dal widget in basso a destra
- Salvo risponde dal pannello admin
- Auto-refresh ogni 8 secondi
- Status: active → waiting → active → closed

### SEO

- 152 keyword (incluse 35 long-tail)
- 7 JSON-LD schemas (LocalBusiness, Person, Review, etc.)
- Sitemap.xml con 10 URL
- robots.txt con IndexNow (Bing, Yandex, Naver, Seznam)
- Open Graph + Twitter Card

### Sicurezza

- Content-Security-Policy strict
- HSTS 2 anni + preload
- X-Frame-Options DENY
- Rate limiting API
- Honeypot anti-bot
- Admin auth con password

### Performance

- TTFB 77-250ms (cache CDN HIT)
- Service Worker v2 con 3 strategie cache
- Image optimization AVIF/WebP
- 100/100 stress test (100 richieste simultanee)

---

## 📞 Contatti

- **WhatsApp**: +39 344 232 2176
- **Email**: goldeventssicilyexperience@outlook.com
- **Instagram**: @goldeventsicily_experience

---

## © COPYRIGHT — TUTTI I DIRITTI RISERVATI

© 2026 Gold Events by Salvo — Salvo Piemonte
Tutti i diritti riservati.

Il codice sorgente è protetto da copyright (Legge 633/1941).
Vietata la riproduzione, anche parziale, senza autorizzazione.

### COSA PUOI FARE

- ✅ Modificare il codice per il proprio sito
- ✅ Aggiornare contenuti, prezzi, immagini
- ✅ Fare deploy su Vercel (gratis)
- ✅ Passare il codice a un altro sviluppatore

### COSA NON PUOI FARE

- ❌ Vendere il codice a terzi
- ❌ Distribuire il codice pubblicamente
- ❌ Creare siti identici per altre attività
- ❌ Rimuovere i crediti originari

### SE QUALCUNO COPIA IL SITO

1. Raccogli prove (screenshot del sito copiato, URL, data)
2. Invia una diffida formale al contraffattore
3. Denuncia a Google: https://www.google.com/dmca.html
4. Contatta l'hosting provider del sito che ha copiato

### DATI IDENTIFICATIVI

- **URL ufficiale**: https://goldeventsbysalvo.vercel.app
- **Titolare**: Salvo Piemonte — Gold Events by Salvo
- **Sede**: Adrano (Catania), Sicilia
- **Telefono**: +39 344 232 2176
- **Email**: goldeventssicilyexperience@outlook.com
- **Data creazione**: Settembre 2026
- **Data consegna**: Ottobre 2026

---

È vietata la riproduzione, anche parziale, senza autorizzazione.
