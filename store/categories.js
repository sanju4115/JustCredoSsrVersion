import db from "../services/firebaseInit";

export default {
  namespaced: true,
  state: () => ({
    categories: [],
  }),
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    }
  },
  actions: {
    storeCategories({ commit }, payload) {
      commit("setCategories",payload);
    },
    nuxtServerInit ({commit}) {
      return db
        .collection("categories")
        .get()
        .then(querySnapshot => {
          let categories = [];
          querySnapshot.forEach(doc => {
            categories.push(doc.data());
          });
          commit("setCategories", categories);
        })
        .catch(error => {
          console.log("store categories.js build content Error getting documents: ", error);
        });
    }
  },
  getters: {
    category(state) {
      return categoryKey => {
        return state.categories.find(category => {
          return category.key === categoryKey;
        });
      };
    },
    categories(state) {
      return state.categories;
    }
  }
};

