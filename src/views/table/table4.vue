<!--
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-08-19
 -->

<template>
  <div class="index">
    <h1>带状态表格</h1>
    <br />
    <p>可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。</p>
    <br />
    <p>可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。</p>
    <br />
    <el-extend-table
      border
      rowNumber
      multiple
      :row-class-name="tableRowClassName"
      :columns="columns"
      :data="store.data"
      ref="ref_table"
    ></el-extend-table>
  </div>
</template>

<script>
export default {
  name: "table4",
  data() {
    return {
      columns: [],
      store: {
        data: []
      }
    };
  },
  created() {
    this.columns = [
      {
        dataIndex: "state",
        text: "状态",
        sortable: true
      },
      {
        dataIndex: "date",
        text: "日期",
        sortable: true
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
    setTimeout(() => {
      this.store.data = [
        {
          state: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          state: 0,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          state: 1,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          state: 1,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ];
    });
  },
  methods: {
    tableRowClassName(row) {
      if (row.rowIndex === 1) {
        return "warning-row";
      } else if (row.rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  }
};
</script>

<style lang="scss" >
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>