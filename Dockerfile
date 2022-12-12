FROM node:14.5.0-alpine

WORKDIR /app
COPY package*.json /app/
RUN npm install -g ionic
RUN npm install
RUN npm install -g react-script
COPY ./ /app/
RUN ionic build
CMD ["ionic", "serve"]