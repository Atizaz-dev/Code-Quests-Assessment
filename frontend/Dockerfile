# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies first (caching layer)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

CMD ["npm", "run", "dev"]