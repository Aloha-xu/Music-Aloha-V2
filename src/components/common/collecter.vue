<template>
  <div class="collecter">
    <div class="item" v-for="(item, index) in collecter" :key="index">
      <el-image :src="item.avatarUrl" alt="" lazy/>
      <div class="nikcname">{{ item.nickname }}</div>
    </div>
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
    img {
      border-radius: 50%;
      width: 100%;
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