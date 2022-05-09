会加入一些新功能

可能会重构吧？
css 命名规范

ing

修复之前没修复的 bug

时间 与 歌词 同步

[00:00.000] 作词 : Kina/Adriana Proenza
[00:01.000] 作曲 : Kina/Adriana Proenza
[00:09.230]I try to reach you
[00:12.420]I can't hide how strong's the feeling when we dive
[00:18.000]I cross the ocean of my mind
[00:22.580]Our wounds are healing with the salt
[00:26.810]All my senses intensify whenever you and I
[00:34.380]We dive across the ocean of my mind
[00:39.530]But in the end I drown
[00:41.780]You push me down,down
[01:44.820]All the shame
[01:52.690]When you called my name
[02:01.930]I felt pain
[02:10.980]When you came

480 \* 350
前面 5 句歌词 不动
一行 56 ling height

暂时没有 bug

歌词弹出框 站定在 minplayer 上面显示吧 设置 zindex 这个暂定吧 还没确定放在哪

ed

重构 store -- 初步重构完成 一些命名规范 还没有修改

登陆相关的 -- 二维码的登录之后 cookie 无法自动的设置上去 先不管把 ，上线了之后还这样再看看问题

问题：
data 里面使用 store 获取数据 如果写在了 computer 那个先后顺序是怎样的？？？？ user updata type popover .vue

watch 监听 computer？？？

## 注意

// 由于这个网易云请求 get 参数好像是需要放在请求头上面，就是和 url 拼接在一起，所以就不可以直接 data，需要 params:data

// 登录 可以抽离出来 写在 Vuex 的 user 模块里面

//
