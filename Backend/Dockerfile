FROM node:16-alpine

WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
RUN ls -a
RUN yarn install
COPY src ./src
RUN yarn run build


FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
RUN yarn install --production=true

COPY --from=0 /usr/dist .
CMD ["node", "index.js"]
