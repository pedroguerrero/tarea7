FROM node:20.18.0-alpine AS base
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:1.27.2-alpine
COPY --from=base /app/dist /usr/share/nginx/html
EXPOSE 80
