export default {
    state: () => ({
      placesManaged:[]
    }),
    mutations: {
      clearPlacesManaged(state) {
        state.placesManaged = null;
      },
      setPlacesManaged(state, payload){
        let presentPlacesManaged = state.placesManaged.find(placesManaged => {
          return placesManaged.id === payload.id;
        });
        if (presentPlacesManaged === null || presentPlacesManaged === undefined){
          state.placesManaged.push(
            {
              id:payload.id,
              data:payload.data
            }
          );
        }
      }
    },
    actions: {
      clearSchools({commit}){
        commit("clearUsers");
      },
      storePlacesManaged({commit}, payload){
        commit("setPlacesManaged",payload)
      }
    },
    getters: {
      allPlacesManaged(state){
        return state.placesManaged;
      },
      placesManaged(state) { 
        return firebaseUid => state.placesManaged.find(payload => payload.id == firebaseUid);
      },
    }
  };