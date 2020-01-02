<!--
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-08-19
 -->

<template>
  <div class="index">
    <el-extend-table border rowNumber multiple :columns="columns" :store="store" ref="ref_table"></el-extend-table>
    <br />
    <el-button @click="test" type="primary">测试</el-button>
    <br />
    <br />
    <el-table :data="store.data" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "test1-2",
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
        render: (h, params) => {
          return h(
            "el-tag",
            {
              props: {
                type: params.row.state == 1 ? "success" : "danger"
              }
            },
            params.row.state == 1 ? "启用" : "禁用"
          );
        }
      },
      {
        dataIndex: "date",
        text: "日期",
        sortable: true //禁用排序
      },
      {
        dataIndex: "name",
        text: "姓名",
        render(h, column) {
          return h(
            "span",
            {
              style: {
                color: "red"
              }
            },
            column.row.name
          );
        }
      },
      {
        dataIndex: "address",
        text: "地址"
      },
      {
        text: "操作",
        group: [
          {
            type: "primary",
            name: "修改",
            click: (row, index) => {
              console.log(`修改:${JSON.stringify(row)}`);
            }
          },
          {
            type: "danger",
            name: "删除",
            click: (row, index) => {
              console.log(`删除:${JSON.stringify(row)}`);
            }
          }
        ]
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
    test() {
      this.$refs.ref_table.toggleAllSelection();
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