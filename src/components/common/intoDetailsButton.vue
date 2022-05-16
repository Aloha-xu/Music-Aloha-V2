<template>
  <div class="into-details-button" @click="intoDetailsClick">
      {{intoDetailsButtonName}}
      <img src="../../assets/icon/arrow-double-right.svg" alt="">
  </div>
</template>

<script>
export default {
    name:'IntoDetailsButton',
    props:{
        intoDetailsButtonName:String
    },
    methods: {
        intoDetailsClick(){
            /* 发射这个事件出去 */
            this.$emit('intoDetailsClick')
        }
    },
}
</script>

<style scoped lang='scss'>
.into-details-button{
    display: flex;
    line-height: 30px;
    font-weight: 900;
    font-size: 18px;
}

</style>