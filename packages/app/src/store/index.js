import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/libs/config';
import subscribe from '@/libs/subscriptions';

import Auth from './auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: Auth,
  },

  state: {
    isConnected: false,
    title: null,
    isTester: localStorage.getItem('tester') === 'true' || false,
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
  },

  actions: {},
});

// register socket.io subscriptions
subscribe(store);

export default store;
