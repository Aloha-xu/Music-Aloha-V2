<template>
  <!-- VueDragResize组件:https://github.com/kirillmurashov/vue-drag-resize -->
  <!-- 优化 识别超长句子  有的超长句子可能会超过最长长度 
            添加一些功能快捷键进去 eg: 锁 快速 降速 调字体大小 字体颜色 
  -->
  <div class="lyric_component">
    <!-- 歌词弹出框 -->
    <VueDragResize
      :isActive="isLock"
      :w="1270"
      :h="125"
      :x="340"
      :y="750"
      :z="999"
      :minh="50"
      :minw="1270"
      v-on:resizing="resize"
      v-on:dragging="resize"
      contentClass="lyric-box"
      :sticks="sticks"
      @activated="sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']"
      @deactivated="sticks = []"
      :axis="!isLock ? 'none' : 'both'"
    >
      <!-- 单行显示 -->
      <div
        :style="{
          lineHeight: height + 'px',
          fontSize: (height / 40) * 16 + 'px',
          color: color,
        }"
        class="lyric--style"
      >
        {{ currentLyric() }}
      </div>
      <div class="tools">
        <!-- 选择颜色器 -->
        <el-color-picker v-model="color"></el-color-picker>
        <!-- 锁 -->
        <div class="lock" @click="handleLock">
          <svg
            t="1652086818531"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1944"
            width="32"
            height="32"
            v-if="!isLock"
          >
            <path
              d="M385.150849 385.662338l-128.895105 0 0-150.377622q0-49.102897 19.436563-91.556444t53.706294-74.677323 80.815185-50.637363 101.786214-18.413586q49.102897 0 94.625375 18.413586t80.815185 50.637363 56.263736 74.677323 20.971029 91.556444l0 150.377622-123.78022 0 0-121.734266q0-64.447552-35.804196-99.74026t-97.182817-35.292707q-55.240759 0-88.999001 35.292707t-33.758242 99.74026l0 121.734266zM826.053946 447.040959q27.62038 0 47.568432 19.948052t19.948052 47.568432l0 317.122877q0 27.62038-9.718282 51.66034t-26.597403 41.942058-39.896104 28.131868-50.637363 10.22977l-516.603397 0q-27.62038 0-50.125874-10.22977t-38.361638-27.108891-24.551449-39.384615-8.695305-48.07992l0-324.283716q0-27.62038 19.436563-47.568432t47.056943-19.948052l61.378621 0 128.895105 0 255.744256 0 123.78022 0 61.378621 0z"
              p-id="1945"
            ></path>
          </svg>
          <svg
            t="1652086874819"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2281"
            width="32"
            height="32"
            v-if="isLock"
          >
            <path
              d="M768.25422 0q48.810328 0 94.061569 18.303873t80.333664 50.33565 56.436941 74.740814 21.354518 91.519364l0 150.49851-123.042701 0 0-122.025819q0-64.063555-36.099305-99.654419t-97.112214-35.590864q-54.911619 0-88.468719 35.590864t-33.5571 99.654419l0 124.059583-128.12711 0 0-152.532274q0-48.810328 19.320755-91.519364t53.386296-74.740814 80.333664-50.33565 101.179742-18.303873zM766.220457 693.513406l0 87.451837 0 47.793446q0 27.455809-9.660377 51.860973t-26.438928 41.692155-39.658391 27.455809-50.33565 10.168818l-514.542205 0q-27.455809 0-49.82721-9.660377t-38.641509-26.438928-24.913605-39.14995-8.643496-47.793446l0-323.368421q0-28.472691 19.829196-47.793446t46.268123-19.320755l629.449851 0q28.472691 0 47.793446 19.320755t19.320755 47.793446l0 179.988083z"
              p-id="2282"
              fill="#d81e06"
            ></path>
          </svg>
        </div>
        <!-- 快速 降速  -->
        <!-- 调字体大小  -->
      </div>
      <!-- 两行显示显示 -->
    </VueDragResize>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VueDragResize from "vue-drag-resize";
export default {
  name: "LyricComponent",
  components: {
    VueDragResize,
  },
  computed: {
    ...mapGetters(["currentTime", "currentSongInfo"]),
  },
  data() {
    return {
      //   width:1270,
      height: 125,
      //   top: 750,
      //   left: 340,
      //上次歌词的下标
      preIndex: -1,
      //句柄 就是缩放那些小点
      sticks: [],
      color: "#000000",
      isLock: true,
    };
  },
  methods: {
    //上锁
    handleLock() {
      this.isLock = !this.isLock;
      //
    },
    resize(newRect) {
      //   this.width = newRect.width;
      this.height = newRect.height;
      //   this.top = newRect.top;
      //   this.left = newRect.left;
    },
    currentLyric() {
      let currentIndex = this.currentSongInfo.lyric.findIndex(
        (item) => parseInt(this.currentTime / 1000) === item.time
      );

      if (currentIndex != -1) {
        this.preIndex = currentIndex;
      } else {
        currentIndex = this.preIndex;
      }

      //除暴一点的方法吧 长度小于5就是纯音乐  不想找字段了
      if (this.currentSongInfo.lyric.length <= 5) {
        return "纯音乐";
      } else {
        return (
          this.currentSongInfo.lyric[currentIndex] &&
          this.currentSongInfo.lyric[currentIndex].content
        );
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import "@/assets/css/index.scss";

.lyric-box {
  background-color: rgba(162, 162, 162, 0.2);
}
.lyric--style {
  text-align: center;
}
.tools {
  position: absolute;
  right: 10px;
  top: 0px;
  display: flex;
}
</style>
