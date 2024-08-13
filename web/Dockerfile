# Apperently, this is the way to build a docker image for vite v5. It runs on port-3000
FROM node:18-alpine

WORKDIR /web

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]