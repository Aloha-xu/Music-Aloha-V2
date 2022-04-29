<template>
  <div>
AnchorRadio
  </div>
</template>

<script>
export default {
    name:'AnchorRadio',
    created(){
      this.$store.commit('refeshCurrentNavIndex',2)
    },
    activated(){
      //再次激活时 对比一些数据 看似否需要更新
      this.$store.commit('refeshCurrentNavIndex',2)
    }
}
</script>

<style scoped lang='scss'>

</style>