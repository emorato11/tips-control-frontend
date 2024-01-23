import { defineConfig, loadEnv, type UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

export default ({ mode }: UserConfig) => {
  const viteMode = mode || 'dev'
  console.log('MODE', viteMode)
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(viteMode, process.cwd()) }

  const plugins = [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]

  // https://vitejs.dev/config/
  return defineConfig({
    server: {
      port: 3000
    },
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/global.scss";`
        }
      }
    }
  })
}
