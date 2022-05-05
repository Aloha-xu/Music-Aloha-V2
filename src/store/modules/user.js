import { loginByPhone } from "@/network/login";

const user = {
  state: {
    token: localStorage.getItem("token") || "",
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage.setItem("token", token);
      state.token = token;
    },
  },

  actions: {
    // 用户名登录
    loginByPhone({ commit }, userInfo) {
      const params = {
        name: userInfo.name.trim(),
        password: userInfo.password,
      };
      return new Promise((resolve, reject) => {
        loginByPhone(params)
          .then((response) => {
            resolve(response);
            const token = response.retBody.token;
            commit("SET_TOKEN", token);
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
