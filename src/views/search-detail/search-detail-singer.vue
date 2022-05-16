<template>
  <div class="search-detail-singer">
    <SearchDetailCard
      v-for="(item, index) in singerInfo.artists"
      :key="index"
      :name="item.name"
      :scover="item.img1v1Url"
      @handleToPapg="handleToSingerPapg(item.id)"
    ></SearchDetailCard>
  </div>
</template>

<script>
import SearchDetailCard from "@/components/common/SearchDetailCard.vue";
export default {
  components: { SearchDetailCard },
  name: "SearchDetailSinger",
  props: {
    singerInfo: Object,
  },
  methods: {
    handleToSingerPapg(id) {
      this.$router.push("/singerlistdetail/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.search-detail-singer {
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
