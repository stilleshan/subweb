<template>
  <div id="app">
    <router-view />
    <dialog-view v-if="$store.state.app.dialog.active"></dialog-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
@import '@/assets/vendor/css/rtl/core.css';
@import '@/assets/vendor/css/rtl/theme-default.css';
@import 'element-plus/theme-chalk/index.css';
</style>
