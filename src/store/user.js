import axios from 'axios';
import { URL_API } from "@/settings";

const state = {
  token: "",
  roles: [],
  username: "",
  userinfo: null,
  processes: null,
  availableRoles: [],
};

const getters = {
  getToken: state => state.token,

  getUserName: state => state.username,

  getUserInfo: state => state.userinfo,

  getUserRoles: state => state.roles,

  getAvailableRoles: state => state.availableRoles,

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
    state.roles = payload;
  },

  SET_AVAILABLE_ROLES: (state, payload) => {
    state.availableRoles = payload;
  },

  SET_USER_PROCESSES: (state, payload) => {
    state.processes = payload;
  },
};

const actions = {

  LOAD_AVAILABLE_ROLES: ({ commit, state, dispatch }) => {
    return new Promise( (resolve, reject) => {
      if (state.availableRoles.length) resolve(state.availableRoles);

      else {
        axios({
          method: "get",
          url: `${URL_API}/api/roles`,
        })
        .then( response => {
          const { data } = response;
          commit("SET_AVAILABLE_ROLES", data);
          resolve();
        })
        .catch( () => {
          reject();

          dispatch("PUSH_NOTIFICATION", {
            type: "error",
            message: "Cannot load available user roles from server"
          });
        });
      }
    })
  },

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

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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

    localStorage.removeItem("MultiplicationServiceUser");

    axios.defaults.headers.common['Authorization'] = null;

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