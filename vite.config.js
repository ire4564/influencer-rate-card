import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages는 https://ire4564.github.io/kimwoodzip-intro/ 경로로 서비스되므로 base를 맞춰둡니다.
export default defineConfig({
  base: '/kimwoodzip-intro/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // 한국어(/)와 영어(/en/) 두 개의 페이지를 만듭니다.
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        en: resolve(import.meta.dirname, 'en/index.html'),
      },
    },
  },
})
