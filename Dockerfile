FROM node:16.14.2

WORKDIR /app

RUN yarn config set network-timeout 600000 -g
RUN yarn global add expo-cli@5.3.0
RUN apt-get install -y git

# Install dependencies
COPY package.json ./
RUN yarn setup

# Copy over remaining files from local repo 
COPY . ./

EXPOSE 19006

CMD [ "yarn", "web" ]
