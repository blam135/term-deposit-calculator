FROM node:22-alpine

ENV PORT=3000

COPY . .

RUN printenv > .env

RUN npm ci
CMD [ "npm", "start" ]
EXPOSE 3000