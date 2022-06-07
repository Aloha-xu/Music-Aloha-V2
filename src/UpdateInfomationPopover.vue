<template>
  <el-dialog
    title="欢迎来到Aloha音乐交流平台~ · _ ·"
    :visible.sync="centerDialogVisible"
    width="50%"
    center
    @close="beforeClose"
    :show-close="false"
  >
    <div>
      <p>已更新功能</p>
      <h2>- [x] 新增 歌词 拖拽</h2>
      <h2>- [x] 新增 拖拽 修改 歌单顺序 歌曲顺序</h2>
      <h2>- [x] 新增 右击歌曲出现菜单</h2>
      <h2>- [x] 新增 个性推荐</h2>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "UpdateInfomationPopover",
  data() {
    return {
      centerDialogVisible: true,
    };
  },
  methods: {
    beforeClose() {
      localStorage.setItem("isShowUpdateInfomation", 1);
    },
  },
};
</script>

<style></style>
