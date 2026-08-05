FROM oven/bun:1

WORKDIR /usr/src/http

COPY package.json ./package.json
COPY packages ./packages

COPY turbo.json ./turbo.json

COPY ./apps/web ./apps/web

RUN npm install
RUN npm run prisma-generate

EXPOSE 8080

CMD ["npm","run","start:ws"]