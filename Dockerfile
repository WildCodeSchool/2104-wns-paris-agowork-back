FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY *.json ./

RUN npm i
COPY src src

CMD npm start