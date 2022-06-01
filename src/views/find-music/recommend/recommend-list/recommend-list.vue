<template>
  <div class="recommend-list">
    <IntoDetailsButton
      :intoDetailsButtonName="intoDetailsButtonName"
      @intoDetailsClick="intoDetailsClick"
    ></IntoDetailsButton>
    <div class="play-card">
      <PlayCard
        class="item"
        v-for="item in PlayCarInfo"
        :key="item.id"
        :pic="item.picUrl + '?param=250y250'"
        :playcount="item.playCount"
        :text="item.name"
        :id="item.id"
        @cardClick="cardClick"
      >
      </PlayCard>
    </div>
  </div>
</template>

<script>
import PlayCard from "@/components/common/PlayCard";
import IntoDetailsButton from "@/components/common/IntoDetailsButton.vue";
import { getPersonalized } from "@/network/api";
export default {
  name: "RemcommendList",
  props: {},
  data() {
    return {
      PlayCarInfo: [],
      intoDetailsButtonName: "推荐歌单",
    };
  },
  components: {
    PlayCard,
    IntoDetailsButton,
  },
  async created() {
    this.getPlayCardInfo();
  },
  methods: {
    async getPlayCardInfo() {
      const { data } = await getPersonalized();
      this.PlayCarInfo = data.result.slice(0, 10);
    },
    intoDetailsClick() {
      this.$router.push("/songlist");
    },
    cardClick(id) {
      this.$router.push("/playlistdetail/" + id);
    },
  },
};
</script>

<style scoped lang="scss">
.recommend-list {
  .play-card {
    display: flex;
    flex-wrap: wrap; /*用了flex-wrap:wrap;自动换行属性后*/
    justify-content: space-around;
    height: 569px;
    .item {
      width: 18.86%;
      height: 34.5%;
    }
    .item:nth-child(3) {
      margin-left: 15px;
    }
    .item:nth-child(7) {
      margin-left: 15px;
    }
    .item:nth-child(9) {
      margin-left: 15px;
    }
    .item:nth-child(3n-1) {
      margin-left: 15px;
    }
    .item:nth-child(4n) {
      margin-left: 15px;
    }
    .item:nth-child(5n) {
      margin-left: 15px;
    }
  }
}
</style>
