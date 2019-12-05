<template>
  <div id="app_content">
    <!-- 头 -->
    <van-nav-bar
      fixed
      title="爱购商城"
      :left-text="left_text"
      :left-arrow="left_arrow"
      @click-left="onClickLeft"
    />

    <!-- 内容 -->
    <div class="body-con">
        <router-view></router-view>
    </div>
  

    <!-- 尾 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="wap-home-o" to="/home">主页</van-tabbar-item>
      <van-tabbar-item icon="cart-o" :info="this.$store.getters.getcartnumber" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/center">个人主页</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      left_text: "返回",
      left_arrow: true
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  watch: {
    $route: function(newpath, oldpath) {
      // console.log(newpath.path,oldpath.path)
      if (newpath.path == "/home") {
        this.left_text = "";
        this.left_arrow = false;
      } else {
        this.left_text = "返回";
        this.left_arrow = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#app_content {
  .van-nav-bar {
    background-color: blue;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-nav-bar__text {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .body-con {
    margin-top: 47px;
    margin-bottom: 50px;
  }
}
</style>
