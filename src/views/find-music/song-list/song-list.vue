<template>
  <div class="song-list" ref="song_list">
    <!-- 精品歌单 -->
    <div class="high-quality-playlist" @click="clickToHighQualityPlaylistPapg">
      <div class="backgroundimage">
        <img
          :src="
            TopSongListInfo[0] &&
              TopSongListInfo[0].coverImgUrl + '?param=10y10'
          "
          alt=""
        />
      </div>
      <div class="pic">
        <img
          :src="
            TopSongListInfo[0] &&
              TopSongListInfo[0].coverImgUrl + '?param=150y150'
          "
          alt=""
        />
      </div>
      <div class="text">
        <div class="logo">精品歌单</div>
        <div class="text-1">
          {{ TopSongListInfo[0] && TopSongListInfo[0].name }}
        </div>
        <div class="text-2">
          {{ TopSongListInfo[0] && TopSongListInfo[0].copywriter }}
        </div>
      </div>
    </div>
    <!-- 显示各种歌单种类的内容 -->
    <div class="center">
      <!-- 歌单种类选择栏 -->
      <div class="type">
        <!-- ⭐切换歌曲类型时候字体数量变化时右边的热门词语会往左边跑 -->
        <div class="alltype-btn" @click="HandleShowPopover">
          <el-button>{{ CurrentPopoverType }}</el-button>
        </div>
        <div class="hottype">
          <span
            v-for="item in HotSongType"
            :key="item"
            @click="SongTypeClick(item)"
            class="item"
            :class="item === CurrentType ? 'active' : ''"
            >{{ item }}</span
          >
        </div>
      </div>
      <!-- 选择的歌单类型的详细歌单卡片 -->
      <div class="allcard" v-show="!loading">
        <PlayCard
          v-for="item in SongListInfo"
          class="song-list-item"
          :key="item.id"
          :id="item.id"
          :pic="item.coverImgUrl + '?param=210y210'"
          :playcount="item.playCount"
          :text="item.name"
          @cardClick="cardClick"
        >
        </PlayCard>
      </div>
      <Loading v-show="loading" style="height: 50vh"></Loading>
    </div>

    <!-- 页码组件 -->
    <div class="pagination">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="total, prev, pager, next"
          :total="TotalSongs"
          :current-page.sync="CurrentPage"
        >
        </el-pagination>
      </div>
    </div>

    <!-- popover弹出框组件 -->
    <all-type-popover
      :TypeLists="TypeLists"
      :HotSongType="HotSongType"
      class="alltypepopover"
      v-show="isShowPopover"
      @handleSongTypeClick="handleSongTypeClick"
    ></all-type-popover>
  </div>
</template>

<script>
import PlayCard from "@/components/common/PlayCard.vue";
import AllTypePopover from "../all-type-popover.vue";
import Loading from "@/components/common/loading.vue";
import { mapGetters } from "vuex";
import {
  getSongListType,
  getHotSongListType,
  getTopSonglistType,
  getTopSonglist,
  getSongList,
} from "@/network/api";
export default {
  name: "SongList",
  components: {
    AllTypePopover,
    PlayCard,
    Loading,
  },
  data() {
    return {
      //网友歌单信息
      SongListInfo: [],
      //精品歌单第一条信息
      TopSongListInfo: [],
      //全部音乐类型词语
      AllSongType: [],
      //热门音乐类型词语
      HotSongType: [],
      //现在选择的歌单类型
      CurrentType: "全部",
      //现在选择的popover歌单类型
      CurrentPopoverType: "全部歌单",
      //总共数据条数
      TotalSongs: 0,
      //现在页数
      CurrentPage: 1,
      //歌单类型分类
      TypeLists: {
        0: { type: "语种", list: [] },
        1: { type: "风格", list: [] },
        2: { type: "场景", list: [] },
        3: { type: "情感", list: [] },
        4: { type: "主题", list: [] },
      },
      //是否显示全部歌单popover
      isShowPopover: false,
    };
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    /* 获取歌单分类 */
    async getSongListType() {
      const { data } = await getSongListType();
      //全部类别
      this.AllSongType = data.sub;
      this.$store.commit("SET_ALL_TYPE", data.sub);
      let i = 0;
      let j = 0;
      for (i; i <= 4; i++) {
        for (j; j <= 68; j++) {
          let a = data.sub[j].category;
          let b = data.sub[j].name;
          this.whatcategory(a, b);
        }
      }
    },

    /* 获取歌单(网友的) */
    async getSongList(cat, limit, offset) {
      this.$store.commit("setLoading", true);
      const { data } = await getSongList(cat, limit, offset);
      this.SongListInfo = data.playlists;
      this.TotalSongs = data.total;
      this.$store.commit("setLoading", false);
    },

    /* 获取热门歌单分类 */
    async getHotSongListType() {
      const { data } = await getHotSongListType();
      this.HotSongType = data.tags.map(({ name }) => name);
    },

    /* 获取精品歌单 */
    async getTopSonglist(cat, limit, before) {
      const { data } = await getTopSonglist(cat, limit, before);
      //拿到数据中第一条作为精品歌单页面进去的入口
      this.TopSongListInfo = data.playlists.slice(0, 1);
    },

    /* 获取精品歌单标签列表 */
    async getTopSonglistType() {
      const { data } = await getTopSonglistType();
      console.log(data);
    },

    /* 处理点击热门音乐种类的点击事件 */
    SongTypeClick(type) {
      //重置当前页面数
      this.CurrentPage = 1;
      //设置当前音乐类型
      this.CurrentType = type;
      //设置当前popover的音乐类型
      this.CurrentPopoverType = type;
      //根据选着的音乐类型更新数据
      this.getSongList(type, 100, 0);
      //更换精品页面的数据
      this.getTopSonglist(type, 100, 0);
    },

    handleSizeChange(e) {
      console.log(e);
      console.log("handleSizeChange");
    },

    //处理点击数字或者前进后退页码
    handleCurrentChange(e) {
      //e是返回当前页面值
      //设置当前页面数
      this.CurrentPage = e;
      //请求下x页的数据
      this.getSongList(this.CurrentType, 100, e * 100);
    },

    //判断回来的数据是什么类别
    whatcategory(v, i) {
      switch (v) {
        case 0:
          this.TypeLists[0].list.push(i);
          break;
        case 1:
          this.TypeLists[1].list.push(i);
          break;
        case 2:
          this.TypeLists[2].list.push(i);
          break;
        case 3:
          this.TypeLists[3].list.push(i);
          break;
        case 4:
          this.TypeLists[4].list.push(i);
          break;
      }
    },

    //处理popover是否显示
    HandleShowPopover() {
      this.isShowPopover = !this.isShowPopover;
    },
    //处理popover发射出来的已选择歌曲类型
    handleSongTypeClick(value) {
      //设置当前popover的歌单类型
      this.CurrentPopoverType = value;
      //重置歌单数据
      this.getSongList(value, 100, 0);
      //关闭popover窗口
      this.isShowPopover = false;
      //判断发射出来的音乐类型是不是在热门类型里面
      let i = 0;
      let flag = false;
      for (i; i <= 9; i++) {
        if (value === this.HotSongType[i]) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.CurrentType = value;
      } else {
        this.CurrentType = "";
      }
    },
    clickToHighQualityPlaylistPapg() {
      this.$router.push("/highqualityplaylist");
    },
    cardClick(id) {
      this.$router.push("/playlistdetail/" + id);
    },
  },
  async created() {
    this.getSongListType();
    this.getHotSongListType();
    this.getTopSonglist();
    this.getTopSonglistType();
    this.getSongList();
    this.$store.commit("refeshCurrentNavIndex", 1);
  },
  activated() {
    this.$store.commit("refeshCurrentNavIndex", 1);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/index.scss";
.song-list {
  position: relative;
  width: 1100px;
  .high-quality-playlist {
    cursor: pointer;
    width: 1100px;
    height: 170px;
    overflow: hidden;
    position: relative;
    border: 1 solid white;
    border-radius: 10px;
    .backgroundimage {
      height: 170px;
      filter: blur(30px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .pic {
      position: absolute;
      top: 0;
      left: 0;
      height: 150px;
      width: 150px;
      img {
        width: 100%;
        margin: 10px;
        border-radius: 5px;
      }
    }
    .text {
      position: absolute;
      top: 0;
      left: 170px;
      margin-left: 20px;
      margin-top: 30px;
      .logo {
        border: 1px solid goldenrod;
        border-radius: 20px;
        padding: 5px;
        width: 100px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: gold;
      }
      .text-1 {
        margin-top: 25px;
        color: aliceblue;
      }
      .text-2 {
        margin-top: 5px;
        font-size: 12px;
        color: rgb(207, 206, 206);
      }
    }
  }
  .center {
    margin-top: 15px;
    .type {
      display: flex;
      .alltype-btn {
        flex: 3;
        .el-button {
          border-radius: 20px;
          &:hover {
            background-color: $theme-color;
            color: black;
          }
        }
      }
      .hottype {
        width: 100%;
        height: 30px;
        line-height: 35px;
        flex: 4.5;
        .item {
          cursor: pointer;
          margin-left: 2px;
          font-size: 13px;
          color: gray;
          display: inline-block;
          padding: 0px 15px;
          &:hover {
            color: #404040;
          }
        }
        .el-button:focus,
        .el-button:hover {
          color: gray;
          border-color: gray;
          background-color: white;
        }
        .active {
          color: $theme-color;
          border-radius: 10px;
        }
      }
    }
    .allcard {
      display: flex;
      flex-wrap: wrap; /*用了flex-wrap:wrap;自动换行属性后*/
      justify-content: space-around;
      .song-list-item {
        width: 18.86%;
        ::v-deep {
          .playcard-img {
            height: 210px;
          }
        }
      }
    }
  }
  .pagination {
    height: 100px;
  }
  .alltypepopover {
    position: absolute;
    left: 75px;
    top: 230px;
  }
}
</style>
