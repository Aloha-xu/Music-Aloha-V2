const path = require("path");

//引入该插件
const CompressionWebpackPlugin = require("compression-webpack-plugin");
//匹配此 {RegExp} 的资源
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

module.exports = {
  configureWebpack: (config) => {
    //使用@省略../../
    Object.assign(config, {
      resolve: {
        extensions: [".js", ".vue", ".json", ".scss"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    });

    // start 生成 gzip 压缩文件
    const plugins = [];
    plugins.push(
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]", //目标资源名称
        algorithm: "gzip",
        test: productionGzipExtensions, //处理所有匹配此 {RegExp} 的资源
        threshold: 10240, //只处理比这个值大的资源。按字节计算(楼主设置10K以上进行压缩)
        minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
      })
    );

    // End 生成 gzip 压缩文件
    config.plugins = [...config.plugins, ...plugins];
  },

  productionSourceMap: false,

  devServer: {
    //配置关闭eslintt检查
    overlay: {
      warnings: false, //不显示警告
      errors: false, //不显示错误
    },
    // proxy: {
    //   "/": {
    //     label: "服务器",
    //     target: "http://114.132.239.118:3000",
    //     changeOrigin: true, //是否允许跨越
    //     pathRewrite: {
    //       "^/": "", //重写,
    //     },
    //   },
    // },
  },
  lintOnSave: false, //关闭eslint检查
};
