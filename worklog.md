---
Task ID: 14
Agent: main (Super Z)
Task: Backup completo progetto + istruzioni acquisto dominio .it per Salvo

Work Log:
- Verificato il flusso Form → Success State → dual CTA (WhatsApp + Email) su produzione: https://goldeventsbysalvo.vercel.app/gold-events
  - Compilazione completa form (Nome, Tipo evento, Data, Location, Ospiti, Servizi multi-select, Note)
  - Success state mostra 2 bottoni side-by-side:
    - "Invia via WhatsApp" → https://wa.me/393442322176?text=... ( apre app WhatsApp con messaggio pre-compilato)
    - "Invia via Email" → mailto:goldeventsbysalvo@outlook.com?subject=...&body=... (apre client email con subject+body pre-compilati)
  - Entrambi i link contengono il messaggio strutturato completo (Nome, Tipo, Data, Location, Ospiti, Servizi elencati, Note)
  - Screenshot salvato: /home/z/my-project/download/dual-cta-verify.png

- Chiarito all'utente:
  - vercel.app è solo URL di anteprima temporaneo, non il dominio ufficiale
  - Non si "deteriora" ma non è brandizzato, non è memorizzabile, penalizza SEO, sembra amatoriale
  - Per il .it: serve codice fiscale (privato) o P.IVA (azienda). Registrar non fa controlli su abbinamento dominio-attività, ma fiscale sì
  - Opzioni registrar: Aruba (più semplice, italiano, 6,99€ primo anno), Cloudflare (più economico, 8,03€/anno fisso, inglese)

- Creato backup completo del progetto:
  - File: /home/z/my-project/download/backup/gold-events-backup-20261009.tar.gz (8,7 MB)
  - Contiene: 228 file (src, public, prisma, db, scripts, tests, examples, tutte le config)
  - Esclusi: node_modules (rigenerabile con bun install), .next, .git, log temporanei

- Creato guida leggibile: /home/z/my-project/download/backup/LEGGIMI-Backup.md con:
  - Cosa contiene il backup
  - Come ripristinare in 1 ora (5 step: estrai → bun install → bun run dev → deploy Vercel → collega dominio)
  - Strategia backup consigliata per Salvo (4 livelli: locale, GitHub, Vercel auto, database)
  - Contatti per ripristino (codice, dominio, hosting, email, WhatsApp — 5 elementi indipendenti)

Stage Summary:
- Backup completo disponibile per il download (8,7 MB tar.gz + guida leggibile)
- Procedura acquisto dominio .it spiegata all'utente (Aruba consigliato per semplicità)
- 3 opzioni per collegare dominio a Vercel (acceso totale / solo DNS / cambio nameserver)
- Progetto è ora ripristinabile in 1 ora in caso di perdita totale
- File consegnati all'utente:
  - /home/z/my-project/download/backup/gold-events-backup-20261009.tar.gz
  - /home/z/my-project/download/backup/LEGGIMI-Backup.md
  - /home/z/my-project/download/dual-cta-verify.png

---
Task ID: 15
Agent: main (Super Z)
Task: Creare PDF "Guida al Dominio .it" per Salvo

Work Log:
- Caricato skill PDF (brief report.md + fonts.md)
- Generato palette cascade (mode minimal) per armonia colori
- Verificato fonts disponibili: Tinos era HTML corrotto, sostituito con LiberationSerif (metrica Times-equivalent)
- Creato script Python /home/z/my-project/scripts/guida-dominio.py (~910 righe):
  - CoverPage class: full-bleed black + satin gold (#D4AF37), luxury brand-aligned
  - Header/footer decorazioni con gold hairline
  - Callout boxes (info/warning/success/error) con bordo colorato laterale
  - Comparison table con header nero + accent oro + zebra stripes
  - NumberedStep component per procedura step-by-step
  - Stili: Tinos-Bold (titoli), Tinos (body), Carlito-Bold (callout)
- Risolto LayoutError: cover troppo grande per il frame, ridotta a 469x710 punti (dimensioni frame effettive)
- Contenuto del PDF (13 pagine):
  1. Cover page luxury
  2. Premessa + risposta breve (sì, va fatto)
  3. Sezione 1: Cos'è un dominio (analogia indirizzo di casa, parti del dominio, callout chiave)
  4. Sezione 2: Perché vercel.app non basta (5 problemi, tabella confronto, verdetto)
  5. Sezione 3: Procedura acquisto step-by-step (documenti, scelta registrar, 5 step su Aruba, callout "cosa NON comprare")
  6. Sezione 4: Costi totali nel tempo, rinnovo, cosa succede se non rinnovi, come evitare il rischio
  7. Sezione 5: Come si collega il dominio al sito (3 modalità A/B/C, record DNS, propagazione, file da aggiornare)
  8. Sezione 6: Decisione finale (tabella sintesi pro/contro, verdetto finale, checklist operativa 10 step)
- PDF generato: /home/z/my-project/download/guida-dominio-gold-events.pdf (144 KB, 13 pagine)
- Verifica pypdf: metadati completi (Title/Author/Subject/Creator), testo estratto correttamente, tutte le sezioni presenti

Stage Summary:
- PDF guida dominio completo e pronto per la consegna a Salvo
- 13 pagine, formato A4, brandizzato nero+oro Gold Events
- Spiega in linguaggio accessibile: cos'è un dominio, perché vercel.app non va, come comprare su Aruba, costi, collegamento a Vercel
- Include checklist operativa finale con 10 step dalla decisione al sito attivo
- File: /home/z/my-project/download/guida-dominio-gold-events.pdf
