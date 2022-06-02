<template>
  <div class="private-fm">
    <div class="content_">
      <div class="fm-content">
        <div class="record-tools">
          <div class="record">
            <div class="pic">
              <el-image
                :src="currentSongInfo.pic + '?param=300y300'"
                class="current-pic"
              >
                <!-- 先不做这一块 -->
                <!-- <div slot="placeholder" class="image-slot">
                  <el-skeleton>
                    <template slot="template">
                      <el-skeleton-item
                        variant="image"
                        style="width: 300px; height: 300px"
                      />
                    </template>
                  </el-skeleton>
                </div> -->
              </el-image>
              <i
                class="el-icon-caret-right play-button"
                v-show="!playing || !goblePlayingState"
                @click="handlePlayingState"
              ></i>
              <img
                src="@/assets/icon/controltools/stop.png"
                alt=""
                v-show="playing && goblePlayingState"
                class="stop-button"
                @click="handlePlayingState"
              />
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
              />
            </div>
            <div class="delete">
              <i class="el-icon-delete" style="font-size: 30px"></i>
            </div>
            <div class="next" @click="nextSong">
              <i class="el-icon-caret-right" style="font-size: 30px"></i>
            </div>
            <div class="more">
              <i class="el-icon-more" style="font-size: 30px"></i>
            </div>
          </div>
        </div>
        <div class="song-info">
          <div class="song-name">{{ currentSongInfo.name }}</div>
          <div class="album-name">
            专辑：<span>{{ currentSongInfo.album }}</span>
          </div>
          <div class="singer-name">
            歌手：<span v-for="item in currentSongInfo.singer" :key="item.id">{{
              item.name
            }}</span>
          </div>
          <!-- 纯音乐的时候显示为该音乐为纯音乐的文字 -->
          <div
            class="lyric"
            ref="lyric"
            id="lyric"
            v-show="currentSongInfo.lyric"
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
          <div class="noLyric" v-show="!currentSongInfo.lyric">纯音乐</div>
        </div>
      </div>
      <div class="comment">
        <Comment
          :commentInfo="commentInfo"
          @refeshCommrnt="addCommentToCache"
          :t="replyWay"
          :type="0"
          :id="currentSongInfo.id"
          @setReplyWay="setReplyWay"
        ></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/common/Comment.vue";
import { parseLyric } from "@/utils/lyric";
import { _throttle } from "@/utils/uctil";
import { fm, getSongUrl, getSongLyric, getMusicComment } from "@/network/api";
import { mapGetters } from "vuex";
export default {
  name: "PrivateFM",
  data() {
    return {
      textarea: "",
      commentInfo: [],
      playing: true,
      playList: [],
      tag: true,
      replyWay: 1,
      unwatch: null,
    };
  },
  components: {
    Comment,
  },
  methods: {
    //私人fm接口数据
    async getSongInfo() {
      const { data } = await fm();
      const Urls = await getSongUrl(data.data.map(({ id }) => id));

      //用歌曲的id做对象的key，url为value
      let innerUrls = {};
      Urls.data.data.forEach(({ id, url }) => {
        innerUrls[id] = url;
      });

      for (let i = 0; i < data.data.length; i++) {
        let currentSongInfo = {};
        currentSongInfo.id = data.data[i].id;
        currentSongInfo.url = innerUrls[data.data[i].id];
        currentSongInfo.name = data.data[i].name;
        currentSongInfo.album = data.data[i].album.name;
        currentSongInfo.singer = [];
        for (let j = 0; j < data.data[i].artists.length; j++) {
          currentSongInfo.singer[j] = {
            name: data.data[i].artists[j].name,
            id: data.data[i].artists[j].id,
          };
        }
        currentSongInfo.pic = data.data[i].album.blurPicUrl;
        currentSongInfo.totleTime = data.data[i].duration;
        currentSongInfo.lyric = null;
        this.playList.push(currentSongInfo);
      }
      this.$store.commit("changeCurrentPlay", this.playList[0]);
      this.$store.commit(
        "setAllSongsToPlayList",
        JSON.parse(JSON.stringify(this.playList))
      );
      this.getCommentInfo();
      this.getLyricInfo();
      this.$store.commit("setIsLoad", true);
    },

    handlePlayingState() {
      if (this.playing) {
        this.$store.commit("stop");
      } else {
        this.$store.commit("play");
      }
      this.playing = !this.playing;
    },

    async getCommentInfo() {
      let comment = await getMusicComment(this.currentSongInfo.id);
      this.commentInfo = comment.data.comments;
    },

    addCommentToCache(val) {
      this.commentInfo.unshift(val);
    },

    async getLyricInfo() {
      let lyric = await getSongLyric(this.currentSongInfo.id);
      let innerCurrentSongInfo = this.currentSongInfo;
      innerCurrentSongInfo.lyric = parseLyric(lyric.data.lrc.lyric);
      this.$store.commit("changeCurrentPlay", innerCurrentSongInfo);
    },

    //点击下一首歌曲按钮
    nextSong() {
      //判断是否是最后一首
      //是 --》请求数据     不是 --》切下一首
      if (this.currentSongIndex > this.playList.length) {
        console.log("请求数据");
        //清除原有的数据
        this.$store.commit("resetCurrentSongInfo");
        this.playList = [];
        this.$store.commit("setCurrentIndex", 0);
        this.playing = true;
        //再一次请求数据
        this.getSongInfo();
      } else {
        console.log("不请求数据");
        this.playing = true;
        this.$store.commit("setCurrentIndex", this.currentSongIndex + 1);
        this.$store.commit("changeCurrentPlay", this.currentSongInfo);
        this.getCommentInfo();
        this.getLyricInfo();
      }
    },

    syncLyricToTime(values, index) {
      let flag = false;
      let currentTime = parseInt(this.currentTime / 1000);
      if (
        //到最后数组没有下一个了
        this.currentSongInfo.lyric[index + 1] &&
        currentTime >= values.time &&
        currentTime < this.currentSongInfo.lyric[index + 1]?.time &&
        index <= this.currentSongInfo.lyric.length
      ) {
        flag = true;
      }
      return flag;
    },

    setReplyWay(val) {
      this.replyWay = val;
    },
  },
  computed: {
    ...mapGetters(["isTagMinPlayerToNext", "currentTime", "currentSongInfo"]),
    ...mapGetters({
      goblePlayingState: "playing",
      currentSongIndex: "currentIndex",
    }),
  },
  async created() {
    this.$store.commit("SET_IS_SHOW_FM_PLAYER", true);
    console.log("created");
    // this.getSongInfo();
    //注册监听器
    this.unwatch = this.$watch(
      "currentTime",
      _throttle(() => {
        let offset = 36;
        let lyric = this.$refs.lyric;
        let currentIndex = this.currentSongInfo.lyric?.findIndex(
          (item) => parseInt(this.currentTime / 1000) === item.time
        );
        if (
          currentIndex <= 4 ||
          currentIndex + 4 === this.currentSongInfo.lyric?.length
        ) {
          return;
        }
        lyric.scrollTop = (currentIndex - 4) * offset;
      }, 700)
    );
  },
  activated() {
    this.$store.commit("SET_IS_SHOW_FM_PLAYER", true);
    console.log("activated");
    this.getSongInfo();
  },
  beforeDestroy() {
    // 移除监听
    this.unwatch && this.unwatch();
  },
  watch: {
    isTagMinPlayerToNext() {
      this.nextSong();
    },
  },
};
</script>

<style scoped lang="scss">
.private-fm {
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow: scroll;
  //如果需要用flex居中一个box 要给他父元素一个width 否者父元素大小就是子元素大小 这样怎么都不能居中效果
  width: 100%;
  .content_ {
    width: 1100px;

    .fm-content {
      width: 1100px;
      display: flex;
      .record-tools {
        width: 50%;
        .record {
          width: 100%;
          height: 320px;
          .pic {
            height: 320px;
            margin-top: 80px;
            position: relative;
            .current-pic {
              width: 300px;
              height: 300px;
              z-index: 998;
              position: absolute;
              left: 200px;
              top: 0;
            }
            .next-pic {
              width: 250px;
              height: 250px;
              position: absolute;
              left: 170px;
              top: 25px;
            }
            .play-button {
              position: absolute;
              left: 330px;
              top: 125px;
              z-index: 999;
              background-color: white;
              border: 1px solid white;
              border-radius: 50%;
              padding: 8px;
              font-size: 30px;
            }
            .stop-button {
              position: absolute;
              left: 460px;
              top: 260px;
              z-index: 999;
              background-color: white;
              border: 1px solid white;
              border-radius: 50%;
              padding: 8px;
              font-size: 30px;
            }
          }
        }
        .tools {
          display: flex;
          text-align: center;
          margin-top: 10px;
          margin-left: 100px;
          justify-content: center;
          .heart,
          .more,
          .next,
          .delete {
            margin: 10px;
            margin-top: 25px;
            margin-left: 25px;
            border: 1px solid gray;
            border-radius: 50%;
            padding: 5px 6px;
          }
        }
      }
      .song-info {
        width: 45%;
        height: 50%;
        padding-top: 40px;
        text-align: center;
        .song-name {
          font-size: x-large;
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
            color: rgb(101, 85, 247);
            cursor: pointer;
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
    }
    .comment {
      width: 1100px;
      margin-top: 40px;
      top: 550px;
      .title {
        font-size: x-large;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
