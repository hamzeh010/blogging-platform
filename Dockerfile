# Base image for Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Run tests
RUN npm run test

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Set environment variable for production
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "run", "dev"]