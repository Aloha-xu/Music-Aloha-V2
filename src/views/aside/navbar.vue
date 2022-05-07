<template>
  <div class="left-navbar">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#fff"
      active-text-color="black"
    >
      <el-menu-item index="1-1" @click="ClickToFindMusicPapg">
        <span slot="title" class="slot">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="1-2" @click="ClickToMVPapg">
        <span slot="title" class="slot">视频</span>
      </el-menu-item>
      <!-- <el-menu-item index="1-3" @click="ClickToFriendPapg">
        <span slot="title" class="slot">朋友</span>
      </el-menu-item>
      <el-menu-item index="1-4" @click="ClickToLivePapg">
        <span slot="title" class="slot">直播</span>
      </el-menu-item> -->
      <el-menu-item index="1-5" @click="ClickToFMPapg">
        <span slot="title" class="slot">私人FM</span>
      </el-menu-item>
      <el-menu-item index="1-6" @click="ClickToRecordPapg">
        <span slot="title" class="slot">最近播放</span>
      </el-menu-item>
    </el-menu>
    <div class="user-songlist">
      <div class="created-playlist">
        <div class="titile">
          <span class="name" @click="handleShowPlaylist">创建的歌单</span>
          <i
            class="el-icon-caret-right"
            @click="handleShowPlaylist"
            v-show="!isShowPlaylist"
          ></i>
          <i
            class="el-icon-caret-bottom"
            v-show="isShowPlaylist"
            @click="handleShowPlaylist"
          ></i>
          <i class="el-icon-plus"></i>
        </div>
        <div
          class="user-love"
          v-show="isShowPlaylist"
          @click="handleToPlaylistPapg(heartSonglist.id, 'heartplaylist')"
        >
          <img src="@/assets/icon/heart.svg" alt="" />
          <span class="name">我喜欢的音乐</span>
        </div>
        <div
          class="playlist-item"
          v-for="(item, index) in mySonglist"
          :key="index"
          v-show="isShowPlaylist"
          @click="handleToPlaylistPapg(item.id, 'myplaylist')"
        >
          <i class="el-icon-service"></i>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
      <div class="collectd-playlist">
        <div class="titile" @click="handleShowCollectPlaylist">
          <span class="name">收藏的歌单</span>
          <i class="el-icon-caret-right" v-show="!isShowCollectPlaylist"></i>
          <i class="el-icon-caret-bottom" v-show="isShowCollectPlaylist"></i>
        </div>
        <div
          class="playlist-item"
          v-for="(item, index) in collectSonglist"
          :key="index"
          v-show="isShowCollectPlaylist"
          @click="handleToPlaylistPapg(item.id, 'collectplaylist')"
        >
          <i class="el-icon-service"></i>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { /* getsubcount,  */ getUserPlaylist } from "@/network/api";
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      //控制歌单是否下拉
      isShowPlaylist: false,
      isShowCollectPlaylist: false,
    };
  },
  methods: {
    ClickToFindMusicPapg() {
      this.$router.push("/findmusic");
    },
    ClickToMVPapg() {
      this.$router.push("/videohome");
    },
    // ClickToFriendPapg() {
    //   this.$router.push("/friend");
    // },
    // ClickToLivePapg() {
    //   this.$router.push("/live");
    // },
    ClickToFMPapg() {
      this.$router.push("/fm");
    },
    ClickToRecordPapg() {
      this.$router.push("/record");
    },
    //歌单的信息需要写在topnavbar上面 传到vuex 实现跨页面同步数据
    //也可以动态监听 computed 或者 watch
    async handleShowPlaylist() {
      this.isShowPlaylist = !this.isShowPlaylist;
      //判断vuex里面有没用户歌单列表信息
      if (!this.heartSonglist) {
        this.getUserPlaylist();
      }
    },
    async handleShowCollectPlaylist() {
      this.isShowCollectPlaylist = !this.isShowCollectPlaylist;
      if (!this.heartSonglist) {
        this.getUserPlaylist();
      }
    },
    //获取用户的歌单信息
    async getUserPlaylist() {
      let uInfo = JSON.parse(window.sessionStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      console.log(playlist);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist", uId);
    },
    handleToPlaylistPapg(id, type) {
      if (type == "myplaylist") {
        this.$store.commit("SET_IS_SHOW_UPDATA_COMPONENT", true);
        // this.$store.state.isShowUpdataComponent = true;
      } else {
        this.$store.commit("SET_IS_SHOW_UPDATA_COMPONENT", false);
        // [(this.$store.state.isShowUpdataComponent = false)];
      }
      this.$router.push("/playlistdetail/" + id);
    },
  },
  computed: {
    ...mapGetters(["mySonglist", "heartSonglist", "collectSonglist"]),
    // mySonglist() {
    //   return this.$store.state.mySonglist;
    // },
    // heartSonglist() {
    //   return this.$store.state.heartSonglist;
    // },
    // collectSonglist() {
    //   return this.$store.state.collectSonglist;
    // },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.left-navbar {
  .el-menu-vertical-demo {
    border: 0px;
    padding-left: 10px;
    .el-menu-item {
      height: 56px;
      line-height: 56px;
      margin-top: 10px;
    }
    .slot {
      margin-left: 10px;
    }
  }
  .user-songlist {
    .created-playlist,
    .collectd-playlist {
      cursor: pointer;
      margin-top: 10px;
      .titile {
        padding: 10px 0;
        padding-left: 20px;
        height: 35px;
        line-height: 35px;
        .name {
          font-size: 15px;
          padding-left: 20px;
          margin-top: 15px;
        }
        .el-icon-caret-right,
        .el-icon-caret-bottom {
          margin-left: 5px;
          font-size: 15px;
        }
        .el-icon-caret-right:hover,
        .el-icon-caret-bottom:hover {
          color: rgb(78, 78, 78);
        }
        .el-icon-plus {
          margin-left: 40px;
          color: rgba(173, 174, 175, 0.5);
        }
        .el-icon-plus:hover {
          color: rgb(0, 0, 0);
        }
        &:hover {
          background-color: rgb(204, 204, 204);
          border-radius: 5px;
        }
      }
      .user-love {
        height: 45px;
        line-height: 45px;
        padding-left: 25px;
        img {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          margin-left: 10px;
        }
        &:hover {
          background-color: rgb(204, 204, 204);
        }
      }
      .playlist-item {
        height: 45px;
        padding-left: 25px;
        line-height: 45px;
        .el-icon-service {
          font-size: 17px;
          vertical-align: middle;
        }
        .name {
          display: inline-block;
          width: 150px;
          margin-left: 10px;
          vertical-align: middle;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:hover {
          background-color: rgb(204, 204, 204);
        }
      }
    }
  }
}
</style>
