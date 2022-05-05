import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user.js";
import player from "./modules/player.js";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    player,
  },
  getters,
});

export default store;
