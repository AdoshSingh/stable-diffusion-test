FROM node:20-alpine

RUN apk --no-cache add curl

WORKDIR /front/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]