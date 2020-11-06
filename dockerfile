FROM node:latest

RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install --dev --force
EXPOSE 8080