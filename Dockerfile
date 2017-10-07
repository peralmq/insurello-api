FROM node:8.5

EXPOSE 3001

ENV PORT 3001

run npm install -g yarn
COPY package.json /
RUN yarn install

COPY src/ /src
COPY tsconfig.json /

CMD ["yarn", "start"]
