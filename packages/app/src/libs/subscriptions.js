import Api from '@/libs/api';
import Auth from '@/libs/auth';
import Debug from '@/libs/debug';

const debug = Debug('subscriptions');

export default async (store) => {
  // general socket listeners
  Api.on('connect', async () => {
    debug('api connected');

    if (store.getters['auth/isAuthenticated']) {
      Api.emit('authenticate', { token: store.getters['auth/accessToken'] });
      debug('api authentication requested');
    }
  });

  Api.on('authenticated', () => {
    // api is marked as properly connected after successfull authentication
    store.commit('connect');
    debug('api authenticated');
  });

  Api.on('unauthorized', async (msg) => {
    debug(`unauthorized: ${JSON.stringify(msg)}`);
    await store.dispatch('auth/logout');
  });

  Api.on('disconnect', (reason) => {
    debug(`api disconnected, reason: ${reason}`);
    store.commit('disconnect');
  });

  // auth listeners
  Auth.events.addUserLoaded(async (user) => {
    debug(`user loaded ${user}`);
    // TODO: update user data?
  });

  Auth.events.addUserUnloaded(async () => {
    debug('user unloaded');
    await store.commit('auth/setUser', null); // clear user detail
  });

  Auth.events.addUserSignedOut(() => {
    debug('user singed out');
    store.commit('auth/setUser', null); // clear user details
  });

  Auth.events.addAccessTokenExpiring((...args) => {
    debug(`accesstoken expiring： ${args}`);
  });

  Auth.events.addAccessTokenExpired(async (...args) => {
    debug(`accesstoken expired: ${args}`);
    await store.dispatch('auth/logout');
  });

  Auth.events.addSilentRenewError((...args) => {
    debug(`silent token renew error：${args}`);
  });
};
