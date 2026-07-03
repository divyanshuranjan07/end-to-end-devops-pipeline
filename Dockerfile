
# Use the official lightweight Node.js image
FROM node:22-alpine

# Project metadata
LABEL maintainer="Divyanshu Ranjan"
LABEL project="End-to-End DevOps Pipeline"
LABEL version="1.0"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first for better Docker layer caching
COPY app/package*.json ./

# Install application dependencies
RUN npm install

# Copy the remaining application files
COPY app/ .

# Inform Docker that the application listens on port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
