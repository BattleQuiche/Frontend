import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    debug: false
  },
  mutations: {
    setDebug(state, bool) {
      state.debug = bool
    }
  },
  actions: {
    setDebugModeTo({ commit }, bool) {
      commit('setDebug', bool);
    },
  },
  modules: {},
  getters: {
    debug: (state) => state.debug,
  },
  plugins: [vuexLocalStorage.plugin],
});
