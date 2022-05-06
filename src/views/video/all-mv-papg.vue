<template>
  <div class="all-mv-papg">
    <div class="content">
      <div class="title">全部MV</div>
      <div class="select-bar">
        <div class="left">地区：</div>
        <div class="right">
          <div
            :class="currentArea === item ? 'active' : ''"
            v-for="item in selectBarInfo[0].area"
            :key="item"
            @click="handleclickArea(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="select-bar">
        <div class="left">类型：</div>
        <div class="right">
          <div
            :class="currentType === item ? 'active' : ''"
            v-for="item in selectBarInfo[1].type"
            :key="item"
            @click="handleClickType(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="select-bar">
        <div class="left">排序：</div>
        <div class="right">
          <div
            :class="currentOrder === item ? 'active' : ''"
            v-for="item in selectBarInfo[2].order"
            :key="item"
            @click="handleClickOrder(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="card" v-show="!loading">
        <mv-card
          v-for="item in mvInfo"
          :key="item.id"
          :id="item.id"
          :pic="item.cover"
          :playcount="item.playCount"
          :singer="item.artists.map(({ name }) => name)"
          :text="item.name"
          class="item"
        ></mv-card>
      </div>
      <Loading v-show="loading" style="height:50vh"></Loading>
    </div>
  </div>
</template>

<script>
import MvCard from "@/components/common/mv-card.vue";
import { getAllMv } from "@/network/api";
import Loading from "@/components/common/loading.vue";
import { mapGetters } from "vuex";
export default {
  name: "AllMvPapg",
  components: { MvCard, Loading },
  data() {
    return {
      selectBarInfo: {
        0: { area: ["全部", "内地", "港台", "欧美", "日本", "韩国"] },
        1: { type: ["全部", "官方版", "原生", "现场版", "网易出品"] },
        2: { order: ["上升最快", "最热", "最新"] },
      },
      currentArea: "全部",
      currentType: "全部",
      currentOrder: "上升最快",
      mvInfo: [],
    };
  },
  methods: {
    handleclickArea(values) {
      this.currentArea = values;
      this.getAllMvInfo();
    },
    handleClickType(values) {
      this.currentType = values;
      this.getAllMvInfo();
    },
    handleClickOrder(values) {
      this.currentOrder = values;
      this.getAllMvInfo();
    },
    async getAllMvInfo() {
      this.$store.commit("setLoading", true);
      const { data } = await getAllMv(
        this.currentArea,
        this.currentType,
        this.currentOrder,
        60,
        0
      );
      this.mvInfo = data.data;
      this.$store.commit("setLoading", false);
    },
  },
  //当页面被缓存了 再一次返回页面执行的钩子函数
  activated() {
    console.log("我是再次返回执行的activated钩子函数");
    if (this.$route.query.area) {
      this.currentArea = this.$route.query.area;
    }
    if (this.$route.query.type) {
      this.currentArea = "全部";
      this.currentOrder = "最新";
      this.currentType = this.$route.query.type;
    }
    if (this.$route.query.order) {
      this.currentArea = "全部";
      this.currentType = "全部";
      this.currentOrder = this.$route.query.order;
    }
    this.getAllMvInfo();
  },
  computed: {
    ...mapGetters(["loading"]),
  },
};
</script>

<style scoped lang="scss">
.all-mv-papg {
  font-size: 13px;
  color: rgb(87, 87, 87);
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: scroll;
  height: 100%;
  .content {
    width: 1100px;
    .title {
      font-size: x-large;
      font-weight: bolder;
      color: black;
      padding: 20px 0;
    }
    .select-bar {
      display: flex;
      margin-bottom: 5px;
      .left {
        width: 4%;
        padding: 7px 0px 10px 0;
      }
      .right {
        width: 90%;
        padding: 0px 10px;
        display: flex;
        flex-wrap: wrap;
        div {
          padding: 7px 25px;
        }
        .active {
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
      .item:nth-child(n + 0) {
        margin-right: 10px;
      }
      .item:nth-child(n + 2) {
        margin-right: 10px;
      }
      .item:nth-child(n + 3) {
        margin-right: 10px;
      }
    }
  }
}
</style>
