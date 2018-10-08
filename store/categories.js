import db from "../services/firebaseInit";
import config from "../config.js";
import axios from "axios";
import ApiEndpoints from "@/constants/ApiEndpoints";

export default {
  namespaced: true,
  state: () => ({
    categories: []
  }),
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    }
  },
  actions: {
    storeCategories({ commit }, payload) {
      commit("setCategories", payload);
    },
    async nuxtServerInit({ commit }) {
      try {
        let categories = await axios.get(
          config.baseUrl + ApiEndpoints.FIND_ALL_CATEGORIES
        );
        commit("setCategories", categories.data);
      } catch (error) {
        console.log(
          "store categories.js build content Error getting documents: ",
          error
        );
      }

      // return db
      //   .collection("categories")
      //   .get()
      //   .then(querySnapshot => {
      //     let categories = [];
      //     querySnapshot.forEach(doc => {
      //       categories.push(doc.data());
      //     });
      //     commit("setCategories", categories);
      //   })
      //   .catch(error => {
      //     console.log("store categories.js build content Error getting documents: ", error);
      //   });
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
