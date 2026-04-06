import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Spring 백엔드로 프록시 (개발 환경에서만 적용)
      // 프론트: /api/... → 백: http://localhost:8080/api/...
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite는 Spring에서 /api prefix를 그대로 받는 경우 생략
        // Spring에서 /api prefix 없이 받는다면 아래 주석 해제
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
