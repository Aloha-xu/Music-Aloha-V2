import { request } from "./request";
// import qs from "qs";

//密码登录
export function loginByPhone(data) {
  return request({
    url: "/login/cellphone",
    method: "POST",
    data,
  });
}

export function getStatus() {
  return request({
    url: "/login/status",
  });
}

//获取二维码的key
export function getQRKey(data) {
  return request({
    url: "/login/qr/key",
    data,
  });
}

//获取二维码的图片
export function getQRPicture(data) {
  return request({
    url: `/login/qr/create?qrimg=true&key=` + data,
  });
}

// 由于这个网易云请求get参数好像是需要放在请求头上面，就是和url拼接在一起，所以就不可以直接data，需要params:data
//检查二维码登录状态
export function getQRPState(data) {
  return request({
    url: `/login/qr/check`,
    params: data,
  });
}

//发送验证码
export function sentCaptcha(data) {
  return request({
    url: "/captcha/sent",
    params: data,
  });
}

//验证验证码
export function checkCaptcha(data) {
  return request({
    url: "/captcha/verify",
    params: data,
  });
}

// //检查二维码登录状态
// export function getQRPState(data) {
//   return request({
//     url: `/login/qr/check`,
//     params: {
//       key: data,
//       timestamp: new Date().getTime(),
//     },
//   });
// }
// //检查二维码登录状态
// export function getQRPState(data) {
//   return request({
//     url: `/login/qr/check?key=${data}&timestamp=${new Date().getTime()}`,
//     data,
//   });
// }

/**
 * 
 * 3. 二维码登录
说明: 二维码登录涉及到 3 个接口,调用务必带上时间戳,防止缓存

1. 二维码 key 生成接口
说明: 调用此接口可生成一个 key

接口地址 : /login/qr/key

2. 二维码生成接口
说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码

必选参数: key,由第一个接口生成

可选参数: qrimg 传入后会额外返回二维码图片 base64 编码

接口地址 : /login/qr/create

调用例子 : /login/qr/create?key=xxx

3. 二维码检测扫码状态接口
说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)

必选参数: key,由第一个接口生成

接口地址 : /login/qr/check

调用例子 : /login/qr/check?key=xxx

调用可参考项目文件例子/public/qrlogin.html (访问地址:http://localhost:3000/qrlogin.html)
 * 
 * 
 */
