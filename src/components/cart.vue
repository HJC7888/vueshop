<template>
  <div class="body">
    <div class="goods" v-for="(item, index) in cartdata" :key="item.id">
      <div>
        <van-switch v-model="$store.getters.getgoodsswitch[item.id]" @input="changeswitch(item.id,$store.getters.getgoodsswitch[item.id])"/>
      </div>
      <div class="img">
        <img :src="item.thumb_path" alt />
      </div>
      <div class="right-con">
        <h3>{{item.title}}</h3>
        <div class="box">
          <span class="price">￥{{item.sell_price}}</span>
          <van-stepper v-model="$store.getters.getgoodsnumber[item.id]"  @change="onChange(item.id,$store.getters.getgoodsnumber[item.id])" />
          <van-button type="danger" @click="delgoods(item.id,index)">删除</van-button>
        </div>
      </div>
    </div>
    <div class="sumcount">
      <div class="_left">
        <div>总计（不含运费）</div>
        <div>
          已勾选商品
          <span>{{this.$store.getters.getnumberandprice.number}}</span>件，总价
          <span>￥{{this.$store.getters.getnumberandprice.totalprice}}</span>
        </div>
      </div>
      <div class="_right">
        <van-button type="danger">结算</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getshopcarlist } from "@/Api/index.js";
export default {
  data() {
    return {
      checked: true,
      value: 1,
      cartdata: []
    };
  },
  methods: {
    getcartdata() {
      getshopcarlist(this.$store.getters.getcartids).then(res => {
        if (res.status === 0) {
          this.cartdata = res.message;
        }
      });
    },
    //修改步进器
    onChange(id,number) {
        
        this.$store.commit('changegoodsnumber',{id,number})
    },
    changeswitch(id,checked){
        console.log(id,checked)
        this.$store.commit('changegoodsswitch',{id,checked})
    },
    delgoods(id,index){
       this.$store.commit('delgoods',id) 
       this.cartdata.splice(index,1)
    }
  },
  created() {
    this.getcartdata();
  }
};
</script>

<style lang='scss' scoped>
.body {
  background-color: #ccc;
  padding: 1px 7px 11px;
  margin: 0;
  .goods {
    border-radius: 5px;
    padding: 5px;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-top: 8px;
    .img {
      width: 45px;
      margin: 0 8px;
      img {
        width: 45px;
      }
    }
    .right-con {
      .box {
        width: 226px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: red;
          font-weight: bold;
        }
      }
    }
  }
  .sumcount {
    padding: 5px;
    background-color: #fff;
    border-radius: 5px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ._left div {
      margin: 3px;
      span {
        color: red;
        font-weight: bold;
      }
    }
    ._right .van-button {
      width: 90px;
    }
  }
}
</style>