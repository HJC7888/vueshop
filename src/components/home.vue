<template>
  <div class="body">
    <div>
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in lunbolist" :key="item.url">
          <img class="img" v-lazy="item.img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div id="body">
      <van-grid :border="false" :column-num="3">
        <van-grid-item to="/news"> 
          <img src="../assets/images/menu1.png" />
          <div>新闻资讯</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu2.png" />
          <div>图片分享</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu3.png" />
          <div>商品购买</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu4.png" />
          <div>留言反馈</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu5.png" />
          <div>视频专区</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu6.png" />
          <div>话费充值</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu7.png" />
          <div>联系我们</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu8.png" />
          <div>清仓特卖</div>
        </van-grid-item>
        <van-grid-item>
          <img src="../assets/images/menu9.png" />
          <div>一元福利</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getlunbo } from "../Api/index.js";
export default {
  data() {
    return {
      lunbolist: []
    };
  },
  methods: {
    getlunbodata() {
      getlunbo().then(res => {
        if (res.status == 0) {
          this.lunbolist = res.message;
        }
      });
    }
  },
  created() {
    this.getlunbodata();
  }
};
</script>

<style  lang="scss" scoped>
.img {
  width: 100%;
  height: 220px;
}
#body {
  img {
    width: 43px;
    margin: 7px auto;
  }
}
</style>