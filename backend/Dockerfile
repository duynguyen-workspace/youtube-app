FROM --platform=linux/x86_64 node:20

WORKDIR /usr/share/youtube-be

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]
