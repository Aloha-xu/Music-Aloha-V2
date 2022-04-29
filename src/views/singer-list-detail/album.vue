<template>
  <div class="album-compontent">
    <div class="centent">
      <play-card
        v-for="(item, index) in ArtistAlbumInfo"
        :key="index"
        :id="item.id"
        :pic="item.picUrl"
        :text="item.name"
        class="item"
      >
        <span slot="yymmdd">{{ getYMD(item.publishTime) }}</span>
      </play-card>
    </div>
  </div>
</template>

<script>
import PlayCard from "@/components/common/play-card.vue";
import { getYMD } from "@/utils/uctil";
export default {
  components: { PlayCard },
  name: "Album",
  props: {
    ArtistAlbumInfo: Array,
  },
  methods: {
    getYMD(time) {
      return getYMD(time);
    },
  },
};
</script>

<style scoped lang='scss'>
.album-compontent {
  width: 100%;
}
.album-compontent .centent {
  width: 98%;
  display: flex;
  flex-wrap: wrap;
}
.album-compontent .centent .item {
  width: 13%;
  margin: 20px;
  margin-left: 30px;
}
</style>