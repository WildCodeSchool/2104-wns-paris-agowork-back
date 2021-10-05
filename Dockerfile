FROM node:alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY jest.config.ts ./
COPY schema.gql ./
COPY tsconfig.json ./

RUN npm i
COPY src src
COPY built built

CMD npm start