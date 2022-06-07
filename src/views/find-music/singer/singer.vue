<template>
  <div class="singer" ref="singer">
    <div class="select-bar">
      <div class="left">语种：</div>
      <div class="right">
        <div
          class="select-bar-item"
          :class="LanguageCurrentChoose === item ? 'singer-active' : ''"
          v-for="item in selectBarInfo[0].language"
          :key="item"
          @click="handleLanguageChoose(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="select-bar">
      <div class="left">分类：</div>
      <div class="right">
        <div
          class="select-bar-item"
          :class="ClassifyCurrentChoose === item ? 'singer-active' : ''"
          v-for="item in selectBarInfo[1].classify"
          :key="item"
          @click="handleClassifyChoose(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="select-bar">
      <div class="left">筛选：</div>
      <div class="right">
        <div
          class="select-bar-item"
          :class="FirstletterCurrentChoose === item ? 'singer-active' : ''"
          v-for="item in selectBarInfo[2].firstletter"
          :key="item"
          @click="handleFirstletterChoose(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div class="card" v-show="!loading">
      <div
        class="item"
        v-for="(item, index) in SingerCardInfo"
        :key="index"
        @click="ToSingerDetailClick(item.id)"
      >
        <BaseImage
          :src="item.img1v1Url + '?param=165y165'"
          lazy
          style="width: 165px; height: 165px; border-radius: 10px"
          :isShowPlayLogo="false"
        ></BaseImage>
        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
    <Loading v-show="loading" style="height: 50vh"></Loading>
  </div>
</template>

<script>
//bug：分类的男歌手 女歌手 乐队 这些按钮点击无对应的数据返回
import { getArtistsList } from "@/network/api";
import Loading from "@/components/common/loading.vue";
import { mapGetters } from "vuex";
export default {
  name: "Singer",
  components: {
    Loading,
  },
  data() {
    return {
      selectBarInfo: {
        0: { language: ["全部", "华语", "欧美", "日本", "韩国", "其他"] },
        1: { classify: ["全部", "男歌手", "女歌手", "乐队"] },
        2: {
          firstletter: [
            "热门",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "#",
          ],
        },
      },
      ClassifyCurrentChoose: "全部",
      LanguageCurrentChoose: "全部",
      FirstletterCurrentChoose: "热门",
      ClassifyCurrentIndex: -1,
      LanguageCurrentIndex: -1,
      FirstletterCurrentIndex: -1,
      SingerCardInfo: [],
    };
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    handleLanguageChoose(value) {
      this.LanguageCurrentChoose = value;
      switch (value) {
        case "全部":
          this.LanguageCurrentIndex = -1;
          break;
        case "华语":
          this.LanguageCurrentIndex = 7;
          break;
        case "欧美":
          this.LanguageCurrentIndex = 96;
          break;
        case "日本":
          this.LanguageCurrentIndex = 8;
          break;
        case "韩国":
          this.LanguageCurrentIndex = 16;
          break;
        case "其他":
          this.LanguageCurrentIndex = 0;
          break;
      }
      this.getArtistsList(
        this.ClassifyCurrentIndexthis,
        this.LanguageCurrentIndex,
        this.FirstletterCurrentIndex
      );
    },
    handleClassifyChoose(value) {
      this.ClassifyCurrentChoose = value;
      switch (value) {
        case "全部":
          this.ClassifyCurrentIndex = -1;
          break;
        case "男歌手":
          this.ClassifyCurrentIndex = 1;
          break;
        case "女歌手":
          this.ClassifyCurrentIndex = 2;
          break;
        case "乐队":
          this.ClassifyCurrentIndex = 3;
          break;
      }
      this.getArtistsList(
        this.ClassifyCurrentIndexthis,
        this.LanguageCurrentIndex,
        this.FirstletterCurrentIndex
      );
    },
    handleFirstletterChoose(value) {
      this.FirstletterCurrentChoose = value;
      let currentinitialindex = value;
      switch (value) {
        case "热门":
          currentinitialindex = -1;
          break;
        case "#":
          currentinitialindex = 0;
          break;
      }
      this.getArtistsList(
        this.ClassifyCurrentIndexthis,
        this.LanguageCurrentIndex,
        currentinitialindex
      );
    },
    async getArtistsList(type, area, initial) {
      this.$store.commit("setLoading", true);
      const { data } = await getArtistsList(type, area, initial, 100, 100);
      this.SingerCardInfo = data.artists;
      this.$store.commit("setLoading", false);
    },

    //下拉到底部自动加载数据
    //♥这个功能未完成 问题：还没拉到底就一直加载数据 原因：应该是图片数据请求慢
    scroll() {
      let isLoading = false;
      let loadingnumber = 0;
      this.$refs.singer.onscroll = () => {
        // 距离底部200px时加载一次
        let bottomOfWindow =
          document.documentElement.offsetHeight -
            document.documentElement.scrollTop -
            window.innerHeight <=
          200;
        if (bottomOfWindow && isLoading == false) {
          //限制只能触发一次
          isLoading = true;
          loadingnumber++;
          console.log(loadingnumber);
          getArtistsList(
            this.ClassifyCurrentIndexthis,
            this.LanguageCurrentIndex,
            this.FirstletterCurrentIndex,
            100,
            100 * loadingnumber
          ).then((res) => {
            console.log(res);
            this.SingerCardInfo.push(...res.data.artists);
          });
        }
      };
    },

    ToSingerDetailClick(id) {
      this.$router.push("/singerlistdetail/" + id);
    },
  },
  async created() {
    this.$store.commit("refeshCurrentNavIndex", 4);
    this.getArtistsList(
      this.ClassifyCurrentIndexthis,
      this.LanguageCurrentIndex,
      this.FirstletterCurrentIndex
    );
  },
  activated() {
    this.$store.commit("refeshCurrentNavIndex", 4);
    //不明白之前为什么写
    // this.$store.state.loading.close();
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/theme.scss";
.singer {
  font-size: 13px;
  color: rgb(87, 87, 87);
  width: 1100px;
  .select-bar {
    display: flex;
    margin-bottom: 5px;
    .left {
      width: 4%;
      padding: 7px 0px 10px 20px;
    }
    .right {
      width: 90%;
      padding: 0px 10px;
      display: flex;
      flex-wrap: wrap;
      .select-bar-item {
        cursor: pointer;
        padding: 7px 25px;
        border-radius: 10px;
        &:hover {
          background-color: $theme-color;
        }
      }
      .singer-active {
        background-color: $theme-color;
      }
    }
  }
  .card {
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 15%;
      margin-left: 10px;
      margin-top: 15px;
      // .img {
      //   width: 100%;
      //   // img {
      //   //   border-radius: 5px;
      //   //   width: 100%;
      //   //   height: 100%;
      //   // }
      // }
      .name {
        font-size: 15px;
        margin-top: 5px;
      }
    }
  }
}
.image-slot {
  width: 165px;
  height: 165px;
  text-align: center;
  line-height: 165px;
  background-color: rgba(204, 207, 213, 0.289);
}
</style>
