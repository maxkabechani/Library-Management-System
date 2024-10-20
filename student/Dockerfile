FROM node:18.20.2-alpine

WORKDIR /app

COPY package.json .

RUN npm config set strict-ssl false

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "preview" ]