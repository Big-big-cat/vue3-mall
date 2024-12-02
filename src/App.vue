<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header />
  <router-view />
  <!-- 这里会渲染当前路由对应的组件 -->
  <Footer />
</template>

<style scoped>

</style>
