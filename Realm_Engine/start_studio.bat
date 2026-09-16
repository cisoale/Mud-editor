
@echo off
title Realm Studio Alpha

cd /d "%~dp0studio"
python -m http.server 8000


pause