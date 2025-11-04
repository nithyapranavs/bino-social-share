import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update base to your repository name for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/bino-social-share',
});


