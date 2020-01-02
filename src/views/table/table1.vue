<!--
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-08-19
 -->

<template>
  <div class="index">
    {{random}}
    <br />
    <br />
    <h1>基础表格</h1>
    <br />
    <p>基础的表格展示用法。</p>
    <br />
    <el-extend-table border rowNumber :columns="columns" :data="store.data" ref="ref_table"></el-extend-table>
  </div>
</template>

<script>
export default {
  name: "table2",
  data() {
    return {
      columns: [],
      store: {
        data: []
      }
    };
  },
  computed: {
    random() {
      return Math.random();
    }
  },
  created() {
    this.columns = [
      {
        dataIndex: "date",
        text: "日期",
        sortable: true //禁用排序
      },
      {
        dataIndex: "name",
        text: "姓名"
      },
      {
        dataIndex: "address",
        text: "地址"
      }
    ];
    for (let i = 0; i < 30; i++) {
      this.store.data.push({
        state: i % 2 == 1 ? 0 : 1,
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      });
    }
  }
};
</script>