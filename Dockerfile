FROM node:18-alpine
 
WORKDIR /api
 
COPY . .

RUN yarn install

RUN npx prisma generate

ENTRYPOINT ["sh", "docker-entrypoint.sh"]
