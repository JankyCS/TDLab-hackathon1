import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    status(state){
      return state.status;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.status.loggedIn = value;
    },
    SET_USER(state, data) {
      state.status.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          email: user.email,
          value1: user.value1
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});