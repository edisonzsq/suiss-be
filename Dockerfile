FROM node:16-alpine

WORKDIR /app

COPY package*.json .

COPY tsconfig.json .

RUN npm ci

RUN npx prisma generate

CMD ["npm", "run", "dev"]