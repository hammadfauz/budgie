import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { getUrl } from './src/utils/getUrl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Budgie',
        short_name: 'Budgie',
        description: 'Personal budgeting for fun and profit',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|json|png|jpg|jpeg|svg)$/,
            handler: process.env.ENVIRONMENT === 'development'
              ? 'NetworkFirst'
              : 'CacheFirst',
          },
        ],
      },
    }),
  ],
  base: getUrl('/'),
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
