FROM node:latest

WORKDIR /usr/share/youtube-be

COPY package*.json .

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
