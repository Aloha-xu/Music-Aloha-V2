<template>
  <div class="album-compontent">
    <div class="centent">
      <PlayCard
        v-for="(item, index) in ArtistAlbumInfo"
        :key="index"
        :id="item.id"
        :pic="item.picUrl + '?param=220y220'"
        :text="item.name"
        class="item"
        @cardClick="cardClick"
      >
        <span slot="yymmdd">{{ getYMD(item.publishTime) }}</span>
        <span slot="card_palycount"></span>
      </PlayCard>
    </div>
  </div>
</template>

<script>
import PlayCard from "@/components/common/PlayCard.vue";
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
    cardClick(id) {
      this.$router.push("/playlistdetail/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.album-compontent {
  width: 100%;
  .centent {
    width: 98%;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 13%;
      margin: 20px;
      margin-left: 30px;
      ::v-deep {
        .playcard-img {
          height: 217px;
        }
      }
    }
  }
}
</style>
