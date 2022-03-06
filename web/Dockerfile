FROM node:16.13.0-alpine
WORKDIR /app
COPY . .

ARG REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_GOOGLE_CLIENT_ID $REACT_APP_GOOGLE_CLIENT_ID

RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "build"]