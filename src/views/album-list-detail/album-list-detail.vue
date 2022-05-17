<template>
  <div class="albumlist-detail">
    <PlayListDetailHead
      :values="headInfo"
      :isShowPlayListComponent="isShowPlayListComponent"
    >
    </PlayListDetailHead>

    <div class="albumlist-content">
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
      </div>
      <SongListComponent
        v-if="currentIndex === 0"
        :songsInfo="playList"
        @handleSongClick="handleSongClick"
      ></SongListComponent>
      <div v-else-if="currentIndex === 2" class="albumdetail"></div>
      <comment
        v-else
        class="comment"
        :commentInfo="commentInfo"
        @refeshCommrnt="getCommentInfo"
        :id="this.id"
        :t="1"
        :type="3"
      ></comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/common/comment.vue";
import PlayListDetailHead from "@/components/common/PlayListDetailHead.vue";
import SongListComponent from "@/components/common/SongListComponent.vue";
import {
  getSongUrl,
  getAlbumListDetail,
  getAlbumComment,
  getSongDetail,
  getSongLyric,
  getSimiPlayList,
  getMusicComment,
  getCheckMusic,
} from "@/network/api";
import { parseLyric } from "@/utils/lyric";
import { getYMD } from "@/utils/uctil";
export default {
  components: { PlayListDetailHead, SongListComponent, Comment },
  name: "AlbumListDetail",
  data() {
    return {
      //歌单详细信息
      headInfo: null,
      currentIndex: 0,
      navbar: ["歌曲列表", "评论", "专辑详情"],
      isShowPlayListComponent: false,
      commentInfo: [],
      playList: [],
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
          break;
        case 2:
          this.currentIndex = index;
          break;
      }
    },
    //获取歌单列表全部信息
    async getSongListDetailInfo() {
      this.id = this.$route.params.id;
      const { data } = await getAlbumListDetail(this.id);
      let albumListHeadInfo = {};
      albumListHeadInfo.coverImgUrl = data.album.picUrl;
      albumListHeadInfo.titleType = "专辑";
      albumListHeadInfo.name = data.album.name;
      albumListHeadInfo.singer = data.album.artist.name;
      albumListHeadInfo.publishTime = getYMD(data.album.publishTime);
      albumListHeadInfo.id = data.album.id;
      albumListHeadInfo.subscribed = data.album.info.liked;
      albumListHeadInfo.subscribedCount = data.album.info.likedCount;
      albumListHeadInfo.shareCount = data.album.info.shareCount;
      this.headInfo = albumListHeadInfo;

      if (!this.playList.length == 0) {
        this.playList = [];
      }

      //处理歌单全部的ids
      const res = await getSongDetail(data.songs.map(({ id }) => id));
      const SongsInfo = res.data.songs;
      const Urls = await getSongUrl(SongsInfo.map(({ id }) => id));

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
    },

    //v[0] 歌曲信息    v[1] 歌曲下标
    async handleSongClick(v) {
      try {
        const checkmusic = await getCheckMusic(v[0].id);
        //判断音乐是否有版权
        if (checkmusic.data.success) {
          //获取歌曲的歌词
          let lyric = await getSongLyric(v[0].id);
          console.log(lyric);

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
    async getCommentInfo() {
      this.id = this.$route.params.id;
      const { data } = await getAlbumComment(this.id, 50);
      this.commentInfo = data.comments;
    },
  },
  created() {
    this.itemClick(this.currentIndex);
    this.getSongListDetailInfo();
    this.getCommentInfo();
  },
  activated() {
    this.itemClick(this.currentIndex);
    this.getSongListDetailInfo();
    this.getCommentInfo();
  },
};
</script>

<style scoped lang="scss">
.albumlist-detail {
  width: 100%;
  flex-wrap: wrap;
  overflow: scroll;
  height: 100vh;
  min-width: 1700px;
  .albumlist-content {
    width: 100%;
    margin-top: 30px;
    .top {
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
    }
    .comment {
      padding-left: 20px;
    }
  }
}
</style>
