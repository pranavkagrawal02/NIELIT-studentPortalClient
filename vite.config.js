import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 8080,
    strictPort: true
  },

  preview: {
    host: "0.0.0.0",
    port: 4173
  }
})