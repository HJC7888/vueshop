<template>
  <div class="body">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
  

    <router-link tag="div" class="box" v-for=" item in goodslist" :key="item.id" :to="'/goodsdetail/'+item.id">
      <lazy-component tag="div" class="imgdiv">
        <img :src="item.img_url" />
      </lazy-component>
      <h4 class="goodsname">{{item.title}}</h4>
      <div>
        <div class="price">
          <span class="newprice">￥{{item.sell_price}}</span>
          <span class="oldprice">￥{{item.market_price}}</span>
        </div>
        <div class="hot">
          <span>热卖中</span>
          <span>剩余10件</span>
        </div>
      </div>
    </router-link >
    <van-button type="danger" size="large" @click="readmore" :loading=loadflag loading-text="加载中...">查看更多</van-button>
 
 </van-pull-refresh>
 
  </div>
</template>

<script>
import { getgoods } from "@/Api/index.js";
import Vue from "vue";
import { Toast } from "vant";
import { Lazyload } from 'vant';
import { PullRefresh } from 'vant';

Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(Lazyload, {
  lazyComponent: true
});
export default {
  data() {
    return {
      goodslist: [],
      pageindex: 1,
      showflag: true,
      loadflag:false,
      isLoading:false
    };
  },
  methods: {
    getgoodslist() {
      getgoods(this.pageindex).then(res => {
        if (res.message.length === 0) {
          this.showflag = false;
          Toast("无法显示更多");
          this.loadflag = false;
          return;
        }
        if (res.status === 0) {
          this.goodslist = this.goodslist.concat(res.message);
          this.loadflag = false;
        }
      });
    },
    readmore() {
      if (this.showflag === false) {
        Toast("无法显示更多");
        return;
      } else {
          this.loadflag = true;
        ++this.pageindex;
        this.getgoodslist();
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.getgoodslist();
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  },
  created() {
    this.getgoodslist();
  }
};
</script>

<style lang='scss' scoped>
.body {
  // .van-pull-refresh{
    display: flex;
  background-color: #eee;
  flex-wrap: wrap;
  // }
  
  .box {
    display: inline-block;
    box-sizing: border-box;
    margin: 9px;
    border: 1px solid #e8e8e8e8;
    width: 45%;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
    box-shadow: 0px 0px 5px #ccc;
    .imgdiv {
      // width: 200px;
      img {
        width: 100%;
        height: 181px;
      }
    }
    .goodsname {
      // color: #666;
      height: 63px;
    }
    .price {
      .newprice {
        color: red;
        font-weight: bold;
      }
      .oldprice {
        color: #ccc;
        margin-left: 15px;
        font-size: 14px;
        text-decoration: line-through;
      }
    }
    .hot {
      color: #666;
      display: flex;
      justify-content: space-between;
    }
  }
}
// .van-button--large{margin-bottom: 54px}
</style>