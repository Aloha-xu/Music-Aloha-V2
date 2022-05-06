import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "http://114.132.239.118:3000",
    timeout: 5000,
    //解决了跨域问题 这个设置网站可以带cookie请求
    withCredentials: true, //关键
  });
  instance.interceptors.request.use(
    (config) => {
      console.log(config);
      return config;
    },
    (err) => {
      console.log(err);
    }
  );
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
    }
  );
  return instance(config);
}
