<template>
  <div class="recommend-list">
    <IntoDetailsButton
      :intoDetailsButtonName="intoDetailsButtonName"
      @intoDetailsClick="intoDetailsClick"
    ></IntoDetailsButton>
    <div class="play-card">
      <div class="recommend-card" @click="handleToEverydayRecommend">
        <div class="pic">
          <svg
            t="1654135912839"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9888"
            width="128"
            height="128"
          >
            <path
              d="M896 448H128v447.957333l477.738667 0.021334L896 895.957333V448z m0-42.666667V192.042667C896 192 768 192 768 192V149.333333h128.042667A42.666667 42.666667 0 0 1 938.666667 192.042667v703.914666A42.624 42.624 0 0 1 896.064 938.666667H127.936A42.666667 42.666667 0 0 1 85.333333 895.957333V192.042667C85.333333 168.469333 104.256 149.333333 127.957333 149.333333H256v42.666667l-128 0.042667V405.333333h768zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z"
              fill="#3D3D3D"
              p-id="9889"
            ></path>
          </svg>
          <div class="date">{{ new Date().getDate() }}</div>
        </div>
        <div class="text">每日歌曲推荐</div>
      </div>
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
      this.PlayCarInfo = data.result.slice(0, 9);
    },
    intoDetailsClick() {
      this.$router.push("/songlist");
    },
    cardClick(id) {
      this.$router.push("/playlistdetail/" + id);
    },
    handleToEverydayRecommend() {
      this.$router.push("/everydayrecommend");
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
    .recommend-card {
      width: 207px;
      .pic {
      }
      .text {
      }
    }
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
