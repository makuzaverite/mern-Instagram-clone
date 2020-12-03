FROM node:latest

RUN npm i -g nodemon

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

EXPOSE 3000

CMD ["nodemon", "server.js"]
