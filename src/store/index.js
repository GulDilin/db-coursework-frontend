import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import user from "./user";
import notifications from "./notifications";
import project from "./project";

export default new Vuex.Store({
  modules: {
    user,
    notifications,
    project,
  },
});
