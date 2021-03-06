/*
 * @Description: axios 配置
 * @Author: PengYH
 * @Date: 2019-10-25
 */
import axios from 'axios'
import baseUrl from './baseUrl'
import { Message } from "element-ui"
import store from './../../store/index'

import router from './../../router/index'
/**创建axios */
let service = axios.create({
    baseURL: baseUrl
    // timeout: 5000
})

/**request 请求拦截器 */
service.interceptors.request.use(config => {
    config.headers["ContentType"] = "application/x-www-form-urlencoded";
    let token = sessionStorage.getItem("login.token") || "";
    if (token != "")
        config.headers["LoginToken"] = token;

    config.headers['Cache-Control'] = 'no-cache';
    config.headers['Pragma'] = 'no-cache';

    return config;
}, error => {
    return Promise.reject(error);
})

/**response 响应拦截器 */
service.interceptors.response.use(response => {
    return Promise.resolve(response.data);
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400: Message.error("错误请求"); break;
            case 401: {
                Message.error("未授权，请重新登录");
                store.commit("lock", false);
                router.push("/login");
            } break;
            case 403: Message.error("拒绝访问"); break;
            case 404: Message.error("请求错误,未找到该资源"); break;
            case 405: Message.error("请求方法未允许"); break;
            case 408: Message.error("请求超时"); break;
            case 500: Message.error("服务器端出错"); break;
            case 501: Message.error("网络未实现"); break;
            case 502: Message.error("网络错误"); break;
            case 503: Message.error("服务不可用"); break;
            case 504: Message.error("网络超时"); break;
            case 505: Message.error("http版本不支持该请求"); break;
            default: Message.error(`连接错误${err.response.status}`);
        }
    } else {
        Message.error("连接到服务器失败");
    }
    return Promise.reject(err);
})
export default service;