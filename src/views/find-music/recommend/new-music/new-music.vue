<template>
  <div class="recommend-newmusic">
    <into-details-button
      :intoDetailsButtonName="intoDetailsButtonName"
      @intoDetailsClick="intoDetailsClick"
    ></into-details-button>
    <div class="content">
      <NewMusicCard
        v-for="item in NewMusicCardInfo"
        :key="item.id"
        :pic="item.picUrl"
        :songname="item.name"
        :singer="item.song.artists.map(({ name }) => name)"
        class="item"
        :id="item.id"
      ></NewMusicCard>
    </div>
  </div>
</template>

<script>
import NewMusicCard from "./new-music-card";
import { getPersonalizedNewSong } from "@/network/api";
import IntoDetailsButton from "@/components/common/into-details-button.vue";
export default {
  name: "NewMusic",
  data() {
    return {
      NewMusicCardInfo: [],
      intoDetailsButtonName: "最新音乐",
    };
  },
  props: {},
  methods: {
    async getPersonalizedNewSong() {
      const { data } = await getPersonalizedNewSong(12);
      this.NewMusicCardInfo = data.result;
    },
    intoDetailsClick() {
      this.$router.push("/newmusic");
    },
  },
  components: {
    NewMusicCard,
    IntoDetailsButton,
  },
  async created() {
    this.getPersonalizedNewSong();
  },
};
</script>

<style scoped lang='scss'>
.recommend-newmusic {
  width: 100%;
  padding-top: 20px;
  .content {
    display: flex;
    flex-wrap: wrap;
    padding-top: 5px;
    .item {
      width: 33.3%;
    }
  }
}
</style>