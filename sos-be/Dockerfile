FROM node:20-alpine AS build

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY src ./src/
COPY assets ./assets/
COPY tsconfig.json ./
COPY .env ./
COPY prisma ./prisma/
COPY wait-for-it.sh ./wait-for-it.sh 

RUN chmod +x ./wait-for-it.sh

FROM postgres:latest AS postgres

ENV POSTGRES_DB=sos
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=galih123

USER postgres

RUN initdb /var/lib/postgresql/data

USER root

FROM node:20-alpine

RUN npm install -g pm2

WORKDIR /app
COPY --from=build /app ./ 

COPY --from=postgres /var/lib/postgresql/data /var/lib/postgresql/data

RUN chown -R node:node /app /var/lib/postgresql/data

USER node

CMD ["sh", "-c", "./wait-for-it.sh postgres:5432 -- npm run migrate && npm run seed && npm run build && pm2-runtime build/server.js"]
