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
