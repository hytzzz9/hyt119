@echo off
chcp 65001>nul
title HY Project Backend - Port 8119
cd /d "%~dp0backend"

echo ==========================================
echo   Name: Hou Yutong    ID: 24002120119
echo   Backend: Node.js + Express
echo   URL: http://localhost:8119
echo ==========================================
echo.

if not exist node_modules (
    echo [hyt] Dependencies not found, running npm install...
    call npm install
) else (
    echo [hyt] Dependencies ready
)

if not exist .env (
    echo [hyt] .env not found, copying from .env.example ...
    copy .env.example .env >nul
    echo [hyt] Please fill in database credentials in backend/.env
)

echo [hyt] Starting server ...
node server.js

echo.
echo [hyt] Server stopped. Press any key to close.
pause>nul
