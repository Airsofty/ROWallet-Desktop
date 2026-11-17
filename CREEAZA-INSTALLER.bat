@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nu este instalat. Descarca versiunea LTS de pe https://nodejs.org
  pause
  exit /b 1
)
if not exist node_modules call npm install
call npm run dist
echo.
echo Installer-ul .exe se afla in folderul "dist".
pause
