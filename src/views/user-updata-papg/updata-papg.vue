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
        <span
          class="add-type"
          v-show="playlistType"
          @click="isShowTypePopover = true"
          >添加标签</span
        >
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
      <div class="cancel-button" @click="$router.back()">取消</div>
    </div>
    <div class="cover">
      <img :src="cover" alt="" />
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :auto-upload="false"
        :on-change="changeUpload"
      >
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
        <!-- <div class="updata-button" v-else>编辑封面</div> -->
        <div class="updata-button">编辑封面</div>
        <!--   优化   -->
      </el-upload>
    </div>
    <userUpdataTypePopover
      :currentSongType="playlistType"
      v-show="isShowTypePopover"
      @handleUpdataSongType="handleUpdataSongType"
    ></userUpdataTypePopover>
    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align: center">
          <VueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :autoCrop="option.autoCrop"
          ></VueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="finishCrop()" :loading="loading"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userUpdataTypePopover from "./user-updata-type-popover.vue";
import { updataUserPlaylistCover } from "@/network/api";
import {
  updataUserPlaylist,
  getUserPlaylist,
  getSongListType,
} from "@/network/api";
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
      isShowTypePopover: false,
      cover: "",

      //

      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      // 防止重复提交
      loading: false,
      fileinfo: "",
    };
  },
  methods: {
    // 上传按钮   限制图片大小
    changeUpload(file) {
      console.log(file);
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      // this.fileinfo = file;

      // 上传成功后将图片地址赋值给裁剪框显示图片
      // this.$nextTick(() => {
      let file1 = file.raw;
      // console.log(file1);
      // const fr = new FileReader(file1);
      // console.log(fr);
      // fr.readAsDataURL(file1);
      // fr.onload = function() {
      //   this.option.img = fr.result;
      //   // this.cover = fr.result;
      // };

      let fileUrl = window.URL.createObjectURL(file1);
      this.option.img = fileUrl;
      onload = function () {
        // 手动回收
        URL.revokeObjectURL(fileUrl);
      };

      // let reader = new FileReader();
      // this.option.img = reader.readAsArrayBuffer(file.raw);
      // // this.option.img = file.url;
      this.dialogVisible = true;
      // });
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finishCrop() {
      this.$refs["cropper"].getCropBlob(async (data) => {
        console.log(data);
        let files = new window.File([data], { type: data.type });
        // let formData = {
        //   imgFile: files,
        // };

        //  优化  需要优化写作方式
        var formData = new FormData();
        formData.append("imgFile", files);
        console.log(formData);
        const imgSize = await this.getImgSize(files);
        this.loading = true;
        const data1 = await updataUserPlaylistCover({
          formData,
          id: this.$route.params.id,
          imgSize: imgSize.width,
        });
        console.log(data1);
        this.dialogVisible = false;

        // .then((res) => {
        //   console.log(res);
        //   this.dialogVisible = false;
        // })
        // .catch((err) => {
        //   console.log(err);
        //   this.loading = false;
        // });
        //上传阿里云服务器
        // client()
        //   .put(fileName, data)
        //   .then((result) => {
        //     this.dialogVisible = false;
        //     // this.picsList.push(result.url);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     this.loading = false;
        //   });
      });
    },

    getImgSize(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (theFile) {
          let image = new Image();
          image.src = theFile.target.result;
          image.onload = function () {
            resolve({
              width: this.width,
              height: this.height,
            });
          };
        };
      });
    },

    //覆盖原有的上传方法
    // async uploadImage(param) {
    //   const { data } = await updataUserPlaylistCover({ upload: param.file });
    //   this.imageUrl = data.retBody.attach;
    //   this.form.image = data.retBody.attach;
    //   this.isShowTemporaryPicture = true;
    // },

    handleUpdataSongType(val) {
      this.playlistType = val;
    },
    async saveClick() {
      //判断添加的标签是否大于3个
      if (this.playlistType.length > 3) {
        alert("标签大于3个");
        return;
      }
      await updataUserPlaylist(
        this.$route.params.id,
        this.palylistName,
        this.playlistDesc,
        // 暂时未解决   拼接后 返回400
        this.playlistType.join(";")
      );
      this.getUserPlaylist();
      this.$router.back();
    },
    async getUserPlaylist() {
      let uInfo = JSON.parse(localStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      console.log(playlist);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist", uId);
    },

    async init() {
      //全部类别
      const { data } = await getSongListType();
      this.$store.commit("SET_ALL_TYPE", data.sub);
      let currentindex = this.mySonglist.findIndex(
        (item) => item.id == this.$route.params.id
      );
      this.palylistName = this.mySonglist[currentindex].name;
      this.playlistDesc = this.mySonglist[currentindex].description;
      this.playlistType = this.mySonglist[currentindex].tags;
      this.cover = this.mySonglist[currentindex].coverImgUrl;
    },
  },
  computed: {
    ...mapGetters(["mySonglist"]),
  },
  created() {
    this.init();
  },
  watch: {
    mySonglist() {
      this.init();
    },
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
        height: 20px;
        border-radius: 20px;
        color: rgb(145, 145, 145);
        line-height: 20px;
        text-align: center;
        border: 1px solid rgb(145, 145, 145);
        margin-right: 15px;
        padding: 0px 5px;
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
.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
}
</style>
