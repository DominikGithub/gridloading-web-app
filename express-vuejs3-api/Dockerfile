FROM node:lts-alpine

WORKDIR /app

COPY server.js .

COPY package*.json ./
RUN npm i

EXPOSE 3000
CMD [ "node", "server.js" ]