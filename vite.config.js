import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

const SITE_URL = 'https://simo-macca.github.io'

/** Public pages for search engines. `lastmod` is the build date, so it never goes stale. */
const SITEMAP_PATHS = ['/', '/docs/thesis.pdf']

/** Emits `sitemap.xml` into the production build (served at the site root). */
function sitemap() {
  return {
    name: 'portfolio-sitemap',
    apply: 'build',
    generateBundle() {
      const lastmod = new Date().toISOString().slice(0, 10)
      const urls = SITEMAP_PATHS.map(
        (path) =>
          `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`,
      ).join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // User site (<user>.github.io) is served from the domain root.
  base: '/',
  plugins: [
    vue(),
    tailwindcss(),
    sitemap(),
    // Vue DevTools only during `vite` dev server, never in production builds.
    command === 'serve' && vueDevTools(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
