@echo off
title Realm Studio Alpha

cd /d "%~dp0studio"

echo.
echo ==========================================
echo        Realm Studio Alpha
echo ==========================================
echo.
echo Avvio server...
echo.

start "" http://localhost:8000

python -m http.server 8000

pause