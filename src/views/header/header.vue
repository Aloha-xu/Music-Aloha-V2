<template>
  <div class="box">
    <div class="left">
      <div class="logo" @click="reloadProgrom">
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
        <div class="out-login" v-show="!currentUserInfo">
          <el-button type="text" @click="showLoginDialog">
            <i class="el-icon-user"></i> <span>未登录</span>
          </el-button>
        </div>
        <div class="login" v-show="currentUserInfo" @click="handleOutLoginFun">
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
                v-for="(item, index) in themeStyle"
                :key="index"
                @click="handleChangeThemeStyle(index)"
              ></div>
            </div>
            <img slot="reference" src="@/assets/icon/clothes.svg" />
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
      :withHeader="false"
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
            @click="handleChangeNav(index)"
          >
            {{ item }}
            <div
              class="badge"
              v-if="unReadPrivate && index == 0 ? true : false"
            >
              {{ index == 0 ? unReadPrivate : "" }}
            </div>
          </div>
        </div>
        <div class="content">
          <div class="private" v-show="currentNav == 0">
            <div
              class="notice-card"
              :class="item.newMsgCount ? 'un-read' : ''"
              v-for="(item, index) in privateInfo"
              :key="index"
            >
              <img :src="item.fromUser.avatarUrl + '?param=40y40'" alt="" />
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
          <div class="comment" v-show="currentNav == 1">
            <div
              class="comment-card"
              v-for="(item, index) in commentInfo"
              :key="index"
            >
              <img
                :src="item.user.avatarUrl + '?param=40y40'"
                alt=""
                @click="clickToUserDetail(item.user.userId)"
              />
              <div class="text" @click="clickToCommentDetail()">
                <div class="name">
                  {{ item.user.nickname }}
                </div>
                <div class="time">{{ formatTime60orYMD(item.time) }}</div>
                <div
                  class="content"
                  :class="item.content.indexOf('@') == 0 ? 'is-art' : ''"
                >
                  {{ item.content }}
                </div>
                <div class="be-replied-content">
                  {{ item.beRepliedContent }}
                </div>
                <div class="reply-btn">
                  <span class="reply-btn-content"
                    ><i class="el-icon-chat-line-square"></i>回复</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="artMe" v-show="currentNav == 2">
            <div
              class="artMe-card"
              v-for="(item, index) in artMeInfo"
              :key="index"
            >
              <img
                :src="item.comment.user.avatarUrl + '?param=40y40'"
                alt=""
                @click="clickToUserDetail(item.comment.user.userId)"
              />
              <div class="text" @click="clickToCommentDetail()">
                <div class="name">
                  {{ item.comment.user.nickname }}
                </div>
                <div class="time">
                  {{ formatTime60orYMD(item.comment.time) }}
                </div>
                <div class="content">
                  评论:
                  <span
                    :class="
                      item.comment.content.indexOf('@') == 0 ? 'is-art' : ''
                    "
                    >{{ item.comment.content }}</span
                  >
                </div>
                <div class="be-replied-box">
                  <img
                    :src="item.resource.creator.avatarUrl + '?param=40y40'"
                    alt=""
                  />
                  <div class="be-replied-content">
                    <div class="type">歌单</div>
                    <div class="name">{{ item.resource.name }}</div>
                    <div class="creator-name">
                      by{{ item.resource.creator.nickname }}
                    </div>
                  </div>
                </div>
                <div class="reply-btn">
                  <span class="reply-btn-content"
                    ><i class="el-icon-chat-line-square"></i>回复</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="notice" v-show="currentNav == 3">
            <div
              class="notice-card"
              v-for="(item, index) in noticeInfo"
              :key="index"
            >
              <img
                :src="item.user.avatarUrl + '?param=40y40'"
                alt=""
                @click="clickToUserDetail(item.user.userId)"
              />
              <div class="text" @click="clickToCommentDetail()">
                <div class="name">
                  {{ item.user.nickname }}
                  <span style="color: black"> 赞了你的评论</span>
                </div>
                <div class="time">{{ getYMD(item.comment.time) }}</div>
                <div class="new-notice">
                  {{ item.comment.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- inner的具体聊天室 -->
        <el-drawer
          size="365px"
          :append-to-body="true"
          :visible="innerDrawer"
          :show-close="false"
          :wrapperClosable="false"
          @open="handleInnerOpen"
          @opened="handleInnerOpened"
          @close="handleInnerClose"
          :withHeader="false"
        >
          <div class="inner-popover">
            <i class="el-icon-arrow-left" @click="handleOutInneerPopover"></i>
            <div class="name">{{ toUserInfo && toUserInfo.name }}</div>
            <div
              class="content"
              v-show="!beforMsgs.length == 0 || !newMsgs.length == 0"
              ref="innerConent"
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
                      :src="toUserInfo.cover + '?param=40y40'"
                      alt=""
                      v-show="toUserInfo.uId == item.uid"
                    />
                    <div
                      :class="
                        toUserInfo.uId === item.uid ? 'text' : 'text green-Bg'
                      "
                    >
                      {{ JSON.parse(item.msg).msg }}
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
                      :src="toUserInfo.cover + '?param=40y40'"
                      alt=""
                      v-show="toUserInfo.uId == item.uid"
                    />
                    <div
                      :class="
                        toUserInfo.uId === item.uid ? 'text' : 'text green-Bg'
                      "
                    >
                      {{ JSON.parse(item.msg).msg }}
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
            <el-popover
              placement="bottom"
              width="200"
              trigger="click"
              content="不能发送空白信息"
              :disabled="isShowEmptyTips"
            >
              <el-button
                type="primary"
                round
                @click="sendMsgs"
                @change="sendMsgs"
                class="send-button"
                slot="reference"
                >发送</el-button
              >
            </el-popover>
          </div>
        </el-drawer>
      </div>
    </el-drawer>
    <!-- 登录框-->
    <Login v-if="isShowLoginDialog"></Login>
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
  getMsgComments,
  getMsgToMe,
  getMsgNotices,
} from "@/network/api";
import { getYMD, getYestaryToday, set60Min } from "@/utils/uctil";
import Search from "./search/search.vue";
import { mapGetters } from "vuex";
import Login from "@/views/login/index.vue";
export default {
  components: { Search, Login },
  name: "Header",
  data() {
    return {
      //热搜榜的数据
      HotSearchDetail: [],
      //搜索建议结果的数据
      SearchDetail: {},
      tabItem: ["私信", "评论", "@我", "通知"],
      privateInfo: [],
      noticeInfo: [],
      commentInfo: [],
      artMeInfo: [],
      unReadPrivate: 0,
      currentNav: 0,
      beforMsgs: [],
      newMsgs: [],
      text: "",
      //刷新消息的定时器
      msgInterval: null,
      userPWD: null,
      userPhoneNumber: null,
      isShowEmptyTips: false,
      //主题颜色
      themeStyle: {
        0: "#242427",
        1: "#EC4141",
        2: "#67BFFD",
        3: "#54C77B",
        4: "#FAA4C6",
        5: "#F8CF7F",
      },
    };
  },
  methods: {
    //转化时间
    formatTime60orYMD(timestamp) {
      return new Date() - timestamp < 3600000
        ? set60Min(timestamp)
        : getYMD(timestamp);
    },
    //跳转到用户个人页面
    clickToUserDetail(uId) {
      console.log(111);
      this.$router.push("/userdetail/" + uId);
    },
    //这一个点击通知 跳转到对应的歌单的 评论详情页 以后做
    clickToCommentDetail() {},
    handleChangeNav(index) {
      this.currentNav = index;
      //接口请求
      index == 0 && this.token && this.getNotices();
      index == 1 && this.token && this.getMsgCommentsInfo();
      index == 2 && this.token && this.getMsgToMeInfo();
      index == 3 && this.token && this.getMsgNoticesInfo();
    },
    reloadProgrom() {
      location.reload();
    },
    showLoginDialog() {
      this.$store.commit("SET_LOGIN_DIALOG", true);
    },
    async handleOutLoginFun() {
      //清除localStorage sessionStorage
      localStorage.removeItem("currentUserInfo");
      this.$router.push("/");
      this.$store.dispatch("LogOut");
      await outRefresh();
    },
    handleChangeThemeStyle(index) {
      document
        .getElementsByTagName("body")[0]
        .style.setProperty("--theme", this.themeStyle[index]);
    },
    back() {
      history.back();
    },
    go() {
      history.go(1);
    },
    async handleChangeSearch(searchValues) {
      //搜索keyword为空的时候，搜索会报错
      if (searchValues) {
        const SearchSuggest = await getSearchSuggest(searchValues);
        this.SearchDetail = SearchSuggest.data.result;
      }
    },
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
      this.unReadPrivate = data.newMsgCount;
      //可以做一个timeinterval刷新数据 有新数据就出现红点 并刷新最新一条数据信息 ⭐⭐⭐
    },
    //点击具体消息进去对应的私聊
    clickToInnerDrawer(uId, name, cover) {
      this.$store.commit("SET_TO_USER_INFO", { uId, name, cover });
      this.getPrivateMsg(uId);
      this.$store.commit("setShowMsgInnerDarwer");
    },
    //drawer的回调事件
    handleOpen() {
      this.token && this.getNotices();
    },
    handleClose() {
      this.$store.commit("setShowMsgDarwer");
    },
    //这里需要修改 换一种方式刷新数据
    handleInnerOpen() {
      this.getPrivateMsg(this.toUserInfo.uId);
      //计时器定时更新数据
      this.msgInterval = setInterval(() => {
        this.getPrivateMsg(this.toUserInfo.uId);
      }, 5000);
    },
    handleInnerOpened() {
      //下拉最下面
      this.$refs.innerConent.scrollTop = this.$refs.innerConent.scrollHeight;
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
      // console.log(data);
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
      this.$refs.innerConent.scrollTop = this.$refs.innerConent.scrollHeight;
    },

    //退出innnerPopover
    handleOutInneerPopover() {
      this.$store.commit("setShowMsgInnerDarwer");
      //清除聊天数据
      this.beforMsgs = [];
      this.newMsgs = [];
      this.$store.commit("SET_TO_USER_INFO", {});
      // this.toUserInfo = {};
      window.clearInterval(this.msgInterval);
    },

    //处理发送消息事件
    async sendMsgs() {
      //判断 发送空
      if (this.text) {
        this.isShowEmptyTips = true;
      } else {
        this.isShowEmptyTips = false;
        return;
      }

      //数据返回的是刚刚发送过去的消息
      const { data } = await SendText(this.toUserInfo.uId, this.text);
      this.newMsgs.push({
        msg: data.newMsgs[0].msg,
        uid: data.newMsgs[0].fromUser.userId,
        time: data.newMsgs[0].time,
      });
      this.text = "";
      this.$refs.innerConent.scrollTop = this.$refs.innerConent.scrollHeight;
    },

    async getMsgNoticesInfo() {
      const { data } = await getMsgNotices();
      this.noticeInfo = data.notices.map(({ notice }) => {
        return JSON.parse(notice);
      });
    },

    async getMsgToMeInfo() {
      const { data } = await getMsgToMe();
      this.artMeInfo = data.forwards.map(({ json }) => {
        return JSON.parse(json);
      });
    },

    async getMsgCommentsInfo() {
      const { data } = await getMsgComments(this.currentUserInfo.userId);
      this.commentInfo = data.comments;
    },
  },

  async created() {
    const { data } = await getHotSearchDetail();
    this.HotSearchDetail = data.data;
    if (this.token) {
      this.getMsgToMeInfo();
      this.getMsgCommentsInfo();
      this.getMsgNoticesInfo();
    }
  },
  computed: {
    ...mapGetters({
      drawer: "isShowMsgDrawer",
      innerDrawer: "isShowInnerMsgDrawer",
      currentUserInfo: "userinfo",
    }),
    // toUserInfo 私信对象信息
    ...mapGetters(["isShowLoginDialog", "toUserInfo", "token"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/theme.scss";
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
        padding-left: 30px;
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
          &:hover {
            transform: rotate(666turn);
            transition-delay: 0.1s;
            transition-property: all;
            transition-duration: 59s;
            transition-timing-function: cubic-bezier(0.34, 0, 0.84, 1);
          }
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
        position: relative;
        .badge {
          position: absolute;
          top: -10px;
          right: 0;
          padding: 1px 5px;
          background-color: red;
          color: white;
          height: 20px;
          border-radius: 90%;
          line-height: 20px;
          border: 1px solid white;
          min-width: 13px;
        }
      }
      .active {
        background-color: $nav-grey;
        color: white;
      }
    }
    .content {
      .private,
      .notice {
        .notice-card {
          display: flex;
          font-size: 12px;
          padding-top: 10px;
          padding-left: 10px;
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
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
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
          &:hover {
            background-color: rgb(233, 233, 233);
            border-radius: 5px;
          }
          &:before {
            content: "";
            padding-right: 5px;
            width: 15px;
          }
        }
        .un-read {
          &:before {
            width: 15px;
            content: "·";
            font-size: 60px;
            color: red;
            line-height: 35px;
            padding-right: 5px;
          }
        }
      }
      .comment {
        .comment-card {
          display: flex;
          font-size: 12px;
          padding-top: 10px;
          padding-left: 15px;
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
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .time {
              font-size: 9px;
              color: rgb(233, 233, 233);
              width: 40%;
            }
            .content {
              width: 100%;
              padding: 10px 0;
            }
            .is-art {
              color: #0070c0;
              &:hover {
                color: #0063aa;
              }
            }
            .be-replied-content {
              width: 100%;
              background-color: $bg-grey;
              padding: 10px;
              border-radius: 5px;
            }
            .reply-btn {
              width: 100%;
              padding: 20px 0;
              .reply-btn-content {
                float: right;
              }
            }
          }
        }
      }
      .artMe {
        .artMe-card {
          display: flex;
          font-size: 12px;
          padding-top: 10px;
          padding-left: 15px;
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
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .time {
              font-size: 9px;
              color: rgb(233, 233, 233);
              width: 40%;
            }
            .content {
              width: 100%;
              padding: 10px 0;
              .is-art {
                color: #0070c0;
                &:hover {
                  color: #0063aa;
                }
              }
            }
            .be-replied-box {
              width: 100%;
              background-color: $bg-grey;
              padding: 10px;
              border-radius: 5px;
              display: flex;
              flex-wrap: wrap;
              img {
                border-radius: 0%;
                width: 40px;
                height: 40px;
                vertical-align: middle;
              }
              .be-replied-content {
                margin-left: 20px;
                .name {
                  color: black;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  display: inline-block;
                  margin-left: 5px;
                }
                .type {
                  width: 25px;
                  border: 1px solid red;
                  color: red;
                  padding: 3px;
                  display: inline-block;
                }
                .creator-name {
                  color: gray;
                  margin-top: 5px;
                }
              }
            }
            .reply-btn {
              width: 100%;
              padding: 20px 0;
              .reply-btn-content {
                float: right;
              }
            }
          }
        }
      }
    }
  }
}
.inner-popover {
  font-size: 15px;
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
    height: 85vh;
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
            margin-left: 10px;
            border-radius: 10px;
            background-color: rgba(243, 243, 243, 0.415);
            padding: 12px 18px;
            vertical-align: middle;
          }
          //微信背景颜色
          .green-Bg {
            background-color: #43f943c7;
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
  .send-button {
    margin-top: 5px;
    float: right;
  }
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

// 不明白之前为什么写   穿透了
// 因为是在同一个header 包含了 login 的 el-input
// ::v-deep {
//   .el-input {
//     position: absolute;
//     .el-input__inner {
//       margin-left: 15px;
//       width: 90%;
//     }
//   }
// }
</style>
