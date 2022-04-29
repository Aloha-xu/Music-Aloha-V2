<template>
  <div class="recommend-newmusic-card" @click="handleClickItem()">
    <div class="pic">
      <img :src="pic" alt="" />
    </div>
    <div class="text">
      <div class="songname">{{ songname }}</div>
      <div
        class="singer"
        v-for="item in singer"
        :key="item"
      >
        <p>{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMusicCard",
  props: {
    songname: String,
    singer: Array,
    pic: String,
    id:Number
  },
  methods: {
    handleClickItem(){
      this.$router.push("/playlistdetail/" + this.id)
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
};
</script>

<style scoped lang="scss">
.recommend-newmusic-card{
    display: flex;
    .pic{
        padding: 5px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 5px;
        }
    }
    .text{
        padding: 10px 0 10px 5px;
        width: 100%;
       .songname{
            font-size: 15px;
       } 
       .singer{
           padding-top: 10px;
           font-size: 13px;
           color:rgb(175, 175, 175);
           display: inline-block;
       }
       .singer:hover{
           color: rgb(110, 110, 110);
       }
    }
    .text:hover{
        background-color: rgb(223, 220, 220);
        border-radius: 5px;
    }
}
</style>