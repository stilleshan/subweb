<template>
  <div class="navbar-brand app-brand demo d-flex py-0 py-lg-2 me-4">
    <!-- Mobile menu toggle: Start-->
    <button
      class="navbar-toggler border-0 px-0 me-2"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
      @click="$store.commit('MAIN_LAYOUT_MENU_EXPAND')"
    >
      <i class="ti ti-menu-2 ti-sm align-middle"></i>
    </button>
    <!-- Mobile menu toggle: End-->
    <router-link to="/" class="app-brand-link">
      <span class="app-brand-logo demo">
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
            fill="#7367F0"
          />
          <path
            opacity="0.06"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
            fill="#161616"
          />
          <path
            opacity="0.06"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
            fill="#161616"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
            fill="#7367F0"
          />
        </svg>
      </span>
      <span class="app-brand-text demo menu-text fw-bold ms-2 ps-1">{{ siteName }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'AppBrand',
  data() {
    return {
      siteName: '',
    };
  },
  created() {
    this.siteName = window.config.siteName;
  },
};
</script>
