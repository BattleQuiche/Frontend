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
    party: null,
    permissionNotification: null,
  },
  mutations: {
    setTileSets(state, tileSets) {
      state.tileSets = tileSets
    },
    setUser(state, user) {
      state.user = user
    },
    setParty(state, party) {
      state.party = party
    },
    setPermissionNotification(state, permissionNotification) {
      state.permissionNotification = permissionNotification
    },
  },
  actions: {
    setTileSets({ commit }, tileSets) {
      commit('setTileSets', tileSets);
    },
    setUser({commit}, user) {
      commit('setUser', user)
    },
    setParty({commit}, party) {
      commit('setParty', party)
    },
    setPermissionNotification({commit}, permissionNotification) {
      commit('setPermissionNotification', permissionNotification)
    },
  },
  modules: {},
  getters: {
    tileSets: (state) => state.tileSets,
    user : (state) => state.user,
    party : (state) => state.party,
    permissionNotification : (state) => state.permissionNotification,
  },
  plugins: [vuexLocalStorage.plugin],
});
