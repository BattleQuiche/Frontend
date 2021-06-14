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
    tileSets: null
  },
  mutations: {
    setTileSets(state, tileSets) {
      state.tileSets = tileSets
    }
  },
  actions: {
    setTileSets({ commit }, tileSets) {
      commit('setTileSets', tileSets);
    }
  },
  modules: {},
  getters: {
    tileSets: (state) => state.tileSets,
  },
  plugins: [vuexLocalStorage.plugin],
});
