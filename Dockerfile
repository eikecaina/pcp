FROM node:16-buster

EXPOSE 3000

WORKDIR /opt/nextjs

COPY . .

RUN  npm install

ENV NODE_ENV "production"

RUN npm run build

CMD npm start
