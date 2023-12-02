import legacyPlugin from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import postcssPresetEnv from 'postcss-preset-env'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import vitePluginImp from 'vite-plugin-imp'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  return {
    base: '/',
    mode,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      react(),
      svgr({
        include: '**/*.svg?react',
        exclude: ''
      }),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => name !== 'theme' && `antd/es/${name}/style/index.js`
          }
        ]
      }),
      legacyPlugin({
        renderLegacyChunks: false,
        targets: ['>0.2%', 'not dead', 'not op_mini all', 'last 2 versions']
      }),
      viteCompression({
        threshold: 10240
      })
    ],
    css: {
      preprocessorOptions: {
        modules: {
          generateScopedName: '[name]_[hash:base64:8]',
          hashPrefix: 'prefix'
        },
        scss: {
          additionalData: '@import "./src/common/styles/global/variables.scss";'
        },
        less: { javascriptEnabled: true }
      },
      postcss: {
        plugins: [postcssPresetEnv()]
      },
      devSourcemap: isDev
    },
    esbuild: { drop: isDev ? [] : ['console', 'debugger'] },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://123.56.220.41:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
