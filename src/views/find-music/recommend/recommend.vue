<template>
  <div class="recommend">
      <Swiper :banner="banner"></Swiper>
      <RemcommendList />
      <ExclusivePush />
      <NewMusic />
      <RecommendMv />
      <Radio />
  </div>
</template>

<script>
import Swiper from "@/components/common/swiper.vue";
import RemcommendList from "@/views/find-music/recommend/recommend-list/recommend-list.vue";
import ExclusivePush from "@/views/find-music/recommend/exclusive-push/exclusive-push.vue";
import NewMusic from "@/views/find-music/recommend/new-music/new-music.vue";
import RecommendMv from "@/views/find-music/recommend/recommend-mv/recommend-mv.vue";
import Radio from "@/views/find-music/recommend/radio/radio.vue";
import { getBanner } from "@/network/api";
export default {
  name: "Recommend",
  data() {
    return {
      banner: [],
    };
  },
  components: {
    Swiper,
    RemcommendList,
    ExclusivePush,
    NewMusic,
    RecommendMv,
    Radio,
  },
  async created() {
    this.$store.commit("refeshCurrentNavIndex", 0);
    const { data } = await getBanner();
    this.banner = data.banners;
  },
  activated() {
    this.$store.commit("refeshCurrentNavIndex", 0);
  },
};
</script>

<style scoped lang='scss'>
.recommend{
  width: 1100px;
}
</style>