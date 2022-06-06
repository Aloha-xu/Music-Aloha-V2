<template>
  <div class="collecter">
    <div class="item" v-for="(item, index) in collecter" :key="index">
      <BaseImage :src="item.avatarUrl + '?param=170y170'" alt="" :lazy="true" />
      <div class="nikcname">{{ item.nickname }}</div>
    </div>
    <el-empty
      :image-size="200"
      :style="{ height: 50 + 'vh', textAlign: 'center', width: 100 + '%' }"
      v-if="!collecter.length && !loading"
    ></el-empty>
    <Loading v-if="loading" style="height: 50vh"></Loading>
  </div>
</template>

<script>
import Loading from "@/components/common/loading.vue";
import { mapGetters } from "vuex";
export default {
  name: "Collecter",
  props: {
    collecter: Array,
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  components: {
    Loading,
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
    .nikcname {
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
    }
  }
}
</style>
