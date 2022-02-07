FROM node:16.13.0-alpine
WORKDIR /app
COPY . .

RUN npm install
RUN npm install -g serve
RUN npm run build

RUN ls -lah /apk_vol/

EXPOSE 3000
CMD ["serve", "-s", "build"]