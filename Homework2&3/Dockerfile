FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json .
RUN npm install -force
COPY . .
EXPOSE 5001
RUN npm run build
ENTRYPOINT npm run serve





