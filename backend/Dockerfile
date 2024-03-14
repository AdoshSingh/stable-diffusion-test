FROM node:20-alpine

RUN apk --no-cache add curl

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]