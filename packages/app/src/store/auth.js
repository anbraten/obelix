import auth from '@/libs/auth';

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
      state.user = user;
    },
    setRedirectUrl(state, redirectUrl) {
      state.redirectUrl = redirectUrl;
      localStorage.setItem(KEY_REDIRECT_URL, redirectUrl);
    },
  },

  actions: {
    async authenticate({ dispatch, commit }) {
      const user = await dispatch('getUser');

      if (user) {
        commit('setUser', user);
      } else {
        await auth.signinRedirect();
      }
    },

    async getUser({ commit }) {
      try {
        const user = await auth.getUser();
        commit('setUser', user);
      } catch (err) {
        console.log(err);
      }
    },

    async singInCallback() {
      await auth.signinRedirectCallback();
    },

    async logout() {
      await auth.signinRedirect();
      await auth.removeUser();
    },
  },
};
