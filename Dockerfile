FROM node:18-alpine as client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:18-alpine
RUN apk add --no-cache mysql-client
WORKDIR /app/server

# 複製 server 端依賴
COPY server/package*.json ./
RUN npm ci

# 複製 server 端源碼
COPY server/ ./

# 複製 client build 結果到正確路徑
COPY --from=client-builder /app/server/public ./public

# 清理不必要資料夾
RUN rm -rf ./public/assets/events ./public/assets/gallery ./public/assets/members ./public/assets/user

# 複製文件資料夾
COPY docs/ ../docs/

RUN mkdir -p ./public/assets/uploads ./logs && \
    chown -R node:node ./public/assets ./logs

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "const http = require('http'); const checkPort = (port) => new Promise((resolve) => { http.get(`http://localhost:${port}/api/health`, (res) => resolve(res.statusCode === 200)).on('error', () => resolve(false)); }); Promise.race([checkPort(3000), checkPort(5000)]).then(ok => process.exit(ok ? 0 : 1));" || exit 1

CMD ["npm", "start"]
