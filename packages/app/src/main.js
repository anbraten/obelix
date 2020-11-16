import Vue from 'vue';

import router from '@/router';
import store from '@/store';

import tracking from '@/libs/tracking';
import '@/libs/api';
import '@/libs/buefy';
import '@/libs/sentry';
import '@/libs/vuelidate';

import '@/registerServiceWorker';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

tracking.init(router);
