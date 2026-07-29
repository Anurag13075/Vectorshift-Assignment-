#!/bin/sh
set -e
cd /app

export PORT=${PORT:-80}
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

uvicorn backend.main:app --host 0.0.0.0 --port 8000 &
exec nginx -g 'daemon off;'