<!--
 * @Description: 
 * @Author: PengYH
 * @Date: 2019-08-19
 -->
<template>
  <div>
    测试1-1-2
    <p>{{getDate}}</p>
  </div>
</template>

<script>
export default {
  name: "test1-1-2",
  computed: {
    getDate() {
      return new Date().getTime();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>