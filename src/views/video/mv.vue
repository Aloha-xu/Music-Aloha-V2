<template>
  <div class="mv flex-center">
    <div class="content">
      <div class="new-mv">
        <div class="navbar">
          <IntoDetailsButton
            :intoDetailsButtonName="newMvName"
            class="new-MV-into-button"
            @intoDetailsClick="ClickNewMv"
          ></IntoDetailsButton>
          <div class="area-type">
            <span
              v-for="item in area"
              :key="item"
              class="item"
              :class="item === currentArea ? 'active' : ''"
              @click="SongTypeClick(item)"
              >{{ item }}</span
            >
          </div>
        </div>
        <div class="card">
          <MvCard
            v-for="item in newMvInfo.data"
            :key="item.id"
            :id="item.id + ''"
            :pic="item.cover + '?param=264y148'"
            :playcount="item.playCount"
            :singer="item.artists.map(({ name }) => name)"
            :text="item.name"
            class="item"
          ></MvCard>
        </div>
      </div>
      <div class="hot-mv">
        <IntoDetailsButton
          :intoDetailsButtonName="hotMvName"
          @intoDetailsClick="ClickHotMv()"
        ></IntoDetailsButton>
        <div class="card">
          <MvCard
            v-for="item in hotMvInfo.data"
            :key="item.id"
            :id="item.id + ''"
            :pic="item.cover + '?param=264y148'"
            :playcount="item.playCount"
            :singer="item.artists.map(({ name }) => name)"
            :text="item.name"
            class="item"
          ></MvCard>
        </div>
      </div>
      <div class="wy-mv">
        <IntoDetailsButton
          :intoDetailsButtonName="wyMvName"
          @intoDetailsClick="ClickWyMv()"
        ></IntoDetailsButton>
        <div class="card">
          <MvCard
            v-for="item in wycpMvInfo.data"
            :key="item.id"
            :id="item.id + ''"
            :pic="item.cover + '?param=264y148'"
            :playcount="item.playCount"
            :singer="item.artists.map(({ name }) => name)"
            :text="item.name"
            class="item"
          ></MvCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MvCard from "@/components/common/MvCard.vue";
import IntoDetailsButton from "@/components/common/IntoDetailsButton.vue";
import { getNewMv, getWYCPMv, getAllMv } from "@/network/api";
export default {
  components: { IntoDetailsButton, MvCard },
  name: "MV",
  data() {
    return {
      area: ["内地", "港台", "欧美", "日本", "韩国"],
      newMvName: "最新MV",
      hotMvName: "热门MV",
      wyMvName: "网易出品",
      currentArea: "",
      newMvInfo: [],
      wycpMvInfo: [],
      hotMvInfo: [],
    };
  },
  methods: {
    /* 处理点击热门音乐种类的点击事件 */
    async SongTypeClick(type) {
      //设置当前音乐类型
      this.currentArea = type;
      //根据选着的音乐类型更新数据
      const res1 = await getNewMv(this.currentArea, 8);
      this.newMvInfo = res1.data;
    },
    ClickNewMv() {
      this.$router.push({
        path: "/allmvpapg",
        query: { area: this.currentArea || "全部" },
      });
    },
    ClickHotMv() {
      this.$router.push({ path: "/allmvpapg", query: { order: "最热" } });
    },
    ClickWyMv() {
      this.$router.push({ path: "/allmvpapg", query: { type: "网易出品" } });
    },
  },
  async created() {
    const res1 = await getNewMv(this.currentArea, 8);
    const res2 = await getWYCPMv(8);
    const res3 = await getAllMv("全部", "全部", "最热", 8, 0);
    this.newMvInfo = res1.data;
    this.wycpMvInfo = res2.data;
    this.hotMvInfo = res3.data;
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/variables.scss";
.mv {
  // display: flex;
  // justify-content: center;
  overflow: scroll;
  height: calc(100% - 65px);
  .content {
    width: 1100px;
    .new-mv {
      .navbar {
        display: flex;
        .new-MV-into-button {
          flex: 5;
          line-height: 30px;
          font-weight: 900;
          font-size: 18px;
        }
        .area-type {
          flex: 2;
          .item {
            cursor: pointer;
            margin-left: 2px;
            font-size: 13px;
            color: gray;
            padding: 0px 15px;
            display: inline-block;
            height: 20px;
            line-height: 20px;
            &:hover {
              color: rgb(56, 56, 56);
            }
          }
          .active {
            color: rgb(251, 51, 51) !important;
            background-color: rgb(255, 216, 216);
            border-radius: 10px;
          }
        }
      }
      .card {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 24%;
          img {
            height: 150px;
            object-fit: cover;
          }
        }
        .item:nth-child(1) {
          margin-right: 10px;
        }
        .item:nth-child(2) {
          margin-right: 10px;
        }
        .item:nth-child(3) {
          margin-right: 10px;
        }
        .item:nth-child(5) {
          margin-right: 10px;
        }
        .item:nth-child(6) {
          margin-right: 10px;
        }
        .item:nth-child(7) {
          margin-right: 10px;
        }
      }
    }
    .hot-mv {
      .card {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 24%;
          img {
            height: 150px;
            object-fit: cover;
          }
        }
        .item:nth-child(1) {
          margin-right: 10px;
        }
        .item:nth-child(2) {
          margin-right: 10px;
        }
        .item:nth-child(3) {
          margin-right: 10px;
        }
        .item:nth-child(5) {
          margin-right: 10px;
        }
        .item:nth-child(6) {
          margin-right: 10px;
        }
        .item:nth-child(7) {
          margin-right: 10px;
        }
      }
    }
    .wy-mv {
      .card {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 24%;
          img {
            height: 150px;
            object-fit: cover;
          }
        }
        .item:nth-child(1) {
          margin-right: 10px;
        }
        .item:nth-child(2) {
          margin-right: 10px;
        }
        .item:nth-child(3) {
          margin-right: 10px;
        }
        .item:nth-child(5) {
          margin-right: 10px;
        }
        .item:nth-child(6) {
          margin-right: 10px;
        }
        .item:nth-child(7) {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
