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
    debug: false,
    tileSets: null
  },
  mutations: {
    setDebug(state, bool) {
      state.debug = bool
    },
    setTileSets(state, tileSets) {
      state.tileSets = tileSets
    }
  },
  actions: {
    setDebugModeTo({ commit }, bool) {
      commit('setDebug', bool);
    },
    setTileSets({ commit }, tileSets) {
      commit('setTileSets', tileSets);
    }
  },
  modules: {},
  getters: {
    debug: (state) => state.debug,
    tileSets: (state) => state.tileSets,
  },
  plugins: [vuexLocalStorage.plugin],
});
