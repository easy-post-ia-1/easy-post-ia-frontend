# Use official Node.js runtime as base image
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 80

# Start the Vite development server
ENTRYPOINT ["npm", "run", "dev"]

