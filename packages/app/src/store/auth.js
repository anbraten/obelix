import Auth from '@/libs/auth';

export default {
  namespaced: true,

  state: {
  },

  getters: {
    isAuthenticated: () => Auth.isAuthenticated || false,
    accessToken: () => Auth.accessToken || null,
    userFullName: () => (Auth.userProfile && Auth.userProfile.given_name) || null,
    profile: () => Auth.userProfile || null,
  },

  mutations: {
  },

  actions: {
    async logout() {
      await Auth.signOut();
    },
  },
};
