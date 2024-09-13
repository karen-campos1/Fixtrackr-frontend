import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'FixTrackr',
        short_name: 'FixTrackr',
        description: 'Track and manage maintenance requests',
        theme_color: '#ffffff',
        background_color: '#F3F5F9',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|css|js)$/,  // Cache static assets
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // Cache for 30 days
              }
            }
          },
          {
            urlPattern: /^https:\/\/fixtrackr\.onrender\.com\//,  // Ensure API calls aren't cached
            handler: 'NetworkOnly',  // Always fetch fresh API data
          }
        ]
      }
    })
  ]
});
