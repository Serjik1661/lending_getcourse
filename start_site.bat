@echo off
setlocal
cd /d "%~dp0"

set "PORT=8787"
set "URL=http://127.0.0.1:%PORT%/"

echo Starting local site...
echo URL: %URL%
echo.

powershell -NoProfile -ExecutionPolicy Bypass -Command "try { $r = Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec 1; if ($r.StatusCode -ge 200) { exit 0 }; exit 1 } catch { exit 1 }" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo Site is already running. Opening browser...
  start "" "%URL%"
  goto :already
)

start "" "%URL%"

where py >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  py -3 -m http.server %PORT% --bind 127.0.0.1
  goto :end
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  python -m http.server %PORT% --bind 127.0.0.1
  goto :end
)

echo Python was not found. Opening index.html directly.
start "" "%~dp0index.html"

:end
echo.
echo Server stopped. Press any key to close.
pause >nul
exit /b 0

:already
echo.
echo Press any key to close.
pause >nul
