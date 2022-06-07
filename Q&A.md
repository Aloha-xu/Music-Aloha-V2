Q:assets 里面的 base。scss，放到 assets 里面就会被认为是静态文件，mainjs 里面引用 也是引用一次吧？vue 文件里面引用 basecss 呢? 他会打包多次？还是？
A:https://juejin.cn/post/6844904182525198344#heading-0

Q:在使用 element 组件的时候，有时候组件是没有写默认样式的，例如 el-image 这个 class 是没有样式的 ，在使用 el-image 又需要里面的组件继承父组件的长宽的话就需要自己设置 width：100% height：100%

Q:CSS hover 更改其他元素属性
A:https://www.devsong.org/article/73.html
hover 后面添加需要的属性

Q 如果 vue 里面 style 写样式 都引入 index.scss 会有什么影响？？
A 他会打包成一个独立包 每一个包都会有 ，其实到最后也是到 html css js 所以 如果用到了 scss 这样的高级样式格式，就需要按需引入了，不要都引入全部

Q CSS 如何隐藏滚动条，但不影响内容滚动, 就是还可以继续滚动
A 使用 padding-left 从左往右顶滚动条的大小就可以了 eg 私人 fm
