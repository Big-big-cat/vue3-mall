import { defineStore } from 'pinia';

// 用户模块 Store
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: null, // 用户信息
  }),
  getters: {
    isLoggedIn: (state) => !!state.userInfo, // 判断是否已登录
  },
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo; // 设置用户信息
    },
    clearUserInfo() {
      this.userInfo = null; // 清空用户信息
    },
  },
   // 持久化配置
   persist: {
    enabled: true, // 开启持久化
    strategies: [
      {
        key: 'userData', // 自定义存储键名
        storage: localStorage, // 使用 localStorage（也可以是 sessionStorage）
      },
    ],
  },
});

// 购物车模块 Store
export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [], // 购物车商品列表
    updateFlag: 0,
  }),
  getters: {
     // 已选商品总数
     selectedCount(state) {
        return state.cartItems
            .filter(item => item.checked)
            .reduce((total, item) => total + item.quantity, 0);;
      },
    // 计算购物车总价
    cartTotal: (state) => {
        return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      // 计算购物车商品总数量
      cartQuantity: (state) => {
        return state.cartItems.reduce((total, item) => total + item.quantity, 0);
      },
      // 应付总金额
    totalPrice(state) {
        return state.cartItems
          .filter(item => item.checked)
          .reduce((total, item) => total + item.price * item.quantity, 0);
      }
  },
  actions: {
     // 更新商品数量
     updateQuantity(id, quantity) {
        const product = this.cartItems.find(item => item.id === id);
        if (product) {
          product.quantity = Math.max(1, quantity); // 防止数量低于 1
        }
      },
    addToCart(item) {
      const existingItem = this.cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity || 1; // 更新数量
      } else {
        this.cartItems.push({ ...item, quantity: item.quantity || 1  }); // 添加新商品
      }
    },
     // 全选/取消全选
     toggleAll(checked) {
        this.cartItems.forEach(item => (item.checked = checked));
      },
      // 切换单个商品选中状态
      toggleItemChecked(id) {
        const product = this.cartItems.find(item => item.id === id);
        if (product) {
            // console.log(product)
        //   product.checked = !product.checked;
        }
      },
       // 删除商品
       removeItem(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.updateFlag++; // 改变一个无关的状态，触发重新渲染
      },
    clearCart() {
      this.cartItems = []; // 清空购物车
    },
  },
   // 持久化配置
   persist: {
    enabled: true, // 开启持久化
    strategies: [
      {
        key: 'cartData', // 自定义存储键名
        storage: localStorage, // 使用 localStorage（也可以是 sessionStorage）
      },
    ],
  },
});
