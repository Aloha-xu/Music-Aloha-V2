ed

重构 store -- 初步重构完成 一些命名规范 还没有修改

登陆相关的 -- 二维码的登录之后 cookie 无法自动的设置上去 先不管把 ，上线了之后还这样再看看问题  
            --  现在 二维码 请求接口有问题了

问题：

watch 监听 computed？？？  其实不会用watch去监听computed 因为他们两个都是通过某一个他们依赖的属性的值修改了 ，那么他们就会执行编码人员预先先定好的对应代码， 
computed可以缓存 同步的 依赖多个
watch 就一个 不缓存 可处理异步 

## 注意

// 由于这个网易云请求 get 参数好像是需要放在请求头上面，就是和 url 拼接在一起，所以就不可以直接 data，需要 params:data

// 登录 可以抽离出来 写在 Vuex 的 user 模块里面

// 心得 一些用户的信息 一些公共的信息 登录信息 登陆之后才能获取到的信息
一些其他页面需要用的公共信息 可以放到 vuex 里面管理

userinfo 个人的歌单信息（创建歌单、收藏歌单） 播放信息 聊天信息

init event 周期函数？ 初始化了哪一些事件呢？ lifecycle 又是哪一些？
init event lifecycle 就是初始化一些参数

befor create

响应式 data
init 注入 data props = 赋值

created

befor mount

mounted

befor update

updated

befor des

desed