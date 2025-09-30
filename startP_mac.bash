#!/bin/bash
PROJ="$(pwd)"
osascript <<OSA
tell application "Terminal"
  do script "cd \"$PROJ/backend\" && npm run start:dev"
  do script "cd \"$PROJ/frontend\" && npm run dev"
  do script "cd \"$PROJ\" && docker compose -f docker/compose.db.yml up"
end tell
OSA
