<template>
  <div class="collecter">
    <div class="item" v-for="(item, index) in collecter" :key="index">
      <el-image
        :src="item.avatarUrl + '?param=170y170'"
        alt=""
        lazy
        class="image-style"
      />
      <div class="nikcname">{{ item.nickname }}</div>
    </div>
    <el-empty
      :image-size="200"
      :style="{ height: 50 + 'vh', textAlign: 'center', width: 100 + '%' }"
      v-if="!collecter.length"
    ></el-empty>
  </div>
</template>

<script>
export default {
  name: "Collecter",
  props: {
    collecter: Array,
  },
};
</script>

<style scoped lang="scss">
.collecter {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.5%;
  .item {
    margin-left: 5%;
    margin-right: 5%;
    width: 10%;
    margin-top: 20px;
    .image-style {
      width: 100%;
      // width: 170px;
      // height: 170px;
    }
    .nikcname {
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
    }
  }
}
</style>
