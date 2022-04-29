<template>
  <div class="exclusive-push">
    <into-details-button
      :intoDetailsButtonName="intoDetailsButtonName"
      @intoDetailsClick="intoDetailsClick"
    ></into-details-button>
    <div class="content">
      <exclusiver-push-card
        class="item"
        v-for="item in ExclusivePushInfo"
        :key="item.id"
        :pic="item.sPicUrl"
        :text="item.name"
      ></exclusiver-push-card>
    </div>
  </div>
</template>

<script>
import IntoDetailsButton from "@/components/common/into-details-button.vue";
import { getExclusivePush } from "@/network/api";
import ExclusiverPushCard from "./exclusive-push-card.vue";
export default {
  name: "ExclusivePush",
  components: {
    IntoDetailsButton,
    ExclusiverPushCard,
  },
  data() {
    return {
      intoDetailsButtonName: "独家放送",
      ExclusivePushInfo: {},
    };
  },
  methods: {
    async getExclusivePush() {
      const { data } = await getExclusivePush();
      this.IntoDetailsButtonName = data.name;
      this.ExclusivePushInfo = data.result;
    },
    intoDetailsClick() {
    },
  },
  async created() {
    this.getExclusivePush();
  },
  
};
</script>

<style scoped lang="scss">
.exclusive-push{
    .content{
        display: flex;
        padding-top: 5px;
        .item:nth-child(1){
            margin-right: 15px;
        }
        .item:nth-child(2){
            margin-right: 15px;
        }
    }
}

</style>