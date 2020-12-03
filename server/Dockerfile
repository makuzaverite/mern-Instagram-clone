FROM node:14-slim

WORKDIR /usr/app/src

COPY ./package.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["server.js"]
