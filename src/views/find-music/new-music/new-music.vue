<template>
  <div>
      newmusic
  </div>
</template>

<script>
export default {
    name:'NewMusic',
    created(){
      this.$store.commit('refeshCurrentNavIndex',5)
    },
    activated(){
      //再次激活时 对比一些数据 看似否需要更新
      this.$store.commit('refeshCurrentNavIndex',5)
    }
}
</script>

<style scoped lang='scss'> 

</style>