# Multi-stage Dockerfile to build frontend and backend and run both via nginx + gunicorn

### Stage 1: build frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
COPY frontend/package-lock.json* ./
RUN npm ci --legacy-peer-deps || npm install
COPY frontend/ .
RUN npm run build

### Stage 2: python runtime + nginx
FROM python:3.11-slim
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install runtime deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    curl \
    nginx \
    supervisor \
    gettext-base \
 && rm -rf /var/lib/apt/lists/*

# Copy backend
COPY backend/ ./backend/
COPY backend/requirements.txt ./backend/requirements.txt
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy frontend build from builder
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist


# Nginx config (template) and Supervisor config
# nginx.conf will be generated at container start from the template so it can use the runtime $PORT
COPY docker/nginx.conf /etc/nginx/nginx.conf.template

# Supervisor config
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Entrypoint script to substitute runtime env vars into nginx config
COPY docker/entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

ENV PORT=8080

EXPOSE 8080

# Ensure backend references port 8000 for gunicorn
WORKDIR /app/backend

# Entrypoint: substitute env vars and start supervisor which runs nginx and gunicorn
ENTRYPOINT ["/app/entrypoint.sh"]
