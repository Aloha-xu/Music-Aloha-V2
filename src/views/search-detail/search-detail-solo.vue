<template>
  <div class="search-detail-solo">
    <div class="title-card">最佳匹配</div>
    <SearchDetailCard
      v-if="searchResult"
      :name="searchResult[0].name"
      :scover="searchResult[0].img1v1Url"
      class="card"
    ></SearchDetailCard>
    <div class="title-name">
      <span>音乐标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <div class="song-item" v-for="(item, index) in songsInfo" :key="index">
      <div class="index-number">
        {{ setIndex(index) }}
      </div>
      <img
        src="@/assets/icon/heart.svg"
        alt=""
        v-show="!isClickHeart"
        @click="ClickHeart(index)"
      />
      <img
        src="@/assets/icon/heartactive.svg"
        alt=""
        v-show="isClickHeart"
        @click="ClickHeart(index)"
      />
      <p class="el-icon-download"></p>
      <div class="song-name" @click="HandleSongClick(item, index)">
        <span :class="item.id === currentSongInfo.id ? 'active' : ''">{{
          item.name
        }}</span>
      </div>
      <slot name="SoaringrateData"></slot>
      <div class="singer">
        <span v-for="(item1, index1) in item.singer" :key="index1"
          >{{ item1 }}&nbsp;</span
        >
      </div>
      <div class="album">{{ item.album }}</div>
      <div class="time">{{ setSongTime(item.totleTime) }}</div>
    </div>
  </div>
</template>

<script>
import { forMatTime } from "@/utils/format";
import SearchDetailCard from "@/components/common/SearchDetailCard.vue";
import { mapGetters } from "vuex";
export default {
  components: { SearchDetailCard },
  name: "SearchDetailSolo",
  methods: {
    /* 点击指定红星添加收藏未做 */
    ClickHeart() {
      this.isClickHeart = !this.isClickHeart;
    },
    // 处理点击播放音乐事件
    async HandleSongClick(values, index) {
      this.$emit("handleSongClick", [values, index]);
    },
    //计算歌曲时间
    setSongTime(time) {
      return forMatTime((time / 1000) | 0);
    },
    //转换下表格式
    setIndex(values) {
      let index = values + 1;
      return index < 10 ? "0" + index : index;
    },
  },
  computed: {
    // currentId() {
    //   return this.$store.state.currentSongInfo.id;
    // },
    ...mapGetters(["currentSongInfo"]),
  },
  data() {
    return {
      isClickHeart: false,
    };
  },
  props: {
    searchResult: Array,
    songsInfo: Array,
  },
};
</script>

<style scoped lang="scss">
.search-detail-solo {
  width: 100%;
  height: 100%;
  .title-card {
    font-size: 12.5px;
    font-weight: 600;
    margin: 10px 0 15px 20px;
  }
  .card {
    background-color: rgb(233, 233, 233);
    height: 70px;
    padding: 10px 0 0 10px;
    width: 300px;
    border-radius: 5px;
    margin: 10px 0 10px 20px;
  }
  .title-name {
    display: flex;
    margin-left: 100px;
    height: 30px;
    line-height: 30px;
    span:nth-child(1) {
      flex: 6;
    }
    span:nth-child(2) {
      flex: 2;
    }
    span:nth-child(3) {
      flex: 3;
    }
    span:nth-child(4) {
      flex: 1;
    }
  }
  .song-item {
    margin-top: 5px;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    display: flex;
    .index-number {
      margin: 0 10px 0 20px;
    }
    img {
      margin: 0 5px;
    }
    p {
      margin: 0 5px;
      margin-top: 7px;
    }
    .song-name {
      flex: 6;
      overflow: hidden;
      text-overflow: ellipsis;
      .active {
        color: red;
        // pointer-events: none;
      }
    }
    .singer {
      flex: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .album {
      flex: 3;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time {
      flex: 1;
    }
  }
}
</style>
