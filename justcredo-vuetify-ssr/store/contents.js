export default {
  namespaced: true,
  state: () => ({
    appFeatures: [],
  }),
  mutations: {
    setAppFeatures(state, payload) {
      state.appFeatures = payload;
    }
  },
  actions: {
    storeAppFeatures({ commit }, payload) {
      commit("setAppFeatures",payload);
    }
  },
  getters: {
    appFeatures(state) {
      return state.appFeatures;
    }
  }
};

