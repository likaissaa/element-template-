/*
 * @Description:定义element table中的方法
 * @Author: PengYH
 * @Date: 2019-11-11
 */


//方法名
const methodNames = ["clearSelection", "toggleRowSelection", "toggleAllSelection", "toggleRowExpansion", "setCurrentRow", "clearSort", "clearFilter", "doLayout", "sort"]
const methods = {}
methodNames.forEach(methodName => {
    methods[methodName] = function (...args) {
        const table = this.$refs.ref_table
        if (table && table[methodName]) {
            table[methodName](...args)
        }
    }
})
export default { methods }