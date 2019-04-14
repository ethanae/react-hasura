FROM node:alpine
WORKDIR /server
COPY ./package.json .
RUN npm i
COPY . .
CMD ["npm", "run", "start"]