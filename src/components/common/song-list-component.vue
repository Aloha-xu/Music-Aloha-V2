<template>
  <div class="songlist-component">
    <div class="title-name">
      <span>音乐标题</span>
      <!-- 飙升榜的标题卡槽 -->
      <slot name="SoaringrateTitle"></slot>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <div
      class="song-item"
      v-for="(item, index) in songsInfo"
      :key="index"
      :class="item.id === currentSongInfo.id ? 'active-bg' : ''"
    >
      <div class="index-number">
        {{ setIndex(index) }}
      </div>
      <img
        src="@/assets/icon/heart.svg"
        alt=""
        v-show="!isHeart(item.id)"
        @click="ClickHeart(item.id, index)"
        class="no-active-heart"
      />
      <img
        src="@/assets/icon/heartactive.svg"
        alt=""
        v-show="isHeart(item.id)"
        @click="ClickHeart(item.id, index)"
        class="active-heart"
      />
      <p class="el-icon-download" @click="handleDownload(item)"></p>
      <div class="song-name" @click="HandleSongClick(item, index)">
        <span :class="item.id === currentSongInfo.id ? 'active-name' : ''">{{
          item.name
        }}</span>
        <!-- SQ MV logo的卡槽 -->
        <slot name="SQlogo"></slot>
        <slot name="MVlogo"></slot>
      </div>
      <!-- 飙升榜的数据卡槽 -->
      <slot name="SoaringrateData"></slot>
      <div class="singer">
        <span
          v-for="(item1, index1) in item.singer"
          :key="index1"
          @click="clickToSingerPapg(item1.id)"
          >{{ item1.name }}&nbsp;</span
        >
      </div>
      <div class="album" @click="clickToAlbumPapg(item.album.id)">
        {{ item.album.name }}
      </div>
      <div class="time">{{ setSongTime(item.totleTime) }}</div>
    </div>
  </div>
</template>

<script>
import { getLikeList } from "@/network/api";
import { forMatTime } from "@/utils/format";
import { mapGetters } from "vuex";

export default {
  name: "SongListComponent",
  data() {
    return {
      isClickHeart: false,
      //歌单的全部列表信息
      allSongList: [],
      likeList: [],
    };
  },
  props: {
    songsInfo: Array,
    playList: Array,
  },
  methods: {
    /* 点击指定红星添加收藏未做 */
    //点击后判断是否已经收藏了 控制收藏没有的的元素不可以为data的全局元素 否一点就全改变了
    async ClickHeart(id) {
      console.log(id);
      //把传进来的id与likelist对比    非-1则存在 红星 / -1 空红星
      // let currentIndex = this.likeList.findIndex((item) => item == id);
      // if (currentIndex == -1) {
      //   await setLike(id, true);
      // } else {
      //   await setLike(id, false);
      //   //⭐⭐⭐460 网络拥挤  没办法了 以后再写把
      // }
      alert("460 网络拥挤");
    },
    // 处理点击播放音乐事件
    HandleSongClick(values, index) {
      this.$emit("handleSongClick", [values, index]);
      this.$store.commit("SET_IS_SHOW_FM_PLAYER", false);
      // this.$store.state.isShowFmPlayer = false;
    },
    handleDownload(values) {
      this.$emit("handleDownload", values);
    },
    //计算歌曲时间
    setSongTime(time) {
      return forMatTime((time / 1000) | 0);
    },
    //转换下表格式
    setIndex(values) {
      let index = values + 1;
      return index < 10 ? "0" + index : index;
    },
    isHeart(id) {
      //把传进来的id与likelist对比    非-1则存在 红星 / -1 空红星
      let currentIndex = this.likeList.findIndex((item) => item == id);
      if (currentIndex == -1) {
        return false;
      }
      return true;
    },
    clickToSingerPapg(id) {
      this.$router.push("/singerlistdetail/" + id);
    },
    clickToAlbumPapg(id) {
      this.$router.push("/albumlistdetail/" + id);
    },
  },
  computed: {
    ...mapGetters(["currentSongInfo"]),
  },
  async created() {
    let uInfo = JSON.parse(window.sessionStorage.getItem("currentUserInfo"));
    let uId = uInfo.userId;
    let likeList = await getLikeList(uId);
    this.likeList = likeList.data.ids;
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.songlist-component {
  .title-name {
    display: flex;
    margin-left: 100px;
    height: 30px;
    line-height: 30px;
    span:nth-child(1) {
      flex: 4;
    }
    span:nth-child(2) {
      flex: 4;
    }
    span:nth-child(3) {
      flex: 3;
    }
    span:nth-child(4) {
      flex: 1;
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
    .index-number {
      margin: 0 10px 0 20px;
      vertical-align: middle;
    }
    .no-active-heart,
    .active-heart {
      margin: 0 5px;
      width: 20px;
      height: 35px;
      vertical-align: middle;
    }
    p {
      vertical-align: middle;
      padding: 0 5px;
    }
    .song-name {
      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      .active-name {
        color: $theme-color;
      }
    }
    .singer {
      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .album {
      flex: 3;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time {
      flex: 1;
    }
  }
  .active-bg {
    background-color: $click-grey;
  }
}
</style>
