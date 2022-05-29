import Vue from "vue";
import App from "./App.vue";
import AppToModile from "./AppToModile.vue";
import router from "./router";
import "./plugins/element.js";
import "./assets/css/base.scss";
import store from "./store";
import { IsPc } from './utils/uctil.js'

import VueCropper from "vue-cropper";
Vue.use(VueCropper);
import Contextmenu from "vue-contextmenujs"
Vue.use(Contextmenu);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(IsPc() ? App : AppToModile),
  router,
  store,
}).$mount("#app");
