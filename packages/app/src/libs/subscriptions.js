import { DialogProgrammatic as Dialog } from 'buefy';

import Api from '@/libs/api';
import Debug from '@/libs/debug';
import Sentry from '@/libs/sentry';

const debug = Debug('subscriptions');

export default async (store) => {
  // general socket listeners
  Api.on('connect', async () => {
    debug('api connected');

    if (store.getters['oidc/oidcIsAuthenticated']) {
      Api.emit('authenticate', { token: store.state.oidc.access_token });
      debug('api authentication requested');
    }
  });

  Api.on('authenticated', () => {
    // api is marked as properly connected after successful authentication
    store.commit('connect');
    store.dispatch('rental/getUser');
    debug('api authenticated');
  });

  Api.on('unauthorized', async (msg) => {
    debug(`unauthorized: ${JSON.stringify(msg)}`);
    await store.dispatch('oidc/signOutOidc');
  });

  Api.on('disconnect', (reason) => {
    debug(`api disconnected, reason: ${reason}`);
    store.commit('disconnect');
  });

  Api.on('access', (access) => {
    debug(`api access ${access}`);
    if (access === 'denied') {
      Dialog.alert({
        title: 'Access denied',
        message: 'Dir wurde der Zugriff auf Obelix verwehrt.<br>Du kannst einen Administrator um Zugriff bitten.',
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true,
      });
    }
  });

  // isAuthenticated => connect api
  store.watch(
    (state, getters) => getters['oidc/oidcIsAuthenticated'],
    (isAuthenticated) => {
      if (isAuthenticated) {
        Api.open();
      }
    },
  );

  // user profile set => set sentry user
  store.watch(
    (state, getters) => getters['oidc/oidcUser'],
    (user) => {
      if (user && user.email) {
        Sentry.setUser({ email: user.email });
      }
    },
  );
};
