import db from "../services/firebaseInit";

export default {
  state: () => ({
    filters: [],
    loadingFilters:false,
    filterError:null
  }),
  mutations: {
    setFilters(state, payload) {
      state.filters = payload;
    },
    setLoadingFilter(state, payload) {
      state.loadingFilters = payload;
    },
    setFilterError(state, payload){
      state.filterError = payload;
    }
  },
  actions: {
    storeFilters({ commit, state }) {
      commit("setFilterError",null);
      if (state.filters.length === 0){
        commit("setLoadingFilter", true);
        /**
         * Queries on thd db to fetch school form data
         */
        db.collection("filter")
          .get()
          .then(function(querySnapshot) {
            const filters = [];
            querySnapshot.forEach(function(doc) {
              let data = doc.data();
              data.id = doc.id;
              filters.push(data)
            });
            commit("setFilters",filters);
            commit("setLoadingFilter", false);
          })
          .catch(function(error) {
            commit("setFilterError",error);
            commit("setLoadingFilter", false);
          });
      }
    }
  },
  getters: {
    filter(state) {
      return id => {
        return state.filters.find(filter => {
          console.log(filter)
          return filter.id === id;
        });
      };
    },
    filters(state) {
      return state.filters;
    },
    loadingFilter(state) {
      return state.loadingFilters;
    },
    filterError(state) {
      return state.filterError;
    }
  }
};
