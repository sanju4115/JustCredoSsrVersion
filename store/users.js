export default {
    state: () => ({
      users: [],
      placesManaged:[]
    }),
    mutations: {
      setLoadedUser(state, payload) {
        let presentUser = state.users.find(user => {
          return user.firebaseUid === payload.data.firebaseUid;
        });
        if (presentUser === null || presentUser === undefined){
          state.users.push(payload.data);
        }
      },
      setLoadedUsers(state, payload) {
        payload.data.forEach(userToSave =>{
          let presentUser = state.users.find(user => {
            return user.firebaseUid === userToSave.firebaseUid;
          });
  
          if (presentUser === null || presentUser === undefined){
            state.users.push(userToSave);
          }
        });
      },
      clearUsers(state) {
        state.users = [];
      },
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
      storsUsers({ commit, getters }, payload) {
        commit("setLoadedUsers", payload);
      },
      storeUser({ commit, getters }, payload) {
        commit("setLoadedUser", payload);
      },
      clearSchools({commit}){
        commit("clearUsers");
      },
      storePlacesManaged({commit}, payload){
        commit("setPlacesManaged",payload)
      }
    },
    getters: {
      allLoadedSchool(state){
        return state.users;
      },
      user(state) { 
        return firebaseUid => state.users.find(user => user.firebaseUid == firebaseUid);
      },
      allPlacesManaged(state){
        return state.placesManaged;
      },
      placesManaged(state) { 
        return firebaseUid => state.placesManaged.find(payload => payload.id == firebaseUid);
      },
    }
  };