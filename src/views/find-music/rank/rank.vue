<template>
  <div class="rank">
    <div class="title">全球榜</div>
    <div class="card">
      <PlayCard
        v-for="item in RankInfo"
        :key="item.id"
        :pic="item.coverImgUrl + '?param=210y210'"
        :playcount="item.playCount"
        :text="item.name"
        :id="item.id"
        class="item"
        @cardClick="cardClick"
      >
      </PlayCard>
    </div>
  </div>
</template>

<script>
import PlayCard from "@/components/common/PlayCard";
import { getTopList } from "@/network/api";
export default {
  name: "Rank",
  components: {
    PlayCard,
  },
  data() {
    return {
      RankInfo: [],
    };
  },
  methods: {
    async getTopListInfo() {
      //请求rank数据
      const { data } = await getTopList();
      console.log(data);
      this.RankInfo = data.list;
      //数据api不能一次请求多次同一api 不知道怎么解决这个问题
      // console.log(res1)
      // //拿到rank榜单的前六个id，并形成新的数组ids
      // let ids=data.list.map(({id})=>id).slice(0,6)
      // this.ids=ids
      // console.log(ids)
      // // const time =Math.round(new Date().getTime()/1000)
      // // const time1 =Math.round(new Date().getTime()/1000)
      // // //getTime()//返回数值的单位是毫秒
      // // console.log(time)
      // // console.log(time1)
      // let res2= await getSongListDetail(3779629)
      // console.log(res2)
      // this.RankInfo.push(...res2.data)
      // //  for(let i;i<=5;i++){
      // //     let res2= await getSongListDetail(this.ids[i])
      // //     console.log(res2)
      // //    this.RankInfo.push(...res2.data)
      // //  }
    },
    cardClick(id) {
      this.$router.push("/playlistdetail/" + id);
    },
  },
  async created() {
    this.getTopListInfo();
    this.$store.commit("refeshCurrentNavIndex", 3);
  },
  activated() {
    //再次激活时 对比一些数据 看似否需要更新
    this.$store.commit("refeshCurrentNavIndex", 3);
  },
};
</script>

<style scoped lang="scss">
.rank {
  width: 1100px;
  .title {
    font-weight: 900;
    font-size: 20px;
    margin-left: 5px;
    margin-bottom: 10px;
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 19%;
      margin: 5px;
      ::v-deep {
        .playcard-img {
          height: 209px;
        }
      }
    }
  }
}
</style>
