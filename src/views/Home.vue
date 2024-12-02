<template>
  <el-carousel :interval="4000" type="card" height="420px">
    <el-carousel-item v-for="(item, index) in carouselList" :key="index">
      <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
      <img :src="item.imgurl" width="100%" height="100%" :alt="item.name" />
    </el-carousel-item>
  </el-carousel>
  <div class="container">
    <!-- 热门商品部分 -->
    <div class="hot-products">
      <h2>熱門商品</h2>
      <div class="hot_item">
        <div class="product" v-for="(item, index) in hotList" :key="index">
          <img :src="item.imgurl" alt="Product Image" class="product-image" />
          <div class="product-details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.dsc }}</p>
            <div class="product-actions">
              <router-link :to="'/productdetails/' + item.id">
                <button class="details-btn">看詳情</button>
              </router-link>
              <button class="add-to-cart-btn" @click="addToCart">
                立即購買
              </button>
            </div>
            <div class="product-price">
              <span>NT${{ item.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUserStore, useCartStore } from '@/store';
import q1 from "/img/q1.png";
import q2 from "/img/q2.png";
import q3 from "/img/q3.png";
import q4 from "/img/q4.png";
import s1 from "/img/s1.png";
import s2 from "/img/s2.png";
import s3 from "/img/s3.png";
import s4 from "/img/s4.png";

const pageUrl = import.meta.env.VITE_APP_ADDRESS

const userStore = useUserStore();
const cartStore = useCartStore();

const carouselList = ref([
  { name: "1", imgurl: q1 },
  { name: "2", imgurl: q2 },
  { name: "3", imgurl: q3 },
  { name: "4", imgurl: q4 },
]);
const hotList = ref([
  {
    id: 5,
    price: "149.00",
    name: "Smartisan T卹 任天堂發售“紅白機”",
    imgurl: s1,
    dsc: "100% 美國 SUPIMA 棉、舒適拉絨質地",
  },
  {
    id: 6,
    price: "199.00",
    name: "Smartisan 帆布鞋",
    imgurl: s2,
    dsc: "一雙踏實、舒適的帆布鞋",
  },
  {
    id: 9,
    price: "49.00",
    name: "堅果 3 TPU 軟膠保護套",
    imgurl: s3,
    dsc: "TPU 環保材質、完美貼合、周到防護",
  },
]);

const addToCart = () => {
    window.open(pageUrl, "_blank"); // 第三方页面 URL
}

function generateUsername () {
  const randomStr = Math.random().toString(36).substring(2, 10); // 生成 8 位随机字符串
  return `用户_${randomStr}`;
}

// 用户登录
function login() {
    userStore.setUserInfo({ id: 1, name: generateUsername()});
}

onMounted(() => {
    if(!userStore.userInfo) {
        login()
    }
    
})

// Your script here
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 420px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

:deep(.is-active) {
  .el-carousel__button {
    background: $sub-color;
  }
}

.container {
  margin: 40px 15px;
}

.hot-products {
  margin-bottom: 40px;
  width: 88%;
  margin: 0 auto;
  .hot_item {
    // display: flex;
    // justify-content: space-between;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 20px;
  }
}

h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.product-image {
  width: 150px;
  height: auto;
  margin-right: 20px;
}

.product-details h3 {
  font-size: 18px;
  font-weight: bold;
}

.product-details p {
  color: #666;
  margin: 10px 0;
}

.product-actions {
  // width: 200px;
}

.product-actions button {
  margin-right: 10px;
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
}

.product-price {
  margin: 15px 0;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: $text-color1;
  font-family: Arial;
  font-size: 20px;
  font-weight: 700;
}

.details-btn {
  background-color: $btn-color1;
  color: white;
  outline: none; /* 去掉默认的焦点边框 */
  border: none; /* 如果需要也可以移除边框 */
}

.add-to-cart-btn {
  background-color: $primary-color;
  color: white;
  outline: none; /* 去掉默认的焦点边框 */
  border: none; /* 如果需要也可以移除边框 */
}

.donation {
  display: flex;
  flex-direction: column;
}

.donation h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.donation-details {
  display: flex;
  align-items: center;
  background-color: #ffeb3b;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.donation-image {
  width: 60px;
  height: 60px;
  margin-right: 20px;
}

.donation-info p {
  font-size: 16px;
  color: #333;
}

.donation-info p:last-child {
  font-weight: bold;
}


@media (max-width: 600px) {
    .hot-products {
      width: 100%;
      .hot_item {
        grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      }
      .product-actions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        gap: 12px;
      }
    }
  }
</style>