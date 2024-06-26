import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest })
  ],

  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        // 配置所有页面路径，使得所有页面都会被打包
        panel: path.resolve(__dirname, 'src/panel/panel.html'),
        background: path.resolve(__dirname, 'src/background/background.js')
      }
    }
  }
})

