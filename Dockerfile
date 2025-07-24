# Multi-stage build for the GDG Portal
FROM node:18-alpine as client-builder

# Build client
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build -- --outDir=dist

# Main application stage
FROM node:18-alpine

# Install dependencies for running the application
RUN apk add --no-cache mysql-client

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm ci && cd server && npm ci

# Copy server source code
COPY server/ ./server/

# Copy built client files
COPY --from=client-builder /app/client/dist ./server/public

# Copy scripts and other necessary files
COPY docs/ ./docs/

# Create directory for uploads and ensure permissions
RUN mkdir -p ./server/public/assets/uploads ./server/logs && \
    chown -R node:node ./server/public/assets ./server/logs

# Switch to non-root user
USER node

# Expose port
EXPOSE 3000

# Health check - check both port 3000 and 5000 in case of port conflict
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "const http = require('http'); const checkPort = (port) => new Promise((resolve) => { http.get(\`http://localhost:\${port}/api/health\`, (res) => resolve(res.statusCode === 200)).on('error', () => resolve(false)); }); Promise.race([checkPort(3000), checkPort(5000)]).then(ok => process.exit(ok ? 0 : 1));" || exit 1

# Start the application
CMD ["npm", "start"]
