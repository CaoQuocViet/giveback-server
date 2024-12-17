# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Cài đặt dependencies
COPY package*.json ./
RUN npm install

# Cài đặt nodemon globally
RUN npm install -g nodemon

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Start command for development
CMD ["npm", "run", "dev"] 