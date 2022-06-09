<template>
  <div class="mv-detail">
    <div class="content">
      <div class="detail">
        <div class="title">MV详情</div>
        <div class="video">
          <video
            :src="mvUrl"
            width="750px"
            height="420px"
            controls
            preload="auto"
          ></video>
        </div>
        <div class="mv-artist">
          <img :src="artistImg" alt="" />
          <span v-for="item in artist" :key="item" class="item">{{
            item
          }}</span>
        </div>
        <div class="mv-info">
          <div class="name" v-show="Number(this.$route.params.id)">
            {{ artistName }}
          </div>
          <i
            class="el-icon-caret-bottom"
            @click="showDescription"
            v-show="Number(this.$route.params.id)"
          ></i>
          <div class="title" v-show="!Number(this.$route.params.id)">
            {{ title }}
          </div>
          <span>发布：{{ publishTime }}</span>
          <span>播放：{{ playCount }}</span>
        </div>
        <div
          v-show="Number(this.$route.params.id)"
          class="mv-description"
          :style="
            isShowDescription === true
              ? 'overflow: visible;'
              : 'overflow: hidden;'
          "
        >
          {{ desc }}
        </div>
        <div class="video-group" v-show="!Number(this.$route.params.id)">
          <span v-for="(item, index) in videoGroup" :key="index" class="item">{{
            item.name
          }}</span>
        </div>
        <div class="tools">
          <div class="button">
            <span class="el-icon-thumb"></span>
            <span>赞({{ likedCount }})</span>
          </div>
          <div class="button">
            <span class="el-icon-folder-add"></span>
            <span>收藏({{ subCount }})</span>
          </div>
          <div class="button">
            <span class="el-icon-edit-outline"></span>
            <span>分享({{ shareCount }})</span>
          </div>
          <div class="button">
            <span class="el-icon-download"></span>
            <span>下载MV</span>
          </div>
          <span class="tip-off">举报</span>
        </div>
        <div class="comment">
          <div class="title">评论({{ commentCount }})</div>
          <Comment
            :commentInfo="commentInfo"
            :t="t"
            :type="type"
            :id="this.id"
            @refeshCommrnt="addCommentToCache"
            @setReplyWay="setReplyWay"
          ></Comment>
        </div>
      </div>
      <!-- 不想写了 -->
      <div class="recommend">相似mv</div>
    </div>
    <el-backtop target=".mv-detail" :bottom="100"
      ><div class="backtop-style">UP</div></el-backtop
    >
  </div>
</template>

<script>
import Comment from "@/components/common/Comment.vue";
import { getYMD } from "@/utils/uctil";
import {
  getMvDetail,
  getMvUrl,
  getMvComment,
  getVideoDetail,
  getVideoComment,
  getVideoUrl,
  getVideoDetailInfo,
  getAllVideo,
  getRecommentMv,
} from "@/network/api";
export default {
  components: { Comment },
  name: "MvDetail",
  data() {
    return {
      mvUrl: "",
      commentInfo: [],
      artistImg: "",
      artist: [],
      artistName: "",
      publishTime: "",
      playCount: 0,
      desc: "",
      subCount: 0,
      shareCount: 0,
      commentCount: 0,
      likedCount: 0,
      videoGroup: [],
      isShowDescription: false,
      title: "",
      t: null,
      type: null,
    };
  },
  methods: {
    setReplyWay(val) {
      this.replyWay = val;
    },
    showDescription() {
      this.isShowDescription = !this.isShowDescription;
      console.log(this.isShowDescription);
    },
    async getCommentInfo() {
      this.id = this.$route.params.id;
      if (Number(this.$route.params.id)) {
        let commentInfo = await getMvComment(this.id);
        this.commentInfo = commentInfo.data.comments;
      } else {
        const commentInfo = await getVideoComment(this.id);
        this.commentInfo = commentInfo.data.comments;
      }
    },
    addCommentToCache(val) {
      this.commentInfo.unshift(val);
    },
    //获取mv的信息
    async getMvDetailInfo() {
      this.id = this.$route.params.id;
      let { data } = await getMvDetail(this.id);
      console.log(data);
      let url = await getMvUrl(this.id);
      console.log(url);
      let recommendMvInfo = await getRecommentMv();
      console.log(recommendMvInfo);

      this.artistImg = data.data.cover;
      this.artist = data.data.artists.map(({ name }) => name);
      this.artistName = data.data.name;
      this.publishTime = data.data.publishTime;
      this.playCount = data.data.playCount;
      this.desc = data.data.desc;
      this.subCount = data.data.subCount;
      this.shareCount = data.data.shareCount;
      this.commentCount = data.data.commentCount;
      this.mvUrl = url.data.data.url;
      this.videoGroup = [];
      this.title = "";
    },
    //获取视频的信息
    async getVideoDetailInfo() {
      this.id = this.$route.params.id;
      let { data } = await getVideoDetail(this.id);
      console.log(data);
      const url = await getVideoUrl(this.id);
      console.log(url);
      const commentDetailInfo = await getVideoDetailInfo(this.id);
      const correlationVideo = await getAllVideo(this.id);
      console.log(correlationVideo);

      this.artistImg = data.data.coverUrl;
      this.artist = data.data.creator.nickname.split("");
      this.publishTime = getYMD(data.data.publishTime);
      this.playCount = data.data.praisedCount;
      this.desc = "";
      this.subCount = data.data.subscribeCount;
      this.shareCount = commentDetailInfo.data.shareCount;
      this.commentCount = commentDetailInfo.data.commentCount;
      this.likedCount = commentDetailInfo.data.likedCount;
      this.mvUrl = url.data.urls[0].url;
      this.title = data.data.title;
      this.videoGroup = data.data.videoGroup;
    },
  },
  created() {
    this.getCommentInfo();
    if (Number(this.$route.params.id)) {
      this.getMvDetailInfo();
      this.t = 1;
      this.type = 1;
    } else {
      this.getVideoDetailInfo();
      this.t = 1;
      this.type = 5;
    }
    //暂停minplay的音乐播放
    this.$store.commit("stop");
  },
};
</script>

<style scoped lang="scss">
.mv-detail {
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: scroll;
  height: calc(100vh - 60px - 75px);
  .content {
    width: 1100px;
    .detail {
      width: 750px;
      .title {
        font-size: 20px;
        font-weight: 600;
        margin: 15px 0;
      }
      .video {
        width: 756px;
        height: 425px;
      }
      .mv-artist {
        margin: 10px 0;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .item {
          vertical-align: middle;
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .mv-info {
        position: relative;
        .name {
          font-size: 20px;
          font-weight: 900;
          display: inline-block;
          width: 750px;
          margin: 15px 0;
        }
        i {
          position: absolute;
          right: 0;
          top: 15px;
          font-size: 20px;
        }
        span {
          font-size: 10px;
          color: rgb(186, 186, 186);
        }
      }
      .mv-description {
        font-size: 15px;
        text-indent: 2em;
        margin-top: 10px;
        display: inline-block;
        line-height: 20px;
        height: 20px;
        width: 750px;
        word-wrap: break-word;
        overflow: hidden;
      }
      .video-group {
        margin-top: 15px;
        font-size: 12px;
        cursor: pointer;
        .item {
          background-color: rgb(235, 235, 235);
          margin-right: 5px;
          border-radius: 20px;
          padding: 1px 5px;
        }
      }
      .tools {
        font-size: 14px;
        margin-top: 20px;
        .button {
          width: 120px;
          height: 30px;
          border: 1px solid rgb(190, 190, 190);
          line-height: 30px;
          border-radius: 20px;
          text-align: center;
          display: inline-block;
          margin-right: 8px;
          span {
            margin-right: 5px;
          }
        }
        .button:hover {
          background-color: rgb(189, 189, 189);
        }
        .tip-off {
          font-size: 12.5px;
          color: rgb(190, 190, 190);
          margin-left: 200px;
        }
        .tip-off:hover {
          color: gray;
        }
      }
      .comment {
        .title {
          margin-top: 40px;
        }
      }
    }
    .related-mv {
      width: 350px;
    }
  }
}
</style>
