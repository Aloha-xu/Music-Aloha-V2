<template>
  <div class="max-play">
    <div class="content">
      <div
        class="record-tools"
        @focus="handleShowRecordTools"
        @blur="handleShowRecordTools"
      >
        <div class="pic">
          <div class="grey-box">
            <div class="black-box">
              <img :src="currentSongInfo.pic" alt="歌曲封面" />
            </div>
          </div>
        </div>
        <div class="tools">
          <div class="heart" @click="ClickHeart()">
            <img
              src="@/assets/icon/heart.svg"
              alt=""
              v-show="!isHeart()"
              style="height: 30px; weight: 30px"
            />
            <img
              src="@/assets/icon/heartactive.svg"
              alt=""
              v-show="isHeart()"
              style="height: 30px; weight: 30px"
            />
          </div>
          <div class="collect" @click="handleCollectSong">
            <i class="el-icon-folder-add" style="font-size: 30px"></i>
          </div>
          <div class="download" @click="handleDownloadSong">
            <i class="el-icon-download" style="font-size: 30px"></i>
          </div>
          <div class="share" @click="handleShareSong">
            <i class="el-icon-share" style="font-size: 30px"></i>
          </div>
        </div>
      </div>
      <div class="song-info">
        <div class="song-name">{{ currentSongInfo.name }}</div>
        <div class="album-name">
          专辑：<span>{{ currentSongInfo.album.name }}</span>
        </div>
        <div
          class="singer-name"
          v-for="item in currentSongInfo.singer"
          :key="item.id"
        >
          歌手：<span>{{ item.name }}</span>
        </div>
        <!-- <div class="info_source">{{ currentSongInfo.id }}</div> -->
        <!-- 纯音乐的时候显示为该音乐为纯音乐的文字 -->
        <div
          class="lyric"
          ref="lyric"
          id="lyric"
          v-if="!currentSongInfo.lyric.length == 0"
        >
          <div
            v-for="(item, index) in currentSongInfo.lyric"
            :key="index"
            class="lyric-item"
            :class="syncLyricToTime(item, index) ? 'lyric-active' : ''"
          >
            {{ item.content }}
          </div>
          <div class="noLyric" v-if="currentSongInfo.lyric.length == 0">
            纯音乐
          </div>
        </div>
      </div>
      <!-- 相似的歌曲 -->
      <div class="simi-song">
        <new-music-card
          v-for="(item, index) in SimiSongList"
          :key="index"
          :pic="item.coverImgUrl"
          :singer="item.creator.nickname.split(' ')"
          :songname="item.name"
          :id="item.id"
          class="simi-item"
        ></new-music-card>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment_">
      <div class="title">评论：</div>
      <Comment
        :commentInfo="commentInfo"
        :t="replyWay"
        :type="0"
        :id="currentSongInfo.id"
        @refeshCommrnt="addCommentToCache"
        @setReplyWay="setReplyWay"
      ></Comment>
    </div>
    <el-dialog
      title="收藏到歌单"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <div class="playlist-box">
        <div class="create-playlist-card">
          <div class="cover">
            <i class="el-icon-plus" style="color: red; font-size: 35px"></i>
          </div>
          <div class="text">新建歌单</div>
        </div>
        <div class="my-love-playlist-card">
          <div class="cover"></div>
          <div class="text">
            <div class="name"></div>
            <div class="music-count"></div>
          </div>
        </div>
        <div class="my-playlist-card"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import NewMusicCard from "@/views/find-music/recommend/new-music/new-music-card.vue";
import Comment from "@/components/common/Comment.vue";
import { setLike, getLikeList } from "@/network/api.js";
import { mapGetters } from "vuex";
import { _throttle } from "@/utils/uctil";
import { scrollTo } from "@/utils/scroll-to.js";
export default {
  name: "MaxPlay",
  components: {
    NewMusicCard,
    Comment,
  },
  data() {
    return {
      centerDialogVisible: true,
      textarea: "",
      interval: null,
      isShowRecordTools: false,
      replyWay: 1,
      unwatch: null,
    };
  },
  methods: {
    isHeart() {
      return this.likeList.findIndex(
        (item) => item == this.currentSongInfo.id
      ) == -1
        ? false
        : true;
    },
    async getLikeList() {
      let uId = this.userinfo.userId;
      let likeList = await getLikeList(uId);
      this.$store.commit("SET_LIKELISTS", likeList.data.ids);
    },
    //不想写了
    handleCollectSong() {},
    async ClickHeart() {
      let id = this.currentSongInfo.id;
      let innerLikeList = JSON.parse(JSON.stringify(this.likeList));
      let currentIndex = innerLikeList.findIndex((item) => item == id);
      if (currentIndex == -1) {
        const { data } = await setLike(id, true);
        data.code === 200 &&
          (innerLikeList.push(id), this.$message.success("已加入我喜欢的音乐"));
      } else {
        const { data } = await setLike(id, false);
        data.code === 200 &&
          (innerLikeList.splice(currentIndex, 1),
          this.$message.success("已从我喜欢的音乐移除"));
      }
      this.$store.commit("SET_LIKELISTS", innerLikeList);
    },
    handleDownloadSong() {
      this.$store.dispatch("downloadSong", {
        url: this.currentSongInfo.url,
        name: this.currentSongInfo.name,
      });
    },
    handleShareSong() {},
    setReplyWay(val) {
      this.replyWay = val;
    },
    addCommentToCache(val) {
      this.commentInfo.unshift(val);
    },
    handleShowRecordTools() {
      this.isShowRecordTools = !this.isShowRecordTools;
    },
    returnBackgroundUrl() {
      return {
        backgroundImage: `url(${this.currentSongInfo.pic})`,
        backgroundSize: "400%",
        filter: "blur(100px)",
        // ⭐⭐虚化背景图
        //就是把background和文字放到不同的div里面
        //因为filter会把div下全部标签都虚化了
      };
    },

    //优化 -- 可以改成计算属性 有缓存
    //歌词样式控制
    //同步歌曲播放进度与歌词
    //              歌词    结束秒
    syncLyricToTime(values, index) {
      let flag = false;
      //快进或者减慢歌词速度控制变量
      // let controlLyricSpeedValues = -0.5;
      let currentTime = parseInt(this.currentPlayTime / 1000);
      if (
        //到最后数组没有下一个了
        this.currentSongInfo.lyric[index + 1] &&
        values.time &&
        currentTime >= values.time &&
        currentTime < this.currentSongInfo.lyric[index + 1]?.time &&
        index <= this.currentSongInfo.lyric.length
      ) {
        flag = true;
      }
      return flag;
    },
  },
  computed: {
    ...mapGetters([
      "currentSongInfo",
      "SimiSongList",
      "commentInfo",
      "token",
      "likeList",
      "userinfo",
    ]),
    ...mapGetters({
      currentPlayTime: "currentTime",
    }),
  },
  // watch: {
  //监听 vuex
  //发现currenttime改变了 那么就重新计算 歌词的位置
  // currentPlayTime() {
  //   let offset = 36;
  //   let lyric = this.$refs.lyric;
  //   //拿到当前时间的秒数对应的歌词下标
  //   let currentIndex = this.currentSongInfo.lyric.findIndex(
  //     (item) => parseInt(this.currentPlayTime / 1000) === item.time
  //   );
  //   if (
  //     currentIndex <= 4 ||
  //     currentIndex + 4 === this.currentSongInfo.lyric.length
  //   ) {
  //     return;
  //   }
  //   lyric.scrollTop = (currentIndex - 4) * offset;
  // },
  // },
  created() {
    this.token && this.getLikeList();
    //注册监听器
    this.unwatch = this.$watch(
      "currentPlayTime",
      _throttle(() => {
        let offset = 36;
        let lyric = this.$refs.lyric;
        let currentIndex = this.currentSongInfo.lyric.findIndex(
          (item) => parseInt(this.currentPlayTime / 1000) === item.time
        );
        if (
          currentIndex <= 4 ||
          currentIndex + 4 === this.currentSongInfo.lyric.length
        ) {
          return;
        }
        // scrollTo((currentIndex - 4) * offset, 50, lyric);
        lyric.scrollTop = (currentIndex - 4) * offset;
      }, 500)
    );
  },
  beforeDestroy() {
    // 移除监听
    this.unwatch && this.unwatch();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables.scss";
.max-play {
  height: calc(100% - 75px);
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
  background-image: linear-gradient(
    rgba(229, 229, 229, 0.5),
    rgba(255, 255, 255, 1)
  );
  .content {
    width: 100%;
    display: flex;
    .record-tools {
      display: flex;
      flex: 1;
      align-items: center; //纵轴对齐
      flex-direction: column;
      overflow: hidden;
      height: 500px;
      .pic {
        display: flex;
        justify-content: center;
        padding-top: 100px;
        .grey-box {
          width: 375px;
          height: 375px;
          border-radius: 50%;
          background-color: $click-grey;
          display: flex;
          justify-content: center;
          align-items: center;
          .black-box {
            width: 350px;
            height: 350px;
            border-radius: 50%;
            background-color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            //越转愉快
            &:hover {
              transform: rotate(666turn);
              transition-delay: 0.1s;
              transition-property: all;
              transition-duration: 59s;
              transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
            }
            img {
              width: 300px;
              height: 300px;
              border-radius: 50%;
              animation: rotate360 infinite 20s linear;
            }
          }
        }
      }
      .tools {
        display: flex;
        margin-top: 10px;
        justify-content: center;
        .heart,
        .collect,
        .download,
        .share {
          cursor: pointer;
          padding: 10px;
          padding-top: 30px;
          padding-left: 40px;
          z-index: 999;
        }
      }
      &:hover {
        overflow: hidden;
        height: 600px;
      }
    }
    .song-info {
      flex: 1;
      padding-top: 40px;
      padding-bottom: 10px;
      text-align: center;
      .song-name {
        font-size: 30px;
        font-weight: 400;
      }
      .album-name,
      .singer-name {
        width: 200px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 15px 0;
        span {
          cursor: pointer;
          &:hover {
            color: rgb(101, 85, 247);
          }
        }
      }
      .lyric {
        overflow: scroll;
        overflow-x: hidden;
        overflow-y: hidden;
        height: 350px;
        .lyric-item {
          font-size: medium;
          margin: 20px 0;
        }
        .lyric-active {
          font-weight: 900;
          font-size: large;
          font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
            sans-serif;
        }
        &:hover {
          overflow-y: auto;
        }
      }
    }
    .simi-song {
      height: 600px;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px 0 0 50px;
      justify-content: center; //横轴对齐
      .simi-item {
        width: 450px;
      }
    }
  }
  .comment_ {
    width: 1100px;
    margin-top: 40px;
    position: absolute;
    top: 550px;
    .title {
      font-size: x-large;
      padding-bottom: 20px;
    }
  }
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.playlist-box {
  .create-playlist-card {
    display: flex;
    .cover {
      width: 60px;
      height: 60px;
      background-color: $bg-grey;
      line-height: 60px;
      text-align: center;
      border-radius: 10px;
    }
    .text {
      line-height: 60px;
      margin-left: 10px;
    }
  }
  .my-love-playlist-card {
  }
  .my-playlist-card {
  }
}
</style>
