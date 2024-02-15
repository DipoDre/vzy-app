# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY . ./

# Bundle app source
# COPY ./src ./src
# COPY tsconfig.json .
# COPY .eslintrc.json .
# COPY .prettierrc.js .
# COPY .env.sample .env

# Install app dependencies
RUN npm install

# Creates a "dist" folder with the production build
# RUN npm run build

# Start the server using the production build
CMD [ "npm", "run","build" ]
