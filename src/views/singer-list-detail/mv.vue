<template>
  <div class="mv-compontent">
    <play-card
      v-for="(item, index) in ArtistMVInfo"
      :key="index"
      :id="item.id"
      :pic="item.imgurl16v9"
      :playcount="item.playCount"
      :text="item.name"
      class="item"
    >
      <span slot="totlepalytime">{{ Duration(item.duration) }}</span>
    </play-card>
  </div>
</template>

<script>
import PlayCard from "@/components/common/play-card.vue";
import {forMatTime} from '@/utils/format'
export default {
  components: { PlayCard },
  name: "MV",
  props: {
    ArtistMVInfo: Array,
  },
  methods:{
      Duration(time){
          return forMatTime(time/1000)
      }
  }
};
</script>

<style scoped lang='scss'>
.mv-compontent {
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
}
.mv-compontent .item {
  width: 18.5%;
  margin: 10px;
}
</style>