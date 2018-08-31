export const strict = false;

export default {
  actions: {
    nuxtServerInit ({ dispatch }, context) {
      return Promise.all([
        dispatch('categories/nuxtServerInit', context)
      ]);
    }
  },
};
