import { defineConfig } from 'vite' 
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

    vue(),
 

    // sitemap({
    //   hostname: 'https://lapetitetribu.co',
    //   dynamicRoutes: ['/[slug]'] // For dynamic routes
    // })

  ]
})
