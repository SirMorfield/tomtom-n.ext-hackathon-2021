FROM node:16.10
EXPOSE 3000
WORKDIR /serv
COPY . .
RUN npm install
RUN npm install -g react-scripts

ENTRYPOINT ["npm", "run", "start"]
