# Stage 1: Build frontend
FROM node:20-alpine AS build-stage
WORKDIR ./app
COPY ./package*.json /app/
RUN npm install
COPY ./ /app/

RUN npm run build -- --output-path=./dist/out --output-hashing=all

# Stage 2: Serve it using Ngnix
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/out/browser /usr/share/nginx/html
COPY ./config/default.conf /etc/nginx/conf.d/default.conf
    