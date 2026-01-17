# Frontend Dockerfile for Expo (Web mode)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (Expo web default)
EXPOSE 8081

# Start Expo in web mode (bind to all interfaces for Docker)
CMD ["npx", "expo", "start", "--web", "--port", "8081", "--host", "0.0.0.0"]

