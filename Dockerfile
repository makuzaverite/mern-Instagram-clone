FROM node:latest

RUN npm i -g nodemon

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package.json ./

RUN npm i

COPY --chown=node:node . .

CMD ["nodemon", "server.js"]
