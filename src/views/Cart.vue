<template>
  <div class="cart-container">
    <div class="cart-box" v-if="isEmpty">
      <div class="title">
        <h2>購物清單</h2>
      </div>
      <div>
        <div class="ui-cart">
          <div>
            <div class="cart-table-title">
              <span class="name">商品資訊</span>
              <span class="operation">操作</span>
              <span class="subtotal">小計</span>
              <span class="num">數量</span>
              <span class="price1">單價</span>
            </div>
          </div>
          <div
            class="cart-item"
            v-for="(item, index) in cartStore.cartItems"
            :key="index"
          >
            <div class="item-info">
              <input
                type="checkbox"
                v-model="item.checked"
                @change="toggleItemChecked(item.id)"
              />
              <!-- <el-checkbox v-model="item.checked" size="large" @change="toggleItemChecked(item.id)" /> -->
              <img :src="item.image" alt="" />
              <span class="name">{{ item.name }}</span>
            </div>
            <div class="item-right">
              <div class="item-div item-price">
                <span>NT$ {{ formatCurrency(item.price) }}</span>
              </div>
              <div class="item-div item-num">
                <el-icon
                  :size="24"
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  ><Remove
                /></el-icon>
                <span>{{ item.quantity }}</span>
                <el-icon
                  :size="24"
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  ><CirclePlus
                /></el-icon>
              </div>
              <div class="item-div item-subtotal">
                <span
                  >NT$ {{ formatCurrency(item.price * item.quantity) }}</span
                >
              </div>
              <div class="item-div item-operation">
                <el-icon :size="24" @click="removeItem(item.id)"
                  ><CircleClose
                /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="cart-bottom-bg fix-bottom">
          <div class="fix-bottom-inner">
            <div class="cart-bar-operation">
              <div class="choose-box">
                <div class="choose-all">
                  <!-- <span class="blue-checkbox-new"></span> -->
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    @change="toggleAll($event.target.checked)"
                    id="all"
                  />
                  <label for="all">全選</label>
                </div>
                <div class="delete-choose-goods" @click="removeSelected">
                  刪除選取的商品
                </div>
              </div>
            </div>
            <div class="shipping">
              <div class="shipping-box">
                <div class="shipping-total shipping-num">
                  <h4 class="highlight">
                    已選擇
                    <span style="color: #d44d44">{{ selectedCount }}</span>
                    件商品
                  </h4>
                  <h5>共計 {{ totalQuantity }} 件商品</h5>
                </div>
                <div class="shipping-total shipping-price">
                  <h4 class="highlight">
                    應付總額：<span style="color: #d44d44"
                      >NT$ {{ formatCurrency(totalPrice) }}</span
                    >
                  </h4>
                  <!-- <h5 class="shipping-tips ng-scope">应付总额不含运费</h5> -->
                </div>
              </div>
              <div @click="buyNow" :class="{'buy-now': true, 'isDis': selectedCount < 1}">現在結算</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="phone-cart-box" v-if="isEmpty">
      <div class="phone-top">
        <div v-for="(item, index) in cartStore.cartItems" :key="index" class="top-item">
          <div>
            <img :src="item.image" alt="" />
          </div>
          <div class="item-content">
            <span class="n1">{{item.name}}</span>
            <span class="p1">
              NT$ <span>{{formatCurrency(item.price)}}</span>
              <span class="q2">× {{item.quantity}}</span>
            </span>
          </div>
          <el-icon :size="24" @click="removeItem(item.id)"
                  ><CircleClose
                /></el-icon>
        </div>
      </div>
      <div class="phone-down">
        <div class="total-box">
          <span class="t2">共 {{ totalQuantity }} 件商品</span>
          <span class="p2"><span class="z1">總額：</span> <span class="z2">NT$</span> <span class="z3">{{formatCurrency(phonetotalPrice)}}</span></span>
        </div>
        <div class="buy-now" @click="buyNow">現在結算</div>
      </div>
    </div>
    <el-empty description="暫無任何商品" v-if="!isEmpty">
      <el-button @click="jumpList">去選購</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

import { useRoute, useRouter } from "vue-router";
// 获取路由实例，进行编程式导航
const router = useRouter();

import { useCartStore } from "@/store";
// store
const cartStore = useCartStore();
const cartItems = ref([]);
cartItems.value = cartStore.cartItems;

const isEmpty = computed(() => {
  if(cartStore.cartItems && cartStore.cartItems.length > 0) {
    return true
  }else {
    return false
  }
})

// 商品总价
const phonetotalPrice = computed(() => cartStore.cartTotal);

// 更新数量
const updateQuantity = cartStore.updateQuantity;
// 商品总数
const totalQuantity = computed(() => cartStore.cartQuantity);
// 商品总价
const totalPrice = computed(() => cartStore.totalPrice);
// 单个商品选中
const toggleItemChecked = computed(() => cartStore.toggleItemChecked);
// 单个商品删除
const removeItem = computed(() => cartStore.removeItem);
// 全选事件
const toggleAll = cartStore.toggleAll;
// 选中商品数量
const selectedCount = computed(() => cartStore.selectedCount);
// 判断是否全选
const isAllSelected = computed(() => {
  const items = cartStore.cartItems;
  if (items.length === 0) return false; // 空数组处理
  return items.every((item) => item.checked);
});

// 删除选中商品
const removeSelected = () => {
  cartStore.cartItems = cartStore.cartItems.filter((item) => !item.checked);
};
// 金额转换
function formatCurrency(amount) {
  return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const jumpList = () => {
  router.push({path: '/ProductListPage'})
}

const pageUrl = import.meta.env.VITE_APP_ADDRESS
  const buyNow = () => {
        window.open(pageUrl, "_blank"); // 第三方页面 URL
  }

</script>

<style scoped lang="scss">
.cart-container {
  width: 70%;
  margin: 0 auto;
  padding-top: 40px;
  user-select: none;
  .cart-box {
    position: relative;
    margin-bottom: 30px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0, 0, 0, 0.14);
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
    .title {
      position: relative;
      z-index: 10;
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
      h2 {
        margin: 0;
        font-weight: 400;
        font-size: 100%;
      }
    }
  }
}

.ui-cart {
  padding-bottom: 91px;
  .cart-table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, 0.08);
    span {
      width: 137px;
      float: right;
      text-align: center;
      color: #838383;
    }
    .name {
      float: left;
      text-align: left;
      margin-left: 20px;
      display: table;
    }
  }
}

.cart-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-left: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 140px;
  .item-div {
    width: 137px;
    text-align: center;
    color: #666;
  }
  .item-info {
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border: 1px solid #dbdbdb;
    }
    .name {
      margin-left: 20px;
    }
  }
  .item-right {
    display: flex;
  }
  .item-price {
  }
  .item-num {
    display: flex;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    user-select: none;
  }
  .item-subtotal {
  }
  .item-operation {
    cursor: pointer;
  }
}

.fix-bottom {
  height: 90px;
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 1;
  background-position: 50%;
  background: #fdfdfd;
  background: linear-gradient(#fdfdfd, #f9f9f9);
  border-top: 1px solid #e9e9e9;
  box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
}
.fix-bottom-inner {
}

.cart-bar-operation {
  float: left;
  padding: 20px 30px;
  font-size: 12px;
  .choose-box {
    display: flex;
    align-items: center;
    cursor: pointer;
    .choose-all {
      display: flex;
      align-items: center;
      
    }
    .delete-choose-goods {
      margin-left: 20px;
      color: #959595;
      
    }
  }
}

.shipping {
  float: right;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  .shipping-box {
    display: flex;
    padding-top: 1px;
    margin-right: 10px;
  }
  h4,
  h5 {
    margin: 0;
  }
  h5 {
    color: #959595;
  }
  

  .shipping-total {
    padding: 0 20px;
  }
  .shipping-num {
    border-right: 1px solid #e1e1e1;
  }
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

  .isDis {
    filter: grayscale(100%); /* 100% 完全灰色 */
  }

input[type="checkbox"] {
  cursor: pointer;
  margin-right: 10px;
}

.phone-cart-box {
  background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    display: none;
  .phone-top {
    display: flex;
    flex-direction: column;
    .top-item {
      display: flex;
      border-bottom: 1px solid #d4d4d4;
      padding: 20px;
      align-items: center;
    justify-content: space-between;
      .item-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: 0 15px;
        .n1 {
          color: $primary-color;
          font-size: 14px;
        }
        .p1 {
          color: $text-color1;
          font-weight: bold;
          padding: 10px 0;
        }
        .q2 {
          padding-left: 16px;
          font-size: 12px;
          color: #959595;
        }
      }
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
  .phone-down {
    padding: 20px;
    display: flex;
    .total-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      .t2 {
        font-size: 13px;
        color: #959595;
      }
      .z1 {
        font-size: 14px;
      }
      .z2 {
        font-size: 12px;
        color: $text-color1;
      }
      .z3 {
        color: $text-color1;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 1300px) {
  .cart-container {
    width: 80%;
  }
}
@media (max-width: 1200px) {
  .cart-container {
    width: 90%;
  }
}
@media (max-width: 1000px) {
  .cart-container {
    width: 100%;
  }
}
@media (max-width: 800px) {
  .cart-container {
    padding-bottom: 40px;
  }
  .phone-cart-box {
    display: block;
  }
  .cart-box {
    display: none;
  }
}
</style>
