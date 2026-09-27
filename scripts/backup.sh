#!/bin/bash
#
# Backup completo del progetto Gold Events by Salvo
# Salva: codice + DB + immagini + configurazione
#
# Uso: bash /home/z/my-project/scripts/backup.sh
#
# Output: /home/z/my-project/download/backup-YYYY-MM-DD-HHMMSS.tar.gz
#

set -e

PROJECT_DIR="/home/z/my-project"
TIMESTAMP=$(date +%Y-%m-%d-%H%M%S)
BACKUP_NAME="gold-events-backup-${TIMESTAMP}"
BACKUP_DIR="/home/z/my-project/download"
BACKUP_FILE="${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "=== Backup Gold Events by Salvo ==="
echo "Timestamp: $TIMESTAMP"
echo ""

# Crea un archivio con tutto il necessario
cd "$PROJECT_DIR"

# Lista file da includere
INCLUDE_FILES=(
  "src/"
  "public/"
  "prisma/"
  "db/"
  "scripts/"
  "package.json"
  "bun.lock"
  "tsconfig.json"
  "next.config.ts"
  "tailwind.config.ts"
  "postcss.config.mjs"
  "components.json"
  "Caddyfile"
)

echo "Creazione archivio: $BACKUP_FILE"
# Ignora file mancanti con --ignore-failed-read
tar --ignore-failed-read -czf "$BACKUP_FILE" "${INCLUDE_FILES[@]}" 2>/dev/null || true

# Aggiungi .env se esiste
if [ -f "$PROJECT_DIR/.env" ]; then
  tar --ignore-failed-read -rf "${BACKUP_FILE%.gz}" "$PROJECT_DIR/.env" 2>/dev/null || true
fi

SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
echo ""
echo "✓ Backup completato!"
echo "  File: $BACKUP_FILE"
echo "  Dimensione: $SIZE"
echo ""

# Lista ultimi 5 backup
echo "=== Ultimi 5 backup ==="
ls -lh "$BACKUP_DIR"/gold-events-backup-*.tar.gz 2>/dev/null | tail -5 || echo "  (nessun backup precedente)"

echo ""
echo "=== Per ripristinare ==="
echo "  tar -xzf $BACKUP_FILE -C /path/to/restore/"
echo ""
echo "=== Backup DB separato (per modifiche admin) ==="
cp "$PROJECT_DIR/db/custom.db" "$BACKUP_DIR/db-backup-${TIMESTAMP}.db"
echo "  DB: $BACKUP_DIR/db-backup-${TIMESTAMP}.db"
