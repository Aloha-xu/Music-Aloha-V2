<template>
  <div class="card" @click="clickCard">
    <div class="pic">
      <BaseImage :src="pic" :lazy="true" />
      <span class="palycount">{{ playCount }}</span>
    </div>
    <div class="text">
      {{ text }}
    </div>
    <div class="singer">
      <span v-for="(item, index) in singer" :key="index">
        {{ item }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "MvCard",
  props: {
    pic: String,
    playcount: Number,
    text: String,
    id: String,
    singer: Array,
    playType: String,
  },
  data() {
    return {
      activeColor: "red",
    };
  },
  computed: {
    playCount() {
      let playcount;
      if (parseInt((this.playcount / 10000).toFixed(0)) <= 1) {
        playcount = this.playcount;
      } else {
        playcount = parseInt((this.playcount / 10000).toFixed(0)) + "万";
      }
      return playcount;
    },
  },
  methods: {
    clickCard() {
      if (this.playType == "video") {
        this.$router.push("/mvdetail/" + this.id);
      } else {
        this.$router.push("/mvdetail/" + Number(this.id));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  padding-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
  width: 24%;
}
.pic {
  width: 100%;
  height: 148px;
}
::v-deep .el-image {
  width: 100%;
  height: 148px;
}
img {
  width: 100%;
  height: 148px;
  border-radius: 5px;
}
.palycount {
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 12px;
  color: white;
}
.text {
  color: rgb(90, 90, 90);
  font-size: 14px;
  letter-spacing: 0.7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 不允许换行 */
  margin-top: 5px;
}
.text:hover {
  color: rgb(0, 0, 0);
}
.singer {
  font-size: 13px;
  color: rgb(146, 146, 146);
  letter-spacing: 0.7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 不允许换行 */
  margin-top: 5px;
}
.singer:hover {
  color: rgb(110, 110, 110);
}
</style>
