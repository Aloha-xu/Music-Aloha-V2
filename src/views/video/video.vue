<template>
  <div class="video">
    <div class="content">
      <div class="navbar">
        <div class="type">
          <div class="alltype-btn" @click="handleShowPopover">
            <el-button>{{ currentPopoverType }}</el-button>
          </div>
          <div class="hottype">
            <span
              v-for="item in hotVideoType"
              :key="item"
              @click="handleHotVideoTypeClick(item)"
              class="item"
              :class="item === currentVideoType ? 'active' : ''"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <div
        class="all-card"
        v-infinite-scroll="loadingMoreInfo"
        :infinite-scroll-delay="1000"
      >
        <MvCard
          v-for="(item, index) in videoInfo"
          :key="index"
          :id="item.data.vid"
          :playcount="item.data.praisedCount"
          :pic="item.data.coverUrl + '?param=264y148'"
          :singer="item.data.creator.nickname.split('')"
          :text="item.data.title"
          :playType="playType"
        ></MvCard>
      </div>
      <Loading
        v-show="loading"
        style="height: 10vh; margin-bottom: 100px"
      ></Loading>
      <video-type-popover
        :videoType="allvideoType"
        @handleVideoTypeClick="handleVideoTypeClick"
        v-show="isShowPopover"
      ></video-type-popover>
    </div>
  </div>
</template>

<script>
import MvCard from "@/components/common/MvCard.vue";
import videoTypePopover from "./video-type-popover.vue";
import { getVideoCategoryList, getVideoType } from "@/network/api";
import Loading from "@/components/common/loading.vue";
import { mapGetters } from "vuex";
export default {
  components: { videoTypePopover, MvCard, Loading },
  name: "Video",
  data() {
    return {
      currentPopoverType: "全部视频",
      hotVideoType: [
        "翻唱",
        "听BGM",
        "生活",
        "游戏",
        "ACG音乐",
        "最佳饭制",
        "现场",
        "舞蹈",
        "MV",
      ],
      currentVideoType: "",
      currentVideoTypeId: 58107,
      allvideoType: [],
      isShowPopover: false,
      videoInfo: [],
      playType: "video",
      innerIndex: 0,
    };
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    //加载更多
    async loadingMoreInfo() {
      this.$store.commit("setLoading", true);
      const videoInfo = await getVideoType(
        this.currentVideoTypeId,
        +this.innerIndex + 1
      );
      this.videoInfo.push(...(videoInfo.data.datas || ""));
      const videoInfo1 = await getVideoType(
        this.currentVideoTypeId,
        +this.innerIndex + 2
      );
      this.videoInfo.push(...(videoInfo1.data.datas || ""));
      this.innerIndex++;
      this.$store.commit("setLoading", false);
    },
    handleShowPopover() {
      this.isShowPopover = !this.isShowPopover;
    },
    async handleVideoTypeClick(value) {
      this.$store.commit("setLoading", true);
      this.currentVideoType = value.name;
      this.currentPopoverType = value.name;
      this.isShowPopover = false;
      let flag = false;
      for (let i = 1; i <= 9; i++) {
        if (value.name === this.hotVideoType[i]) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.currentVideoType = value.name;
      } else {
        this.currentVideoType = "";
      }
      this.currentVideoTypeId = value.id;
      this.innerIndex = 0;
      this.getVideoInfo();
      this.$store.commit("setLoading", false);
    },
    async handleHotVideoTypeClick(value) {
      this.$store.commit("setLoading", true);
      this.currentVideoType = value;
      this.currentPopoverType = value;
      let index = this.allvideoType.findIndex((item) => item.name === value);
      this.currentVideoTypeId = this.allvideoType[index].id;
      this.innerIndex = 0;
      this.getVideoInfo();
      this.$store.commit("setLoading", false);
    },
    //获取视频信息
    async getVideoInfo() {
      let innerVideInfo = [];
      this.$store.commit("setLoading", true);
      const videoInfo = await getVideoType(
        this.currentVideoTypeId,
        +this.innerIndex + 1
      );
      innerVideInfo.push(...(videoInfo.data.datas || ""));
      const videoInfo1 = await getVideoType(
        this.currentVideoTypeId,
        +this.innerIndex + 2
      );
      innerVideInfo.push(...(videoInfo1.data.datas || ""));
      this.innerIndex++;
      this.videoInfo = innerVideInfo;
      this.$store.commit("setLoading", false);
    },
  },
  async created() {
    let { data } = await getVideoCategoryList();
    this.allvideoType = data.data;
    this.getVideoInfo(58107);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/index.scss";
.video {
  display: flex;
  justify-content: center;
  overflow: scroll;
  height: 82vh;
  .content {
    width: 1100px;
    position: relative;
    .navbar {
      .type {
        display: flex;
        .alltype-btn {
          margin-left: 10px;
          height: 35px;
          line-height: 35px;
          flex: 5;
          .el-button {
            border-radius: 20px;
            height: 30px;
            line-height: 5px;
          }
          .el-button:focus,
          .el-button:hover {
            color: black;
            border-color: $active-grey;
            background-color: $active-grey;
          }
        }
        .hottype {
          flex: 6;
          height: 30px;
          line-height: 30px;
          .item {
            cursor: pointer;
            margin-left: 2px;
            font-size: 13px;
            color: gray;
            display: inline-block;
            padding: 0px 15px;
          }
          .item:hover {
            color: rgb(56, 56, 56);
          }
          .active {
            color: rgb(251, 51, 51);
            background-color: rgb(255, 216, 216);
            border-radius: 10px;
          }
        }
      }
    }
    .all-card {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: hidden;
      padding-bottom: 20px;
      .card {
        width: 24%;
        margin-left: 10px;
      }
    }
    .video-type-popover {
      position: absolute;
      left: 10px;
      top: 41px;
    }
  }
}
</style>
