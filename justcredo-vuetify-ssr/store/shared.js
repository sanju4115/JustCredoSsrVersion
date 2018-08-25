export default {
  state: () => ({
    loading: false,
    error: null,
    areaSelected:"geohash50",
    isUserAdmin:false,
    drawerState:true
  }),
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setAreaSelected(state, payload) {
      state.areaSelected = payload.area;
    },
    setDrawerState(state){
      state.drawerState = !state.drawerState;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    },
    areaChange({ commit, getters }, payload) {
      commit("setAreaSelected", payload);
    },
    toggleDrawerState({commit}){
      commit("setDrawerState");
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    },
    areaSelected(state){
      return state.areaSelected;
    },
    drawerState(state){
      return state.drawerState;
    }
  }
};

/*
const handleLocationError = (browserHasGeolocation) => {
  const error = browserHasGeolocation
    ? `The Geolocation service failed.
     It's possible that you blocked this site for tracking your location,
     please try clearing your settings and try again.`
    : `Your browser doesn't support geolocation.`
  Router.push(`/error?error=${error}`)
};
*/

