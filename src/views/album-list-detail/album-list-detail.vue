<template>
  <div class="albumlist-detail">
    <PlayListDetailHead
      :playListHeadInfo="headInfo"
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
      ></SongListComponent>
      <div v-else-if="currentIndex === 2" class="albumdetail"></div>
      <Comment
        v-else
        class="comment"
        :commentInfo="commentInfo"
        @refeshCommrnt="addCommentToCache"
        @setReplyWay="setReplyWay"
        :id="this.id"
        :t="replyWay"
        :type="3"
      ></Comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/common/Comment.vue";
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
      // 1 发送, 2 回复 3 删除
      replyWay: 1,
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

      //用歌曲的id做对象的key，url为value
      let innerUrls = {};
      Urls.data.data.forEach(({ id, url }) => {
        innerUrls[id] = url;
      });

      //这里筛选出来的数据是用来渲染歌单的歌曲列表的
      //时间复杂度 2*n*n  需要 优化
      for (let i = 0; i < SongsInfo.length; i++) {
        let songinfo = {};
        songinfo.id = SongsInfo[i].id;
        songinfo.url = innerUrls[songinfo.id];
        songinfo.name = SongsInfo[i].name;
        songinfo.singer = [];
        //格式化 singer 数据格式
        for (let j = 0; j < SongsInfo[i].ar.length; j++) {
          songinfo.singer[j] = {
            name: SongsInfo[i].ar[j].name,
            id: SongsInfo[i].ar[j].id,
          };
        }
        songinfo.pic = SongsInfo[i].al.picUrl;
        songinfo.totleTime = SongsInfo[i].dt;
        songinfo.lyric = [];
        songinfo.album = {
          name: SongsInfo[i].al.name,
          id: SongsInfo[i].al.id,
        };
        this.playList.push(songinfo);
      }
    },

    async getCommentInfo() {
      this.id = this.$route.params.id;
      const { data } = await getAlbumComment(this.id, 50);
      this.commentInfo = data.comments;
    },

    addCommentToCache(val) {
      this.commentInfo.unshift(val);
    },
    setReplyWay(val) {
      this.replyWay = val;
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
