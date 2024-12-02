<template>
  <header>
    <img height="32px" src="/header_logo.png" alt="">
    <nav>
      <router-link to="/" active-class="active_page" class="hover_page"
        >首頁</router-link
      >
      <router-link
        to="/ProductListPage"
        active-class="active_page"
        class="hover_page"
        >商品列表</router-link
      >
    </nav>
    <div class="user" @click="jumpCart">
        <!-- <el-icon><User /></el-icon> -->
        <!-- <span class="user-name">{{userStore.userInfo?.name ? userStore.userInfo?.name : ''}}</span> -->
        <img height="32px" src="/logo_pay.png" alt="購物車" class="cart-img">
        <div class="cart">
            <el-badge :value="cartQuantity" :max="99" class="item" :offset="[10, 15]">
                <el-icon :size="24"><ShoppingCart /></el-icon>
            </el-badge>
            
        </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore, useCartStore } from '@/store';
import { useRoute, useRouter } from "vue-router";
const userStore = useUserStore();
const cartStore = useCartStore();

// 获取当前路由信息
const route = useRoute();
// 获取路由实例，进行编程式导航
const router = useRouter();

// 绑定计算属性
const cartTotal = computed(() => cartStore.cartTotal);
const cartQuantity = computed(() => cartStore.cartQuantity);

const jumpCart = () => {
    router.push({path: '/Cart'})
}

onMounted(() => {
    console.log()
})

// Your script here
</script>

<style scoped lang="scss" >
header {
  position: fixed; /* 固定位置 */
  top: 0; /* 距离页面顶部 */
  left: 0; /* 距离页面左侧 */
  width: 100%; /* 占满宽度 */
  height: 60px; /* Header 高度 */
  background-color: $page-background; /* 背景颜色 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  z-index: 1000; /* 设置堆叠顺序，确保在其他元素上方 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 100px;
  line-height: 60px;
  img {
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  nav {
    min-width: 200px;
    .active_page {
      padding: 2px 0;
      border-bottom: 2px solid $sub-color;
    }
  }

  nav a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
  }
  .user {
    color: #fff;
    display: flex;
    align-items: center;
    color: $text-color2;
    cursor: default;
    .user-name {
        font-size: 12px;
        margin: 0 8px;
    }
    .cart {
        cursor: pointer;
        padding-left: 12px;
    }
  }
}
:deep(.el-badge__content) {
  font-size: 10px;
    padding: 0 4px;
    height: 14px;
}

@media (max-width: 600px) {
    header {
      padding: 0 20px;
    }
    nav {
      width: auto;
    }
    .cart-img {
      display: none;
    }
  }
</style>