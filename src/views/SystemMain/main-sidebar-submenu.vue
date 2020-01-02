<!--
 * @Description: 子级菜单封装
 * @Author: PengYH
 * @Date: 2019-12-16
 -->
<template functional>
  <el-submenu :index="props.data.id">
    <template slot="title">
      <i :class="props.data.icon"></i>
      <span>{{props.data.text}}</span>
    </template>
    <template v-for="item in props.data.children">
      <router-link :to="item.path" :key="item.id" v-if="item.children.length===0">
        <el-menu-item class="subitem" :index="item.id">
          <i :class="item.icon"></i>
          <span slot="title">{{item.text}}</span>
        </el-menu-item>
      </router-link>
      <submenu v-else :data="item" :key="item.id"></submenu>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: "submenu",
  props: {
    data: [Array, Object]
  }
};
</script>