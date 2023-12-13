const main = {
  state: {
    navStyles: new Set(), // 初始状态为空数组
    isCollapsed: false, // 初始状态为展开
  },
  mutations: {
    MAIN_LAYOUT_MENU_EXPAND(state) {
      state.isCollapsed = !state.isCollapsed;
    },
    MAIN_LAYOUT_MENU_EXPAND_CLOSE(state) {
      state.isCollapsed = false;
    },
    MAIN_LAYOUT_NAV_ACTIVE(state, val) {
      if (val) {
        state.navStyles.add('navbar-active');
      } else {
        state.navStyles.delete('navbar-active');
      }
    },
  },
  actions: {},
};

export default main;
