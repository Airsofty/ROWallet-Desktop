@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nu este instalat.
  echo Descarca versiunea LTS de pe https://nodejs.org si ruleaza din nou acest fisier.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Se instaleaza dependentele, o singura data. Dureaza cateva minute...
  call npm install
  if errorlevel 1 (
    echo Instalarea a esuat. Verifica conexiunea la internet.
    pause
    exit /b 1
  )
)
call npm start
