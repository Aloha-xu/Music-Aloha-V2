<template>
  <div class="search-detail-user">
    <search-detail-card
      v-for="(item, index) in userInfo.userprofiles"
      :key="index"
      :name="item.nickname"
      :scover="item.avatarUrl"
      :other="item.signature"
      @handleToPapg="handleToUserPapg(item.id)"
    ></search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from "@/components/common/search-detail-card.vue";
export default {
  components: { searchDetailCard },
  name: "SearchDetailUser",
  props: {
    userInfo: Object,
  },
  methods: {
    handleToUserPapg() {},
  },
};
</script>

<style scoped lang='scss'>
.search-detail-user {
  display: flex;
  flex-direction: column;
  .search-detail-card {
    height: 85px;
    line-height: 80px;
    overflow: hidden;
    .pic {
      img {
        margin-left: 10px;
      }
    }
  &:nth-child(2n) {
    background-color: rgb(245, 245, 245);
    border-radius: 5px;
  }
  &:hover {
    background-color: rgb(231, 231, 231);
  }
  }
}
</style>