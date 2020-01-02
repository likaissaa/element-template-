<!--
 * @Description: 主窗口
 * @Author: PengYH
 * @Date: 2019-12-16
 -->
<template>
  <div class="site">
    <main-sidebar
      class="site__sidebar"
      backgroundColor="#304156"
      textColor="#bfcbd9"
      :collapse="collapse"
    />
    <div class="site__child" :style="{left:sidebarWidth+'px'}">
      <main-navbar class="site__child__navbar" @collapse="onCollapse"></main-navbar>
      <mainContent class="site__child__content"></mainContent>
    </div>
  </div>
</template>
<script>
import mainSidebar from "./main-sidebar";
import mainNavbar from "./main-navBar";
import mainContent from "./main-content";

import menu from "./../../../public/page.json";
export default {
  components: {
    mainSidebar,
    mainNavbar,
    mainContent
  },
  data() {
    return {
      collapse: false,
      sidebarWidth: 250
    };
  },
  created() {
    this.$store.commit("menu", menu);
    /**禁止页面后退  */
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", function() {
      history.pushState(null, null, document.URL);
    });
  },
  methods: {
    /**展开收缩 */
    onCollapse(val) {
      //收缩
      if (val) this.sidebarWidth = 64;
      else this.sidebarWidth = 250; //展开
      this.collapse = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.site {
  display: flex;
  &__sidebar {
    position: absolute;
    height: 100%;
    width: 250px;
    background-color: #304156;
  }

  &__child {
    position: absolute;
    left: 250px;
    right: 0;
    height: 100%;
    overflow: auto;
    transition: left 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    &__navbar {
      line-height: 60px;
      z-index: 1000;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
      background-color: #fff;
    }
    &__content {
      flex: 1;
    }
  }
}
</style>