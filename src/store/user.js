import axios from 'axios';
import { URL_API } from "@/settings";

const state = {
  token: "",
  roles: [],
  username: "",
  userinfo: null,
  processes: null,
};

const getters = {
  getToken: state => state.token,

  getUserName: state => state.username,

  getUserInfo: state => state.userinfo,

  getUserRoles: state => state.roles,

  getUserProcesses: state => state.processes,
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

  SET_USERROLES: (state, payload) => {
    state.userinfo = payload;
  },

  SET_USER_PROCESSES: (state, payload) => {
    state.processes = payload;
  },
};

const actions = {

  SIGN_IN_SAVED: ({ commit }) => {
    return new Promise( (resolve, reject) => {
      try {
        let savedUserData = JSON.parse(localStorage.getItem("MultiplicationServiceUser"));
        const { username, roles, token, processes } = savedUserData;

        if (!token) {
          reject();
          return;
        }

        commit("SET_USERNAME", username);
        commit("SET_USERROLES", roles);
        commit("SET_TOKEN", token);
        commit("SET_USER_PROCESSES", processes);

        resolve();

      } catch {
        reject();
      }
    });
  },

  SIGN_IN: ( { commit, dispatch }, { username, password } ) => {
    return new Promise( (resolve, reject) => {
      console.log({ username, password });
      axios({
        method: "post",
        url: `${URL_API}/api/login`,
        data: {
          login: username,
          password: password,
        }
      })
      .then( (response) => {
        const { data } = response;
        const { token, processes } = data;
        let roles = [...Object.keys(processes)];

        commit("SET_USERNAME", username);
        commit("SET_USERROLES", roles);
        commit("SET_TOKEN", token);
        commit("SET_USER_PROCESSES", processes);

        data.username = username;
        data.roles = roles;
        localStorage.setItem("MultiplicationServiceUser", JSON.stringify(data));

        resolve();
      })
      .catch( () => {
        dispatch("PUSH_NOTIFICATION", {
          type: "error",
          message: "Authorization error"
        });
        reject();
      })
    })
  },

  SIGN_UP: ( { dispatch }, {
      username, password, email, roles,
      firstName,lastName, gender, placeOfBirth
    }
  ) => {
    return new Promise( (resolve, reject) => {
      console.log({ username, password, email, roles,
      firstName,lastName, gender, placeOfBirth });

      axios({
        method: "post",
        url: `${URL_API}/api/registration`,
        data: {
          login: username,
          password: password,
          email: email,
          name: firstName,
          secondName: lastName,
          gender: gender,
          placeOfBirth: placeOfBirth,
          roles: roles,
        }
      })
      .then( () => {

        dispatch("PUSH_NOTIFICATION", {
          type: "success",
          message: "Successful Registration. Please sign in"
        });

        resolve();
      })
      .catch( () => {
        dispatch("PUSH_NOTIFICATION", {
          type: "error",
          message: "Registration error"
        });

        reject();
      })
    })
  },

  SIGN_OUT: ({ commit, dispatch }) => {
    commit("SET_USERNAME", undefined);
    commit("SET_USERROLES", undefined);
    commit("SET_TOKEN", undefined);
    commit("SET_USER_PROCESSES", undefined);

    localStorage.deleteItem("MultiplicationServiceUser");

    dispatch("PUSH_NOTIFICATION", {
      type: "success",
      message: "You was signed out"
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};