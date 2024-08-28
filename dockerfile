FROM node:20-alpine

WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

CMD [ "npm", "start" ]

