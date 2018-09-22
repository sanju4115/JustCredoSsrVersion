import db from "../services/firebaseInit";

export default {
  state: () => ({
    loadedSchools: [],
    school: [],
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
    school(state, payload) {
      state.school = payload;
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
    storeSchool({ commit, getters }, payload) {
      commit("setLoadedSchool", payload);
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
    school({commit}, payload) {
      commit("school", payload);
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
    allLoadedSchool(state){
      return state.loadedSchools;
    },
    schools(state) { 
      return schoolId => state.loadedSchools.find(school => school.id == schoolId);
    },
    school(state) {
      return state.school;
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
    }
  }
};
