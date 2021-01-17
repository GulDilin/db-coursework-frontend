import Vue from 'vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';

import App from './App.vue';

axios.interceptors.response.use(
  response => response,

  error => {
    if (error.response && error.response.status === 401) router.push(`/login?next=${router.history.current.path}`);

    if (error.response && error.response.status === 403) router.push('/');

    return Promise.reject(error);
  }
);

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
}).$mount('#app');
