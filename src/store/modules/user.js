import { loginByPhone, checkCaptcha } from "@/network/login";
import { clearAllCookie } from "@/utils/uctil.js";
// import { Message } from "element-ui";

const user = {
  state: {
    //标识 是否已经登录
    token: localStorage.getItem("token") || "",
    userinfo: JSON.parse(localStorage.getItem("currentUserInfo")) || "",
    isShowLoginDialog: false,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage.setItem("token", token);
      state.token = token;
    },
    SET_USER_INFO: (state, info) => {
      localStorage.setItem("currentUserInfo", JSON.stringify(info));
      state.userinfo = info;
    },
    SET_LOGIN_DIALOG: (state, val) => {
      state.isShowLoginDialog = val;
    },
  },

  actions: {
    // 用户名登录
    loginByPhone({ commit }, userInfo) {
      // const params = {
      //   phone: userInfo.phone.trim(),
      //   md5_password: md5(userInfo.password),
      // };
      return new Promise((resolve, reject) => {
        loginByPhone(userInfo)
          .then((response) => {
            resolve(response);
            console.log(response);
            const token = response.data.token || "";
            const userinfo = response.data.profile || "";
            commit("SET_TOKEN", token);
            commit("SET_USER_INFO", userinfo);
            commit("SET_LOGIN_DIALOG", false);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 免密登录
    loginByCaptcha({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        //验证验证码和手机正确性
        checkCaptcha({ phone: userInfo.phone, captcha: userInfo.captcha })
          .then((response1) => {
            loginByPhone(userInfo)
              .then((response) => {
                resolve(response);
                // console.log(response);
                const token = response.data.token || "";
                const userinfo = response.data.profile || "";
                commit("SET_TOKEN", token);
                commit("SET_USER_INFO", userinfo);
                commit("SET_LOGIN_DIALOG", false);
              })
              .catch((error) => {
                reject(error);
              });
            resolve(response1);
          })
          .catch((error1) => {
            reject(error1);
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        commit("SET_USER_INFO", "");
        clearAllCookie();
        location.reload();
        resolve();
      });
    },
    // 登录过期
    expired({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        resolve();
      });
    },
  },
};

export default user;
