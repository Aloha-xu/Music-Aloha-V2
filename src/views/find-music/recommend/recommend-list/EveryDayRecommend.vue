<template>
  <div class="everyday-recommend">
    <div class="everyday-recommend-head">
      <div class="pic">
        <svg
          t="1654135912839"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9888"
          width="128"
          height="128"
        >
          <path
            d="M896 448H128v447.957333l477.738667 0.021334L896 895.957333V448z m0-42.666667V192.042667C896 192 768 192 768 192V149.333333h128.042667A42.666667 42.666667 0 0 1 938.666667 192.042667v703.914666A42.624 42.624 0 0 1 896.064 938.666667H127.936A42.666667 42.666667 0 0 1 85.333333 895.957333V192.042667C85.333333 168.469333 104.256 149.333333 127.957333 149.333333H256v42.666667l-128 0.042667V405.333333h768zM298.666667 85.333333h42.666666v170.666667h-42.666666V85.333333z m384 0h42.666666v170.666667h-42.666666V85.333333zM384 149.333333h256v42.666667H384V149.333333z"
            fill="#ff0000"
            p-id="9889"
          ></path>
        </svg>
        <div class="date">{{ new Date().getDate() }}</div>
      </div>
      <div class="text">
        <div class="text-1">每日歌曲推荐</div>
        <div class="text-2">根据你的音乐口味生成，每天6:00更新</div>
      </div>
    </div>
    <div class="everyday-recommend-btn">
      <el-button round>
        <span class="el-icon-caret-right" @click="handlePlayAllSongs"
          >播放全部</span
        >
        <span class="el-icon-plus" style="color: white"></span>
      </el-button>
      <el-button round>
        <span class="el-icon-folder-add">收藏全部</span>
      </el-button>
    </div>
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
    handlePlayAllSongs() {},
  },
  created() {
    this.handleSongListDetailInfo();
  },
};
</script>


<style scoped lang="scss">
@import "@/assets/css/base.scss";

.everyday-recommend {
  padding: 10px 0 0 20px;
  .everyday-recommend-head {
    display: flex;
    align-items: center;
    .pic {
      position: relative;
      .date {
        position: absolute;
        top: 58px;
        left: 47px;
        font-size: 50px;
        color: red;
        font-weight: 600;
      }
    }
    .text {
      margin-left: 20px;
      .text-1 {
        font-weight: 600;
        font-size: 25px;
      }
      .text-2 {
        margin-top: 10px;
        font-size: 10px;
        font-weight: 100;
      }
    }
  }
  .everyday-recommend-btn {
    margin-top: 20px;
    margin-left: 10px;
  }
  .everyday-recommend-body {
    border-top: 1px solid rgba(196, 196, 196, 0.544);
    margin-top: 10px;
  }
}

::v-deep {
  .el-button.is-round {
    padding: 5px 20px;
  }
  .el-button {
    height: 40px;
  }
  .el-button:nth-child(1) {
    height: 40px;
    background-color: $theme-color;
    color: white;
  }
  .play-all {
    color: white;
  }
  .el-button.is-round:nth-child(n + 2):hover {
    background-color: rgb(246, 246, 246);
    color: gray;
    border-color: rgba($color: gray, $alpha: 0.5);
  }
}
</style>
