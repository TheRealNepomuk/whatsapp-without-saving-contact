import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/whatsapp-without-saving-contact/', // 👈 this line is crucial
  server: {
    host: true,
    port: 5173,
  },
})
