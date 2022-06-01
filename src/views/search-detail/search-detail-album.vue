<template>
  <div class="search-detail-album">
    <SearchDetailCard
      v-for="(item, index) in albumInfo.albums"
      :key="index"
      :name="item.name"
      :scover="item.picUrl + '?param=60y60'"
      :creater="item.artist.name"
      @handleToPapg="handleToAlbumPapg(item.id)"
    ></SearchDetailCard>
  </div>
</template>

<script>
import SearchDetailCard from "@/components/common/SearchDetailCard.vue";
export default {
  components: { SearchDetailCard },
  name: "SearchDetailAlbum",
  props: {
    albumInfo: Object,
  },
  methods: {
    handleToAlbumPapg(id) {
      this.$router.push("/albumlistdetail/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.search-detail-album {
  .search-detail-card {
    height: 85px;
    line-height: 80px;
    vertical-align: middle;
    img {
      margin-left: 10px;
    }
  }
  .search-detail-card:nth-child(2n) {
    background-color: rgb(245, 245, 245);
    border-radius: 5px;
  }
  .search-detail-card:hover {
    background-color: rgb(231, 231, 231);
  }
}
</style>
