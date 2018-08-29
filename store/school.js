import db from "../services/firebaseInit";

export default {
  state: () => ({
    loadedSchools: [],
    primarySchool: [],
    secondarySchool: [],
    preSchool: [],
    specialSchool: [],
    internationalSchool: [],
    musicClass: [],
    artClass: [],
    sportsClass: [],
    privateTutor: [],
    coachingClass: [],
  }),
  mutations: {
    setLoadedSchool(state, payload) {
      let presentSchool = state.loadedSchools.find(school => {
        return school.id === payload.data.id;
      });
      if (presentSchool === null || presentSchool === undefined){
        state.loadedSchools.push(payload.data);
      }
    },
    setLoadedSchools(state, payload) {
      payload.data.forEach(schoolToSave =>{
        let presentSchool = state.loadedSchools.find(school => {
          return school.id === schoolToSave.id;
        });

        if (presentSchool === null || presentSchool === undefined){
          state.loadedSchools.push(schoolToSave);
        }
      });
    },
    primarySchool(state, payload) {
      state.primarySchool = payload;
    },
    secondarySchool(state, payload) {
      state.secondarySchool = payload;
    },
    preSchool(state, payload) {
      state.preSchool = payload;
    },
    specialSchool(state, payload) {
      state.specialSchool = payload;
    },
    internationalSchool(state, payload) {
      state.internationalSchool = payload;
    },
    musicClass(state, payload) {
      state.musicClass = payload;
    },
    artClass(state, payload) {
      state.artClass = payload;
    },
    sportsClass(state, payload) {
      state.sportsClass = payload;
    },
    privateTutor(state, payload) {
      state.privateTutor = payload;
    },
    coachingClass(state, payload) {
      state.coachingClass = payload;
    },
    clearSchools(state) {
      state.loadedSchools = [];
    }
  },
  actions: {
    storeSchools({ commit, getters }, payload) {
      commit("setLoadedSchools", payload);
    },
    clearSchools({commit}){
      commit("clearSchools");
    },
    findSchool({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit("setLoading", true);
        db.collection("schools")
          .doc(payload.id)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              resolve({data : doc.data()});
              commit("setLoadedSchool", {data: doc.data()});
            } else {
              reject({data : "No results found"});
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            reject({data : "Error getting document:" +error});
            console.log("Error getting document:", error);
          });
      });
    },
    primarySchool({commit}, payload) {
      commit("primarySchool", payload);
    },
    secondarySchool({commit}, payload) {
      commit("secondarySchool", payload);
    },
    preSchool({commit}, payload) {
      commit("preSchool", payload);
    },
    specialSchool({commit}, payload) {
      commit("specialSchool", payload);
    },
    internationalSchool({commit}, payload) {
      commit("internationalSchool", payload);
    },
    musicClass({commit}, payload) {
      commit("musicClass", payload);
    },
    artClass({commit}, payload) {
      commit("artClass", payload);
    },
    sportsClass({commit}, payload) {
      commit("sportsClass", payload);
    },
    privateTutor({commit}, payload) {
      commit("privateTutor", payload);
    },
    coachingClass({commit}, payload) {
      commit("coachingClass", payload);
    }
  },
  getters: {
    school(state) {
      return schoolId => {
        return state.loadedSchools.find(school => {
          return school.id === schoolId;
        });
      };
    },
    primarySchool(state) {
      return state.primarySchool;
    },
    secondarySchool(state) {
      return state.secondarySchool;
    },
    preSchool(state) {
     return state.preSchool;
    },
    specialSchool(state) {
      return state.specialSchool;
    },
    internationalSchool(state) {
      return state.internationalSchool;
    },
    musicClass(state) {
      return state.musicClass;
    },
    artClass(state) {
      return state.artClass;
    },
    sportsClass(state) {
      return state.sportsClass;
    },
    privateTutor(state) {
      return state.privateTutor;
    },
    coachingClass(state) {
      return state.coachingClass;
    },
    clearSchools(state) {
      state.loadedSchools = [];
    }
  }
};
