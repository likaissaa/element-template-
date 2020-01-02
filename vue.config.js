/*
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-12-16
 */
module.exports = {
    // devServer: {
    //     port: 10010
    // },
    //根域上下文目录 
    publicPath: './',
    //构建输出目录
    outputDir: 'website',
    //静态资源目录 (js, css, img, fonts)
    assetsDir: 'assets',
    //是否开启eslint保存检测，有效值：ture | false | 'error' */
    lintOnSave: false,
    //是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    productionSourceMap: false
}