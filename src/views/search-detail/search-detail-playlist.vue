<template>
  <div class="search-detail-playlist">
    <search-detail-card
      v-for="(item, index) in playlistInfo.playlists"
      :key="index"
      :name="item.name"
      :scover="item.coverImgUrl"
      :creater="item.creator.nickname"
      :number="item.trackCount"
      :playlistType="true"
      @handleToPapg="handleToPlaylistPapg(item.id)"
    >
    </search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from "@/components/common/search-detail-card.vue";
export default {
  components: { searchDetailCard },
  name: "SearchDetailPlaylist",
  props:{
    playlistInfo:Object,
  },
  methods: {
    handleToPlaylistPapg(id){
      this.$router.push("/playlistdetail/"+id)
    }
  },
};
</script>

<style scoped lang='scss'>
.search-detail-playlist{
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