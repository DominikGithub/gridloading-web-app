FROM node:26.13.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000
CMD [ "node", "server.js" ]