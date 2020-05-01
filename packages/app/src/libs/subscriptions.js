import Api from '@/libs/api';

export default (store) => {
  // general socket listeners
  Api.on('connect', () => {
    store.commit('connect');

    if (store.getters['auth/isAuthenticated']) {
      Api.emit('authenticate', { token: store.getters['auth/accessToken'] });
    }
  });

  Api.on('authenticated', () => {
    console.log('Properly connected');
  });

  Api.on('unauthorized', async (msg) => {
    console.error(`unauthorized: ${JSON.stringify(msg.data)}`);
    // throw new Error(msg.data.type);
    await store.dispatch('auth/logout');
  });

  Api.on('disconnect', () => {
    store.commit('disconnect');
  });
};
