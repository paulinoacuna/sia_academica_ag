FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 4001
CMD [ "npm", "start" ]

# docker build -t sia_academica_ag .
# docker run -p 4001:4001 sia_academica_ag
