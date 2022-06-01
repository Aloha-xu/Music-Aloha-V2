<template>
  <div class="mv-compontent">
    <PlayCard
      v-for="(item, index) in ArtistMVInfo"
      :key="index"
      :id="item.id"
      :pic="item.imgurl16v9 + '?param=307y173'"
      :playcount="item.playCount"
      :text="item.name"
      class="item"
      @cardClick="cardClick"
    >
      <span slot="totlepalytime">{{ Duration(item.duration) }}</span>
    </PlayCard>
  </div>
</template>

<script>
import PlayCard from "@/components/common/PlayCard.vue";
import { forMatTime } from "@/utils/format";
export default {
  components: { PlayCard },
  name: "MV",
  props: {
    ArtistMVInfo: Array,
  },
  methods: {
    Duration(time) {
      return forMatTime(time / 1000);
    },
    cardClick(id) {
      this.$router.push("/mvdetail/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.mv-compontent {
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
}
.mv-compontent .item {
  width: 18.5%;
  margin: 10px;
}
</style>
