// import axios from 'axios';

const state = {
  token: "",
  roles: [],
  username: "",
  userinfo: null,
};

const getters = {
  getToken: state => state.token,

  getUserName: state => state.username,

  getUserInfo: state => state.userinfo,

  getUserRole: state => state.role,
};

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload;
  },

  SET_USERNAME: (state, payload) => {
    state.username = payload;
  },

  SET_USERINFO: (state, payload) => {
    state.userinfo = payload;
  },

  SET_USERROLE: (state, payload) => {
    state.userinfo = payload;
  },
};

const actions = {
  SIGN_IN: ( { commit }, { username, password } ) => {
    return new Promise( (resolve) => {
      console.log({ username, password });
      commit("SET_USERNAME", username);
      resolve();
    })
  },

  SIGN_UP: ( { commit, dispatch }, { username, password, email, roles } ) => {
    return new Promise( (resolve) => {
      console.log({ username, password, email, roles });
      commit("SET_USERNAME", username);
      dispatch("PUSH_NOTIFICATION", {
        type: "success",
        message: "Successful Registration"
      });
      resolve();
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};