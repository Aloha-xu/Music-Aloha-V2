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
              <img :src="currentSongInfo.pic" alt="" />
            </div>
          </div>
        </div>
        <div class="tools">
          <div class="heart">
            <img
              src="@/assets/icon/heart.svg"
              alt=""
              v-show="false"
              style="height: 30px; weight: 30px"
            />
            <img
              src="@/assets/icon/heartactive.svg"
              alt=""
              style="height: 30px; weight: 30px"
              @click="init()"
            />
          </div>
          <div class="collect">
            <i class="el-icon-folder-add" style="font-size: 30px"></i>
          </div>
          <div class="download">
            <i class="el-icon-download" style="font-size: 30px"></i>
          </div>
          <div class="share">
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
        </div>
        <div class="noLyric" v-else>纯音乐</div>
      </div>
      <!-- 相似的歌曲 -->
      <div class="simi-song">
        <new-music-card
          v-for="(item, index) in SimiSongListInfo"
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
      <comment :commentInfo="commentInfo"></comment>
    </div>
  </div>
</template>

<script>
import NewMusicCard from "@/views/find-music/recommend/new-music/new-music-card.vue";
import Comment from "@/components/common/comment.vue";
import { mapGetters } from "vuex";
export default {
  name: "MaxPlay",
  components: {
    NewMusicCard,
    Comment,
  },
  data() {
    return {
      textarea: "",
      interval: null,
      isShowRecordTools: false,
    };
  },
  methods: {
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

    //歌词样式控制
    //同步歌曲播放进度与歌词
    syncLyricToTime(values, index) {
      let flag = false;
      //快进或者减慢歌词速度控制变量
      // let controlLyricSpeedValues = -0.5;
      let currentTime = parseInt(this.currentPlayTime / 1000);
      if (
        currentTime >= values.time &&
        currentTime < this.currentSongInfo.lyric[index + 1].time &&
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
      "SimiSongListInfo",
      "commentInfo",
      "currentPlayTime",
    ]),
  },
  watch: {
    currentPlayTime() {
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
      lyric.scrollTop = (currentIndex - 4) * offset;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
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
          padding: 10px;
          padding-top: 30px;
          padding-left: 40px;
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
</style>
