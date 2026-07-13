@echo off
title Realm Studio Alpha

echo ====================================
echo        Realm Studio Alpha
echo ====================================
echo.

cd /d "%~dp0studio"

python -m http.server 8000

pause