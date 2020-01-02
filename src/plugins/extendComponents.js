/*
 * @Description: 组件申明
 * @Author: 彭应浩
 * @Date: 2019-12-16
 */
import Vue from 'vue'
import table from './../components/Controls/Table/Table'
const extendComponent = {
    install: function (Vue) {
        Vue.component('elExtendTable', table)
    }
}
Vue.use(extendComponent)