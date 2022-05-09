<template>
  <!-- VueDragResize组件:https://github.com/kirillmurashov/vue-drag-resize -->
  <!-- 优化 识别超长句子  有的超长句子可能会超过最长长度 
            添加一些功能快捷键进去 eg: 锁 快速 降速 调字体大小 字体颜色 
  -->
  <div class="lyric_component">
    <!-- 歌词弹出框 -->
    <VueDragResize
      :isActive="true"
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
      v-if="isShowLyric"
      :sticks="sticks"
      @activated="sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']"
      @deactivated="sticks = []"
    >
      <!-- 单行显示 -->
      <div
        :style="{
          lineHeight: height + 'px',
          fontSize: (height / 40) * 16 + 'px',
        }"
        class="lyric--style"
      >
        {{ currentLyric() }}
      </div>
      <!-- 两行显示显示 -->
      <!-- <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p> -->
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
    ...mapGetters(["isShowLyric", "currentTime", "currentSongInfo"]),
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
    };
  },
  methods: {
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
@import "@/assets/css/base.scss";

.lyric-box {
  background-color: rgba(162, 162, 162, 0.2);
}
.lyric--style {
  text-align: center;
}
.vdr-stick,
.vdr-stick-tm {
  display: none;
}
</style>
