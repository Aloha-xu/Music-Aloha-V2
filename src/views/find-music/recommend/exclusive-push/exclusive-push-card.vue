<template>
  <div class="exclusiver-push-card">
      <div class="pic" @click="clickCard">
          <img :src="pic" alt="">
      </div>
      <div class="text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
    name:'ExclusiverPushCard',
    props:{
        pic:{
            type:String,
            default:''
        },
        text:{
            type:String,
            default:''
        }
    },
    methods: {
        clickCard(){
            this.$store.commit('exclusiverPushCardClick')
        }
    },
}
</script>

<style scoped lang="scss">
.exclusiver-push-card .pic img{
    width: 100%;
    border-radius: 10px;
}
.exclusiver-push-card .text{
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5px;
    display: -webkit-box;
  -webkit-line-clamp: 2; /* 显示两行 */
  line-height: 20px;
}
</style>