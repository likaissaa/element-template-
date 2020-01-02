<!--
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-08-19
 -->
<template>
  <div class="index">
    <el-extend-table
      border
      rowNumber
      multiple
      :columns="columns"
      :data="store.data"
      ref="ref_table"
      @selection-change="handleSelectionChange"
    ></el-extend-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([store.data[1], store.data[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
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
  created() {
    this.columns = [
      {
        dataIndex: "state",
        text: "状态"
      },
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.ref_table.toggleRowSelection(row);
        });
      } else {
        this.$refs.ref_table.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>