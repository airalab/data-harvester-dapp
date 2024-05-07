import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.zip'],
  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
        cleanupOutdatedCaches: false,
        maximumFileSizeToCacheInBytes: 9000000,
     },
     manifest: {
      name: "Data Harvester ",
      short_name: "DH",
      description: 'The robot navigates within the interior and performs various tasks',
      theme_color: '#ffffff',
      background_color: "#ffffff",
      display: "standalone",
      icons: [
        {
          purpose: 'maskable',
          src: '/app-icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          purpose: 'any',
          src: '/app-icon-512-rounded.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/app-icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: '/app-icon-256.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: '/app-icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
      ]
     }
    })
  ]
})
