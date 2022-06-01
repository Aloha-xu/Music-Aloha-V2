<template>
  <div class="search-detail-video">
    <div class="content">
      <MvCard
        v-for="(item, index) in videoInfo.mvs"
        :key="index"
        :pic="item.cover + '?param=314y148'"
        :id="String(item.id)"
        :playcount="item.playCount"
        :playType="playType"
        :singer="item.artistName.split('')"
        :text="item.name"
        @handleToPapg="handleToSingerPapg(item.id)"
      ></MvCard>
    </div>
  </div>
</template>

<script>
import MvCard from "@/components/common/MvCard.vue"; //?w
export default {
  components: { MvCard },
  name: "SearchDetailVideo",
  props: {
    videoInfo: Object,
  },
  data() {
    return {
      playType: "video",
    };
  },
};
</script>

<style scoped lang="scss">
.search-detail-video {
  display: flex;
  width: 100%;
  justify-content: center;
  .content {
    display: flex;
    flex-wrap: wrap;
    width: 1100px;
    @media (min-width: 1351px) {
      .card {
        margin-right: 20px;
        width: 22%;
      }
      .card:nth-child(4n + 1) {
        margin-left: 10px;
      }
    }

    @media (max-width: 1350px) {
      .card {
        margin-right: 20px;
        width: 28.5%;
      }
      .card:nth-child(3n + 1) {
        margin-left: 40px;
      }
    }
  }
}
</style>
