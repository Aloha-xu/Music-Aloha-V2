<template>
  <div class="video-type-popover">
    <div class="top" @click="handlevideoTypeClick('全部视频')">
      <div>全部视频</div>
    </div>
    <div class="center">
      <div
        class="item"
        :class="item.name === currentvideoType ? 'active' : ''"
        v-for="(item, index) in videoType"
        :key="index"
        @click="handlevideoTypeClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoTypePopover",
  props: {
    videoType: Array,
  },
  data() {
    return {
      currentvideoType: "",
    };
  },
  methods: {
    handlevideoTypeClick(item) {
      this.currentvideoType = item.name;
      this.$emit("handleVideoTypeClick", item);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/theme.scss";
.video-type-popover {
  font-size: 14px;
  width: 600px;
  border: 2px solid $active-grey;
  background-color: rgb(253, 253, 253);
  border-radius: 10px;
  overflow: scroll;
  height: 500px;
  overflow-x: hidden;
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
    .item {
      width: 100px;
      line-height: 25px;
      padding: 10px 20px;
      height: 25px;
      text-align: center;
      cursor: pointer;
    }
    .item:hover {
      color: red;
    }
    .active {
      color: rgb(143, 27, 27);
      background-color: rgb(255, 216, 216);
      border-radius: 20px;
    }
  }
}
</style>
