import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 載入環境變數
  const env = loadEnv(mode, '.', '')
  
  // 根據環境決定 proxy target
  const proxyTarget = env.VITE_PROXY_TARGET || 'http://localhost:5000'
  
  return {
    plugins: [react()],
    build: {
      outDir: '../server/public',
      emptyOutDir: true
    },
    server: {
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // 禁用快取
              proxyReq.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
              proxyReq.setHeader('Pragma', 'no-cache');
              proxyReq.setHeader('Expires', '0');
            });
          }
        }
      }
    }
  }
})
