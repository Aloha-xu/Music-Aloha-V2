<template>
  <div class="recommend-mv">
    <into-details-button
      :intoDetailsButtonName="intoDetailsButtonName"
      @intoDetailsClick="intoDetailsClick"
    ></into-details-button>
    <div class="content">
      <mv-card
        v-for="item in cardInfo"
        :key="item.id"
        :id="String(item.id)"
        :pic="item.picUrl"
        :playcount="item.playCount"
        :text="item.name"
        :singer="item.artists.map(({ name }) => name)"
        :playType="playType"
        class="item"
      ></mv-card>
    </div>
  </div>
</template>

<script>
import IntoDetailsButton from "@/components/common/into-details-button.vue";
import MvCard from "@/components/common/mv-card.vue";
import { getRecommentMv } from "@/network/api";
export default {
  name: "RecommendMv",
  data() {
    return {
      intoDetailsButtonName: "推荐MV",
      cardInfo: [],
      playType:'mv'
    };
  },
  components: {
    IntoDetailsButton,
    MvCard,
  },
  async created() {
    const { data } = await getRecommentMv();
    this.cardInfo = data.result;
    console.log(this.cardInfo);
  },
  methods: {
    intoDetailsClick() {
      this.$router.push("/MV");
    },
  },
};
</script>

<style scoped lang='scss'>
.recommend-mv {
  width: 100%;
  margin-top: 20px;
}
.recommend-mv .content {
  display: flex;
}
.recommend-mv .content .item:nth-child(1) {
  margin-right: 15px;
}
.recommend-mv .content .item:nth-child(2) {
  margin-right: 15px;
}
.recommend-mv .content .item:nth-child(3) {
  margin-right: 15px;
}
</style>