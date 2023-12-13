import { createStore } from 'vuex';
import style from './modules/style';
import app from './modules/app';
import menu from './modules/menu';

export default createStore({
  modules: {
    style,
    app,
    menu,
  },
  state: {},
  mutations: {},
  actions: {},
});
