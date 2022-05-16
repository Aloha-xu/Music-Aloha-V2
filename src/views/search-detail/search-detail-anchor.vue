<template>
  <div class="search-detail-anchor">
    <SearchDetailCard
      v-for="(item, index) in anchorInfo.djRadios"
      :key="index"
      :name="item.name"
      :scover="item.picUrl"
      :creater="item.dj.nickname"
      :djType="true"
      @handleToPapg="handleToAnchorPapg(item.id)"
    ></SearchDetailCard>
  </div>
</template>

<script>
import SearchDetailCard from "@/components/common/SearchDetailCard.vue";
export default {
  components: { SearchDetailCard },
  name: "SearchDetailAnchor",
  props: {
    anchorInfo: Object,
  },
  methods: {
    handleToAnchorPapg() {},
  },
};
</script>

<style scoped lang="scss">
.search-detail-anchor {
  .search-detail-card {
    height: 85px;
    line-height: 80px;
    vertical-align: middle;
    .pic {
      img {
        margin-left: 10px;
      }
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
