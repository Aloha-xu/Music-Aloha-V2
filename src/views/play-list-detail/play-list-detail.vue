<template>
  <div class="play-list-detail">
    <PlayListDetailHead
      :values="headInfo"
      :isShowPlayListComponent="isShowPlayListComponent"
      @handleCollectSonglist="handleCollectSonglist"
      @handlePlayAllSongs="handlePlayAllSongs"
    >
    </PlayListDetailHead>
    <div class="play-list-detail-content">
      <div class="top">
        <div class="navbar">
          <div
            v-for="(item, index) in navbar"
            :key="index"
            @click="itemClick(index)"
            class="item"
            :class="currentIndex === index ? 'active' : ''"
          >
            {{ item }}
          </div>
        </div>
        <div class="search" v-if="currentIndex === 0 && !loading">
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchValues"
          >
          </el-input>
        </div>
      </div>
      <SongListComponent
        v-if="currentIndex === 0 && !loading"
        :songsInfo="playList"
        @handleSongClick="handleSongClick"
        @handleDownload="handleDownload"
      ></SongListComponent>
      <collecter
        v-else-if="currentIndex === 2"
        :collecter="collectorInfo"
      ></collecter>
      <comment
        v-else-if="currentIndex === 1"
        :commentInfo="commentInfo"
        :id="this.id"
        :t="1"
        :type="2"
        @refeshCommrnt="getCommentInfo"
      ></comment>
      <Loading v-show="loading" style="height: 50vh"></Loading>
    </div>
  </div>
</template>

<script>
import Collecter from "@/components/common/collecter";
import Comment from "@/components/common/comment.vue";
import PlayListDetailHead from "@/components/common/PlayListDetailHead.vue";
import SongListComponent from "@/components/common/SongListComponent.vue";
import Loading from "@/components/common/loading.vue";
import { mapGetters } from "vuex";
import {
  getSongListDetail,
  getSongDetail,
  getPlayListComment,
  getUserPlaylist,
  subPlaylist,
  getSongUrl,
  getSongLyric,
  getSimiPlayList,
  getMusicComment,
  getCheckMusic,
  getCollector,
} from "@/network/api";
import { parseLyric } from "@/utils/lyric";
import download from "@/utils/dowmload";
export default {
  components: {
    PlayListDetailHead,
    SongListComponent,
    Collecter,
    Comment,
    Loading,
  },
  name: "PlayListDetail",
  data() {
    return {
      //歌单详细信息
      TitleType: "歌单",
      currentIndex: 0,
      navbar: ["歌曲列表", "评论", "收藏者"],
      isShowPlayListComponent: true,
      commentInfo: [],
      collectorInfo: [],
      /* 模板的渲染比route快 */
      playList: [],
      headInfo: {},
      searchValues: null,
    };
  },
  methods: {
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = index;
          break;
        case 1:
          this.currentIndex = index;
          this.getCommentInfo();
          break;
        case 2:
          this.currentIndex = index;
          this.getCollector();
          break;
      }
    },

    //获取歌单头部信息
    async upDataSongListHeadInfo() {
      this.id = this.$route.params.id;
      const { data } = await getSongListDetail(this.id, 20);
      this.headInfo.subscribed = data.playlist.subscribed;
    },

    //获取并处理歌单列表全部信息
    async handleSongListDetailInfo() {
      this.$store.commit("setLoading", true);
      this.id = this.$route.params.id;
      const { data } = await getSongListDetail(this.id, 20);
      let songListHeadInfo = {};
      songListHeadInfo.coverImgUrl = data.playlist.coverImgUrl;
      songListHeadInfo.titleType = "歌单";
      songListHeadInfo.name = data.playlist.name;
      songListHeadInfo.nickname = data.playlist.creator.nickname;
      songListHeadInfo.createTime = data.playlist.createTime;
      songListHeadInfo.avatarUrl = data.playlist.creator.avatarUrl;
      songListHeadInfo.subscribed = data.playlist.subscribed;
      songListHeadInfo.subscribedCount = data.playlist.subscribedCount;
      songListHeadInfo.shareCount = data.playlist.shareCount;
      songListHeadInfo.tags = data.playlist.tags;
      songListHeadInfo.trackCount = data.playlist.trackCount;
      songListHeadInfo.playCount = data.playlist.playCount;
      songListHeadInfo.description = data.playlist.description;
      songListHeadInfo.id = data.playlist.id;
      this.headInfo = songListHeadInfo;

      //处理歌单中全部的歌曲的ids
      const resIds = await getSongDetail(
        data.playlist.trackIds.map(({ id }) => id)
      );
      const SongsInfo = resIds.data.songs;
      //这里返回的url是不按传入的id按需返回的 所以需要进行url校正
      const Urls = await getSongUrl(SongsInfo.map(({ id }) => id));
      if (!this.playList.length == 0) {
        this.playList = [];
      }

      //这里筛选出来的数据是用来渲染歌单的歌曲列表的
      for (let i = 0; i < SongsInfo.length; i++) {
        let songinfo = {};
        songinfo.id = SongsInfo[i].id;
        songinfo.url = "";
        for (let j = 0; j < Urls.data.data.length; j++) {
          if (Urls.data.data[j].id == songinfo.id) {
            songinfo.url = Urls.data.data[j].url;
          }
        }
        songinfo.name = SongsInfo[i].name;
        songinfo.singer = [];
        for (let j = 0; j < SongsInfo[i].ar.length; j++) {
          songinfo.singer[j] = {
            name: SongsInfo[i].ar[j].name,
            id: SongsInfo[i].ar[j].id,
          };
        }
        songinfo.pic = SongsInfo[i].al.picUrl;
        songinfo.totleTime = SongsInfo[i].dt;
        songinfo.lyric = [];
        songinfo.album = { name: SongsInfo[i].al.name, id: SongsInfo[i].al.id };
        this.playList.push(songinfo);
      }
      this.$store.commit("setLoading", false);
    },

    //处理 点击某一首歌 获取这首歌的数据
    //v[0] 歌曲信息
    //v[1] 歌曲下标
    async handleSongClick(v) {
      try {
        const checkmusic = await getCheckMusic(v[0].id);
        //判断音乐是否有版权
        if (checkmusic.data.success) {
          //获取歌曲的歌词
          let lyric = await getSongLyric(v[0].id);

          //更新当前播放的下标
          this.$store.commit("setCurrentIndex", v[1]);

          this.playList[v[1]].lyric = parseLyric(lyric.data.lrc.lyric);
          console.log(lyric.data.lrc.lyric);
          console.log(this.playList[v[1]].lyric);

          //修改当前播放的音乐信息
          this.$store.commit("changeCurrentPlay", this.playList[v[1]]);

          //点击任意一首歌后把歌单歌曲添加到播放列表中
          this.$store.commit("setAllSongsToPlayList", this.playList);

          //isload图片
          this.$store.commit("setIsLoad", "true");

          //获取某一首歌的相似歌单信息
          let simimusic = await getSimiPlayList(v[0].id);
          this.$store.commit("SET_SIMI_SONG_LIST", simimusic.data.playlists);
          // this.$store.state.SimiSongList = simimusic.data.playlists;
          //获取某一首歌的评论
          let musicComments = await getMusicComment(v[0].id, 100);
          this.$store.commit("SET_COMMENT_INFO", musicComments.data.comments);
          // this.$store.state.commentInfo = musicComments.data.comments;

          this.$store.commit("setToRecordSongList", this.playList[v[1]]);
        }
      } catch (error) {
        alert("音乐没有版权");
      }
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

    //收藏歌单
    async handleCollectSonglist() {
      //添加歌单
      if (this.headInfo.subscribed) {
        //true
        //弹窗 问是否取消收藏
        this.$confirm("确定不再收藏该歌单?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          await subPlaylist(2, this.headInfo.id);
          this.refreshUserSonglistInfo();
        });
      } else {
        //false
        await subPlaylist(1, this.headInfo.id);
        this.refreshUserSonglistInfo();
      }
      //⭐⭐⭐⭐⭐⭐
      //数据没有更新是因为网易云api接口做了短时间内多次访问只会拿到前一个的数据 ----缓存处理 ---加时间戳可以解决
    },

    //处理点击head组件的播放全部按钮
    handlePlayAllSongs() {
      this.$store.commit("setAllSongsToPlayList", this.playList);
      this.$store.commit("changeCurrentPlay", this.playList[0]);
      this.$store.commit("setIsLoad", "true");
    },

    //刷新用户歌单信息函数
    async refreshUserSonglistInfo() {
      this.upDataSongListHeadInfo();
      let uInfo = JSON.parse(window.sessionStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist", uId);
    },

    async getCommentInfo() {
      this.id = this.$route.params.id;
      const { data } = await getPlayListComment(this.id, 50);
      this.commentInfo = data.comments;
    },

    //获取收藏者信息
    async getCollector() {
      this.id = this.$route.params.id;
      const { data } = await getCollector(this.id, 30, 30);
      this.collectorInfo = data.subscribers;
      // if (data.subscribers) {
      //   alert("NeedLogin");
      // }
    },
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  async created() {
    this.itemClick(this.currentIndex);
    this.handleSongListDetailInfo();
  },

  watch: {
    $route() {
      let id = this.$route.params.id;
      if (id) {
        this.itemClick(this.currentIndex);
        this.handleSongListDetailInfo();
        this.getCommentInfo();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.play-list-detail {
  width: 100%;
  flex-wrap: wrap;
  overflow: scroll;
  height: calc(100vh - 60px - 75px);
  min-width: 1700px;
  .play-list-detail-content {
    width: 100%;
    margin-top: 30px;
    .top {
      position: relative;
      display: flex;
      margin-bottom: 18px;
      margin-left: 30px;
      .navbar {
        display: flex;
        .item {
          font-size: 16px;
          color: gray;
          padding-bottom: 5px;
          margin-right: 20px;
        }
        .active {
          color: black;
          font-size: 17px;
          font-weight: 900;
          border-bottom: 2.5px solid red;
        }
      }
      .search {
        position: absolute;
        right: 20px;
        height: 50px;
      }
    }
    .comment {
      padding-left: 20px;
    }
  }
}</style
>>
