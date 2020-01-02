/*
 * @Description:http请求封装 
 * @Author: PengYH
 * @Date: 2019-10-25
 */
import service from './service'
import Qs from 'qs'

/**
 *  get 请求
 * @param {*} url 请求地址 
 * @param {*} data  请求参数
 */
export function httpGet(url, data) {
    return service.get(url, {
        params: data
    });
}


/**
 * post请求
 * @param {*} url 请求地址 
 * @param {*} data  请求参数
 */
export function httpPost(url, data) {
    return service.post(url, Qs.stringify(data));
}