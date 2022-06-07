<template>
  <div class="comment-card">
    <div class="left">
      <BaseImage :src="pic" class="cover" :isShowPlayLogo="false" />
    </div>
    <div class="comment-content">
      <div class="text">
        <span>{{ name }}:</span>
        <span>{{ text }}</span>
      </div>
      <div class="time-tools">
        <div class="time">{{ showDate }}</div>
        <div class="tools">
          <div class="like">
            <i
              class="el-icon-thumb"
              @click="toLike"
              :style="{ color: like ? 'red' : '' }"
            ></i>
            <span>{{ likeCount }}</span>
          </div>
          <span>|</span>
          <div class="share" @click="toShare">
            <i class="el-icon-share"></i>
          </div>
          <span>|</span>
          <div class="reply" @click="toReply">
            <i class="el-icon-chat-line-round"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getYMDHMS } from "@/utils/uctil";
export default {
  name: "CommentCard",
  props: {
    name: String,
    text: String,
    pic: String,
    likedCount: {
      type: Number,
      default: 0,
    },
    time: Number,
    uid: Number,
    liked: Boolean,
  },
  data() {
    return {
      //内存里面修改数据
      like: this.liked,
      likeCount: this.likedCount,
    };
  },
  computed: {
    showDate() {
      return getYMDHMS(this.time);
    },
  },
  methods: {
    toLike() {
      this.like = !this.like;
      !this.like && this.likeCount--;
      this.like && this.likeCount++;
      this.$emit("handleClickLike");
    },
    toShare() {
      this.$emit("handleShareComment");
    },
    toReply() {
      this.$emit("handleReplyComment", [this.uid, this.name]);
    },
  },
};
</script>

<style scoped lang="scss">
.comment-card {
  width: 100%;
  padding-top: 10px;
  display: flex;
  .left {
    display: inline-block;
    padding: 10px 10px 10px 0;
    width: 40px;
    height: 40px;
    .cover {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .comment-content {
    vertical-align: middle;
    display: inline-block;
    width: 95%;
    .text {
      padding-top: 13px;
      padding-bottom: 10px;
      font-size: 13px;
      vertical-align: middle;
      span:nth-child(1) {
        color: rgb(37, 88, 129);
      }
    }
    .time-tools {
      font-size: 13px;
      .time {
        font-size: 13px;
      }
      .tools {
        display: flex;
        float: right;
        .like {
          cursor: pointer;
          margin: 0 10px;
        }
        .share {
          cursor: pointer;
          margin: 0 10px;
        }
        .reply {
          cursor: pointer;
          margin: 0 10px;
        }
      }
    }
  }
}
</style>
