import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

function syncDocsPlugin() {
  return {
    name: 'sync-docs-plugin',
    buildStart() {
      const srcDoc = fileURLToPath(new URL('./docs/thesis.pdf', import.meta.url))
      const destDoc = fileURLToPath(new URL('./public/docs/thesis.pdf', import.meta.url))
      if (fs.existsSync(srcDoc)) {
        fs.mkdirSync(path.dirname(destDoc), { recursive: true })
        fs.copyFileSync(srcDoc, destDoc)
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/docs/thesis.pdf') {
          const docPath = fileURLToPath(new URL('./docs/thesis.pdf', import.meta.url))
          if (fs.existsSync(docPath)) {
            res.setHeader('Content-Type', 'application/pdf')
            fs.createReadStream(docPath).pipe(res)
            return
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue(), vueDevTools(), tailwindcss(), syncDocsPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
