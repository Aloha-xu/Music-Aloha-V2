<template>
  <div class="songlist-component">
    <div class="title-name">
      <span>音乐标题</span>
      <!-- 飙升榜的标题卡槽 -->
      <slot name="SoaringrateTitle"></slot>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <div @contextmenu.prevent="onContextmenu" v-if="innerSongInfo.length > 0">
      <draggable
        v-model="innerSongInfo"
        animation="300"
        :disabled="!isShowUpdataComponent"
      >
        <transition-group>
          <div
            class="song-item"
            v-for="(item, index) in innerSongInfo"
            :key="index"
            :class="item.id === currentSongInfo.id ? 'active-bg' : ''"
            :innerIndex="index"
          >
            <div class="index-number">
              {{ setIndex(index) }}
            </div>
            <!-- 红心 -->
            <img
              src="@/assets/icon/heart.svg"
              alt=""
              v-show="!isHeart(item.id)"
              @click="ClickHeart(item.id, index)"
              class="no-active-heart"
            />
            <img
              src="@/assets/icon/heartactive.svg"
              alt=""
              v-show="isHeart(item.id)"
              @click="ClickHeart(item.id, index)"
              class="active-heart"
            />
            <!-- 下载 -->
            <p class="el-icon-download" @click="handleDownload(item)"></p>
            <div class="song-name" @click="HandleSongClick(item, index)">
              <span
                :class="item.id === currentSongInfo.id ? 'active-name' : ''"
                >{{ item.name }}</span
              >
              <!-- SQ MV logo的卡槽 -->
              <slot name="SQlogo"></slot>
              <slot name="MVlogo"></slot>
            </div>
            <!-- 飙升榜的数据卡槽 -->
            <slot name="SoaringrateData"></slot>
            <div class="singer">
              <span
                v-for="(item1, index1) in item.singer"
                :key="index1"
                @click="clickToSingerPapg(item1.id)"
                >{{ item1.name }}&nbsp;</span
              >
            </div>
            <div class="album" @click="clickToAlbumPapg(item.album.id)">
              {{ item.album.name }}
            </div>
            <div class="time">{{ setSongTime(item.totleTime) }}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <el-empty
      :image-size="200"
      :style="{ height: 50 + 'vh' }"
      v-else
    ></el-empty>
  </div>
</template>

<script>
import {
  getLikeList,
  setLike,
  setSongToMyselfPlayList,
  getCheckMusic,
} from "@/network/api";
import { forMatTime } from "@/utils/format";
import { mapGetters } from "vuex";
import draggable from "vuedraggable";
import download from "@/utils/download";
import { parseLyric } from "@/utils/lyric";
export default {
  name: "SongListComponent",
  data() {
    return {
      //歌单的全部列表信息
      allSongList: [],
      likeList: [],
      //用于右击弹出菜单的innerIndex标识
      innerIndex: null,
      MyselfPlaylistTemplate: null,
    };
  },
  props: {
    songsInfo: Array,
  },
  components: {
    draggable,
  },
  methods: {
    /* 点击指定红星添加收藏未做 */
    //点击后判断是否已经收藏了 控制收藏没有的的元素不可以为data的全局元素 否一点就全改变了
    async ClickHeart(id) {
      //把传进来的id与likelist对比    非-1则存在 红星 / -1 空红星
      let currentIndex = this.likeList.findIndex((item) => item == id);
      if (currentIndex == -1) {
        const { data } = await setLike(id, true);
        data.code === 200 &&
          (this.likeList.push(id), this.$message.success("已加入我喜欢的音乐"));
      } else {
        const { data } = await setLike(id, false);
        data.code === 200 &&
          (this.likeList.splice(currentIndex, 1),
          this.$message.success("已从我喜欢的音乐移除"));
      }
      //这里没必要再一次请求数据 ，可以使用内存里面的数据 ，再一次进来的时候也是会刷新到的
      //但是前面要确保保持数据的一致性。
      // this.getLikeList();
    },
    // 处理点击播放音乐事件
    HandleSongClick(v, index) {
       try {
        const checkmusic = await getCheckMusic(v.id);
        //判断音乐是否有版权
        if (checkmusic.data.success) {
          //获取歌曲的歌词
          let lyric = await getSongLyric(v.id);

          //点击任意一首歌后把歌单歌曲添加到播放列表中
          //优化 本来想着用immutable-js替换JSON深拷贝的 但是immutable-js是不可变的
          //问题: 每一次点击都设置一遍songlist列表 还是 循环识别 区别  哪一个比较省性能呢？ 未解决
          this.$store.commit(
            "setAllSongsToPlayList",
            JSON.parse(JSON.stringify(this.songsInfo))
          );

          //更新当前播放的下标
          this.$store.commit("setCurrentIndex", index);

          //设置歌词
          this.$store.commit("SET_CURRENT_SONG_LYRIC",parseLyric(lyric.data.lrc.lyric), index);

          //修改当前播放的音乐信息
          this.$store.commit("changeCurrentPlay", this.songsInfo[index]);

          //isload图片
          this.$store.commit("setIsLoad", "true");

          //获取某一首歌的相似歌单信息
          let simimusic = await getSimiPlayList(v.id);
          this.$store.commit("SET_SIMI_SONG_LIST", simimusic.data.playlists);
          //获取某一首歌的评论
          let musicComments = await getMusicComment(v.id, 100);
          this.$store.commit("SET_COMMENT_INFO", musicComments.data.comments);
          this.$store.commit("setToRecordSongList", this.songsInfo[index]);
        }
      } catch (error) {
        alert("音乐没有版权");
      }



      this.$emit("handleSongClick", [values, index]);
      this.$store.commit("SET_IS_SHOW_FM_PLAYER", false);
    },
    async handleDownload(v) {
      try {
        const checkmusic = await getCheckMusic(v.id);
        //判断音乐是否有版权
        if (checkmusic.data.success) {
          download(v.url, v.name);
        }
      } catch (error) {
        alert("音乐没有版权,无法下载");
      }
    },
    //计算歌曲时间
    setSongTime(time) {
      return forMatTime((time / 1000) | 0);
    },
    //转换下表格式
    setIndex(values) {
      let index = values + 1;
      return index < 10 ? "0" + index : index;
    },
    isHeart(id) {
      // console.log(new Date().getTime(), "test");
      return this.likeList.findIndex((item) => item == id) == -1 ? false : true;
    },
    clickToSingerPapg(id) {
      this.$router.push("/singerlistdetail/" + id);
    },
    clickToAlbumPapg(id) {
      this.$router.push("/albumlistdetail/" + id);
    },
    async getLikeList() {
      let uId = this.userinfo.userId;
      let likeList = await getLikeList(uId);
      this.likeList = likeList.data.ids;
    },

    onContextmenu(event) {
      this.$contextmenu({
        items: [
          {
            label: "查看评论",
            icon: "el-icon-chat-line-square",
            onClick: () => {
              //跳转 这个谋一首歌的评论 详情 还没写
              console.log("跳转到评论");
            },
          },
          // 播放
          {
            label: "播放(Enter)",
            icon: "el-icon-video-play",
            onClick: () => {
              this.HandleSongClick(
                this.innerSongInfo[this.innerIndex],
                this.innerIndex
              );
            },
          },
          //下一首播放 就是把这首歌 插进去歌单里面的下一首位置
          {
            label: "下一首播放",
            icon: "el-icon-d-arrow-right",
            divided: true,
            onClick: () => {
              this.$store.commit(
                "ADD_SONG_TO_PLAYLIST",
                this.innerSongInfo[this.innerIndex]
              );
              this.$message.success("已添加到播放列表");
            },
          },
          //收藏歌单 需要登录 需要判断
          {
            label: "收藏到歌单",
            icon: "el-icon-folder-add",
            children: this.MyselfPlaylistTemplate,
          },
          //分享 先不做
          { label: "分享...", icon: "el-icon-share" },
          //这个复制链接 格式好像是 ：https://music.163.com/song?id=1898044638&userid=3233744982
          {
            label: "复制链接",
            icon: "el-icon-link",
            onClick: () => {
              navigator.clipboard.writeText(
                `https://music.163.com/song?id=${
                  this.innerSongInfo[this.innerIndex].id
                }&userid=${this.userinfo.userId}`
              );
            },
          },
          //下载
          {
            label: "下载",
            icon: "el-icon-download",
            onClick: () => {
              this.handleDownload(this.innerSongInfo[this.innerIndex]);
            },
          },
        ],
        event,
        //x: event.clientX,
        //y: event.clientY,
        customClass: "class-a",
        zIndex: 3,
        minWidth: 230,
      });
      this.getSongId([event.path[1], event.path[2]]);
      return false;
    },
    getSongId(arry) {
      arry.forEach((item) => {
        if (item.getAttribute("innerIndex")) {
          this.innerIndex = +item.getAttribute("innerIndex");
        }
      });
    },
    createMyselfPlaylistTemplate() {
      let MyselfPlaylistTemplate = [];
      for (let index = 0; index < this.mySonglist.length; index++) {
        MyselfPlaylistTemplate.push({
          label: this.mySonglist[index].name,
          icon: "el-icon-eleme",
          onClick: () => {
            this.addSongToMyselfPlaylist(this.mySonglist[index].id);
          },
        });
      }
      this.MyselfPlaylistTemplate = MyselfPlaylistTemplate;

      //判断是否已经登陆
      if (!this.userinfo) {
        this.MyselfPlaylistTemplate = [
          {
            label: "未登录,点击登录",
            onClick: () => {
              this.$store.commit("SET_LOGIN_DIALOG", true);
            },
          },
        ];
      }
    },
    async addSongToMyselfPlaylist(pid) {
      const { data } = await setSongToMyselfPlayList({
        op: "add",
        pid,
        tracks: this.innerSongInfo[this.innerIndex].id,
      });
      data.body.code == 200 && this.$message.success("添加成功");
      data.body?.message && this.$message(data.body?.message);
    },
  },
  computed: {
    ...mapGetters([
      "currentSongInfo",
      "userinfo",
      "isShowUpdataComponent",
      "mySonglist",
    ]),
    innerSongInfo: {
      get() {
        return this.songsInfo;
      },
      set(value) {
        this.$emit("setSongInfo", value);
      },
    },
  },
  async created() {
    this.userinfo && this.getLikeList();
    this.createMyselfPlaylistTemplate();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
.songlist-component {
  .title-name {
    display: flex;
    margin-left: 100px;
    height: 30px;
    line-height: 30px;
    span:nth-child(1) {
      flex: 4;
    }
    span:nth-child(2) {
      flex: 4;
    }
    span:nth-child(3) {
      flex: 3;
    }
    span:nth-child(4) {
      flex: 1;
    }
  }
  .song-item {
    font-size: 15px;
    height: 35px;
    line-height: 35px;
    display: flex;
    cursor: pointer;
    &:nth-child(2n-1) {
      background-color: $bg-grey;
    }
    &:hover {
      background-color: $active-grey;
    }
    .index-number {
      margin: 0 10px 0 20px;
      vertical-align: middle;
    }
    .no-active-heart,
    .active-heart {
      margin: 0 5px;
      width: 20px;
      height: 35px;
      vertical-align: middle;
    }
    p {
      vertical-align: middle;
      padding: 0 5px;
    }
    .song-name {
      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      .active-name {
        color: $theme-color;
      }
    }
    .singer {
      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .album {
      flex: 3;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .time {
      flex: 1;
    }
  }
  .active-bg {
    background-color: $click-grey;
  }
}
::v-deep {
  .el-icon-download {
    &:hover {
      content: "\e77c";
      color: rgba(231, 31, 31, 0.793);
    }
  }
}
</style>
