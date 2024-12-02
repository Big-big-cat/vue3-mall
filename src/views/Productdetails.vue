<template>
  <div class="product-container">
    <div class="product-box">
      <div class="product-detail">
        <!-- 左侧图片部分 -->
        <div class="product-images">
          <div class="thumbnails">
            <img
              v-for="(thumbnail, index) in thumbnails"
              :key="index"
              :src="thumbnail"
              :class="{ active: index === activeIndex }"
              @click="setActiveImage(index)"
              alt="thumbnail"
            />
          </div>
          <div class="main-image">
            <img :src="thumbnails[activeIndex]" alt="main product" />
          </div>
        </div>

        <!-- 右侧商品信息部分 -->
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="description">{{ product.description }}</p>
          <p class="price">NT${{ product.price }}</p>

          <!-- 购买数量 -->
          <div class="quantity-control">
            <span class="params-name">数量</span>
            <div class="control-btn" @click="decreaseQuantity">-</div>
            <input type="text" v-model="quantity" readonly />
            <div class="control-btn" @click="increaseQuantity">+</div>
          </div>

          <!-- 操作按钮 -->
          <div class="actions">
            <div class="buy-now" @click="debouncedAddToCart ">加入購物車</div>
            <div class="buy-now" @click="buyNow">立即購買</div>
          </div>
        </div>
      </div>
    </div>
    <div class="item-info">
      <div class="product_title">產品信息</div>
      <div class="img-item">
        <img width="100%" :src="`/product/${productId}/d1111.jpg`" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore, useCartStore } from "@/store";
import { ElMessage } from "element-plus";
const userStore = useUserStore();
const cartStore = useCartStore();
defineProps({
  id: String,
});
// 获取当前路由信息
const route = useRoute();
// 获取路由实例，进行编程式导航
const router = useRouter();

const activeIndex = ref(0); // 当前显示的主图索引\
const quantity = ref(1);

const product = ref({});
const productId = route.params.id;
const products = ref();

const thumbnails = reactive([
  `/product/${productId}/d1.jpg`,
  `/product/${productId}/d11.jpg`,
  `/product/${productId}/d111.jpg`,
]);

onMounted(() => {
  products.value = [
    {
      name: "ACIL E1 頸掛式藍牙耳機",
      description: "無感佩戴，一切變得簡單",
      price: 199.0,
      image: "/img/s5.png",
      id: 1,
    },
    {
      name: "Smartisan 明信片",
      description: "優質卡紙，包裝精緻，色彩飽滿",
      price: 9.9,
      image: "/img/s6.png",
      id: 2,
    },
    {
      name: "Smartisan 牛津紡襯衫",
      description: "一件無玩無束的新訂製襯衫",
      price: 199.0,
      image: "/img/s7.png",
      id: 3,
    },
    {
      name: "Smartisan Polo衫 經典款",
      description: "一件錶裡如一的舒適 POLO 衫",
      price: 249.0,
      image: "/img/s9.png",
      id: 4,
    },
    {
      name: "Smartisan T卹 任天堂發售紅白機",
      description: "100% 美國 SUPIMA 棉，舒適的純質地",
      price: 99.0,
      image: "/img/s1.png",
      id: 5,
    },
    {
      name: "Smartisan 帆布鞋",
      description: "簡約大方，舒適的腳感",
      price: 199.0,
      image: "/img/s2.png",
      id: 6,
    },
    {
      name: "暢呼吸智慧空氣清淨機超級除甲醛版",
      description: "購新居送，贈價值 699 元延保服務",
      price: 1999.0,
      image: "/img/s8.png",
      id: 7,
    },
    {
      name: "堅果 3",
      description: "意外但不能實力派",
      price: 1599.0,
      image: "/img/s10.png",
      id: 8,
    },
    {
      name: "堅果 3 TPU 軟膠保護套",
      description: "TPU 環保材質、完美貼合、周到防護",
      price: 49.0,
      image: "/img/s10.png",
      id: 9,
    },
  ];
  product.value = products.value.find((p) => p.id === parseInt(productId));
});

const addToCart = () => {
  product.value.quantity = quantity.value;
  cartStore.addToCart(product.value);
  ElMessage({
    message: `${product.value.name} 加入購物車成功`,
    type: "success",
    plain: true,
    center: true,
  });
};

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const debouncedAddToCart = debounce(addToCart, 300);

const pageUrl = import.meta.env.VITE_APP_ADDRESS;
const buyNow = () => {
  window.open(pageUrl, "_blank"); // 第三方页面 URL
};
// 设置主图
const setActiveImage = (index) => {
  activeIndex.value = index;
};
// 减少数量
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};
// 增加数量
const increaseQuantity = () => {
  quantity.value++;
};

// Your script here
</script>

<style scoped lang="scss">
.product-container {
  background: #ededed;
  clear: both;
  width: 66%;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
  .product-box {
    display: flex;
    padding: 40px;
    margin: 20px 0;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  }
}
.product-detail {
  display: flex;
  // grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-images {
  display: flex;
  //   flex-direction: column;
  //   width: 40%;
}

.thumbnails {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.thumbnails img {
  width: 70px;
  height: 70px;
  padding: 10px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

.thumbnails img.active {
  border: 3px solid rgba(0, 0, 0, 0.2);
  padding: 8px;
}

.main-image {
  margin-left: 20px;
}

.main-image img {
  width: 440px;
  height: auto;
}

.product-info {
  //   width: 60%;
  display: flex;
  flex-direction: column;
}

.product-info h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.description {
  color: #bdbdbd;
  margin-bottom: 10px;
}

.price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 20px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  .params-name {
    padding-right: 20px;
    font-size: 14px;
    color: #8d8d8d;
    line-height: 36px;
  }
  .control-btn {
    width: 20px;
    height: 20px;
    font-weight: bold;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid #bdbdbd;
    border-radius: 50%;
    color: #666;
  }
  .control-btn:hover {
    background: #f5f5f5;
  }
}

.quantity-control button {
  width: 30px;
  height: 30px;
  text-align: center;
  cursor: pointer;
}

.quantity-control input {
  width: 50px;
  text-align: center;
  border: none;
}

.actions {
  display: flex;
  gap: 20px;
}

.actions button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.add-to-cart {
  background-color: $btn-color1;
  color: white;
}

.buy-now {
  border: 1px solid $main-dark-color;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  background-color: $main-light-color;
  // background-image: linear-gradient(180deg, #678ee7, #5078df);
  width: 145px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.buy-now:hover {
  background-color: $main-dark-color;
}

.item-info {
  background: #fff;
  border-radius: 8px;
  // border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
  .product_title {
    height: 60px;
    padding: 0 10px 0 24px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
    background: #f3f3f3;
    background: linear-gradient(#fbfbfb, #ececec);
    line-height: 60px;
    font-size: 18px;
    color: #333;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
  }
  .img-item {
    width: 100%;
    text-align: center;
    img {
      border: none;
      outline: none;
    }
  }
}

@media (max-width: 600px) {
  .product-container {
    width: 100%;
    .product-box {
      padding: 40px 0;
    }
    .main-image {
      img {
        width: 220px;
      }
      
    }
    // .actions {
    //   display: grid;
    // }
  }
}

@media (max-width: 800px) {
  .product-container {
    width: 100%;
  }
}

@media (max-width: 1400px) {
  .product-detail {
    display: grid;
  }
}


</style>
