<template>
  <div class="find-music">
    <NavBar />
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavBar from "@/views/find-music/navbar.vue";
export default {
  name: "FindMusic",
  components: {
    NavBar,
  },
};
</script>

<style scoped lang='scss'>
.find-music {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: scroll;
    height: calc(100% - 65px);
  }
}
</style>