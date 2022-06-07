<template>
  <div class="artist-desc">
    <div class="desc">
      <div>{{ name }}简介</div>
      <div v-for="(item, index) in desc" :key="index" class="item">
        {{ item }}
      </div>
    </div>
    <div class="production">
      <div>{{ ArtistDescdata.introduction[0].ti }}</div>
      <div v-for="(item, index) in production" :key="index" class="item">
        {{ item }}
      </div>
    </div>
    <div class="honor">
      <div>{{ ArtistDescdata.introduction[1].ti }}</div>
      <div v-for="(item, index) in honor" :key="index" class="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtistDesc",
  props: {
    ArtistDescdata: Object,
    name: String,
  },
  data() {
    return {
      desc: [],
      production: [],
      honor: [],
    };
  },
  methods: {},
  created() {
    this.desc = this.ArtistDescdata.briefDesc.split(/\n]/);
    this.production = this.ArtistDescdata.introduction[0].txt.split(/[\n]/);
    this.honor = this.ArtistDescdata.introduction[1].txt.split(/[\n]/);
  },
};
</script>

<style scoped lang="scss">
.artist-desc {
  width: 96%;
  margin-left: 30px;
  margin-top: 20px;
  .desc,
  .production,
  .honor {
    margin: 0 0 40px 0;
    div:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
    }
    .item {
      margin-top: 10px;
      text-indent: 2em;
      font-size: 15px;
      font-weight: 300;
      line-height: 27px;
    }
  }
}
</style>
