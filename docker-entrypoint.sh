#!/bin/sh
set -e
cd /app

export PORT=${PORT:-80}
echo "==> PORT is: $PORT"

envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
echo "==> Generated nginx config:"
cat /etc/nginx/conf.d/default.conf

echo "==> Testing nginx config:"
nginx -t

echo "==> Starting uvicorn:"
uvicorn backend.main:app --host 0.0.0.0 --port 8000 &

echo "==> Starting nginx:"
exec nginx -g 'daemon off;'