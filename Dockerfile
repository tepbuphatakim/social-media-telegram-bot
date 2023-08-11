FROM node:18-slim

WORKDIR /app

COPY package*.json /app

RUN npm ci

COPY . /app

CMD [ "node", "index.js" ]
