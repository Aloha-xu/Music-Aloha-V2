<template>
  <div id="app">
    <Header v-show="!isShowMaxPlayer" />
    <div v-show="!isShowMaxPlayer" class="container">
      <div class="aside" width="210px">
        <NavBar />
      </div>
      <div class="main">
        <keep-alive
          exclude="PlayListDetail,AlbumListDetail,SingerListDetail,MvDetail,UpDataPapg,UserDetail,AllMvPapg,SearchDetail"
        >
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <MaxPlay v-if="isShowMaxPlayer"></MaxPlay>
    <MiniPlay class="mini-play"></MiniPlay>
    <!-- 歌词弹出框 -->
    <LyricComponent v-if="isShowLyric" />
    <UpdateInfomationPopover v-if="isShowUpdateInfomation" />
  </div>
</template>
<script>
import Header from "./views/header/header.vue";
import NavBar from "./views/aside/navbar.vue";
import MaxPlay from "./views/player/MaxPlay.vue";
import MiniPlay from "./views/player/MiniPlay.vue";
import UpdateInfomationPopover from "./UpdateInfomationPopover.vue";
import LyricComponent from "./components/common/LyricComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    Header,
    NavBar,
    MaxPlay,
    MiniPlay,
    LyricComponent,
    UpdateInfomationPopover,
  },
  computed: {
    ...mapGetters(["isShowMaxPlayer", "isShowLyric"]),
    isShowUpdateInfomation() {
      return localStorage.getItem("isShowUpdateInfomation") ? false : true;
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/variables.scss";
#app {
  width: 100vw;
  height: 100vh;
  background-color: $bg;
}
.container {
  width: 100%;
  display: flex;
  height: calc(100vh - 135px);
  .aside {
    height: 100%;
    overflow: scroll;
    min-width: 210px;
  }
  .main {
    flex: 1;
  }
}
.mini-play {
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
