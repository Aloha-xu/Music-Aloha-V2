<template>
  <div class="search-detail-card" @click="handleToPapg()">
    <div class="pic">
      <img :src="scover" alt="" />
    </div>
    <div class="name">{{ name }}</div>
    <div class="number" v-show="playlistType || false">{{ number }}首</div>
    <div class="creater">
      <span v-show="false || djType || playlistType">by </span>
      {{ creater }}
    </div>
    <div class="other">{{ other }}</div>
  </div>
</template>

<script>
export default {
  name: "SearchDetailCard",
  props: {
    scover: String,
    name: String,
    number: Number,
    creater: String,
    other: String,
    playlistType: Boolean,
    djType: Boolean,
  },
  methods: {
    handleToPapg() {
      this.$emit("handleToPapg");
    },
  },
};
</script>

<style scoped lang='scss'>
.search-detail-card {
  height: 100%;
  .pic {
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
    height: 100%;
    img {
      width: 60px;
      height: 60px;
      vertical-align: middle;
      border-radius: 10px;
    }
  }
  .name {
    height: 100%;
    width: 50%;
    font-size: 14px;
    padding-left: 10px;
    display: inline-block;
    vertical-align: middle;
  }
  .number {
    height: 100%;
    width: 15%;
    display: inline-block;
    vertical-align: middle;
  }
  .creater {
    height: 100%;
    width: 15%;
    display: inline-block;
    vertical-align: middle;
    span {
      font-size: 14px;
      color: rgb(207, 207, 207);
    }
  }
  .other {
    height: 100%;
    width: 10%;
    display: inline-block;
    vertical-align: middle;

  }
}
</style>