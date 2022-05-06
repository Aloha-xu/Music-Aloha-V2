import { loginByPhone } from "@/network/login";

const user = {
  state: {
    token: localStorage.getItem("token") || "",
    userinfo: JSON.parse(sessionStorage.getItem("currentUserInfo")) || "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage.setItem("token", token);
      state.token = token;
    },
    SET_USER_INFO: (state, info) => {
      window.sessionStorage.setItem("currentUserInfo", JSON.stringify(info));
      state.userinfo = info;
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
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登出
    LogOut({ commit, state }) {
      console.log(state);
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
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
