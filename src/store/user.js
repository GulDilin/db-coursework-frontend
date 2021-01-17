// import axios from 'axios';

const state = {
  token: "",
  role: "guest",
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
  // LOGIN: ( { commit }, { username, password } ) => {

  // }
};

export default {
  state,
  getters,
  mutations,
  actions,
};