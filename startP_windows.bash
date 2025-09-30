#!/bin/bash
powershell.exe -Command "Start-Process powershell -ArgumentList 'cd backend; npm run start:dev'"
powershell.exe -Command "Start-Process powershell -ArgumentList 'cd frontend; npm run dev'"
powershell.exe -Command "Start-Process powershell -ArgumentList 'docker compose -f docker/compose.db.yml up'"
