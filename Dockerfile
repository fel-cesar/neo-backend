# Use an official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (optimizes Docker caching)
COPY package*.json ./


# # Copy the rest of the project
COPY . .

RUN npm install ts-node-dev

# Install dependencies inside the container
RUN npm install

# run generate here?

# Expose the API port
EXPOSE 3000
