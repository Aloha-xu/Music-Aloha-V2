<template>
  <div class="artist-desc">
    <div class="desc">
      <div>{{ name }}简介</div>
      <div v-for="(item,index) in desc" :key="index" class="desc-item">{{ item }}</div>
    </div>
    <div class="production">
      <div>{{ ArtistDescdata.introduction[0].ti }}</div>
      <div v-for="(item,index) in production" :key="index" class="production-item">{{ item }}</div>
    </div>
    <div class="honor">
      <div>{{ ArtistDescdata.introduction[1].ti }}</div>
      <div v-for="(item,index) in honor" :key="index" class="honor-item">{{ item }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistDesc",
  props: {
    ArtistDescdata: Array,
    name: String,
  },
  data() {
      return {
          desc:[],
          production:[],
          honor:[],
      }
  },
  methods: {
    
  },
  created() {
      this.desc=this.ArtistDescdata.briefDesc.split(/[\s\n]/)
      this.production=this.ArtistDescdata.introduction[0].txt.split(/[\s\n]/)
      this.honor=this.ArtistDescdata.introduction[1].txt.split(/[\s\n]/)
  },
};
</script>

<style scoped lang='scss'>
.artist-desc{
    width: 96%;
    margin-left: 30px;
    margin-top: 20px;
}
.artist-desc .desc,.artist-desc .production,.artist-desc .honor{
    margin: 0 0 40px 0;
}
.artist-desc .desc div:nth-child(1),.artist_desc .production div:nth-child(1),.artist_desc .honor div:nth-child(1){
    font-size: 15px;
    font-weight: 600;
}
.artist-desc .desc .desc-item{
    margin-top: 10px;
    text-indent: 2em;
    font-size: 14px;
    font-weight: 300;
    line-height: 27px;
}
.artist-desc .production .production-item{
    margin-top: 15px;
    text-indent: 2em;
    font-size: 14px;
    font-weight: 300;
    line-height: 27px;
}
.artist-desc .honor .honor-item{
    margin-top: 15px;
    text-indent: 2em;
    font-size: 14px;
    font-weight: 300;
    line-height: 25px;
}

</style>