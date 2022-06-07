<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="220px">
      <el-carousel-item
        v-for="(item, index) in banner"
        :key="index"
        class="swiper-item"
      >
        <img :src="item.imageUrl + '?param=550y220'" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    //console.log(this.banner);
  },
};
</script>

<style scoped lang="scss">
// ::v-deep {
//   .el-carousel__item a {
//     color: #475669;
//     font-size: 14px;
//     opacity: 0.75;
//     line-height: 200px;
//     margin: 0;
//   }

//   .el-carousel__item:nth-child(2n) {
//     background-color: #99a9bf;
//   }

//   .el-carousel__item:nth-child(2n + 1) {
//     background-color: #d3dce6;
//   }
// }
// img {
//   width: 100%;
//   height: 100%;
// }
.swiper-item {
  border-radius: 10px;
}
</style>
