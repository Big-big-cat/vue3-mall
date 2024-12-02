import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// UI
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// 创建 Pinia 实例
const pinia = createPinia();

// 挂载 Pinia 和路由
app.use(pinia);

// 使用插件
pinia.use(piniaPluginPersistedstate);

// 使用路由
app.use(router)

app.mount('#app')
