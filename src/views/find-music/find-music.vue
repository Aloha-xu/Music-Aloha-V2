<template>
  <div class="find-music">
    <NavBar />
    <div class="container" ref="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavBar from "@/views/find-music/navbar.vue";
import { scrollTo } from "@/utils/scroll-to.js";
import { mapGetters } from "vuex";
export default {
  name: "FindMusic",
  components: {
    NavBar,
  },
  watch: {
    loading() {
      scrollTo(0, 600, this.$refs.container);
    },
  },
  computed: {
    ...mapGetters(["loading"]),
  },
};
</script>

<style scoped lang="scss">
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
