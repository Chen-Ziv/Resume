import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/Resume/', // 這裡改成你的 GitHub Repository 名稱
  plugins: [vue()],
})
