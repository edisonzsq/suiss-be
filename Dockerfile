FROM node:16-slim

WORKDIR /app

COPY package*.json .

COPY tsconfig.json .

RUN npm ci

RUN npx prisma generate

CMD ["npm", "run", "dev"]