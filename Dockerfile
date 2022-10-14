FROM node:16-alpine

WORKDIR /app

COPY package*.json .

COPY tsconfig.json .

RUN npm ci

CMD ["npm", "run", "dev"]