import axios from "axios";
import { Message } from "element-ui";

const commonOptions = {
  // version: process.env.VUE_APP_VERSION,
  // deviceModel: phone.model,
  timestamp: new Date().getTime(),
  // uuid: phone.deviceId,
  // connection: "",
  // location: "",
};

export function request(config) {
  const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
    //解决了跨域问题 这个设置网站可以带cookie请求
    withCredentials: true, //关键
  });
  //请求 拦截
  instance.interceptors.request.use(
    (config) => {
      //网易云防止被缓存 全部添加时间错请求
      config.params = Object.assign(config.params || {}, commonOptions, {
        //   token: getTOKEN(),
      });
      // config.data = Object.assign(config.data || {}, commonOptions, {
      //   //   token: getTOKEN(),
      // });
      // console.log(config);
      // config.headers.Authorization = getTOKEN();
      // Do something before request is sent
      //   if (store.getters.token) {
      //     config.header.Authorization = store.getters.token
      // }
      // if (config.method === "post" || config.method === "get") {
      //   if (!config.ContentType) {
      //     config.data = qs.stringify(config.data);
      //   }

      if (config.ContentType === "multipart/form-data") {
        // 上传文件
        // const param = new FormData();
        // for (const item in config.data) {
        //   param.append(item, config.data[item]);
        // }
        // config.data = param;
        config.headers["Content-Type"] = "multipart/form-data";
      }
      // console.log(config);
      // }
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  //响应 拦截
  instance.interceptors.response.use(
    (res) => {
      // 2xx 范围内的状态码都会触发该函数。
      // console.log("拦截器", res);
      //这里不要设置总的提示 因为会拦截全部的 有一些没必要拦截
      // console.log("拦截器", res);
      // if (res.status) {
      //   Message.success(`提示信息：${res}`);
      // }
      return res;
    },
    (err) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      //返回的数据里面 没有可以识别的状态码 不在这里同一弹出按提示
      // console.log(err.response);
      //暂时未解决
      if (err.response.status) {
        Message(`提示信息：${err.response.data.message}`);
      }
    }
  );
  return instance(config);
}
