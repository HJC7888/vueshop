<template>
  <div class="body">
    <div class="lunbo">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in imgdata" :key="item.src">
          <img class="img" v-lazy="item.src" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="detail">
      <h3>{{detaildata.title}}</h3>
      <div class="price">
        <span class="market-price">市场价：￥{{detaildata.market_price}}</span>
        <span class="sell-price">
          本店价：
          <span>￥{{detaildata.sell_price}}</span>
        </span>
      </div>
      <div class="count">
        <span>购买数量：</span>
        <van-stepper v-model="value" />
      </div>
      <div class="btn">
        <van-button type="info">立即购买</van-button>
        <van-button type="danger" @click="addtocart">加入购物车</van-button>
      </div>
    </div>
    <div class="other">
      <h3>其他信息</h3>
      <div class="msg">
        <span>商品货号: {{detaildata.goods_no}}</span>
        <span>库存情况: {{detaildata.stock_quantity}}</span>
        <span>上架时间: {{detaildata.add_time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getthumbimages,getgoodsinfo } from "@/Api/index.js";
export default {
  data() {
    return {
      value: 1,
      id: this.$route.params.id,
      imgdata: [],
      detaildata:{}
    };
  },
  methods: {
    getgoodslunbo() {
      getthumbimages(this.id).then(res => {
        if (res.status === 0) {
          this.imgdata = res.message;
        }
        console.log(this.imgdata);
      });
    },
    getdetail(){
        getgoodsinfo(this.id).then(res=>{
            if(res.status===0){
                this.detaildata=res.message[0]
            }
        })
    },
    addtocart(){
      var obj ={
        id:this.id,
        number:this.value,
        price:this.detaildata.sell_price,
        selected:true
      }
      console.log(obj)
      this.$store.commit('addgoods',obj)
    }
  },
  created() {
    this.getgoodslunbo();
    this.getdetail()
  }
};
</script>

<style lang="scss" scoped>
.body {
  background-color: #eee;
  padding: 5px;
  .lunbo {
    border-radius: 7px;
    background-color: #fff;
    img {
      width: 100%;
    }
  }
  .detail {
      border-radius: 7px;
      background-color: #fff;
      padding: 10px 8px;
      margin-top: 10px;
      h3{
          margin:0px;
          padding: 7px 0;
          border-bottom: 2px solid #666;
      }
    .price {
        padding: 8px 0;
        font-size: 17px;
      .market-price {
        text-decoration: line-through;
        margin-right: 13px;
      }
      .sell-price span {
        color: red;
        font-weight: bold;
      }
    }
    .count {
      display: flex;
      padding: 8px 0;
    }
    .btn {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      .van-button {
        width: 160px;
      }
    }
  }
  .other {
      border-radius: 7px;
    background-color: #fff;
    padding: 0 7px;
    h3 {
      border-bottom: 2px solid #ccc;
      padding: 25px 5px;
    }
    .msg {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>