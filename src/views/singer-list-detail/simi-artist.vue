<template>
  <div class="simi-artist-compontent">
    <div
      class="item"
      v-for="(item, index) in SimiArtist"
      :key="index"
      @click="clickToSingerDetail(item.id)"
    >
      <BaseImage
        :src="item.img1v1Url + '?param=175y175'"
        :lazy="true"
        :isShowPlayLogo="false"
      />
      <div class="name">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimiArtist",
  props: {
    SimiArtist: Array,
  },
  methods: {
    clickToSingerDetail(singerId) {
      this.$emit("clickToSingerDetail", singerId);
    },
  },
};
</script>

<style scoped lang="scss">
.simi-artist-compontent {
  width: 98%;
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  .item {
    margin: 10px;
    margin-top: 30px;
    height: 175px;
    width: 175px;
    ::v-deep {
      .playcard-img {
        height: 175px;
      }
    }
    .name {
      margin-top: 5px;
    }
  }
}
</style>
