<template>
	<div class="product-container">
		<div class="product-list">
			<div class="product-grid">
				<div v-for="(product, index) in products" :key="index" class="product-item">
					<img :src="product.image" :alt="product.name" class="product-image" />
					<h3 class="product-title">{{ product.name }}</h3>
					<p class="product-description">{{ product.description }}</p>
					<p class="product-price">NT${{ product.price }}</p>
					<div class="product-actions">
						<router-link :to="'/productdetails/' + product.id">
							<button class="details-btn">看詳情</button>
						</router-link>
						<button class="add-to-cart-btn" @click="addToCart">立即購買</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { reactive, ref } from "vue";
	const products = reactive([
		{   
			name: "ACIL E1 頸掛式藍牙耳機",
			description: "無感佩戴，一切變得簡單",
			price: 199.0,
			image: "/img/s5.png",
            id: 1
		},
		{
			name: "Smartisan 明信片",
			description: "優質卡紙，包裝精緻，色彩飽滿",
			price: 9.9,
			image: "/img/s6.png",
            id: 2
		},
		{
			name: "Smartisan 牛津紡襯衫",
			description: "一件無玩無束的新訂製襯衫",
			price: 199.0,
			image: "/img/s7.png",
            id: 3
		},
		{
			name: "Smartisan Polo衫 經典款",
			description: "一件錶裡如一的舒適 POLO 衫",
			price: 249.0,
			image: "/img/s9.png",
            id: 4
		},
		{
			name: "Smartisan T卹 任天堂發售紅白機",
			description: "100% 美國 SUPIMA 棉，舒適的純質地",
			price: 99.0,
			image: "/img/s1.png",
            id: 5
		},
		{
			name: "Smartisan 帆布鞋",
			description: "簡約大方，舒適的腳感",
			price: 199.0,
			image: "/img/s2.png",
            id: 6
		},
		{
			name: "暢呼吸智慧空氣清淨機超級除甲醛版",
			description: "購新居送，贈價值 699 元延保服務",
			price: 1999.0,
			image: "/img/s8.png",
            id: 7
		},
		{
			name: "堅果 3",
			description: "意外但不能實力派",
			price: 1599.0,
			image: "/img/s10.png",
            id: 8
		}
	]);
	// Your script here
    const pageUrl = import.meta.env.VITE_APP_ADDRESS
    const addToCart = () => {
        window.open(pageUrl, "_blank"); // 第三方页面 URL
    }
</script>

<style scoped lang="scss">
	.product-container {
		background: #ededed;
		padding: 20px 0;
	}

	.product-list {
		width: 80%;
		margin: auto;
	}

	/* 商品网格容器 */
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
	}

	/* 商品卡片样式 */
	.product-item {
		/* width: 300px; */
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		text-align: center;
		padding: 16px;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
	}

	.product-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
        .product-actions {
            opacity: 1;
        }
	}

	/* 图片样式 */
	.product-image {
		width: 100%;
		height: auto;
		margin-bottom: 12px;
		border-radius: 8px;
	}

	/* 商品标题样式 */
	.product-title {
		font-size: 1rem;
		font-weight: bold;
		margin: 0.5rem 0;
		color: #333;
	}

	/* 商品描述样式 */
	.product-description {
		font-size: 0.875rem;
		color: #666;
		margin-bottom: 0.5rem;
	}

	/* 商品价格样式 */
	.product-price {
		font-size: 1.2rem;
		font-weight: bold;
		color: #e60012;
	}

	.product-actions {
		width: 200px;
        margin: auto;
        opacity: 0;
        transition: opacity 0.5s ease;
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
</style>
