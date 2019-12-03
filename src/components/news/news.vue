<template>
  <div class="body">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <router-link tag="div" :to="'/newsdetail/'+item.id" class="news-line" v-for=" item in newslist" :key="item.id">
        <div class="bottom-line">
          <div>
            <img :src="item.img_url" alt />
          </div>
          <div class="right-content">
            <h4>{{item.title}}</h4>
            <div class="time-click">
              <div>发布时间：{{item.add_time | dataFormat}}</div>
              <div>点击：{{item.click}}</div>
            </div>
          </div>
        </div>
      </router-link>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getnewslist } from "../../Api/index.js";
export default {
  data() {
    return {
      newslist: [],
      isLoading: false
    };
  },
  methods: {
    getnewsdata() {
      getnewslist().then(res => {
        if (res.status === 0) {
          this.newslist = res.message;
        }
      });
    },
    onRefresh() {
      setTimeout(() => {
        this.getnewsdata();
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  },
  created() {
    this.getnewsdata();
  }
};
</script>

<style lang='scss' scoped>
.news-line {
  padding: 7px;

  .bottom-line {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 90px;
    }
    .right-content {
      width: 100%;
      margin-left: 7px;
      h4 {
        margin: 0;
        margin-bottom: 24px;
      }
      .time-click {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>