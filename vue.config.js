
//引入该插件
const CompressionWebpackPlugin = require("compression-webpack-plugin")
//匹配此 {RegExp} 的资源
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
    configureWebpack: config => {
        const plugins = []
        // start 生成 gzip 压缩文件
        plugins.push(
            new CompressionWebpackPlugin({
                filename: "[path].gz[query]", //目标资源名称
                algorithm: "gzip",
                test: productionGzipExtensions, //处理所有匹配此 {RegExp} 的资源
                threshold: 10240,//只处理比这个值大的资源。按字节计算(楼主设置10K以上进行压缩)
                minRatio: 0.8 //只有压缩率比这个值小的资源才会被处理
            })
        );

        // End 生成 gzip 压缩文件
        config.plugins = [...config.plugins, ...plugins];
    },
    productionSourceMap: false,
}