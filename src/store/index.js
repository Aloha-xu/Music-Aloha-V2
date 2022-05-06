import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import player from "./modules/player.js";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  //模块化
  modules: {
    user,
    player,
  },
  //可以用getters作为统一的一个出口
  getters,
});

export default store;
