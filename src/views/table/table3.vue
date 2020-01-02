<!--
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-08-19
 -->

<template>
  <div class="index">
    <h1>带斑马纹表格</h1>
    <br />
    <p>使用带斑马纹的表格，可以更容易区分出不同行的数据。</p>
    <br />
    <el-extend-table
      border
      rowNumber
      stripe
      multiple
      :columns="columns"
      :data="store.data"
      ref="ref_table"
    ></el-extend-table>
  </div>
</template>

<script>
export default {
  name: "table3",
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
            name: "修改"
            // ,
            // click: (row, index) => {
            //   console.log(`修改:${JSON.stringify(row)},index:${index}`);
            // }
          },
          {
            type: "danger",
            name: "删除"
            // ,
            // click: (row, index) => {
            //   console.log(`删除:${JSON.stringify(row)},index:${index}`);
            // }
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
  }
};
</script>