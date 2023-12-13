<template>
  <html
    lang="en"
    class="light-style layout-navbar-fixed layout-wide"
    dir="ltr"
    data-theme="theme-default"
    data-assets-path="assets/"
    data-template="front-pages"
    @wheel="setNavActive"
  >
    <body>
      <nav-bar />
      <router-view />
      <footer-bar />
    </body>
  </html>
</template>

<script>
import NavBar from './navbar/NavBar.vue';
import FooterBar from './footer/FooterBar.vue';

export default {
  components: { NavBar, FooterBar },
  name: 'MainLayout',
  methods: {
    setNavActive() {
      const scrollY = window.scrollY || window.pageYOffset;
      // 设置 MAIN_LAYOUT_NAV_ACTIVE 根据滚动位置
      this.$store.commit('MAIN_LAYOUT_NAV_ACTIVE', scrollY > 0);
    },
  },
  mounted() {
    // 在组件挂载后，添加滚动事件监听器
    window.addEventListener('scroll', this.setNavActive);
  },
  beforeUnmount() {
    // 在组件销毁前，移除滚动事件监听器，以防止内存泄漏
    window.removeEventListener('scroll', this.setNavActive);
  },
};
</script>

<style scoped>
@import '@/assets/vendor/css/pages/front-page.css';
@import '@/assets/vendor/css/pages/front-page-landing.css';
</style>
