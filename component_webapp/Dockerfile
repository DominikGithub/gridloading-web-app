FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY dynamic-vuejs-compoents/package*.json ./
RUN npm i

COPY dynamic-vuejs-compoents/ .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]