<template>
  <div class="friend">
    <Dynamic></Dynamic>
  </div>
</template>

<script>
import Dynamic from "./dynamic.vue";
export default {
  components: { Dynamic },
  name: "Friend",
  data() {
    return {};
  },
  methods: {
    
  },
};
</script>

<style scoped lang='scss'>
.friend {
  width: 100%;
}
</style>