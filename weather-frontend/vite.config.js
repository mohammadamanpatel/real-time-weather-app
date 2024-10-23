import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000',   //replace your backend base-url
        changeOrigin: true,
        secure: false,
      },
    },
  },
});