# This file is used to build Nasa Spacia Backend Container

# Use an official Node.js runtime as the base image
FROM node:21.6.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app
# currntly not in production mode
# TODO: change to production mode
RUN npm run dev

# Expose the port on which the app will run
EXPOSE 4173

# Define the command to run the app
CMD ["npm", "run", "dev"]