import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages는 https://ire4564.github.io/influencer-rate-card/ 경로로 서비스되므로 base를 맞춰둡니다.
export default defineConfig({
  base: '/influencer-rate-card/',
  plugins: [react()],
})
