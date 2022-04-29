<template>
  <div class="singer-list-detail">
    <div class="head">
      <div class="pic">
        <img :src="ArtistInfo.cover" alt="" />
      </div>
      <div class="text">
        <div class="name">{{ ArtistInfo.name }}</div>
        <el-button round class="el-icon-folder-add">收藏</el-button>
        <el-button round class="el-icon-user">个人页面</el-button>
        <div class="other">
          <span class="songs">歌曲数：{{ ArtistInfo.musicSize }}</span>
          <span class="album">专辑数：{{ ArtistInfo.albumSize }}</span>
          <span class="mv">MV数：{{ ArtistInfo.mvSize }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="navbar">
          <div
            v-for="(item, index) in navbar"
            :key="index"
            @click="itemClick(index)"
            class="item"
            :class="currentIndex === index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
        <div class="search">123</div>
      </div>
      <album
        v-if="currentIndex === 0"
        :ArtistAlbumInfo="ArtistAlbumInfo"
      ></album>
      <MV v-else-if="currentIndex === 1" :ArtistMVInfo="ArtistMVInfo"></MV>
      <artist-desc
        v-else-if="currentIndex === 2"
        :ArtistDescdata="ArtistDescInfo"
        :name="ArtistInfo.name"
      ></artist-desc>
      <simi-artist v-else :SimiArtist="SimiArtistInfo"></simi-artist>
    </div>
  </div>
</template>

<script>
import Album from "./album.vue";
import ArtistDesc from "./artist-desc.vue";
import MV from "./mv.vue";
import SimiArtist from "./simi-artist.vue";

import {
  getArtistDetail,
  getArtistMV,
  getArtistDesc,
  getSimiArtist,
  getArtistAlbum,
} from "../../network/api";
export default {
  components: { Album, MV, ArtistDesc, SimiArtist },
  name: "SingerListDetail",
  data() {
    return {
      ArtistInfo: [],
      ArtistMVInfo: [],
      ArtistDescInfo: [],
      SimiArtistInfo: [],
      ArtistAlbumInfo: [],
      navbar: ["专辑", "MV", "歌手详情", "相似歌手"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = index;
          break;
        case 1:
          this.currentIndex = index;
          break;
        case 2:
          this.currentIndex = index;
          break;
        case 3:
          this.currentIndex = index;
          break;
      }
    },
    async init() {
      this.itemClick(this.currentIndex);
      this.id = this.$route.params.id;
      const { data } = await getArtistDetail(this.id);
      this.ArtistInfo = data.data.artist;
      const MVdata = await getArtistMV(this.id);
      this.ArtistMVInfo = MVdata.data.mvs;
      const ArtistDescInfo = await getArtistDesc(this.id);
      this.ArtistDescInfo = ArtistDescInfo.data;
      const SimiArtistInfo = await getSimiArtist(this.id);
      this.SimiArtistInfo = SimiArtistInfo.data.artists;
      const ArtistAlbumInfo = await getArtistAlbum(this.id);
      this.ArtistAlbumInfo = ArtistAlbumInfo.data.hotAlbums;
    },
  },

  created() {
    this.init();
  },
  
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style scoped lang='scss'>
.singer-list-detail {
  width: 100%;
  padding-top: 35px;
  flex-wrap: wrap;
  overflow: scroll;
  height: 92vh;
  min-width: 1700px;
  .head {
    width: 100%;
    display: flex;
    .pic {
      margin-left: 30px;
      img {
        width: 180px;
        height: 180px;
        border-radius: 5px;
      }
    }
    .text {
      width: 100%;
      .name {
        font-size: 23px;
        font-weight: 900;
        margin-left: 20px;
      }
      .el-button.is-round {
        padding: 5px 20px;
      }
      .el-button {
        height: 30px;
        margin-top: 15px;
        margin-left: 18px;
      }

      .el-button.is-round:hover {
        background-color: rgb(246, 246, 246);
        color: gray;
      }
      .other {
        margin-top: 15px;
        margin-left: 20px;
        font-size: 13px;
        .songs {
          margin-right: 20px;
        }
        .album {
          margin-right: 20px;
        }
        .mv {
          margin-right: 20px;
        }
      }
    }
  }
  .content {
    margin-top: 30px;
    width: 100%;
    .top {
      display: flex;
      margin-bottom: 18px;
      margin-left: 30px;
      .navbar {
        display: flex;
        .item {
          font-size: 16px;
          color: gray;
          padding-bottom: 5px;
          margin-right: 20px;
        }
        .active {
          color: black;
          font-size: 17px;
          font-weight: 900;
          border-bottom: 2.5px solid red;
        }
      }
      .search {
        margin-left: 1000px;
        width: 190px;
        background-color: aqua;
      }
    }
  }
}
</style>