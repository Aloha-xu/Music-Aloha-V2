<template>
  <div class="playlistdetail-head">
    <div class="left" v-show="!loading">
      <img :src="playListHeadInfo.coverImgUrl + '?param=180y180'" />
    </div>
    <div class="right" v-show="!loading">
      <div class="title">
        <span class="songlist-type">{{ playListHeadInfo.titleType }}</span>
        <span class="songlist-name">{{ playListHeadInfo.name }}</span>
        <i
          v-show="isShowUpdataComponent"
          class="el-icon-edit-outline"
          style="
            font-size: 25px;
            vertical-align: middle;
            cursor: pointer;
            margin-left: 5px;
          "
          @click="handleToUpdataPapg"
        ></i>
      </div>
      <div class="creator-info" v-if="isShowPlayListComponent">
        <img
          :src="playListHeadInfo.avatarUrl + '?param=25y25'"
          alt=""
          class="head-portrait"
        />
        <span class="creator-name" @click="clickToUserDetailPapg">{{
          playListHeadInfo.nickname
        }}</span>
        <span class="create-time">{{ playListHeadInfo.createTime }}</span>
      </div>
      <div class="tools">
        <el-button round>
          <span class="el-icon-caret-right" @click="handlePlayAllSongs"
            >播放全部</span
          >
          <span class="el-icon-plus play-all"></span>
        </el-button>
        <el-button
          round
          @click="handleCollectSonglist"
          v-if="!playListHeadInfo.subscribed"
          :style="
            isShowUpdataComponent ? 'pointer-events: none; opacity: 0.6;' : ''
          "
        >
          <span class="el-icon-folder-add"
            >收藏({{ playListHeadInfo.subscribedCount }}万)</span
          >
        </el-button>
        <el-button
          round
          @click="handleCollectSonglist"
          v-if="playListHeadInfo.subscribed"
        >
          <span class="el-icon-folder-add"
            >已收藏({{ playListHeadInfo.subscribedCount }}万)</span
          >
        </el-button>
        <el-button round>
          <span class="el-icon-edit-outline"
            >分享({{ playListHeadInfo.shareCount }})</span
          >
        </el-button>
        <el-button round>
          <span class="el-icon-download">下载全部</span>
        </el-button>
      </div>
      <div class="album-info" v-if="!isShowPlayListComponent">
        <span class="songer">歌手：{{ playListHeadInfo.singer }}</span>
        <br />
        <span class="time">时间：{{ playListHeadInfo.publishTime }}</span>
      </div>
      <span class="biaoqian" v-if="isShowPlayListComponent">标签：</span>
      <span
        class="songlist-title"
        v-for="item in playListHeadInfo.tags"
        :key="item"
        v-show="isShowPlayListComponent"
        >{{ item }}
      </span>
      <span
        class="updata-type"
        v-if="
          isShowPlayListComponent &&
            playListHeadInfo.tags &&
            playListHeadInfo.tags.length === 0
        "
        >添加标签</span
      >
      <div class="song-other-info" v-if="isShowPlayListComponent">
        歌曲：{{ playListHeadInfo.trackCount }} 播放：{{
          playListHeadInfo.playCount
        }}万
      </div>
      <div
        v-if="isShowPlayListComponent"
        class="description"
        :style="
          isShowDescription === true
            ? 'overflow: visible;'
            : 'overflow: hidden;'
        "
      >
        简介：
        <span
          class="updata-desc"
          @click="handleToUpdataPapg"
          v-show="
            isShowPlayListComponent && playListHeadInfo.description === ''
          "
          >添加简介</span
        >{{ playListHeadInfo.description }}
      </div>
    </div>
    <div
      v-if="isShowPlayListComponent"
      class="el-icon-caret-bottom show-description"
      @click="showDescription()"
    ></div>
    <el-skeleton style="width:100%;" :loading="loading" animated>
      <template slot="template">
        <el-skeleton-item
          variant="image"
          style="width: 207px; height: 180px;margin-left:20px;border-radius:10px;margin-bottom:7px"
        />
        <div
          style="padding-left: 20px; width:100%;display:flex;flex-direction: column;"
        >
          <el-skeleton-item
            variant="image"
            style="width: 20%;height:30px;border-radius:10px ;"
          />
          <div
            style="width:50%;display:flex;align-items: center;margin-top:10px"
          >
            <el-skeleton-item
              variant="p"
              style="width: 25px; height: 25px;border-radius:50%;"
            />
            <el-skeleton-item
              variant="p"
              style="width: 20%;height:25px;margin-left:10px"
            />
          </div>
          <div style="width:50%;display:flex;margin-top:10px;">
            <el-skeleton-item
              variant="h1"
              style="width: 15%;height:30px;border-radius:20px;"
            />
            <el-skeleton-item
              variant="h1"
              style="width: 15%;height:30px;margin-left:10px;border-radius:20px;"
            />
            <el-skeleton-item
              variant="h1"
              style="width: 15%;height:30px;margin-left:10px;border-radius:20px;"
            />
            <el-skeleton-item
              variant="h1"
              style="width: 15%;height:30px;margin-left:10px;border-radius:20px;"
            />
          </div>
          <el-skeleton-item
            variant="p"
            style="width: 8%;height:15px;margin-top:10px"
          />
          <el-skeleton-item
            variant="p"
            style="width: 12%;height:15px;margin-top:10px"
          />
          <el-skeleton-item
            variant="p"
            style="width: 80%;height:15px;margin-top:10px"
          />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PlayListDetailHead",
  props: {
    playListHeadInfo: Object,
    isShowPlayListComponent: Boolean,
  },
  data() {
    return {
      isShowDescription: false,
    };
  },
  methods: {
    showDescription() {
      this.isShowDescription = !this.isShowDescription;
    },
    handlePlayAllSongs() {
      if (this.playing) {
        return;
      }
      this.$emit("handlePlayAllSongs");
    },
    handleCollectSonglist() {
      this.$emit("handleCollectSonglist");
    },
    handleToUpdataPapg() {
      this.$router.push("/userupdata/" + this.$route.params.id);
    },
    clickToUserDetailPapg() {
      this.$router.push("/userdetail/" + this.playListHeadInfo.creatorId);
    },
  },
  computed: {
    ...mapGetters(["isShowUpdataComponent", "playing", "loading"]),
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.playlistdetail-head {
  position: relative;
  width: 100%;
  padding-top: 25px;
  .left {
    display: inline-block;
    margin-right: 20px;
    /* float 解决了点击详细按钮图片会跟着向下 */
    float: left;
    margin-left: 20px;
    img {
      width: 180px;
      height: 180px;
      border-radius: 5px;
    }
  }
  .right {
    display: inline-block;
    .title {
      padding-bottom: 5px;
      .songlist-type {
        border: 1px solid red;
        color: red;
        border-radius: 5px;
        font-size: 13px;
        vertical-align: middle;
        padding: 3px;
      }
      .songlist-name {
        font-size: 23px;
        font-weight: 900;
        margin-left: 10px;
        vertical-align: middle;
      }
    }
    .creator-info {
      margin-top: 10px;
      font-size: 12.5px;
      .head-portrait {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .creator-name {
        cursor: pointer;
        vertical-align: middle;
        margin-left: 5px;
        color: rgb(115, 166, 190);
      }
      .create-time {
        vertical-align: middle;
        margin-left: 5px;
      }
    }
    .tools {
      margin-top: 10px;
      margin-bottom: 10px;
      .el-button.is-round {
        padding: 5px 10px;
      }
      .el-button {
        height: 30px;
      }
      .el-button:nth-child(1) {
        height: 30px;
        background-color: $theme-color;
        color: white;
        &:hover {
          //未做
        }
      }
      .play-all {
        color: white;
      }
      .el-button.is-round:nth-child(n + 2):hover {
        background-color: rgb(246, 246, 246);
        color: gray;
        border-color: rgba($color: gray, $alpha: 0.5);
      }
    }
    .album-info {
      height: 100px;
    }
    .biaoqian {
      font-size: 13.5px;
    }
    .songlist-title {
      display: inline-block;
      margin-top: 5px;
      margin-right: 5px;
      font-size: 13.5px;
      color: rgb(115, 166, 190);
    }
    .updata-type {
      font-size: 13px;
      color: rgb(79, 149, 255);
      cursor: pointer;
    }
    .updata-type:hover {
      color: rgb(40, 40, 221);
    }
    .song-other-info {
      margin-top: 10px;
      font-size: 13.5px;
    }
    .description {
      display: inline-block;
      margin-top: 10px;
      font-size: 13.5px;
      line-height: 20px;
      height: 20px;
      width: 1100px;
      word-wrap: break-word;
      overflow: hidden;
      .updata-desc {
        font-size: 13px;
        cursor: pointer;
        color: rgb(79, 149, 255);
      }
      .updata-desc:hover {
        color: rgb(40, 40, 221);
      }
    }
  }
  .show-description {
    position: absolute;
    right: 60px;
    top: 187px;
  }
}
::v-deep {
  .el-skeleton {
    display: flex;
  }
}
</style>
