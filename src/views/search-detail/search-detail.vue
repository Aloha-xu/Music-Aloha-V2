<template>
  <div class="cloud-search">
    <div class="title">找到{{ titleValue }}</div>
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
    <hr />
    <div class="cloud-search-content" v-show="!loading">
      <search-detail-solo
        v-show="currentIndex === 0"
        :searchResult="searchResult"
        :songsInfo="playList"
        @handleSongClick="handleSongClick"
      ></search-detail-solo>
      <search-detail-singer
        v-show="currentIndex === 1"
        :singerInfo="singerInfo"
      ></search-detail-singer>
      <search-detail-album
        v-show="currentIndex === 2"
        :albumInfo="albumInfo"
      ></search-detail-album>
      <search-detail-video
        v-show="currentIndex === 3"
        :videoInfo="mvInfo"
      ></search-detail-video>
      <search-detail-playlist
        v-show="currentIndex === 4"
        :playlistInfo="playlistInfo"
      ></search-detail-playlist>
      <search-detail-lyric v-show="currentIndex === 5"></search-detail-lyric>
      <search-detail-anchor
        v-show="currentIndex === 6"
        :anchorInfo="anchorInfo"
      ></search-detail-anchor>
      <search-detail-user
        v-show="currentIndex === 7"
        :userInfo="userInfo"
      ></search-detail-user>
    </div>
    <Loading v-show="loading" style="height:50vh"></Loading>
  </div>
</template>

<script>
import SearchDetailAlbum from "./search-detail-album.vue";
import SearchDetailAnchor from "./search-detail-anchor.vue";
import SearchDetailLyric from "./search-detail-lyric.vue";
import SearchDetailPlaylist from "./search-detail-playlist.vue";
import SearchDetailSinger from "./search-detail-singer.vue";
import SearchDetailSolo from "./search-detail-solo.vue";
import SearchDetailUser from "./search-detail-user.vue";
import SearchDetailVideo from "./search-detail-video.vue";
import Loading from "@/components/common/loading.vue";
import { mapGetters } from "vuex";
import {
  getCloudSearch,
  getSearchMultimatch,
  getSongLyric,
  getCheckMusic,
  getSongDetail,
  getSongUrl,
  getSimiPlayList,
  getMusicComment,
} from "@/network/api";
import { parseLyric } from "@/utils/lyric";

//一个弊端 solo页面 第一次进去的时候会很慢 因为请求太多数据了
export default {
  components: {
    SearchDetailAlbum,
    SearchDetailAnchor,
    SearchDetailLyric,
    SearchDetailPlaylist,
    SearchDetailSinger,
    SearchDetailSolo,
    SearchDetailUser,
    SearchDetailVideo,
    Loading,
  },
  name: "SearchDetail",
  data() {
    return {
      navbar: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌单",
        "歌词",
        "主播电台",
        "用户",
      ],
      currentIndex: 0,
      searchResult: [],
      titleValue: "0首单曲",
      //每一个分页面下的数据
      singerInfo: {},
      albumInfo: {},
      playlistInfo: {},
      userInfo: {},
      mvInfo: {},
      lyricInfo: {},
      anchorInfo: {},
      setDelay: false,
      playList: [],
    };
  },
  methods: {
    itemClick(value) {
      switch (value) {
        case 0:
          this.currentIndex = value;
          this.titleValue = `${this.playList.length}` + "首单曲";
          break;
        case 1:
          this.currentIndex = value;
          this.titleValue = `${this.singerInfo.artistCount}` + "位歌手";
          break;
        case 2:
          this.currentIndex = value;
          this.titleValue = `${this.albumInfo.albumCount}` + "张专辑";
          break;
        case 3:
          this.currentIndex = value;
          this.titleValue = `${this.mvInfo.mvCount}` + "个视频";
          break;
        case 4:
          this.currentIndex = value;
          this.titleValue = `${this.playlistInfo.playlistCount}` + "个歌单";
          break;
        case 5:
          this.currentIndex = value;
          this.titleValue = `${this.lyricInfo.songCount}` + "首歌词";
          break;
        case 6:
          this.currentIndex = value;
          this.titleValue = `${this.anchorInfo.djRadiosCount}` + "个电台";
          break;
        case 7:
          this.currentIndex = value;
          this.titleValue = `${this.userInfo.userprofileCount}` + "位用户";
          break;
      }
    },
    async getInfo() {
      this.$store.commit("setLoading", true);
      if (!this.playList.length == 0) {
        this.playList = [];
      }
      const { data } = await getCloudSearch(this.$route.query.keywords, 1);
      const resIds = await getSongDetail(data.result.songs.map(({ id }) => id));
      const SongsInfo = resIds.data.songs;
      const Urls = await getSongUrl(SongsInfo.map(({ id }) => id));
      for (let j = 0; j < SongsInfo.length; j++) {
        let currentsonginfo = {};
        currentsonginfo.id = SongsInfo[j].id;
        currentsonginfo.url = "";
        for (let j = 0; j < Urls.data.data.length; j++) {
          if (Urls.data.data[j].id == currentsonginfo.id) {
            currentsonginfo.url = Urls.data.data[j].url;
          }
        }
        currentsonginfo.name = SongsInfo[j].name;
        currentsonginfo.singer = SongsInfo[j].ar.map(({ name }) => name);
        currentsonginfo.pic = SongsInfo[j].al.picUrl;
        currentsonginfo.totleTime = SongsInfo[j].dt;
        currentsonginfo.lyric = [];
        currentsonginfo.album = SongsInfo[j].al.name;
        this.playList.push(currentsonginfo);
      }
      let searchResult = await getSearchMultimatch(this.$route.query.keywords);
      let albumInfo = await getCloudSearch(this.$route.query.keywords, 10);
      let singerInfo = await getCloudSearch(this.$route.query.keywords, 100);
      let playlistInfo = await getCloudSearch(this.$route.query.keywords, 1000);
      let userInfo = await getCloudSearch(this.$route.query.keywords, 1002);
      let mvInfo = await getCloudSearch(this.$route.query.keywords, 1004);
      let lyricInfo = await getCloudSearch(this.$route.query.keywords, 1006);
      let anchorInfo = await getCloudSearch(this.$route.query.keywords, 1009);
      this.searchResult = searchResult.data.result.artist;
      this.singerInfo = singerInfo.data.result;
      this.albumInfo = albumInfo.data.result;
      this.playlistInfo = playlistInfo.data.result;
      this.lyricInfo = lyricInfo.data.result;
      this.anchorInfo = anchorInfo.data.result;
      this.userInfo = userInfo.data.result;
      this.mvInfo = mvInfo.data.result;
      this.$store.commit("setLoading", false);
    },
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
        }
      } catch (error) {
        alert("音乐没有版权");
      }
    },
  },
  watch: {
    $route() {
      this.getInfo();
      this.setDelay = false;
      this.currentIndex = 0;
      setTimeout(() => {
        this.setDelay = true;
        this.itemClick(this.currentIndex);
      }, 1500);
    },
  },
  async created() {
    this.getInfo();
    setTimeout(() => {
      this.itemClick(0);
    }, 3000);
  },
  computed: {
    ...mapGetters(["loading"]),
  },
};
</script>

<style scoped lang="scss">
.cloud-search {
  width: 100%;
  height: 100%;
  .title {
    font-size: 17px;
    font-weight: 900;
    padding: 20px;
  }
  .navbar {
    display: flex;
    padding-left: 20px;
    padding-bottom: 10px;
    padding-top: 10px;
    .item {
      font-size: 14px;
      color: rgb(61, 61, 61);
      padding-bottom: 5px;
      margin-right: 30px;
    }
    .active {
      color: black;
      font-size: 14.5px;
      font-weight: 900;
    }
  }
  .cloud-search-content {
    overflow: scroll;
    height: calc(100% - 114px);
  }
  .icon-loading {
    text-align: center;
    padding-top: 50px;
  }
}
</style>
