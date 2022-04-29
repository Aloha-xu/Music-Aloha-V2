<template>
  <div id="app">
    <Header v-show="!this.$store.state.isShowMaxPlayer" />
    <div v-show="!this.$store.state.isShowMaxPlayer" class="container">
      <div class="aside" width="210px">
        <NavBar />
      </div>
      <div class="main">
        <keep-alive
          exclude="PlayListDetail,AlbumListDetail,SingerListDetail,MvDetail,UpDataPapg"
        >
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <MaxPlay v-if="this.$store.state.isShowMaxPlayer"></MaxPlay>
    <MiniPlay class="mini-play"></MiniPlay>
  </div>
</template>
<script>
import Header from "./views/header/header.vue";
import NavBar from "./views/aside/navbar.vue";
import MaxPlay from "./views/player/MaxPlay.vue";
import MiniPlay from "./views/player/MiniPlay.vue";
export default {
  name: "app",
  components: {
    Header,
    NavBar,
    MaxPlay,
    MiniPlay,
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
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
    border-right: 1.5px solid rgba(173, 174, 175, 0.5);
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
