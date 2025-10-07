# Stage 1: Build
FROM node:24-bookworm-slim AS builder
WORKDIR /app

# Evita PnP y usa node_modules (más compatible con Vite/esbuild/swc)
ENV YARN_NODE_LINKER=node-modules
ENV CI=1

COPY package.json yarn.lock ./
RUN apt-get update \
 && apt-get install -y --no-install-recommends python3 make g++ \
 && rm -rf /var/lib/apt/lists/* \
 && corepack enable \
 && corepack prepare yarn@stable --activate \
 && yarn install --immutable

COPY . .
RUN yarn build

# Stage 2: Runtime mínimo
FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN printf 'server { listen 80; server_name _; root /usr/share/nginx/html; index index.html; location / { try_files $uri /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
