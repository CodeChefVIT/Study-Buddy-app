FROM node:16-alpine

RUN mkdir -p /usr/src/
WORKDIR /usr/src/

COPY package.json /usr/src/
RUN yarn install --production=true
COPY . /usr/src/
CMD ["node", "src/index.js"]