<!--
 * @Description: 页面内容
 * @Author: PengYH
 * @Date: 2019-12-16
 -->
<template>
  <main class="main">
    <el-tabs
      v-if="$route.meta.istab"
      v-model="activeName"
      closable
      @tab-remove="removeTab"
      @tab-click="selectTab"
    >
      <el-dropdown class="tools" :show-timeout="0">
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="closeCurrent">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item @click.native="closeOther">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item @click.native="closeAll">关闭全部标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tab-pane
        v-for="item in tabInfos"
        :key="item.name"
        :label="item.meta.pageName"
        :name="item.name"
      >
        <el-card>
          <transition name="slide-fade" mode="out-in">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-card v-else class="notab">
      <transition name="slide-fade" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </el-card>
  </main>
</template>
<script>
export default {
  name: "mainContent",
  data() {
    return {
      activeName: "index",
      tabInfos: []
    };
  },
  watch: {
    $route: "addTab"
  },
  methods: {
    /**选中项 */
    selectTab(tab) {
      if (tab.name !== this.$route.name) {
        var tab = this.tabInfos.find(e => e.name === tab.name);
        if (tab)
          this.$router.push({
            name: tab.name,
            query: tab.query,
            params: tab.params
          });
      }
    },

    /**添加tab */
    addTab(route) {
      this.$np.start();
      if (route.name != "index") {
        const isExist = this.tabInfos.some(item => {
          return item.name === route.name;
        });
        if (!isExist) this.tabInfos.push(route);
        this.activeName = route.name;
      }
      this.$np.done();
    },

    /**移除tab */
    removeTab(tabName) {
      this.$np.start();
      this.tabInfos = this.tabInfos.filter(item => item.name !== tabName);
      if (this.tabInfos.length >= 1) {
        if (tabName === this.activeName) {
          var tab = this.tabInfos[this.tabInfos.length - 1];
          this.$router.push(
            {
              name: tab.name,
              params: tab.params,
              query: tab.query
            },
            () => {
              this.activeName = this.$route.name;
            }
          );
        }
      } else {
        this.$router.push("/index");
      }
      this.$np.done();
    },

    /** 关闭当前页*/
    closeCurrent() {
      this.removeTab(this.activeName);
    },

    /**关闭其他 */
    closeOther() {
      this.tabInfos = this.tabInfos.filter(
        item => item.name === this.activeName
      );
    },

    /**关闭全部 */
    closeAll() {
      this.$np.start();
      this.tabInfos.length = 0;
      this.$router.push("/index");
      this.$np.done();
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin el-card__body() {
  height: 100%;
  overflow-y: auto;
}
/*滚动条整体*/
@mixin webkit-scrollbar() {
  width: 4px;
}

/*外层轨道*/
@mixin webkit-scrollbar-track() {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

/*滚动条里面可以拖动的那部分*/
@mixin webkit-scrollbar-thumb() {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.main {
  overflow: hidden;
  background-color: #e9eef3;
  height: 100%;
  .el-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    .tools {
      position: fixed;
      top: 60px;
      right: 0;
      z-index: 931;
      height: 40px;
      padding: 0 12px;
      font-size: 16px;
      line-height: 40px;
      background-color: #f1f4f5;
      cursor: pointer;
    }
  }
  /deep/ .el-tabs__header {
    height: 40px;
    padding: 0 55px 0 15px;
    z-index: 900;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    background-color: #fff;
  }
  /deep/ .el-tabs__nav-wrap::after {
    content: "";
    background-color: transparent;
  }
  /deep/ .el-tabs__content {
    box-sizing: content-box;
    padding: 0 15px 15px;
    flex: 1;
    .el-card__body,
    .el-tab-pane {
      @include el-card__body();
    }
  }
  .el-card {
    box-shadow: none;
    height: 100%;
  }

  .slide-fade-enter-active {
    transition: all 0.2s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }

  /deep/ .el-card__body::-webkit-scrollbar {
    @include webkit-scrollbar();
  }
  /deep/ .el-card__body::-webkit-scrollbar-thumb {
    @include webkit-scrollbar-thumb();
  }
  /deep/ .el-card__body::-webkit-scrollbar-track {
    @include webkit-scrollbar-track();
  }
}

.notab {
  padding: 15px;
  background-color: unset;
  /deep/ .el-card__body {
    background-color: #fff;
    @include el-card__body();
  }
}
</style>