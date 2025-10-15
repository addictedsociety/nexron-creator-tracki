import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [vue(),
  tailwindcss(),
  vueDevTools(),
  VitePWA({
  registerType: 'autoUpdate',
  devOptions: { enabled: true, type: 'module' }, // Manifest & SW im Dev
  manifest: {
    name: 'Nexron Tracki',
    short_name: 'Tracki',
    start_url: '/',         // wichtig für Installierbarkeit
    scope: '/',             // wichtig
    display: 'standalone',  // wichtig
    theme_color: '#0f172a',
    background_color: '#0f172a',
    icons: [
      { src: '/tracki-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/tracki-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/tracki-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  },
})
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
