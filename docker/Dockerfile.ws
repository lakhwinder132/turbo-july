FROM node:22

WORKDIR /usr/src/http

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package.json ./package.json
COPY packages ./packages

COPY turbo.json ./turbo.json

COPY apps/ws ./apps/ws

RUN npm install
RUN npm run prisma-generate
RUN npm run createddisp

EXPOSE 8080

CMD ["npm","run","start:ws"]