<template>
  <!-- 图片组件
        设计：有基础加载中图片 ui
              加载中ui的和图片大小一样的
              加载失败也有
              懒加载
              成功失败的钩子
              也不是所有都需要lazy加载的，设计就实现基本的功能，以后有需要可以再加
   -->
  <div class="base-image">
    <el-image
      :src="src"
      :lazy="lazy"
      :fit="fit"
      :alt="alt"
      :scroll-container="scrollContainer"
      @load="handleLoad"
      @error="handleError"
      :style="{ 'border-radius': borderRadius + 'px' }"
    >
      <!-- 加载中占位符 -->
      <div slot="placeholder" class="image-slot-ing">
        <div class="placeholder-img">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            style="width: 100%; height: 100%"
          >
            <path
              d="M64 896V128h896v768H64z m64-128l192-192 116.352 116.352L640
            448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 192.064A96 96
            0 0 1 352 288z"
              fill="#dcdde0"
            />
          </svg>
        </div>
      </div>
      <!-- 加载失败占位符 -->
      <div slot="error" class="image-slot-fail">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div
      class="play-logo-box"
      slot="play-logo"
      :style="{ 'border-radius': borderRadius + 'px' }"
      v-if="isShowPlayLogo && isDone"
    >
      <div class="play-logo center">
        <i class="el-icon-caret-right" style="font-size: 35px"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseImage",
  props: {
    src: {
      type: String,
      default: "",
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    fit: {
      type: String,
    },
    alt: {
      type: String,
      default: "",
    },
    scrollContainer: {},
    playLogoPosition: {
      type: String,
      default: "center",
    },
    borderRadius: {
      type: Number,
      default: 10,
    },
    isShowPlayLogo: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      //控制还没有加载成功的时候不显示hover效果
      isDone: false,
    };
  },
  methods: {
    handleLoad() {
      this.$emit("load");
      this.isDone = true;
    },
    handleError() {
      this.$emit("error");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/index.scss";
.base-image {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  .el-image {
    width: 100%;
    height: 100%;
    .image-slot-ing {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      @include skeleton-color;
      .placeholder-img {
        width: 40%;
        height: 40%;
        display: inline-block;
      }
    }
    .image-slot-fail {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $bg-fail;
      .el-icon-picture-outline {
        font-size: 400%;
      }
    }
    .play-logo {
      width: 100%;
      height: 100%;
    }
  }
  .play-logo-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    &:hover {
      opacity: 0.9;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .play-logo {
      width: 50px;
      height: 50px;
      background-color: #fff;
      display: flex;
      border-radius: 50%;
      &:hover {
        background-color: aquamarine;
      }
    }
    .center {
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
