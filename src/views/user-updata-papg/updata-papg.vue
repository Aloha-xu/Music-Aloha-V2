<template>
  <div class="updata-papg">
    <div class="title">编辑歌单信息</div>
    <div class="playlist-info">
      <div class="palylist-name">
        歌单名：
        <el-input v-model="palylistName"></el-input>
      </div>
      <div class="types">
        标签：
        <span
          class="basie-type"
          v-for="(item, index) in playlistType"
          :key="index"
          >{{ item }}</span
        >
        <span class="add-type" v-show="playlistType">添加标签</span>
      </div>
      <div class="desc">
        简介：
        <el-input
          type="textarea"
          v-model="playlistDesc"
          maxlength="999"
          show-word-limit
          rows="5"
        >
        </el-input>
      </div>
      <div class="save-button" @click="saveClick">保存</div>
      <div class="cancel-button" @click="cancelClick">取消</div>
    </div>
    <div class="cover">
      <img :src="cover" alt="" />
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <div class="updata-button" v-else>编辑封面</div>
        <!-- 上传封面 不写了 搞不懂 -->
      </el-upload>
    </div>
    <user-updata-type-popover
      :currentSongType="playlistType"
      v-show="false"
    ></user-updata-type-popover>
  </div>
</template>

<script>
import userUpdataTypePopover from "./user-updata-type-popover.vue";
import { updataUserPlaylist, getUserPlaylist } from "../../network/api";
import { mapGetters } from "vuex";
export default {
  components: { userUpdataTypePopover },
  name: "UpDataPapg",
  data() {
    return {
      palylistName: "",
      playlistDesc: "",
      playlistType: [],
      imageUrl: "",
    };
  },
  methods: {
    async saveClick() {
      //判断添加的标签是否大于3个
      if (this.playlistType.length > 3) {
        alert("标签大于3个");
        return;
      }
      console.log(this.playlistType);
      await updataUserPlaylist(
        this.$route.params.id,
        this.palylistName,
        this.playlistDesc,
        this.playlistType.join(";")
      );
      this.getUserPlaylist();
      this.$router.back();
    },
    cancelClick() {
      this.$router.back();
    },
    async getUserPlaylist() {
      let uInfo = JSON.parse(window.sessionStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      console.log(playlist);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist", uId);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  computed: {
    ...mapGetters(["mySonglist"]),
    cover() {
      let currentindex = this.mySonglist.findIndex(
        (item) => item.id == this.$route.params.id
      );
      return this.mySonglist[currentindex].coverImgUrl;
    },
  },
  created() {
    let currentindex = this.mySonglist.findIndex(
      (item) => item.id == this.$route.params.id
    );
    this.palylistName = this.mySonglist[currentindex].name;
    this.playlistDesc = this.mySonglist[currentindex].description;
    this.playlistType = this.mySonglist[currentindex].tags;
  },
};
</script>

<style scoped lang="scss">
.updata-papg {
  font-size: 13.5px;
  color: rgb(71, 71, 71);
  display: flex;
  flex-wrap: wrap;
  width: 800px;
  height: 20px;
  margin-left: 20px;
  .title {
    width: 100%;
    font-size: 22px;
    font-weight: 600;
    padding-bottom: 25px;
    padding-top: 20px;
    color: black;
  }
  .playlist-info {
    width: 550px;
    .palylist-name {
      margin: 15px 0;
      .el-input {
        width: 80%;
      }
    }
    .types {
      margin: 15px 0;
      margin-left: 10px;
      .basie-type {
        display: inline-block;
        width: 45px;
        height: 20px;
        border-radius: 20px;
        color: rgb(145, 145, 145);
        line-height: 20px;
        text-align: center;
        border: 1px solid rgb(145, 145, 145);
        margin-right: 15px;
      }
      .add-type {
        color: rgb(79, 149, 255);
        cursor: pointer;
      }
      .add-type:hover {
        color: rgb(40, 40, 221);
      }
    }
    .desc {
      margin: 15px 0;
      margin-left: 10px;
      .el-textarea {
        width: 80%;
      }
    }
    .save-button {
      width: 85px;
      height: 30px;
      border-radius: 20px;
      color: white;
      background-color: rgb(223, 0, 0);
      line-height: 30px;
      text-align: center;
      letter-spacing: 7px;
      display: inline-block;
      margin-left: 70px;
      padding-left: 5px;
      cursor: pointer;
    }
    .save-button:hover {
      background-color: rgb(134, 0, 0);
    }
    .cancel-button {
      width: 85px;
      height: 30px;
      border-radius: 20px;
      color: black;
      background-color: rgb(255, 255, 255);
      line-height: 30px;
      text-align: center;
      letter-spacing: 7px;
      display: inline-block;
      border: 1px solid rgb(212, 212, 212);
      margin-left: 30px;
      padding-left: 5px;
      cursor: pointer;
    }
    .cancel-button:hover {
      background-color: rgb(245, 245, 245);
    }
  }
  .cover {
    width: 250px;
    .updata-button {
      width: 85px;
      height: 30px;
      border-radius: 20px;
      color: black;
      background-color: rgb(255, 255, 255);
      line-height: 30px;
      text-align: center;
      display: inline-block;
      border: 1px solid rgb(212, 212, 212);
      margin-left: 30px;
      margin-top: 20px;
      cursor: pointer;
    }
    img {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }
  }
}
</style>
