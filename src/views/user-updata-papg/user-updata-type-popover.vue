<template>
  <div class="user-updata-type-popover">
    <div>选择合适的标签，最多选择3个</div>
    <div class="center" v-for="(item1, index1) in typeLists" :key="index1">
      <div class="left">
        <div class="text">{{ item1.type }}</div>
      </div>
      <div class="right">
        <div
          class="item"
          v-for="(item2, index2) in item1.list"
          :key="index2"
          @click="handleSongTypeClick(item2)"
        >
          <div class="text">
            {{ item2 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserUpdataTypePopover",
  data() {
    return {
      // typeLists: this.$store.state.allTypeInfo,
    };
  },
  methods: {
    handleSongTypeClick(type) {
      let currentindex = this.currentSongType.findIndex((item) => item == type);
      if (currentindex == -1) {
        this.currentSongType.push(type);
      } else {
        this.currentSongType.splice(currentindex, 1);
      }
    },
  },
  props: {
    currentSongType: Array,
  },
  computed: {
    ...mapGetters({ typeLists: "allTypeInfo" }),
  },
};
</script>

<style scoped lang="scss">
.user-updata-type-popover {
  width: 80%;
  border: 2px solid rgb(177, 175, 175);
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  overflow: scroll;
  height: 450px;
  .center {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    .left {
      width: 10%;
      display: flex;
      .text {
        margin-top: 8px;
        padding-left: 10px;
        height: 30px;
        font-size: 13px;
        line-height: 30px;
        color: rgb(202, 202, 202);
      }
    }
    .right {
      cursor: pointer;
      width: 90%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 16%;
        display: inline;
        padding: 10px 10px 10px 10px;
        line-height: 25px;
        text-align: center;
        .text {
          display: inline-block;
          font-size: 13px;
        }
        .text:hover {
          color: red;
        }
      }
      .active {
        color: rgb(143, 27, 27);
        background-color: rgb(255, 216, 216);
        border-radius: 5px;
      }
    }
  }
}
</style>
