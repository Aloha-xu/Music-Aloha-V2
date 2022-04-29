<template>
  <div class="alltype-popover">
    <div class="top" @click="handleSongTypeClick('全部歌单')">
      <div>全部歌单</div>
    </div>
    <div class="center" v-for="(item1, index1) in TypeLists" :key="index1">
      <div class="left">
        <div class="pic">
          <img :src="pic[index1].url" alt="" />
        </div>
        <div class="text">{{ item1.type }}</div>
      </div>

      <div class="right">
        <div
          class="item"
          :class="item2 === CurrentSongType ? 'active' : ''"
          v-for="(item2, index2) in item1.list"
          :key="index2"
          @click="handleSongTypeClick(item2)"
        >
          <div class="text">
            {{ item2 }}
          </div>
          <div class="pic" v-show="hh(item2)">
            <img src="@/assets/icon/popover/HOT.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllTypePopover",
  props: {
    TypeLists: Object,
    HotSongType: Array,
  },
  data() {
    return {
      pic: {
        0: { url: require("@/assets/icon/popover/popover0.png") },
        1: { url: require("@/assets/icon/popover/popover1.png") },
        2: { url: require("@/assets/icon/popover/popover2.png") },
        3: { url: require("@/assets/icon/popover/popover3.png") },
        4: { url: require("@/assets/icon/popover/popover4.png") },
      },
      CurrentSongType: "",
    };
  },
  methods: {
    handleSongTypeClick(songtype) {
      this.CurrentSongType = songtype;
      this.$emit("handleSongTypeClick", songtype);
    },
    hh(value) {
      let i = 0;
      let flag = false;
      for (i; i <= 9; i++) {
        if (value === this.HotSongType[i]) {
          flag = true;
          break;
        }
      }
      return flag;
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.alltype-popover {
  width: 50%;
  border: 2px solid $active-grey;
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  .top {
    font-size: 15px;
    padding-left: 25px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 2px solid $active-grey;
  }
  .center {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .left {
      width: 20%;
      display: flex;
      .pic {
        margin-left: 20px;
        margin-top: 10px;
        img {
          width: 100%;
        }
      }
      .text {
        margin-top: 10px;
        height: 32px;
        font-size: 13px;
        line-height: 30px;
      }
    }
    .right {
      cursor: pointer;
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 16%;
        display: inline;
        padding: 10px 10px 10px 10px;
        line-height: 25px;
        .text {
          display: inline-block;
          font-size: 13px;
          &:hover {
            color: $theme-color;
          }
        }

        .pic {
          margin-left: 5px;
          width: 20px;
          display: inline-block;
          img {
            width: 100%;
          }
        }
      }
      .active {
        color: $theme-color !important;
        border-radius: 5px;
      }
    }
  }
}
</style>