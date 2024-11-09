FROM node:lts-alpine AS builder

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN yarn install

COPY . .

RUN yarn remove bcrypt
RUN yarn add bcrypt --unsafe-perm --allow-root 

RUN yarn run db:generate

RUN yarn run build

FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache bash

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.credentials ./.credentials
COPY --from=builder /app/tsconfig.* ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/views ./views

EXPOSE 43702

VOLUME ["/app/node_modules", "/app/public"]

CMD ["yarn", "run", "start:prod"]