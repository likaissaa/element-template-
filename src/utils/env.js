/*
 * @Description: http请求 环境配置
 * @Author: PengYH
 * @Date: 2019-11-07
 */
let baseUrl = "";/**请求地址 */
switch (process.env.NODE_ENV) {
    case 'development':
        baseUrl = `http://www.cqxygs.cn:5000`; //开发环境
        break
    case 'test':
        baseUrl = `http://www.cqxygs.cn:5000`; //测试环境
        break
    case 'production':
        baseUrl = `http://www.cqxygs.cn:5000`; //正式环境
        break
}
export default baseUrl;