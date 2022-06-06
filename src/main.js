import Vue from "vue";
import App from "./App.vue";
import AppToModile from "./AppToModile.vue";
import router from "./router";
//element组件
import "./plugins/element.js";
//基本样式
import "./assets/css/base.scss";
import store from "./store";
import { IsPc } from "./utils/uctil.js";

/**
 * 全局注册组件
 */
//baseImage 图片组件
import BaseImage from "./components/common/BaseImage.vue";
Vue.component("BaseImage", BaseImage);

/**
 * 全局安装插件
 */
//拖拽
import VueCropper from "vue-cropper";
Vue.use(VueCropper);
//右击菜单
import Contextmenu from "vue-contextmenujs";
Vue.use(Contextmenu);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(IsPc() ? App : AppToModile),
  router,
  store,
}).$mount("#app");
