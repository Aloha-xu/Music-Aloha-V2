AlohaMusic 音乐播放平台

## v2 版

## 命名规范

之前的命名规范就不修改了（以后有时间再修改吧） v2 之后就使用以下命名规范

## 文件夹的命名

都用小写 、单词之间用-分隔

# .vue 的文件后缀命名

大驼峰

# 组件文件(components)下的.vue 文件命名

大驼峰

```
components/
|- MyComponent.vue
```

# 组件文件(components)下的基础组件名

**也就是展示类的、无逻辑的或无状态的组件**

以一个特定的前缀开头 eg：Base、App、V....

大驼峰

```
components/
|- BaseButton.vue

```

# vue 文件里面的 name 命名规则

大驼峰

```
export default {
  name: 'TodoItem',
  // ...
}
```

# vue 文件里面的 data、props 命名规则

小驼峰

```
export default {
 data() {
    return {
      tabName: '123',
      }
    }
  },
  //......
}


props: {
  greetingText: String
}
<WelcomeMessage greeting-text="hi"/>
```

# class 命名规范

BEM 命名规范

-就是用来连接单词与单词之间 left-content

--用来对 css 的描述/修饰符 --boy --red

\_ _就是用来分模块的 nav _ _ body 、nav _ \_ foot

可以提取一些公共的样式

```css
.ml_10 {
  margin-left: 10px;
}
```

## 介绍

这是一个仿网易云音乐的音乐播放平台。

## 技术栈

Vue 2 + Vue Router + Vuex + Axios + ElementUI + SCSS 后端接口网易云官方 API 接口

图片懒加载 路由懒加载 webpack 分割打包

## 完成的功能

- [x] 推荐歌单
- [x] 歌单详情页、歌手详情页
- [x] 排行榜
- [x] 歌手
- [x] 评论
- [x] 下载音乐
- [x] 播放音乐
- [x] 随机、顺序、歌单、单曲播放
- [x] 详情播放器页面
- [x] MV、视频（需登录）
- [x] 私人 FM
- [x] 最近播放
- [x] 歌单收藏
- [x] 创建歌单
- [x] 搜索
- [x] 消息回复
- [x] 新增 歌词 拖拽
- [x] 新增 拖拽 修改 歌单顺序 歌曲顺序
- [x] 新增 右击歌曲出现菜单
- [x] 新增 个性推荐
- [x] 新增 回到顶部按钮

## 优化

- 优化了首屏的加载时间 图片请求回来的大小 js 包的大小
-

## 效果图

图片看不了到 Readme 文件夹可以看得到
![在这里插入图片描述](https://img-blog.csdnimg.cn/79894413a64f47f794b061b92333c7cb.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/300682e8625348ccb3d1c32cfd4ba325.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/cae7e9e64a1f4a8a81e51b426200d914.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/84e7787d344e410096cad1ac373201f5.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/56e1dfc5a89344a7b05db1c05a1c1ca2.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/4c312a6c4d0b4cf2b2c03c54b28cd447.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/a24ca1b7fcd640c3b44fa76b513f534b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/1553b968827b4e6db32db238e670d79b.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/649d17d5ae91459799e5cad1a5b54220.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/ba5b9da005364cba8d10f2fb211e0bc1.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/c16fb10b9a124102866234d0762de466.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/7df33e456cdd447a83766b0e460f2f61.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAYWxwaGFfeHVfdnZ2dnY=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

## 如何跑起来？

下载依赖包

npm install

本地跑起来

npm run serve

上传代码命令
git add .
git commit -m 'init'
git push

## 最后

后端使用了网易云的 API 接口。

该项目暂时不会更新了，欢迎大佬点出错误，或者可优化的地方。

欢迎留言一起学习。

如有问题可联系 QQ：598392491

觉得这个项目对你有帮助可以给一个星星 ⭐⭐

个人博客：http://alohaxuuuu.fun/
