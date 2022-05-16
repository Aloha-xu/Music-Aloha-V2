<template>
  <div class="high-quality-playlist">
    <div class="head">
      <div class="title">
        精品歌单
        <div class="type-btn" @click="handleTypeBtn">
          {{ currentPopoverType }}
        </div>
      </div>
    </div>
    <div class="content">
      <div class="cards" v-for="(item, index) in hqPlaylistInfo" :key="index">
        <PlayCard
          :id="item.id"
          :pic="item.coverImgUrl"
          :playcount="item.playCount"
        ></PlayCard>
        <div class="des-text">
          <div class="name">{{ item.name }}</div>
          <div class="creator">by{{ item.creator.nickname }}</div>
          <div class="des">{{ item.copywriter }}</div>
        </div>
      </div>
    </div>
    <video-type-popover
      :videoType="type"
      @handleVideoTypeClick="clickShowOrClosePopover"
      v-show="isShow"
      class="hq-popver"
    ></video-type-popover>
  </div>
</template>

<script>
import { getTopSonglistType, getTopSonglist } from "../../network/api";
import playCard from "../../components/common/PlayCard.vue";
import VideoTypePopover from "../video/video-type-popover.vue";
export default {
  components: { playCard, VideoTypePopover },
  name: "HighQualityPlaylist",
  data() {
    return {
      hqPlaylistInfo: "",
      type: [],
      isShow: false,
      currentPopoverType: "全部视频",
    };
  },
  computed: {},
  methods: {
    async getInfo() {
      const { data } = await getTopSonglistType();
      data.tags.forEach((e) => {
        this.type.push({ name: e.name });
      });
      const hqPlaylist = await getTopSonglist();
      this.hqPlaylistInfo = hqPlaylist.data.playlists;
    },
    async clickShowOrClosePopover(v) {
      this.currentPopoverType = v.name;
      this.isShow = false;
      const hqPlaylist = await getTopSonglist(v.name);
      this.hqPlaylistInfo = hqPlaylist.data.playlists;
    },
    handleTypeBtn() {
      if (this.isShow) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped lang="scss">
.high-quality-playlist {
  overflow: scroll;
  height: 100%;
  padding: 0 40px;
  position: relative;
  .head {
    .title {
      font-size: 24px;
      font-weight: 700;
      .type-btn {
        display: inline-block;
        font-size: 13px;
        font-weight: 400;
        border-radius: 10px;
        border: 1px solid gray;
        padding: 3px 10px;
        float: right;
      }
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    .cards {
      width: 50%;
      display: flex;
      .card {
        width: 25%;
      }
      .des-text {
        display: inline-block;
        font-size: 15px;
        padding-left: 10px;
        .name {
          padding-top: 35px;
          cursor: pointer;
        }
        .creator {
          color: gray;
          cursor: pointer;
          font-size: 10px;
          padding-top: 20px;
        }
        .des {
          color: rgb(179, 179, 179);
          font-size: 11px;
          padding-top: 35px;
        }
      }
    }
    @media (min-width: 1921px) {
      .cards {
        width: 33%;
      }
    }
  }
  .hq-popver {
    position: absolute;
    right: 30px;
    top: 30px;
    float: left;
  }
}
</style>
