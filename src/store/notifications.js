const state = {
  notifications: [],
  id: 0,
};

const getters = {
  getNotifications: state => state.notifications,
};

const mutations = {
  PUSH_NOTIFICATION: (state, payload) => state.notifications = [...state.notifications, payload],

  RESET_NOTIFICATIONS: (state) => state.notifications = [],

  DELETE_NOTIFICATION_WITH_ID: (state, payload) => state.notifications = state.notifications.filter(n => n.id != payload),

  INCREMENT_ID: (state) => state.id += 1,
};

const actions = {
  PUSH_NOTIFICATION: ({ commit, state, dispatch }, payload) => {
    let defaultNotification = {
      title: '',
      text: '',
      type: 'info',
      timeout: 5000
    };

    payload = {
      ...defaultNotification,
      ...payload
    };

    payload = {
      ...payload,
      id: state.id,
      timeout: +payload.timeout,
    };

    commit('INCREMENT_ID');

    if (+payload.timeout > 0) {
      console.log("setTimeout")
      setTimeout(
        () => {
          dispatch('DELETE_NOTIFICATION_WITH_ID', payload.id);
        },
        payload.timeout,
      );
    }

    commit('PUSH_NOTIFICATION', payload);
  },

  DELETE_NOTIFICATION_WITH_ID: ( { commit }, payload)  => {
    commit('DELETE_NOTIFICATION_WITH_ID', payload);
  },

  CLEAR_NOTIFICATIONS: ( { commit } ) => {
    commit('RESET_NOTIFICATIONS');
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
};