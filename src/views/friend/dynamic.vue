<template>
  <div class="dynamic">
    <div class="dynamic-content">
      <div class="title">
        <span>动态</span>
        <div class="add-dynamic"></div>
      </div>
      <div class="dynamic-item">
        <div class="creator"></div>
        <div class="msg"></div>
        <div class="dynamic-link"></div>
        <div class="tools"></div>
      </div>
    </div>
    <div class="user-info"></div>
  </div>
</template>

<script>
import { getDynamic } from "@/network/api.js";
export default {
  name: "Dynamic",
  data() {
    return {};
  },
  methods: {},
  async created() {
    const { data } = await getDynamic(10, -1);
    console.log(data);
  },
};
</script>

<style lang="scss" scoped>
.dynamic {
  width: 100%;
  display: flex;
  height: 50px;
  .avatarUrl {
    width: 50px;
    background-color: red;
  }
  .right {
    flex: 1;
    background-color: blue;
  }
}
</style>