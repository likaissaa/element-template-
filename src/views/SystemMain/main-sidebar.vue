<!--
 * @Description: 左侧菜单
 * @Author: PengYH
 * @Date: 2019-12-16
 -->
<template>
  <div class="sidebar-menu">
    <div class="sidebar-menu__logo">
      <div class="sidebar-menu__child" v-show="!collapse">
        <span class="sidebar-menu__child__text is-active">{{logo}}</span>
      </div>
      <div class="sidebar-menu__child" style="width:64px;" v-show="collapse">
        <span class="sidebar-menu__child__text el-tag--mini">LG</span>
      </div>
    </div>
    <el-menu
      :background-color="backgroundColor"
      :text-color="textColor"
      :default-active="$route.meta.pageId"
      :collapse="collapse"
    >
      <router-link to="/index">
        <el-menu-item index="99999">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>

      <template v-for="item in list">
        <router-link :to="item.path" :key="item.id" v-if="item.children.length===0">
          <el-menu-item :index="item.id" :route="item.path">
            <i :class="item.icon"></i>
            <span slot="title">{{item.text}}</span>
          </el-menu-item>
        </router-link>
        <submenu v-else :data="item" :key="item.id"></submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import submenu from "./main-sidebar-submenu";
export default {
  name: "menuList",
  components: {
    submenu
  },
  props: {
    backgroundColor: String, //导航菜单背景颜色
    textColor: String, //导航菜单文字颜色
    collapse: {
      //是否折叠
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: this.$store.state.frame.menu, //当行菜单数据源
      logo: "LOGO" //logo
    };
  }
};
</script>
<style lang="scss" scoped>
.sidebar-menu {
  /deep/ .el-menu {
    border-right: none;
  }
  &__logo {
    height: 64px;
  }
  &__child {
    position: relative;
    text-align: center;
    font-size: 20px;
    height: 64px;
    line-height: 64px;
    &__text {
      color: #409eff;
      font-size: 20px;
    }
  }
}
</style>