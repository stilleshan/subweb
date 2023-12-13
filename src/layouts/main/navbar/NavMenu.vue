<template>
  <div
    class="navbar-collapse landing-nav-menu collapse"
    :class="{ show: $store.state.style.main.isCollapsed }"
    style=""
  >
    <button
      class="navbar-toggler border-0 text-heading position-absolute end-0 top-0 scaleX-n1-rtl"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="true"
      aria-label="Toggle navigation"
      @click="$store.commit('MAIN_LAYOUT_MENU_EXPAND')"
    >
      <i class="ti ti-x ti-sm"></i>
    </button>
    <ul class="navbar-nav ms-auto">
      <li class="nav-item" v-for="i in navBarItem" :key="i">
        <a :href="i.link" :target="i.target" class="nav-link fw-medium">{{ i.title }}</a>
      </li>
    </ul>
  </div>
  <div class="landing-menu-overlay d-lg-none" @click="collapsedMenu"></div>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      navBarItem: [],
    };
  },
  created() {
    this.navBarItem = window.config.menuItem;
  },
  methods: {
    collapsedMenu() {
      this.$store.commit('MAIN_LAYOUT_MENU_EXPAND');
    },
  },
};
</script>
