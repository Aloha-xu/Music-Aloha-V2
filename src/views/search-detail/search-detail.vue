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
    <div class="cloud-search-content">
      <search-detail-solo
        v-if="currentIndex === 0"
        :searchResult="searchResult"
        :songsInfo="playList"
        @handleSongClick="handleSongClick"
      ></search-detail-solo>
      <search-detail-singer
        v-if="currentIndex === 1"
        :singerInfo="singerInfo"
      ></search-detail-singer>
      <search-detail-album
        v-if="currentIndex === 2"
        :albumInfo="albumInfo"
      ></search-detail-album>
      <search-detail-video
        v-if="currentIndex === 3"
        :videoInfo="mvInfo"
      ></search-detail-video>
      <search-detail-playlist
        v-if="currentIndex === 4"
        :playlistInfo="playlistInfo"
      ></search-detail-playlist>
      <search-detail-lyric v-if="currentIndex === 5"></search-detail-lyric>
      <search-detail-anchor
        v-if="currentIndex === 6"
        :anchorInfo="anchorInfo"
      ></search-detail-anchor>
      <search-detail-user
        v-if="currentIndex === 7"
        :userInfo="userInfo"
      ></search-detail-user>
    </div>
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
      titleValue: "",
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
    itemClick(index) {
      switch (index) {
        case 0:
          this.getSoloInfo(index);
          break;
        case 1:
          this.getsingerInfo(index);
          break;
        case 2:
          this.getAlbumInfoInfo(index);
          break;
        case 3:
          this.getMvInfo(index);
          break;
        case 4:
          this.getPlaylistInfo(index);
          break;
        case 5:
          this.getLyricInfo(index);
          break;
        case 6:
          this.getAnchorInfo(index);
          break;
        case 7:
          this.getUserInfo(index);
          break;
      }
    },
    async getSoloInfo(index) {
      if (!this.playList.length == 0) {
        this.playList = [];
      }
      const { data } = await getCloudSearch(this.$route.query.keywords, 1);
      const resIds = await getSongDetail(data.result.songs.map(({ id }) => id));
      const SongsInfo = resIds.data.songs;
      const Urls = await getSongUrl(SongsInfo.map(({ id }) => id));
      let innerUrls = {};
      Urls.data.data.forEach(({ id, url }) => {
        innerUrls[id] = url;
      });
      for (let j = 0; j < SongsInfo.length; j++) {
        let songinfo = {};
        songinfo.id = SongsInfo[j].id;
        songinfo.url = innerUrls[songinfo.id];
        songinfo.name = SongsInfo[j].name;
        songinfo.singer = SongsInfo[j].ar.map(({ name }) => name);
        songinfo.pic = SongsInfo[j].al.picUrl;
        songinfo.totleTime = SongsInfo[j].dt;
        songinfo.lyric = [];
        songinfo.album = SongsInfo[j].al.name;
        this.playList.push(songinfo);
      }
      let searchResult = await getSearchMultimatch(this.$route.query.keywords);
      this.searchResult = searchResult.data.result.artist;

      this.currentIndex = index;
      this.titleValue = `${this.playList.length}` + "首单曲";
    },
    async getsingerInfo(index) {
      let singerInfo = await getCloudSearch(this.$route.query.keywords, 100);
      this.singerInfo = singerInfo.data.result;
      this.currentIndex = index;
      this.titleValue = `${singerInfo.data.result.artistCount}` + "位歌手";
    },
    async getAlbumInfoInfo(index) {
      let albumInfo = await getCloudSearch(this.$route.query.keywords, 10);
      this.albumInfo = albumInfo.data.result;
      this.currentIndex = index;
      this.titleValue = `${albumInfo.data.result.albumCount}` + "张专辑";
    },
    async getMvInfo(index) {
      let mvInfo = await getCloudSearch(this.$route.query.keywords, 1004);
      this.mvInfo = mvInfo.data.result;
      this.currentIndex = index;
      this.titleValue = `${mvInfo.data.result.mvCount}` + "个视频";
    },
    async getPlaylistInfo(index) {
      let playlistInfo = await getCloudSearch(this.$route.query.keywords, 1000);
      this.playlistInfo = playlistInfo.data.result;
      this.currentIndex = index;
      this.titleValue = `${playlistInfo.data.result.playlistCount}` + "个歌单";
    },
    async getLyricInfo(index) {
      let lyricInfo = await getCloudSearch(this.$route.query.keywords, 1006);
      this.lyricInfo = lyricInfo.data.result;
      this.currentIndex = index;
      this.titleValue = `${lyricInfo.data.result.songCount}` + "首歌词";
    },
    async getAnchorInfo(index) {
      let anchorInfo = await getCloudSearch(this.$route.query.keywords, 1009);
      this.anchorInfo = anchorInfo.data.result;
      this.currentIndex = index;
      this.titleValue = `${anchorInfo.data.result.djRadiosCount}` + "个电台";
    },
    async getUserInfo(index) {
      let userInfo = await getCloudSearch(this.$route.query.keywords, 1002);
      this.userInfo = userInfo.data.result;
      this.currentIndex = index;
      this.titleValue = `${userInfo.data.result.userprofileCount}` + "位用户";
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
          this.$store.commit(
            "setAllSongsToPlayList",
            JSON.parse(JSON.stringify(this.playList))
          );

          //isload图片
          this.$store.commit("setIsLoad", "true");

          //获取某一首歌的相似歌单信息
          let simimusic = await getSimiPlayList(v[0].id);
          this.$store.commit("SET_SIMI_SONG_LIST", simimusic.data.playlists);
          //获取某一首歌的评论
          let musicComments = await getMusicComment(v[0].id, 100);
          this.$store.commit("SET_COMMENT_INFO", musicComments.data.comments);
        }
      } catch (error) {
        alert("音乐没有版权");
      }
    },
  },
  created() {
    this.itemClick(0);
  },
  watch: {
    $route() {
      this.itemClick(0);
    },
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
      cursor: pointer;
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
