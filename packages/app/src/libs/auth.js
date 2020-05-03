import Oidc from 'oidc-client';
import config from '@/libs/config';
// import Debug from '@/libs/debug';

// const debug = Debug('Subscriptions');

const APP_URL = config('url', 'http://localhost:8080');
const OIDC_URL = config('oidc_url');
const OIDC_CLIENT_ID = config('oidc_client_id');

if (!OIDC_URL || !OIDC_CLIENT_ID) {
  console.error('OIDC is ot properly configured!');
}

const mgr = new Oidc.UserManager({
  authority: OIDC_URL,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: `${APP_URL}/auth/callback`,
  response_type: 'code',
  scope: 'openid profile offline_access api1',
  post_logout_redirect_uri: `${APP_URL}/`,
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),

  automaticSilentRenew: true,
  silent_redirect_uri: `${APP_URL}/static/silent-renew.html`,
  accessTokenExpiringNotificationTime: 10,
  filterProtocolClaims: true,
  // loadUserInfo: true,
});

// Oidc.Log.logger = console;
// Oidc.Log.level = Oidc.Log.INFO;

// mgr.events.addUserLoaded(async function (user) {
//   await store.dispatch('refreshUserInfo');
//   await store.dispatch('ensureUserIsKnown');
// });

// mgr.events.addAccessTokenExpiring(function () {
//   // debug('AccessToken Expiring：', arguments);
// });

// mgr.events.addAccessTokenExpired(function () {
//   mgr.signoutRedirect().then(function (resp) {
//     store.commit('set_user', null); //clear user details in vuex
//   }).catch(function (err) {
//     debug(err)
//   })
// });

// mgr.events.addSilentRenewError(function () {
//   console.error('Silent Renew Error：', arguments);
// });

// mgr.events.addUserSignedOut(function () {
//   mgr.signoutRedirect().then(function (resp) {
//     store.commit('set_user', null); //clear user details in vuex
//   }).catch(function (err) {
//     debug(err)
//   })
// });

export default mgr;
