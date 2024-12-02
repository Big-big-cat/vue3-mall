<template>
  <footer>
    <!-- <p>&copy; 2024 商城獨立站 - All Rights Reserved</p> -->
    <div class="contact">
      <h3>聯絡我們</h3>
      <ul>
        <li>綠界科技股份有限公司 統一編號：97025978</li>
        <li>客服時間：週一 ~ 週日 24小時</li>
        <li>客服電話：02-2655-1775</li>
        <li>
          客服信箱：<a href="mailto:service@ecpay.com.tw">service@ecpay.com.tw</a>
        </li>
        <li>地址：台北市南港區三重路19-2號 D棟6樓之2</li>
      </ul>
    </div>
    <img src="/gw_ssl_2.png" alt="" class="gw-img">
  </footer>
</template>

<script setup>
import { ref } from "vue";

// Your script here
</script>

<style scoped lang="scss">
footer {
  background-color: $footer-page-background;
  color: white;
  text-align: center;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact {
  padding: 10px 0;
  font-family: Arial, sans-serif;
  padding-right: 100px;
}

.contact h3 {
  font-size: 18px;
  color: #fff;
}

.contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact li {
  margin-bottom: 5px;
  color: $footer-text-color;
}

.contact a {
  color: $primary-color;
  text-decoration: none;
}

.contact a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
    .contact {
      padding: 0;
    }
    .gw-img {
      width: 120px;
      height: 120px;
    }
    footer {
      flex-direction: column;
    }
  }
</style>