import { defineConfig } from 'vite'
import { sitemap } from 'vite-plugin-sitemap'
import { imageOptimizer } from 'vite-plugin-image-optimizer'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    vue(),

    imageOptimizer({
      jpg: { quality: 80 },
      png: { quality: 80 },
      webp: { quality: 80 },
    }),

    sitemap({
      hostname: 'https://lapetitetribu.co',
      dynamicRoutes: ['/[slug]'] // For dynamic routes
    })

  ]
})
