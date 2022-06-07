<template>
  <div class="user-record">
    <div class="heard">
      <span class="title">最近播放</span>
      <span class="totle-songs">共{{ songsInfo.length }}首</span>
      <span class="clean-btn" @click="cleanSongList">清空列表</span>
    </div>
    <div class="play-all-btn">
      <el-button round @click="handlePlayAllSongs">
        <span class="el-icon-caret-right">播放全部</span>
        <span class="el-icon-plus play-all"></span>
      </el-button>
    </div>
    <div class="song-list">
      <div class="title-name">
        <div class="title">
          <span>音乐标题</span>
        </div>
        <div>歌手</div>
        <div>播放时间</div>
      </div>
      <div
        class="song-item"
        v-for="(item, index) in songsInfo"
        :key="index"
        :class="item.id === currentId.id ? 'active' : ''"
      >
        <div class="song-name" @click="HandleSongClick(item, index)">
          <div class="index-number">
            {{ setIndex(index) }}
          </div>
          <span>{{ item.name }}</span>
        </div>
        <div class="singer">
          <span
            v-for="(item1, index1) in item.singer"
            :key="index1"
            @click="clickToSingerPapg(item1.id)"
            >{{ item1.name }}&nbsp;</span
          >
        </div>
        <div class="time">刚刚</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSimiPlayList, getMusicComment, getCheckMusic } from "@/network/api";
import { mapGetters } from "vuex";
export default {
  name: "UserRecord",
  data() {
    return {};
  },
  methods: {
    async init() {},
    clickToSingerPapg(id) {
      this.$router.push("/singerlistdetail/" + id);
    },
    async HandleSongClick(item, index) {
      try {
        const checkmusic = await getCheckMusic(item.id);
        //判断音乐是否有版权
        if (checkmusic.data.success) {
          //修改当前播放的音乐信息
          this.$store.commit("changeCurrentPlay", item);

          //isload图片
          this.$store.commit("setIsLoad", "true");

          //获取某一首歌的相似歌单信息
          let simimusic = await getSimiPlayList(item.id);
          this.$store.commit("SET_SIMI_SONG_LIST", simimusic.data.playlists);
          // this.$store.state.SimiSongList = simimusic.data.playlists;
          //获取某一首歌的评论
          let musicComments = await getMusicComment(item.id, 100);
          this.$store.commit("SET_COMMENT_INFO", musicComments.data.comments);
          // this.$store.state.commentInfo = musicComments.data.comments;
          this.$store.commit("setToRecordSongList", item);
          this.$store.commit("SET_CURRENT_SONG_ID", index);
          // this.currentId = index;
        }
      } catch (error) {
        alert("音乐没有版权");
      }
    },
    setIndex(values) {
      let index = values + 1;
      return index < 10 ? "0" + index : index;
    },
    handlePlayAllSongs() {
      this.$store.commit(
        "setAllSongsToPlayList",
        JSON.parse(JSON.stringify(this.songsInfo))
      );
      this.$store.commit("changeCurrentPlay", this.songsInfo[0]);
      this.$store.commit("setIsLoad", "true");
    },
    cleanSongList() {
      this.$store.commit("clearRecordSongList");
    },
  },
  created() {
    this.init();
  },
  computed: {
    ...mapGetters({
      songsInfo: "recordSongList",
      currentId: "currentSongInfo",
    }),
    // songsInfo() {
    //   return this.$store.state.recordSongList;
    // },
    // currentId() {
    //   return this.$store.state.currentSongInfo.id;
    // },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/theme.scss";
.user-record {
  overflow: scroll;
  height: 87vh;
  width: 100%;
  .heard {
    height: 50px;
    padding-left: 50px;
    padding-top: 20px;
    .title {
      font-size: 21px;
      font-weight: 800;
    }
    .totle-songs {
      font-size: 14px;
      font-weight: 300;
      margin-left: 5px;
    }
    .clean-btn {
      cursor: pointer;
      float: right;
      padding-right: 20px;
      color: $background-theme-color-3;
      &:hover {
        color: rgb(42, 42, 161);
      }
    }
  }
  .play-all-btn {
    padding-left: 50px;
    padding-bottom: 20px;
    .el-button {
      padding: 5px 10px;
      height: 30px;
      background-color: $theme-color;
      color: white;
    }
  }
  .song-list {
    .title-name {
      display: flex;
      height: 30px;
      line-height: 30px;
      .title {
        flex: 15;
        span:nth-child(1) {
          padding-left: 50px;
        }
      }
      div:nth-child(2) {
        flex: 5;
      }
      div:nth-child(3) {
        flex: 4;
      }
    }
    .song-item {
      font-size: 15px;
      height: 35px;
      line-height: 35px;
      display: flex;
      cursor: pointer;
      &:nth-child(2n-1) {
        background-color: $bg-grey;
      }
      &:hover {
        background-color: $active-grey;
      }

      .song-name {
        flex: 15;
        overflow: hidden;
        text-overflow: ellipsis;
        .index-number {
          display: inline-block;
          padding: 0 10px 0 20px;
        }
      }
      .singer {
        flex: 5;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .time {
        flex: 4;
      }
    }
    .active {
      background-color: $click-grey;
    }
  }
}
</style>
