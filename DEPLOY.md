# 🚀 COME METTERE ONLINE IL SITO

## Step 1 — Crea account gratis (5 minuti)
1. Vai su https://vercel.com → "Sign Up" con GitHub/Google
2. Vai su https://github.com → "Sign Up" se non hai account

## Step 2 — Scarica il progetto
1. Scarica il file `gold-events-deploy.zip` dalla cartella download
2. Estrai lo zip sul tuo computer

## Step 3 — Carica su GitHub
1. Su GitHub: clicca "New repository" → nome: `gold-events`
2. Imposta "Private"
3. Clicca "uploading an existing file"
4. Trascina TUTTI i file estratti
5. Clicca "Commit changes"

## Step 4 — Deploy su Vercel
1. Vai su https://vercel.com/new
2. Clicca "Import Git Repository" → seleziona `gold-events`
3. Framework Preset: Next.js (auto-rilevato)
4. Environment Variables: aggiungi:
   - DATABASE_URL = file:./db/custom.db
   - ADMIN_PASSWORD = salvo2026
5. Clicca "Deploy"
6. Aspetta 2 minuti → sito online!

## Step 5 — Dominio personalizzato (opzionale)
1. Su Vercel: Settings → Domains
2. Aggiungi: goldeventsbysalvo.it
3. Configura DNS dal tuo registrar (es. Namecheap, GoDaddy)

## Credenziali Admin
URL: https://tuo-sito.vercel.app/admin/login
Password: salvo2026

## Cambia la password dopo il primo login
Vai su /admin → Sicurezza → Cambia Password
