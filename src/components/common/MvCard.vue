<template>
  <div class="card" @click="clickCard">
    <div
      class="pic"
      @mouseenter="handleShowInlinePlyer"
      @mouseleave="handleDisvisibleInlinePlyer"
    >
      <BaseImage
        :src="pic"
        :lazy="true"
        :class="showInlinePlayer ? 'disvisible' : ''"
      />
      <span class="palycount" :class="showInlinePlayer ? 'disvisible' : ''">{{
        playCount
      }}</span>
      <!-- inline-player -->
      <div class="inline-player" :class="showInlinePlayer ? 'visible' : ''">
        <video
          :src="cVideoSrc"
          width="264px"
          height="148px"
          autoplay
          muted
        ></video>
      </div>
    </div>
    <div class="text ellipsis">
      {{ text }}
    </div>
    <div class="singer ellipsis">
      <span v-for="(item, index) in singer" :key="index">
        {{ item }}
      </span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "MvCard",
  props: {
    pic: String,
    playcount: Number,
    text: String,
    id: String,
    singer: Array,
    playType: String,
  },
  data() {
    return {
      activeColor: "red",
      showInlinePlayer: false,
    };
  },
  computed: {
    ...mapGetters(["videoSrc"]),
    playCount() {
      let playcount;
      if (parseInt((this.playcount / 10000).toFixed(0)) <= 1) {
        playcount = this.playcount;
      } else {
        playcount = parseInt((this.playcount / 10000).toFixed(0)) + "万";
      }
      return playcount;
    },
    cVideoSrc() {
      return this.showInlinePlayer ? this.videoSrc : "";
    },
  },
  methods: {
    clickCard() {
      if (this.playType == "video") {
        this.$router.push("/mvdetail/" + this.id);
      } else {
        this.$router.push("/mvdetail/" + Number(this.id));
      }
    },
    // 2、进入元素
    handleShowInlinePlyer() {
      this.showInlinePlayer = true;
      this.$emit("handleShowInlinePlyer");
    },
    // 4、离开元素
    handleDisvisibleInlinePlyer() {
      this.showInlinePlayer = false;
      this.$store.commit("SET_VIDEO_SRC", "");
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  padding-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
  width: 24%;
  .pic {
    width: 100%;
    height: 148px;
    .palycount {
      position: absolute;
      top: 3px;
      right: 3px;
      font-size: 12px;
      color: white;
    }
    .disvisible {
      opacity: 0;
    }
  }

  .inline-player {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .visible {
    opacity: 1;
  }
  .text {
    color: rgb(90, 90, 90);
    font-size: 14px;
    letter-spacing: 0.7px;
    margin-top: 5px;
    &:hover {
      color: rgb(0, 0, 0);
    }
  }
  .singer {
    font-size: 13px;
    color: rgb(146, 146, 146);
    letter-spacing: 0.7px;
    margin-top: 5px;
    &:hover {
      color: rgb(110, 110, 110);
    }
  }
}

::v-deep .el-image {
  width: 100%;
  height: 148px;
}
img {
  width: 100%;
  height: 148px;
  border-radius: 5px;
}
</style>
