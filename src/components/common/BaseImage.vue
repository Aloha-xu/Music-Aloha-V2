<template>
  <!-- 图片组件
        设计：有基础加载中图片 ui
              加载中ui的和图片大小一样的
              加载失败也有
              懒加载
              成功失败的钩子
              也不是所有都需要lazy加载的，设计就实现基本的功能，以后有需要可以再加
   -->
  <el-image
    :src="src"
    :lazy="lazy"
    :fit="fit"
    :alt="alt"
    :scroll-container="scrollContainer"
    @load="handleLoad"
    @error="handleError"
  >
    <!-- 加载中占位符 -->
    <div slot="placeholder" class="image-slot-ing">
      <div class="placeholder-img">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
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
  },
  methods: {
    handleLoad() {
      this.$emit("load");
    },
    handleError() {
      this.$emit("error");
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
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
      width: 30%;
      height: 30%;
      display: inline-block;
    }
  }
  .image-slot-fail {
    width: 100%;
    height: 100%;
  }
}
</style>
