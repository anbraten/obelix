import auth from '@/libs/auth';
import Debug from '@/libs/debug';
import Sentry from '@/libs/sentry';

const debug = Debug('store-auth');

const KEY_REDIRECT_URL = 'redirect_url';

export default {
  namespaced: true,

  state: {
    redirectUrl: localStorage.getItem(KEY_REDIRECT_URL) || null,
    user: null,
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    accessToken: (state) => (state.user && state.user.access_token) || null,
    userFullName: (state) => (state.user && state.user.profile && state.user.profile.name) || null,
  },

  mutations: {
    setUser(state, user) {
      if (user === null) {
        debug('user unset');
      } else {
        // set sentry user data
        if (user.profile && user.profile.email) {
          Sentry.setUser({ email: user.profile.email });
        }

        debug('user set');
      }
      state.user = user;
    },
    setRedirectUrl(state, redirectUrl) {
      state.redirectUrl = redirectUrl;
      localStorage.setItem(KEY_REDIRECT_URL, redirectUrl);
    },
  },

  actions: {
    async authenticate({ state }) {
      // already authenticated
      if (state.user) {
        return;
      }

      await auth.signinRedirect();
    },

    async loadUser({ commit, state }) {
      // skip if user already loaded
      if (state.user) {
        // debug('user already loaded');
        return;
      }

      try {
        const user = await auth.getUser();
        // debug('get user done');
        commit('setUser', user);
      } catch (err) {
        debug(err);
      }
    },

    async singInCallback() {
      await auth.signinRedirectCallback();
    },

    async logout() {
      await auth.signoutRedirect();
    },
  },
};
