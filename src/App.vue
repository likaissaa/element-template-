<!--
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-12-16
 -->
<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}

/deep/ .site {
  height: 100%;
}
</style>
