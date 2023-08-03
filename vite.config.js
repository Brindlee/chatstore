import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
          compilerOptions: {
              isCustomElement: (tag) => tag.includes('the-widget')
          }
      }
    }),
  ],
  build: {
    /*lib: {
        entry: './src/AppEntry.ce.js',
        name: 'the-widget',
        // the proper extensions will be added
        fileName: 'the-widget',
        formats: [  'cjs']
    },*/
    /*rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ['vue'],
        output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
                vue: 'Vue',
            },
        },
    }*/
},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server : {
    proxy : {
      '/api': {
        target: 'http://localhost:3001',
        //target: 'https://long-night-e583.sampada.workers.dev',
        changeOrigin: true,
      },
    }
  }
})
