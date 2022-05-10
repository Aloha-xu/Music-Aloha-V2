<template>
  <div class="user-updata-type-popover">
    <div>选择合适的标签，最多选择3个</div>
    <div class="box" v-for="(item, index) in typeLists" :key="index">
      <div class="text" @click="handleSongTypeClick(item.name)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserUpdataTypePopover",
  data() {
    return {};
  },
  methods: {
    handleSongTypeClick(name) {
      let currentindex = this.currentSongType.findIndex((item) => item == name);
      let innerSongType = this.currentSongType;
      if (currentindex == -1) {
        innerSongType.push(name);
      } else {
        innerSongType.splice(currentindex, 1);
      }
      this.$emit("handleUpdataSongType", innerSongType);
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
  .box {
    margin-top: 10px;
    display: flex;
  }
}
</style>
