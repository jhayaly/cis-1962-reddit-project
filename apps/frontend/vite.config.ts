import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3003,
    proxy: {
      // this proxy routes all requests to `/api` to the backend (also /api)
      '/api': {
        target: 'http://localhost:8003',
        changeOrigin: true,
      },
    },
  },
});
