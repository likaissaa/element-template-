<!--
 * @Description: table扩展
 * @Author: PengYH
 * @Date: 2019-12-06
 -->
<template>
  <div class="table" id="table">
    <el-table
      ref="ref_table"
      highlight-current-row
      border
      :data="data"
      v-bind="$attrs"
      v-on="$listeners"
      style="z-index:1000;"
    >
      <!-- 是否展开行 -->
      <template v-if="'expand' in $attrs">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-extend-table
              class="detail-table"
              :columns="detail"
              :data="scope.row[detailDataIndex]"
              setHeight="false"
              v-if="scope.row[detailDataIndex].length>0"
              :style="{width:detailWidth+'px'}"
            ></el-extend-table>
          </template>
        </el-table-column>
      </template>

      <!-- 是否多选 -->
      <el-table-column
        v-if="'multiple' in $attrs"
        type="selection"
        style="width:50px"
        align="center"
      ></el-table-column>

      <!-- 是否显示序号列 -->
      <el-table-column
        v-if="'rowNumber' in $attrs"
        label="序号"
        type="index"
        width="60"
        align="center"
      ></el-table-column>

      <template v-for="(column, index) in columns">
        <template>
          <el-table-column
            v-if="!column.hidden"
            :class-name="index===columns.length-1?'empty-column':''"
            :key="index"
            :prop="column.dataIndex"
            :sortable="column.custom===true?'custom':column.sortable===true?true:false"
            :label="column.text||''"
            :type="column.type"
            :align="column.align||'left'"
            :width="column.width===0?'':column.width"
            :fixed="column.locked||false"
            :show-overflow-tooltip="column.tooltip"
          >
            <template slot-scope="scope">
              <template v-if="!column.render">{{scope.row[column.dataIndex]}}</template>
              <template v-else>
                <column-render
                  :column="column"
                  :row="scope.row"
                  :render="column.render"
                  :index="index"
                />
              </template>
              <template v-if="column.group">
                <template v-for="(button, index) in column.group">
                  <template v-if="button.render">
                    <column-render
                      :column="column"
                      :row="scope.row"
                      :render="button.render"
                      :index="index"
                      :key="index"
                      :click="button.click"
                    />
                  </template>
                  <template v-else>
                    <el-button
                      :key="index"
                      :type="button.type"
                      :size="button.size || 'mini'"
                      :icon="button.icon"
                      :disabled="button.disabled"
                      :plain="button.plain || true"
                      @click.stop="button.click(scope.row, scope.$index)"
                    >{{button.name}}</el-button>
                  </template>
                </template>
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
    <el-pagination
      v-if="paging"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px;text-align: right;margin-right:30px;background-color: #ffffff;"
      :total="pagination.total || totalCount"
      :page-size="pagination.limit"
      :page-sizes="[10, 15,20, 30, 50,100,200]"
      :pager-count="5"
      :current-page.sync="pagination.currentPage"
      @size-change="onSizeChange"
      @current-change="onIndexChange"
    ></el-pagination>
  </div>
</template>
<script>
import methods from "./methods";
import columnRender from "./columnRender";
export default {
  name: "elExtendTable",
  mixins: [methods],
  components: {
    columnRender
  },
  props: {
    /*显示列*/
    columns: {
      type: Array,
      required: true
    },
    /**网格明细 */
    detail: {
      type: Array,
      required: false
    },
    /**明细网格宽度 */
    detailWidth: {
      type: [String, Number],
      default: 200
    },
    /**明细数据源字段 */
    detailDataIndex: {
      type: String,
      default: "list"
    },
    /**是否使用分页器 */
    paging: {
      type: Boolean,
      default: false
    },
    totalCount: {
      type: Number,
      default: 0
    },
    /**静态数据源 */
    data: {
      type: [Object, Array]
    }
  },
  watch: {
    totalCount: function(val) {
      this.pagination.total = val;
    }
  },
  data() {
    return {
      pagination: {
        /**数据总条数 */
        total: 0,
        /*当前页*/
        pageIndex: 0,
        /**开始条数 */
        start: 0,
        /**每页显示条数 */
        limit: 20,
        /**当前页 */
        currentPage: 1
      },
      /**默认每页显示条数 */
      defaultCount: 20
    };
  },
  methods: {
    /*******************************************************************************************************************************************************/
    /* 功能：内部通用方法*/
    /*******************************************************************************************************************************************************/

    /**分页器值改变
     * @param {*} type 属性
     * @param {*} value 值
     * @param {*} isReloadData 是否重置加载数据
     */
    paginationChange(type, value, isReloadData) {
      this.pagination[type] = value;
      this.computedPagin();
    },

    /**获取分页起始条数,结束条数 */
    getPaginSize() {
      return {
        start: this.pagination.start,
        limit: this.pagination.limit
      };
    },

    /**计算分页条数 */
    computedPagin() {
      let start =
        this.pagination.pageIndex * this.pagination.limit -
        this.pagination.limit;
      this.pagination.start = start < 0 ? 0 : start;
      this.$emit("paginChange", {
        start: this.pagination.start,
        limit: this.pagination.limit
      });
    },

    /**重置分页器 */
    resetPagin() {
      this.pagination.pageIndex = 0;
      this.pagination.currentPage = 1;
      this.pagination.start = 0;
      return this.getPaginSize();
    },
    /*******************************************************************************************************************************************************/
    /* 功能：监听事件代码段*/
    /*******************************************************************************************************************************************************/
    /**网格排序 */
    onSortChange(val) {
      if (val.prop && val.order) {
        this.$store.commit("order", {
          signId: this.moduleSign,
          order: [
            {
              property: val.prop,
              direction: val.order == "ascending" ? "ASC" : "DESC"
            }
          ]
        });
      }
      this.getDataInfos(false);
    },

    /*切换每页显示的数量*/
    onSizeChange(size) {
      this.paginationChange("limit", size, true);
    },

    /*切换页码*/
    onIndexChange(current) {
      this.paginationChange("pageIndex", current, false);
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  height: 100%;
}

/deep/ .el-table__expanded-cell {
  padding: 10px !important;
}
</style>
