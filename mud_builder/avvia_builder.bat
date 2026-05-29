@echo off

title Realm Builder

cd /d "C:\Users\Ale\Desktop\Realm of Lord\mud_builder"

echo.
echo =========================
echo AVVIO REALM BUILDER
echo =========================
echo.

start "" cmd /c "timeout /t 3 >nul && start http://127.0.0.1:5000"

python app.py

pause