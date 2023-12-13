const app = {
  state: {
    dialog: {
      active: false,
    },
  },
  mutations: {
    SET_DIALOG_ACTIVE(state, payload) {
      state.dialog = payload;
    },
    SET_DIALOG_CLOSE(state) {
      state.dialog.active = false;
    },
  },
  actions: {},
};

export default app;
