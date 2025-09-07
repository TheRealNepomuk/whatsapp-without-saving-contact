import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/whatsapp-without-saving-contact/', // 👈 add this line
  server: {
    host: true, // listen on all addresses, including LAN
    port: 5173,
  },
})
