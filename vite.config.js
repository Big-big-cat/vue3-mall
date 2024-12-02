import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'; // 导入 path 模块

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),  // 启用 Vue 插件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ], 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 确保 @ 指向 src 目录
    },
  },
  server: {
    host: '192.168.0.105',  // 允许外部访问，绑定到的 IP 地址
    port: 3333, // 配置开发服务器的端口
    open: true,  // 自动打开浏览器
    proxy: {            // 如果有 API 请求，可以配置代理
      '/api': 'http://localhost:4000'
    }
  },
  build: {
    outDir: 'dist', // 配置构建输出目录
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/index.scss" as *;`  // 使用 @use 来导入样式
      }
    }
  }
})
