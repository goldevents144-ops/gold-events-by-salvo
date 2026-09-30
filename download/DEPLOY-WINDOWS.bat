@echo off
echo ============================================
echo   GOLD EVENTS - DEPLOY AUTOMATICO WINDOWS
echo ============================================
echo.

echo [1/4] Installazione Vercel CLI...
call npm install -g vercel
echo.

echo [2/4] Login a Vercel...
call vercel login
echo.

echo [3/4] Deploy del sito...
call vercel --prod --yes
echo.

echo [4/4] Configurazione variabili ambiente...
echo Vai su https://vercel.com/dashboard
echo Seleziona il progetto gold-events
echo Settings -^> Environment Variables
echo Aggiungi: DATABASE_URL = file:./db/custom.db
echo Aggiungi: ADMIN_PASSWORD = salvo2026
echo.

echo ============================================
echo   DEPLOY COMPLETATO!
echo   Il tuo sito e' online!
echo ============================================
echo.
echo Pannello admin: https://gold-events.vercel.app/admin/login
echo Password: salvo2026
echo.
pause
