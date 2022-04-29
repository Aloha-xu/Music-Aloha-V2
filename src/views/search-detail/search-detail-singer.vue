<template>
  <div class="search-detail-singer">
    <search-detail-card
      v-for="(item, index) in singerInfo.artists"
      :key="index"
      :name="item.name"
      :scover="item.img1v1Url"
      @handleToPapg="handleToSingerPapg(item.id)"
    ></search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from "@/components/common/search-detail-card.vue";
export default {
  components: { searchDetailCard },
  name: "SearchDetailSinger",
  props: {
    singerInfo: Object,
  },
  methods: {
    handleToSingerPapg(id){
      this.$router.push("/singerlistdetail/" + id);
    }
  },
};
</script>

<style scoped lang='scss'>
.search-detail-singer{
    .search-detail-card{
        height: 85px;
        line-height: 80px;
        vertical-align: middle;
        img{
            margin-left: 10px;
        }
    }
    .search-detail-card:nth-child(2n){
        background-color: rgb(245, 245, 245);
        border-radius: 5px;
    }
    .search-detail-card:hover{
        background-color: rgb(231, 231, 231);
    }
}
</style>