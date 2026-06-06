#!/bin/sh
# Entrypoint: substitute runtime environment variables into nginx config template
set -e

: "${PORT:=8080}"

# Replace $PORT placeholder in nginx template
if [ -f /etc/nginx/nginx.conf.template ]; then
  envsubst '$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
fi

# Start supervisord (will launch nginx and gunicorn)
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
