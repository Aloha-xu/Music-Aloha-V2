import Vue from "vue";
import App from "./App.vue";
import AppToModile from "./AppToModile.vue";
import router from "./router";
//element组件
import "./plugins/element.js";
//样式
import "./assets/css/base.css";
import "./assets/css/common.css";
import "./assets/css/index.scss";
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

//这个识别pc还是移动端就只可以一开始newVue实例的时候触发才有效
new Vue({
  render: (h) => h(IsPc() ? App : AppToModile),
  router,
  store,
}).$mount("#app");
