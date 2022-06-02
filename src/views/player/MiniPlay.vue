<template>
  <div class="mini-play">
    <!-- 歌曲信息 -->
    <div class="song-des" v-show="!isShowFmPlayer">
      <div class="pic" @click="handleShowMaxPlayer">
        <img :src="currentSongInfo.pic" v-if="isLoad" />
      </div>
      <div class="song-info">
        <div class="song-name">{{ currentSongInfo.name }}</div>
        <div class="artitse">
          <i v-for="item in currentSongInfo.singer" :key="item.id">{{
            item.name
          }}</i>
        </div>
      </div>
      <div class="heart" v-if="isLoad">
        <img src="@/assets/icon/heart.svg" alt="" />
      </div>
    </div>
    <!-- 中间控制器 -->
    <div class="control-tools" v-show="!isShowFmPlayer">
      <div class="top">
        <div class="way-of-play" @click="handleChangePlayWay">
          <img
            src="@/assets/icon/controltools/list.png"
            v-if="wayOfPlay == 0"
          />
          <img
            src="@/assets/icon/controltools/random.png"
            v-if="wayOfPlay == 1"
          />
          <img
            src="@/assets/icon/controltools/single.png"
            v-if="wayOfPlay == 2"
          />
          <img
            src="@/assets/icon/controltools/order.png"
            v-if="wayOfPlay == 3"
          />
        </div>
        <div class="pre" @click="preSong">
          <img src="@/assets/icon/controltools/pre.png" alt="" />
        </div>
        <div class="play-stop" @click="handlePlay">
          <img
            src="@/assets/icon/controltools/play.png"
            alt=""
            v-show="!playing"
          />
          <img
            src="@/assets/icon/controltools/stop.png"
            alt=""
            v-show="playing"
          />
        </div>
        <div class="next" @click="nextSong">
          <img src="@/assets/icon/controltools/next.png" alt="" />
        </div>
        <div class="lyric" @click="handleShowLyric">
          <img src="@/assets/icon/controltools/ci.png" alt="" />
        </div>
      </div>
      <div class="bottom">
        <div class="current-time">{{ formattime }}</div>
        <el-slider
          :show-tooltip="false"
          v-model="currentValues"
          @change="changeTime"
        ></el-slider>
        <div class="totle-time">{{ totleTime }}</div>
      </div>
      <div class="bg-jump" v-show="playing">
        <canvas id="wrap"></canvas>
      </div>
    </div>
    <!-- 其他工具控制器 -->
    <div class="other-tools">
      <div class="voise">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-mic"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-slider
              v-model="volumeValue"
              @change="handleCurrentVolume"
              vertical
              height="100px"
            >
            </el-slider>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="song-list" @click="controlSongLists">
        <img src="@/assets/icon/controltools/showlist.png" alt="" />
      </div>
    </div>
    <!-- 音频 -->
    <audio
      :src="currentSongInfo.url"
      autoplay
      @play="start"
      @ended="ended"
      @pause="pause"
      @timeupdate="handleCurrentTime"
      ref="audio"
    ></audio>

    <!-- min播放器的歌单列表 -->
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size="420px"
      class="drawer"
    >
      <div class="song-list">
        <div class="top">
          <span class="totle-song">总共{{ songList.length }}首</span>
          <div class="collect" @click="handleCollectAll">
            <i class="el-icon-folder-add"></i>
            <span>收藏全部</span>
          </div>
          <div class="clear" @click="handleClearAll">
            <i class="el-icon-delete"></i>
            <span>清空</span>
          </div>
        </div>
        <div class="content">
          <div v-for="(item, index) in songList" :key="index" class="item">
            <div
              class="song"
              :class="item.id === currentSongInfo.id ? 'active' : ''"
              @click="handleClickPlaySong(item, index)"
            >
              {{ item.name }}
            </div>
            <div
              class="singer"
              :class="item.id === currentSongInfo.id ? 'active' : ''"
            >
              <span
                v-for="singerItem in item.singer"
                :key="singerItem.id"
                @click="handleToSingerPapg(singerItem)"
                >{{ singerItem.name }} /
              </span>
            </div>
            <div class="el-icon-link link"></div>
            <div class="dt">{{ setForMatTime(item.totleTime) }}</div>
            <div class="delete" @click="handleDelete(item.id)">
              <i>×</i>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { forMatTime } from "@/utils/format";
import { parseLyric } from "@/utils/lyric";
import { getSimiPlayList, getMusicComment, getSongLyric } from "@/network/api";
export default {
  name: "MiniPlay",
  data() {
    return {
      //页面上现在歌曲播放的当前时间
      currentPlayTime: 0,
      //slider滑块滑动的current值
      currentValues: 0,
      //控制播放列表是否显示
      drawer: false,
      //控制播放方式的开关
      wayOfPlay: 0,
      //音量 1--100
      volumeValue: 20,
    };
  },
  computed: {
    ...mapGetters([
      "currentSongInfo",
      "playing",
      "songList",
      "currentTime",
      "isLoad",
      "currentIndex",
      "isTagMinPlayerToNext",
      "isShowFmPlayer",
      "isShowMaxPlayer",
    ]),
    totleTime() {
      return forMatTime((this.currentSongInfo.totleTime / 1000) | 0);
    },
    formattime() {
      return forMatTime((this.currentTime / 1000) | 0);
    },
  },
  methods: {
    ...mapMutations([
      "play",
      "stop",
      "setCurrentTime",
      "setNextSong",
      "setPreSong",
      "clearSongList",
      "setIsLoad",
      "resetCurrentSongInfo",
      "deleteSong",
      "randomPlayWay",
      "singlePlayWay",
      "changeCurrentPlay",
      "setCurrentIndex",
      "setToRecordSongList",
    ]),

    //画跳动的音符
    //优化 -
    drawMusicLine() {
      let wrap = document.getElementById("wrap");
      let cxt = wrap.getContext("2d");
      //获取API
      //var AudioContext = AudioContext || webkitAudioContext ;//兼容
      let context = new AudioContext();
      //加载媒体
      let audio = this.$refs.audio;
      audio.crossOrigin = "anonymous";
      //解决chrome的The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.
      document.documentElement.addEventListener("mousedown", () => {
        if (context.state !== "running") context.resume();
      });
      //创建节点
      let source = context.createMediaElementSource(audio);
      let analyser = context.createAnalyser();
      //连接：source → analyser → destination
      source.connect(analyser);
      analyser.connect(context.destination);
      let color;
      //创建数据
      let output = new Uint8Array(100);
      (function drawSpectrum() {
        analyser.getByteFrequencyData(output); //获取频域数据
        cxt.clearRect(0, 0, wrap.width, wrap.height);
        color = String(
          window
            .getComputedStyle(document.getElementsByTagName("body")[0])
            .getPropertyValue("--theme")
        ).trim();
        //画线条
        for (let i = 0; i < 100; i++) {
          let value = output[i]; //<===获取数据
          cxt.beginPath();
          cxt.lineWidth = 1;
          cxt.strokeStyle = color;
          cxt.globalAlpha = 0.5;
          cxt.moveTo(3 * i, wrap.height);
          cxt.lineTo(3 * i, value / 4);
          cxt.stroke();
        }
        //请求下一帧
        requestAnimationFrame(drawSpectrum);
      })();
    },

    start() {
      this.play();
    },

    ended() {
      //当前歌曲播放结束
      //看看是哪一种播放顺序
      //1.列表播放顺序
      switch (this.wayOfPlay) {
        case 0:
          this.setNextSong();
          break;
        case 1:
          this.randomPlayWay();
          break;
        case 2:
          this.singlePlayWay();
          break;
        case 3:
          this.setNextSong();
          break;
      }
      this.getMaxPlayAllInfo();
      //这里触发下一次的播放
      this.$refs.audio.play();
    },

    pause() {
      this.stop();
    },

    handleCurrentTime(e) {
      //这里e返回的current时间是以秒为单位的
      this.currentPlayTime = e.target.currentTime;
      //设置滑动条的移动到的位置
      this.currentValues = Math.floor(
        (this.currentPlayTime * 100) /
          ((this.currentSongInfo.totleTime / 1000) | 0)
      );
      //设置state的currentTime
      this.setCurrentTime(this.currentPlayTime * 1000);
    },

    handleCurrentVolume() {
      this.$refs.audio.volume = this.volumeValue / 100;
    },

    //处理播放与暂停按钮
    handlePlay() {
      //判断现在是播放还是停止
      if (this.playing) {
        //调用audio方法 暂停音乐
        this.$refs.audio.pause();
      } else {
        //调用audio方法 播放音乐
        this.$refs.audio.play();
      }
    },

    //点击拉动播放进度条处理事件
    changeTime(e) {
      //e返回的是currentValues number类型的
      //拉动完之后就知道了e的值 相当于知道了百分比 拉到的百分之多少的数值。
      //歌曲的总时间×百分比
      this.currentPlayTime = (this.currentSongInfo.totleTime * e) / 100;
      this.setCurrentTime(this.currentPlayTime);
      //audio有一个  设置或返回音频中的当前播放位置（以秒计）的属性
      this.$refs.audio.currentTime = (this.currentPlayTime / 1000) | 0;
      //设置时间轴移动到哪里
      this.currentValues = e;
    },

    async nextSong() {
      switch (this.wayOfPlay) {
        case 0:
          this.setNextSong();
          break;
        case 1:
          this.randomPlayWay();
          break;
        case 2:
          this.setNextSong();
          break;
        case 3:
          this.setNextSong();
          break;
      }
      this.getMaxPlayAllInfo();
      // this.$store.commit("SET_Tag_MIN_PLAYER_TO_NEXT");
      this.currentPlayTime = 0;
    },

    async preSong() {
      switch (this.wayOfPlay) {
        case 0:
          this.setPreSong();
          break;
        case 1:
          this.randomPlayWay();
          break;
        case 2:
          this.setPreSong();
          break;
        case 3:
          this.setPreSong();
          break;
      }
      this.getMaxPlayAllInfo();
      this.currentPlayTime = 0;
    },

    controlSongLists() {
      this.drawer = !this.drawer;
    },

    //转换时间格式
    setForMatTime(time) {
      return forMatTime((time / 1000) | 0);
    },

    //收藏所有播放歌单的音乐
    handleCollectAll() {
      console.log("收藏所有播放歌单的音乐");
    },

    //清除所有播放歌单的音乐
    handleClearAll() {
      //歌单列表的数据全部重置
      this.clearSongList();
      //隐藏
      // this.setIsLoad(false);
      //清空当前播放的歌曲数据
      // this.resetCurrentSongInfo();
      //停止音乐
      this.pause();
      this.$refs.audio.pause();
    },

    //从歌单中移除选中的歌曲
    handleDelete(id) {
      this.deleteSong(id);
    },

    //处理音乐播放方式
    handleChangePlayWay() {
      //0-- list
      //1-- random
      //2-- single
      //3-- order
      if (this.wayOfPlay == 3) {
        this.wayOfPlay = 0;
      } else {
        this.wayOfPlay++;
      }
    },

    //在播放列表中点击特定歌曲并进行播放
    handleClickPlaySong(values, index) {
      this.changeCurrentPlay(values);
      this.setCurrentIndex(index);
      this.setToRecordSongList(values);
    },

    handleToSingerPapg(values) {
      this.$router.push("/singerlistdetail/" + values.id);
    },

    //处理点击显示最大化播放器
    handleShowMaxPlayer() {
      if (this.isShowFmPlayer) {
        this.$router.push("/fm");
        return;
      }
      if (this.isShowMaxPlayer) {
        this.$store.commit("SET_IS_SHOW_MAX_PLAYER", false);
      } else {
        this.$store.commit("SET_IS_SHOW_MAX_PLAYER", true);
      }
    },

    async getMaxPlayAllInfo() {
      //获取歌词
      let lyric = await getSongLyric(this.currentSongInfo.id);
      this.currentSongInfo.lyric = parseLyric(lyric.data.lrc.lyric);
      //获取相似歌单
      let simimusic = await getSimiPlayList(this.currentSongInfo.id);

      this.$store.commit("SET_SIMI_SONG_LIST", simimusic.data.playlists);
      //获取单曲评论
      let musicComments = await getMusicComment(this.currentSongInfo.id, 100);
      this.$store.commit("SET_COMMENT_INFO", musicComments.data.comments);
    },
    //显示歌词
    handleShowLyric() {
      this.$store.commit("SET_SHOW_LYRIC");
    },
  },
  created() {
    this.$watch("playing", () => {
      if (!this.playing) {
        this.$refs.audio.pause();
      } else {
        this.$refs.audio.play();
      }
    });
  },
  mounted() {
    this.drawMusicLine();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.mini-play {
  width: 100%;
  display: flex;
  height: 75px;
  background-color: rgb(248, 248, 248);
  min-width: 1500px;
  // border-top: 2px solid rgb(197, 197, 197);
  .song-des {
    flex: 1;
    display: flex;
    line-height: 75px;
    height: 75px;
    .pic {
      justify-items: center;
      align-items: center;
      display: flex;
      padding-left: 20px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 5px;
      }
    }
    .song-info {
      display: flex;
      flex-direction: column;
      line-height: 75px;
      height: 75px;
      padding-left: 15px;
      .song-name {
        padding-top: 10px;
        line-height: 30px;
        height: 30px;
        font-size: 15px;
        cursor: pointer;
      }
      .artitse {
        line-height: 30px;
        height: 30px;
        font-size: 13px;
        cursor: pointer;
      }
    }
    .heart {
      padding-left: 5px;
      line-height: 55px;
    }
  }
  .control-tools {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .top {
      display: flex;
      margin-top: 5px;
      z-index: 999;
      justify-content: center;
      .way-of-play,
      .pre,
      .play-stop,
      .next,
      .lyric {
        z-index: 999;
        width: 35px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        margin: 0 5px;
      }
      .way-of-play:hover,
      .lyric:hover,
      .pre:hover,
      .play-stop:hover,
      .next:hover {
        width: 35px;
        height: 35px;
        text-align: center;
        background-color: $active-grey;
        border-radius: 50%;
      }
    }
    .bottom {
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      .current-time {
        display: inline-block;
        vertical-align: middle;
        padding-right: 10px;
      }
      .el-slider {
        display: inline-block;
        vertical-align: middle;
        width: 400px;
      }
      .totle-time {
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
      }
    }
    .bg-jump {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
      #wrap {
        width: 100%;
        height: 70%;
      }
    }
  }
  .other-tools {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
    .voise {
      text-align: center;
      width: 70px;
      line-height: 75px;
      .el-icon-mic {
        font-size: 25px;
      }
    }
    .song-list {
      text-align: center;
      width: 70px;
      line-height: 60px;
      font-size: 50px;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }
  .drawer {
    height: 100%;
    .song-list {
      height: 100%;
      .top {
        border-bottom: 1px solid gray;
        padding: 18px 25px;
        .totle-song {
          color: rgb(175, 175, 175);
          font-size: 13px;
        }
        .collect {
          display: inline-block;
          padding: 0 20px;
          border-right: 1px solid grey;
          margin-left: 50px;
          cursor: pointer;
          i {
            margin-right: 5px;
          }
        }
        .clear {
          display: inline-block;
          padding: 0 20px;
          cursor: pointer;
          i {
            margin-right: 5px;
          }
        }
      }
      .content {
        overflow: scroll;
        height: calc(100vh - 50px);
        font-size: 12.5px;
        .item {
          display: flex;
          height: 35px;
          line-height: 35px;
          cursor: pointer;
          .song {
            width: 170px;
            padding-left: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .active {
            color: red;
          }
          .link {
            text-align: center;
            line-height: 35px;
          }
          .singer {
            width: 110px;
            color: rgb(107, 107, 107);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .active {
            color: red;
          }
          .dt {
            color: rgb(175, 175, 175);
            padding-left: 30px;
          }
          .delete {
            text-align: center;
            margin-left: 20px;
            line-height: 35px;
            i {
              font-size: 15px;
            }
            i:hover {
              color: red;
              border-radius: 50%;
            }
          }
          &:hover {
            background-color: rgb(221, 221, 221);
            .dt {
              color: black;
            }
            .singer {
              color: black;
            }
            .song {
              color: black;
            }
          }
        }
      }
    }
  }
}

// 重置样式
::v-deep {
  .el-slider__button {
    width: 6px;
    height: 6px;
    border: 2px solid $theme-color;
    background-color: $theme-color;
  }
  .el-slider__bar {
    background-color: $theme-color;
  }
}
</style>
