<template>
  <div class="simi-artist-compontent">
      <div class="item" v-for="(item,index) in SimiArtist" :key="index">
          <img :src="item.img1v1Url" alt="">
          <div class="name">{{item.name}}</div>
      </div>
  </div>
</template>

<script>
export default {
    name:'SimiArtist',
    props:{
        SimiArtist:Array
    }
}
</script>

<style scoped lang='scss'>
.simi-artist-compontent{
    width: 98%;
    margin-left: 20px;
    display: flex;
    flex-wrap: wrap;
}
.simi-artist-compontent .item{
    width: 18.5%;
    margin: 10px;
    margin-top: 30px;
}
.simi-artist-compontent .item img{
    width: 100%;
    height: 100%;
    border-radius: 5px;
}
</style>