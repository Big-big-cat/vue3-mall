// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 History 模式
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue')  // 动态导入 Home 组件
    },
    {
      path: '/productdetails/:id?',
      name: 'ProductDetails',
      component: () => import('../views/Productdetails.vue'),  // 动态导入 Productdetails 组件
      props: true // 允许将 `id` 参数作为 prop 传递给组件
    },
    {
        path: '/ProductListPage',
        name: 'ProductListPage',
        component: () => import('../views/ProductListPage.vue')  // 动态导入 ProductListPage 组件
      },
      {
        path: '/Cart',
        name: 'Cart',
        component: () => import('../views/Cart.vue')  // 动态导入 Cart 组件
      },
    // {
    //   path: '/:pathMatch(.*)*',  // 捕获所有其他路径（404页面）
    //   name: 'NotFound',
    //   component: () => import('../views/NotFound.vue')
    // }
  ],
  scrollBehavior () {
    // vue2.0  x  y  控制
    // vue3.0  left  top 控制
    return { left: 0, top: 0 }
  }
})

export default router
