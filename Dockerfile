FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma

RUN apk add --no-cache bash && yarn install --frozen-lockfile

COPY . .

RUN yarn remove bcrypt \
	&& yarn add bcrypt --unsafe-perm --allow-root \
	&& yarn run db:generate && yarn run build
