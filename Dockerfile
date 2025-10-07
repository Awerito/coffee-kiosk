FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock* .yarnrc.yml* ./
COPY .yarn ./.yarn
RUN corepack enable
RUN yarn install --immutable

FROM deps AS build
WORKDIR /app
COPY . .
RUN yarn build

FROM nginx:stable-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://127.0.0.1:80/ >/dev/null 2>&1 || exit 1
