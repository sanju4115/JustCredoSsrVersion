export default {
  state: () => ({
    //default value
    loading: false,
    error: null,
    areaSelected: "geohash50",
    isUserAdmin: false,
    drawerState: false,
    isServiceAvailable: true,
    errorText: null,
    errorSnackbar: false,
    successText: null,
    successSnackbar:false
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
    setDrawerState(state) {
      state.drawerState = !state.drawerState;
    },
    setServiceAvailable(state, payload) {
      state.isServiceAvailable = payload;
    },
    setErrorText(state, payload){
      state.errorText = payload;
    },
    setErrorSnackbar(state, payload){
      state.errorSnackbar = payload;
    },
    setSuccessText(state, payload){
      state.successText = payload;
    },
    setSuccessSnackbar(state, payload){
      state.successSnackbar = payload;
    }
  },
  actions: {
    clearError({ commit }) {
      commit("clearError");
    },
    areaChange({ commit, getters }, payload) {
      commit("setAreaSelected", payload);
    },
    toggleDrawerState({ commit }) {
      commit("setDrawerState");
    },
    isServiceAvailable({ commit }, payload) {
      commit("setServiceAvailable", payload);
    },
    setErrorText({ commit }, payload){
      commit("setErrorText", payload);
    },
    setErrorSnackbar({ commit }, payload){
      commit("setErrorSnackbar", payload);
    },
    setSuccessText({ commit }, payload){
      commit("setSuccessText", payload);
    },
    setSuccessSnackbar({ commit }, payload){
      commit("setSuccessSnackbar", payload);
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
    areaSelected(state) {
      return state.areaSelected;
    },
    drawerState(state) {
      return state.drawerState;
    },
    serviceAvailable(state) {
      return state.isServiceAvailable;
    },
    errorText(state) {
      return state.errorText;
    },
    errorSnackbar(state){
      return state.errorSnackbar;
    },
    successText(state) {
      return state.successText;
    },
    successSnackbar(state){
      return state.successSnackbar;
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
