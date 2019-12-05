<template>
  <div class="body">
    <h3>{{newsInfo.title}}</h3>
    <div class="time-click">
      <span>时间：{{newsInfo.add_time | dataFormat}}</span>
      <span>次数：{{newsInfo.click}}</span>
    </div>
    <div v-html="newsInfo.content"></div>
    <!-- 评论 -->
    <div>
      <van-cell-group>
        <van-field
          v-model="message"
          rows="2"
          autosize
          label
          label-width="0px"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <van-button type="primary" size="large" @click="addcomment">评论</van-button>
    <!-- 评论消息 -->
    <div class="comments">
      <div v-for=" item in newsComments" :key="item.id" class="comments-line">
        <div class="user-time">
          <span>用户：{{item.user_name}}</span>
          <span>时间：{{item.add_time | dataFormat}}</span>
        </div>
        <div>
          <span>{{item.content}}</span>
        </div>
      </div>
    </div>
    <van-button
      :loading="loadflag"
      plain
      hairline
      type="large"
      loading-text="加载中..."
      @click="loadMore"
    >查看更多</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { getnews, getNewsComments, sendNewsComments } from "@/Api/index.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      newsInfo: {},
      message: "",
      pageindex: 1,
      newsComments: [],
      loadflag: false,
      showflag: true
    };
  },
  methods: {
    getnewsdetail() {
      getnews(this.id).then(res => {
        if (res.status === 0) {
          this.newsInfo = res.message[0];
        }
      });
    },
    NewsComments() {
      getNewsComments(this.id, this.pageindex).then(res => {
        if (res.status === 0) {
          this.newsComments = this.newsComments.concat(res.message);
          this.loadflag = false;
        }
      });
    },
    loadMore() {
      if(!this.showflag){
        Toast("没有更多评论");
        return
      }
      this.loadflag = true;
      ++this.pageindex;
      getNewsComments(this.id, this.pageindex).then(res => {
        if (res.status === 0) {
          this.newsComments = this.newsComments.concat(res.message);
          this.loadflag = false;
          if (res.message.length === 0) {
            Toast("没有更多评论");
            this.showflag=false
            return
          }
        }
      });
    },
    addcomment() {
      sendNewsComments(this.id, this.message).then(res => {
        if (res.status === 0) {
          Toast("评论成功");
          this.newsComments.unshift({
            user_name: "匿名用户",
            add_time: new Date(),
            content: this.message
          });
          this.message=''
        }
      });
    }
  },
  created() {
    this.getnewsdetail();
    this.NewsComments();
  }
};
</script>

<style lang='scss' scoped>
.body {
  padding: 5px;
  h3 {
    text-align: center;
  }
  .time-click {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #888;
    color: #888;
  }
  /deep/ img {
    width: 100%;
  }
  .comments {
    margin-top: 5px;
    .comments-line {
      margin: 7px 0;
      background-color: #e8e8e8;
      color: #888;
      .user-time {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>