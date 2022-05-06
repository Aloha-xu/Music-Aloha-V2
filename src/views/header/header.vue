<template>
  <div class="box">
    <div class="left">
      <div class="logo">
        <img src="@/assets/icon/logo.png" alt="" />
      </div>
      <div class="back_go_tool">
        <img
          src="@/assets/icon/arrow-double-left.svg"
          alt=""
          class="back"
          @click="back"
        />
        <img
          src="@/assets/icon/arrow-double-right.svg"
          alt=""
          class="go"
          @click="go"
        />
      </div>
      <div class="search">
        <Search
          :HotSearchDetail="HotSearchDetail"
          :SearchDetail="SearchDetail"
          @handleSearchValues="handleChangeSearch"
        ></Search>
      </div>
    </div>
    <div class="right">
      <div class="user-info">
        <div class="out-login" v-if="!currentUserInfo">
          <el-button type="text" @click="loginDialogVisible.show = true">
            <i class="el-icon-user"></i> <span>未登录</span>
          </el-button>
        </div>
        <div class="login" v-if="currentUserInfo" @click="handleOutLoginFun">
          <img :src="currentUserInfo.avatarUrl" alt="" />
          <span>{{ currentUserInfo.nickname }}</span>
        </div>
        <div class="tool">
          <img src="@/assets/icon/email.svg" alt="" @click="ShowMsgDarwer" />
          <el-popover placement="bottom" width="330" trigger="click">
            <div class="theme-txt">主题</div>
            <div class="clothes">
              <div
                class="theme-item"
                v-for="(item, index) in 6"
                :key="index"
                @click="handleTheme(index, item)"
              ></div>
            </div>
            <img
              slot="reference"
              src="@/assets/icon/clothes.svg"
              @click="handelChangeBackgroundColor"
            />
          </el-popover>
          <img src="@/assets/icon/setting.svg" alt="" />
        </div>
      </div>
    </div>
    <!-- 通知栏的drawer -->
    <el-drawer
      :visible="drawer"
      size="365px"
      :show-close="false"
      @close="handleClose"
      @open="handleOpen"
    >
      <div class="notice-popover">
        <!--  -->
        <div class="title">消息</div>
        <div class="tabs">
          <div
            class="item"
            v-for="(item, index) in tabItem"
            :key="item"
            :class="index == currentNav ? 'active' : ''"
            @click="currentNav = index"
          >
            {{ item }}
          </div>
        </div>
        <div class="content">
          <div class="private">
            <div
              class="notice-card"
              v-for="(item, index) in privateInfo"
              :key="index"
            >
              <img :src="item.fromUser.avatarUrl" alt="" />
              <div
                class="text"
                @click="
                  clickToInnerDrawer(
                    item.fromUser.userId,
                    item.fromUser.nickname,
                    item.fromUser.avatarUrl
                  )
                "
              >
                <div class="name">{{ item.fromUser.nickname }}</div>
                <div class="time">{{ getYMD(item.lastMsgTime) }}</div>
                <div class="new-notice">
                  {{ parseLastNotice(item.lastMsg) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-drawer
          size="365px"
          :append-to-body="true"
          :visible="innerDrawer"
          :show-close="false"
          :wrapperClosable="false"
          @open="handleInnerOpen"
          @close="handleInnerClose"
        >
          <div class="inner-popover">
            <i class="el-icon-arrow-left" @click="handleOutInneerPopover"></i>
            <div class="name">{{ toUserInfo.name }}</div>
            <div
              class="content"
              v-show="!beforMsgs.length == 0 || !newMsgs.length == 0"
            >
              <div class="befor-msg">
                <div
                  class="msg-card"
                  v-for="(item, index) in beforMsgs"
                  :key="index"
                >
                  <div class="time">{{ getYestaryToday(item.time) }}</div>
                  <div
                    class="msg"
                    :class="toUserInfo.uId === item.uid ? '' : 'active'"
                  >
                    <img
                      :src="toUserInfo.cover"
                      alt=""
                      v-show="toUserInfo.uId == item.uid"
                    />
                    <div class="text">
                      <div class="text-content">
                        {{ JSON.parse(item.msg).msg }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="new-msg">
                <div
                  class="msg-card"
                  v-for="(item, index) in newMsgs"
                  :key="index"
                >
                  <div class="time">{{ getYestaryToday(item.time) }}</div>
                  <div
                    class="msg"
                    :class="toUserInfo.uId === item.uid ? '' : 'active'"
                  >
                    <img
                      :src="toUserInfo.cover"
                      alt=""
                      v-show="toUserInfo.uId == item.uid"
                    />
                    <div class="text">
                      <div class="text-content">
                        {{ JSON.parse(item.msg).msg }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tip"
              v-show="beforMsgs.length == 0 && newMsgs.length == 0"
            >
              暂无私聊
            </div>
            <el-input
              type="text"
              v-model="text"
              maxlength="200"
              show-word-limit
            >
            </el-input>
            <div class="send-button" @click="sendMsgs">发送</div>
          </div>
        </el-drawer>
      </div>
    </el-drawer>
    <!-- 登录框-->
    <!--  抽离login弹出框-->
    <!-- <el-dialog
      title="请登录"
      :visible.sync="loginDialogVisible"
      width="450px"
      center
    >
      <form method="POST">
        <span>电话号码：</span
        ><el-input
          v-model="userPhoneNumber"
          placeholder="请输入电话号码"
          style="width: 300px; margin-bottom: 20px"
        ></el-input>
        <br />
        <span>密码：</span
        ><el-input
          placeholder="请输入密码"
          v-model="userPWD"
          show-password
          style="width: 300px; margin-left: 27px"
        ></el-input>
      </form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleLogin">确 定</el-button>
      </span>
    </el-dialog> -->

    <Login
      :loginDialogVisible.sync="loginDialogVisible.show"
      @handleCloseDialogFunc="handleCloseDialogFunc"
    ></Login>
  </div>
</template>

<script>
import {
  getHotSearchDetail,
  getSearchSuggest,
  // account,
  // getUserDetail,
  // getLogin,
  getMsgHistory,
  getPrivateMsgHistory,
  SendText,
  outRefresh,
} from "@/network/api";
import { getYMD, getYestaryToday } from "@/utils/uctil";
import Search from "./search/search.vue";
import v from "@/assets/css/base.scss";
import { mapGetters } from "vuex";
import Login from "@/views/login/index.vue";
export default {
  components: { Search, Login },
  // components: { Search },
  name: "Header",
  data() {
    return {
      //热搜榜的数据
      HotSearchDetail: [],
      //搜索建议结果的数据
      SearchDetail: {},
      //自己
      // currentUserInfo: null,
      tabItem: ["私信", "评论", "@我", "通知"],
      privateInfo: {},
      currentNav: 0,
      beforMsgs: [],
      newMsgs: [],
      text: "",
      //私信对象信息
      toUserInfo: {},
      //刷新消息的定时器
      msgInterval: null,
      //控制登陆弹出框
      loginDialogVisible: {
        show: false,
      },
      userPWD: null,
      userPhoneNumber: null,
    };
  },
  methods: {
    handleCloseDialogFunc(val) {
      this.loginDialogVisible.show = val;
    },
    async handleOutLoginFun() {
      //清除localStorage sessionStorage
      window.sessionStorage.removeItem("currentUserInfo");
      // this.currentUserInfo = null;
      this.$store.dispatch("LogOut");
      await outRefresh();
    },
    handleTheme(index, item) {
      console.log(index, item);
      if (index === 0) {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--theme", "#242427");
      } else if (index === 1) {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--theme", "#EC4141");
      } else if (index === 2) {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--theme", "#67BFFD");
      } else if (index === 3) {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--theme", "#54C77B");
      } else if (index === 4) {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--theme", "#FAA4C6");
      } else {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty("--theme", "#F8CF7F");
      }
    },
    handelChangeBackgroundColor() {
      console.log(v.backgroundmaincolor1);
    },
    back() {
      history.back();
    },
    go() {
      history.go(1);
    },

    handleInputSearch() {},
    async handleChangeSearch(searchValues) {
      const SearchSuggest = await getSearchSuggest(searchValues);
      this.SearchDetail = SearchSuggest.data.result;
    },
    loadAll() {
      for (let i = 0; i < this.HotSearchDetail.length; i++) {
        let hotSearchDetail = {};
        (hotSearchDetail.content = this.HotSearchDetail[i].content),
          (hotSearchDetail.score = this.HotSearchDetail[i].score),
          (hotSearchDetail.searchWord = this.HotSearchDetail[i].searchWord),
          this.restaurants.push(hotSearchDetail);
      }
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //处理点击登陆 没有写弹出框 输入账号密码 二维码 短信 之类的登陆方式窗口
    // async handleLogin() {
    //   this.loginDialogVisible = false;
    //   const { data } = await getLogin(this.userPhoneNumber, this.userPWD);
    //   this.currentUserInfo = data.profile;
    //   window.sessionStorage.setItem(
    //     "currentUserInfo",
    //     JSON.stringify(data.profile)
    //   );
    //   let data2 = await account();
    //   console.log(data2);
    //   let data1 = await getUserDetail(data.profile.userId);
    //   console.log(data1);
    // },
    parseLastNotice(msg) {
      let afterMsg = JSON.parse(msg);
      return afterMsg.msg;
    },
    getYMD(time) {
      return getYMD(time);
    },
    getYestaryToday(time) {
      return getYestaryToday(time);
    },

    //展示darwer通知页面
    ShowMsgDarwer() {
      this.$store.commit("setShowMsgDarwer");
    },
    //获取通知消息
    async getNotices() {
      const { data } = await getMsgHistory();
      this.privateInfo = data.msgs;
      //可以做一个timeinterval刷新数据 有新数据就出现红点 并刷新最新一条数据信息 ⭐⭐⭐
    },
    //点击具体消息进去对应的私聊
    clickToInnerDrawer(uId, name, cover) {
      this.toUserInfo = { uId, name, cover };
      this.getPrivateMsg(uId);
      this.$store.commit("setShowMsgInnerDarwer");
    },
    //drawer的回调事件
    handleOpen() {
      //通过用户个人界面进去进行私聊 先处理聊天对象的信息 否者就模板渲染比数据快 数据就渲染不上去了
      this.toUserInfo = this.$store.state.toUserInfo;
      this.getPrivateMsg(this.toUserInfo.uId);
    },
    handleClose() {
      this.$store.commit("setShowMsgDarwer");
    },
    //这里需要修改 换一种方式刷新数据
    handleInnerOpen() {
      //计时器定时更新数据
      this.msgInterval = setInterval(() => {
        this.getPrivateMsg(this.toUserInfo.uId);
      }, 5000);
    },
    handleInnerClose() {
      //返回darwer时候刷新数据
      this.getNotices();
    },
    //获取历史聊天记录
    async getPrivateMsg(uId) {
      //获取聊天历史数据
      let { data } = await getPrivateMsgHistory(uId);
      //清除聊天数据
      this.beforMsgs = [];
      this.newMsgs = [];
      console.log(data);
      //筛选出昨天的数据
      let nowTime = new Date().getTime();
      for (let i = 0; i < data.msgs.length; i++) {
        if (nowTime - data.msgs[i].time >= 86400000) {
          //前一天的消息
          this.beforMsgs.unshift({
            msg: data.msgs[i].msg,
            uid: data.msgs[i].fromUser.userId,
            time: data.msgs[i].time,
          });
        } else {
          this.newMsgs.unshift({
            msg: data.msgs[i].msg,
            uid: data.msgs[i].fromUser.userId,
            time: data.msgs[i].time,
          });
        }
      }
    },

    //退出innnerPopover
    handleOutInneerPopover() {
      this.$store.commit("setShowMsgInnerDarwer");
      //清除聊天数据
      this.beforMsgs = [];
      this.newMsgs = [];
      this.toUserInfo = {};
      window.clearInterval(this.msgInterval);
    },

    //处理发送消息事件
    async sendMsgs() {
      //数据返回的是历史消息
      const { data } = await SendText(this.toUserInfo.uId, this.text);
      //清除聊天数据
      this.beforMsgs = [];
      this.newMsgs = [];
      let nowTime = new Date().getTime();
      for (let i = 0; i < data.newMsgs.length; i++) {
        if (nowTime - data.newMsgs[i].time >= 86400000) {
          //前一天的消息
          this.beforMsgs.unshift({
            msg: data.newMsgs[i].msg,
            uid: data.newMsgs[i].fromUser.userId,
            time: data.newMsgs[i].time,
          });
        } else {
          this.newMsgs.unshift({
            msg: data.newMsgs[i].msg,
            uid: data.newMsgs[i].fromUser.userId,
            time: data.newMsgs[i].time,
          });
        }
      }
      this.text = "";
    },
  },

  async created() {
    const { data } = await getHotSearchDetail();
    this.HotSearchDetail = data.data;
    this.getNotices();
    //通过vuex传入touser的信息
    this.toUserInfo = this.$store.state.toUserInfo;
  },
  computed: {
    // drawer() {
    //   return this.$store.state.isShowMsgDrawer;
    // },
    // innerDrawer() {
    //   return this.$store.state.isShowInnerMsgDrawer;
    // },
    ...mapGetters({
      drawer: "isShowMsgDrawer",
      innerDrawer: "isShowInnerMsgDrawer",
      currentUserInfo: "userinfo",
    }),
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/base.scss";
$background-theme-color: (
  1: #242427,
  2: #ec4141,
  3: #67bffd,
  4: #54c77b,
  5: #faa4c6,
  6: #f8cf7f,
);
.box {
  background-color: $theme-color;
  height: 60px;
  display: flex;
  width: 100%;
  min-width: 1350px;
  .left {
    width: 510px;
    height: 60px;
    display: flex;
    .logo {
      width: 200px;
      line-height: 80px;
      img {
        height: 35px;
      }
    }
    .back_go_tool {
      width: 70px;
      text-align: center;
      line-height: 71.5px;
      img {
        height: 25px;
        border-radius: 10px;
        margin-left: 10px;
      }
    }
    .search {
      width: 200px;
      line-height: 60px;
      padding-left: 10px;
    }
  }
  .right {
    width: calc(100% - 510px);
    height: 60px;
    display: flex;
    justify-content: flex-end;
    .tool {
      height: 60px;
      flex: 1;
      display: flex;
      flex-direction: row-reverse;
      margin-left: 20px;
      img {
        margin-right: 20px;
        margin-left: 20px;
        height: 25px;
        margin-top: 17px;
      }
    }
    .user-info {
      height: 60px;
      display: flex;
      .out-login {
        line-height: 55px;
        .el-button {
          color: black;
          .el-icon-user {
            font-size: 32px;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
            font-size: 16px;
            font-weight: 400;
          }
        }
      }
      .login {
        line-height: 55px;
        span {
          vertical-align: middle;
        }
        img {
          height: 25px;
          margin-right: 10px;
          border-radius: 10px;
          vertical-align: middle;
        }
      }
    }
  }
  .notice-popover {
    .title {
      font-size: 25px;
      margin-left: 20px;
      margin-top: 20px;
    }
    .tabs {
      margin: 25px 15px;
      font-size: 12px;
      border: 1px solid gray;
      border-radius: 15px;
      width: 320px;
      cursor: pointer;
      .item {
        display: inline-block;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 15px;
      }
      .active {
        background-color: $theme-color;
      }
    }
    .content {
      .private {
        .notice-card {
          display: flex;
          font-size: 12px;
          padding-top: 10px;
          padding-left: 15px;
          height: 55px;
          cursor: pointer;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
          }
          .text {
            width: 290px;
            display: flex;
            flex-wrap: wrap;
            margin-left: 10px;
            vertical-align: middle;
            border-bottom: 1px solid rgb(233, 233, 233);
            .name {
              color: rgba(0, 140, 255, 0.856);
              width: 60%;
            }
            .time {
              font-size: 9px;
              color: rgb(233, 233, 233);
              width: 40%;
            }
            .new-notice {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .notice-card:hover {
          background-color: rgb(233, 233, 233);
          border-radius: 5px;
        }
      }
    }
  }
}
.inner-popover {
  font-size: 15px;
  position: relative;
  .el-icon-arrow-left {
    font-size: 18px;
    margin-left: 10px;
  }
  .name {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    margin-left: 120px;
  }
  .content {
    overflow: scroll;
    height: 82vh;
    .befor-msg,
    .new-msg {
      .msg-card {
        .time {
          font-size: 12px;
          text-align: center;
          border-radius: 10px;
          padding: 5px 10px;
          color: rgb(158, 158, 158);
          margin: 10px 0;
        }
        .msg {
          font-size: 13.5px;
          margin: 10px 0;
          display: flex;
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-left: 10px;
            vertical-align: middle;
          }
          .text {
            .text-content {
              margin-left: 10px;
              border-radius: 10px;
              background-color: rgb(216, 216, 216);
              padding: 12px 10px;
              vertical-align: middle;
            }
          }
        }
        .active {
          flex-direction: row-reverse;
          margin-right: 10px;
        }
      }
    }
  }
  .tip {
    text-align: center;
    margin-top: 50px;
    overflow: scroll;
    height: 82vh;
  }
  @media (max-width: 1920px) {
    .content {
      height: 82vh;
    }
  }
  @media (min-width: 1921px) {
    .content {
      height: 87vh;
    }
  }
  .el-input {
    position: absolute;
    .el-input__inner {
      margin-left: 15px;
      height: 70px;
      width: 90%;
    }
  }
  .send-button {
    position: absolute;
    right: 15px;
    bottom: -120px;
    border: 1px solid rgb(209, 209, 209);
    padding: 10px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
}
.send-button:hover {
  background-color: rgb(212, 212, 212);
}
#el-drawer__title {
  margin: 0;
  padding: 0;
}
.clothes {
  width: 330px;
  height: 270px;
  @for $i from 1 through 6 {
    .theme-item:nth-child(#{$i}) {
      display: inline-block;
      width: 90px;
      height: 90px;
      border-radius: 5px;
      margin-left: 15px;
      margin-bottom: 5px;
      background-color: map-get($map: $background-theme-color, $key: $i);
    }
  }
}
.theme-txt {
  margin-left: 15px;
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 15px;
}
</style>
