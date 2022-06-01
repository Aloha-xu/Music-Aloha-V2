<template>
  <div class="user-detail">
    <div class="head">
      <div class="user-pic">
        <img :src="img" alt="" />
      </div>
      <div class="user-detail-info">
        <div class="title">{{ userName }}</div>
        <div class="user-basice-info">
          <div class="all-auth-types">
            <div class="auth-types" v-for="item in authTypes" :key="item">
              {{ item }}
            </div>
            <span class="level">Lv{{ level }}</span>
            <span class="man" v-show="gender == 1">♂</span>
            <span class="girl" v-show="gender == 2">♀</span>
          </div>
          <div class="tools-button">
            <span class="other-button" @click="handleOther">
              <i class="el-icon-more"></i>
            </span>
            <span
              class="focus-button-off"
              v-show="!isFocus"
              @click="handleFocus"
            >
              <i class="el-icon-plus"></i>
              关注
            </span>
            <span class="focus-button-on" v-show="isFocus" @click="handleFocus">
              <i class="el-icon-check"></i>
              已关注
            </span>
            <span class="send-msg-button" @click="handlePrivateMsg">
              <i class="el-icon-message"></i>
              发私信
            </span>
          </div>
        </div>
        <div class="user-number-info">
          <div class="dynamic" @click="handleToDynamicPapg">
            <div class="dynamic-number">{{ dynamicNumber }}</div>
            <span>动态</span>
          </div>
          <div class="focus" @click="handleToFocusPapg">
            <div class="focus-number">{{ focusNumber }}</div>
            <span>关注</span>
          </div>
          <div class="fans" @click="handleToFansPapg">
            <div class="fans-number">{{ fansNumber }}</div>
            <span>粉丝</span>
          </div>
        </div>
        <div class="user-introduce-info">
          <div class="sns">社交网络：未绑定</div>
          <div class="self-introduction" v-show="selfIntroduction">
            个人介绍：{{ selfIntroduction }}
          </div>
        </div>
      </div>
    </div>
    <div class="user-detail-content">
      <div class="Dj"></div>
      <div class="play-list-title">
        歌单
        <span>（{{ playlistCount }}）</span>
      </div>

      <div class="all-cards">
        <PlayCard
          v-for="(item, index) in playListInfo"
          :key="index"
          :id="item.id"
          :pic="item.coverImgUrl"
          :playcount="item.playCount"
          :trackCount="item.trackCount"
          :text="item.name"
          @cardClick="cardClick"
        ></PlayCard>
      </div>
    </div>
  </div>
</template>

<script>
import PlayCard from "@/components/common/PlayCard.vue";
import { getUserDetail, getUserPlaylist, setFollow } from "@/network/api";
import { mapGetters } from "vuex";
export default {
  components: { PlayCard },
  name: "UserDetail",
  data() {
    return {
      img: null,
      userName: null,
      authTypes: null,
      level: null,
      gender: null,
      dynamicNumber: null,
      focusNumber: null,
      fansNumber: null,
      selfIntroduction: null,
      sns: null,
      playlistCount: null,
      isFocus: null,
      playListInfo: [],
    };
  },
  methods: {
    cardClick(id) {
      this.$router.push("/playlistdetail/" + id);
    },
    //判断是否关注
    async handleFocus() {
      if (this.isFocus) {
        await setFollow(this.toUserInfo.userId, 0);
        this.isFocus = false;
      } else {
        await setFollow(this.toUserInfo.userId, 1);
        this.isFocus = true;
      }
    },

    //显示私信弹出框
    handlePrivateMsg() {
      //通过vuex传信息给darwer下的innnerDarwer
      this.$store.commit("setShowMsgInnerDarwer");
      this.$store.commit("setShowMsgDarwer");
    },

    handleOther() {},
    handleToDynamicPapg() {},
    handleToFocusPapg() {},
    handleToFansPapg() {},

    //处理全部数据
    async handleAllInfo() {
      const { data } = await getUserDetail(this.$route.params.id);
      // console.log(data);
      this.img = data.profile.avatarUrl;
      this.userName = data.profile.nickname;
      this.authTypes = data.profile.allAuthTypes?.map(({ desc }) => desc);
      this.level = data.level;
      //gender 1 ==> 男 ♂  2 ==> 女 ♀
      this.gender = data.profile.gender;
      this.dynamicNumber = data.profile.eventCount;
      this.focusNumber = data.profile.follows;
      this.fansNumber = data.profile.followeds;
      this.selfIntroduction = data.profile.signature;
      this.isFocus = data.profile.followed;
      this.playlistCount = data.profile.playlistCount;

      //获取用户的歌单信息
      const playListInfo = await getUserPlaylist(data.profile.userId);
      this.playListInfo = playListInfo.data.playlist;

      //设置用户的信息
      this.$store.commit("SET_TO_USER_INFO", {
        cover: data.profile.avatarUrl,
        name: data.profile.nickname,
        uId: data.profile.userId,
      });
    },
  },
  computed: {
    ...mapGetters(["toUserInfo"]),
  },
  async created() {
    this.handleAllInfo();
  },
};
</script>

<style scoped lang="scss">
.user-detail {
  overflow: scroll;
  height: 85vh;
  width: 100%;
  .head {
    display: flex;
    margin: 30px 40px 0 40px;
    .user-pic {
      img {
        width: 185px;
        height: 185px;
        border-radius: 50%;
        margin-right: 20px;
      }
    }
    .user-detail-info {
      flex-grow: 1;
      .title {
        font-size: 22px;
        font-weight: 900;
        padding-bottom: 10px;
      }
      .user-basice-info {
        display: flex;
        align-items: center;
        border-bottom: 1.5px solid rgba(180, 180, 180, 0.801);
        padding-bottom: 10px;
        .all-auth-types {
          font-size: 11px;
          font-weight: 100;
          width: 300px;
          .auth-types {
            display: inline-block;
            padding: 2px;
            border-radius: 20px;
            margin-left: 5px;
            background-color: rgba(8, 137, 197, 0.1);
            color: rgb(13, 9, 216);
            margin-bottom: 8px;
          }
          .level {
            padding: 2px 5px;
            border-radius: 20px;
            margin-left: 5px;
            background-color: rgba(0, 0, 0, 0.1);
            color: rgb(0, 0, 0);
            margin-bottom: 5px;
          }
          .man {
            padding: 3px 7px;
            border-radius: 50%;
            margin-left: 5px;
            background-color: rgba(29, 138, 228, 0.1);
            margin-bottom: 5px;
            color: rgb(1, 43, 133);
          }
          .girl {
            padding: 3px 7px;
            border-radius: 50%;
            margin-left: 5px;
            background-color: rgba(206, 1, 1, 0.1);
            margin-bottom: 5px;
            color: rgb(206, 29, 6);
          }
        }
        .tools-button {
          flex-grow: 1;
          display: flex;
          flex-direction: row-reverse;
          .send-msg-button,
          .focus-button-on,
          .focus-button-off {
            cursor: pointer;
            border: 1px solid gray;
            padding: 7px 12px;
            border-radius: 20px;
            margin-left: 5px;
          }
          .send-msg-button:hover,
          .focus-button-on:hover,
          .focus-button-off:hover {
            background-color: rgba(233, 233, 233, 0.637);
          }
          .other-button {
            border: 1px solid gray;
            padding: 5px 7px;
            border-radius: 50%;
            margin-left: 5px;
          }
        }
      }
      .user-number-info {
        display: flex;
        margin-top: 10px;
        .dynamic {
          cursor: pointer;
          width: 60px;
          border-right: 1px solid rgba(180, 180, 180, 0.856);
          padding-right: 20px;
          .dynamic-number {
            font-size: 20px;
            padding: 5px;
          }
          span {
            font-size: 12px;
            color: rgba(143, 143, 143, 0.904);
            padding: 0px 5px;
          }
        }
        .focus {
          cursor: pointer;
          width: 60px;
          padding-left: 20px;
          border-right: 1px solid rgba(180, 180, 180, 0.856);
          .focus-number {
            font-size: 20px;
            padding: 5px;
          }
          span {
            font-size: 12px;
            color: rgba(143, 143, 143, 0.904);
            padding: 0px 5px;
          }
        }
        .fans {
          cursor: pointer;
          width: 60px;
          padding: 0px 20px;
          .fans-number {
            font-size: 20px;
            padding: 5px;
          }
          span {
            font-size: 12px;
            color: rgba(143, 143, 143, 0.904);
            padding: 0px 5px;
          }
        }
      }
      .user-introduce-info {
        font-size: 13px;
        margin-left: 5px;
        .sns,
        .self-introduction {
          margin-top: 10px;
        }
      }
    }
  }
  .user-detail-content {
    margin-left: 40px;
    .play-list-title {
      font-size: 20px;
      font-weight: 700;
      margin-top: 20px;
      margin-bottom: 10px;
      span {
        font-size: 13px;
        font-weight: 400;
      }
    }
    .all-cards {
      display: flex;
      flex-wrap: wrap;
      @media (max-width: 1400px) {
        .card {
          width: 22%;
          margin-right: 25px;
        }
      }
      @media (min-width: 1401px) {
        .card {
          width: 15%;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
