<template>
  <div class="everyday-recommend">
    <div class="everyday-recommend-head"></div>
    <div class="everyday-recommend-body">
      <SongListComponent
        :songsInfo="playList"
        @handleSongClick="handleSongClick"
      ></SongListComponent>
    </div>
  </div>
</template>

<script>
import SongListComponent from "@/components/common/SongListComponent.vue";
import { getRecommendSongs, getSongUrl } from "@/network/api";
export default {
  name: "EveryDayRecommend",
  data() {
    return {
      playList: [],
    };
  },
  components: {
    SongListComponent,
  },
  methods: {
    handleSongClick() {},
    //获取并处理歌单列表全部信息
    async handleSongListDetailInfo() {
      this.$store.commit("setLoading", true);
      const { data } = await getRecommendSongs();
      console.log(data);
      if (data.data.dailySongs.length > 0) {
        const SongsInfo = data.data.dailySongs;
        console.log(SongsInfo);
        //这里返回的url是不按传入的id按需返回的 所以需要进行url校正
        const Urls = await getSongUrl(SongsInfo.map(({ id }) => id));
        // console.log(Urls);
        if (!this.playList.length == 0) {
          this.playList = [];
        }

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
      } else {
        this.playList = [];
      }
      this.$store.commit("setLoading", false);
    },
  },
  created() {
    this.handleSongListDetailInfo();
  },
};
</script>

<style></style>
