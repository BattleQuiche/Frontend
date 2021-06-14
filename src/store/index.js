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
    tileSets: null,
    user: null,
  },
  mutations: {
    setTileSets(state, tileSets) {
      state.tileSets = tileSets
    },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {
    setTileSets({ commit }, tileSets) {
      commit('setTileSets', tileSets);
    },
    setUser({commit}, user) {
      commit('setUser', user)
    }
  },
  modules: {},
  getters: {
    tileSets: (state) => state.tileSets,
    user : (state) => state.user
  },
  plugins: [vuexLocalStorage.plugin],
});
