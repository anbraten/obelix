import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/libs/config';
import subscribe from '@/libs/subscriptions';

import Auth from './auth';
import Rental from './rental';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: Auth,
    rental: Rental,
  },

  state: {
    isConnected: false,
    title: null,
    isTester: localStorage.getItem('tester') === 'true' || false,
    version: localStorage.getItem('version') || false,
  },

  mutations: {
    connect(state) {
      state.isConnected = true;
    },
    disconnect(state) {
      state.isConnected = false;
    },
    setTitle(state, title) {
      state.title = title;
      document.title = `${title ? `${title} - ` : ''}${config('title', 'Obelix')}`;
    },
    setTester(state, isTester) {
      state.isTester = isTester;
      localStorage.setItem('tester', isTester);
    },
    setVersion(state, version) {
      state.version = version;
      localStorage.setItem('version', version);
    },
  },

  actions: {},
});

// register socket.io subscriptions
subscribe(store);

export default store;
