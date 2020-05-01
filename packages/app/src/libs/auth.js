import Oidc from 'oidc-client';
import config from '@/libs/config';

const APP_URL = config('APP_URL', 'http://localhost:8080');

const mgr = new Oidc.UserManager({
  authority: 'https://auth.rzab.de/auth/realms/rzab',
  client_id: 'obelix',
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
//   // console.log('AccessToken Expiring：', arguments);
// });

// mgr.events.addAccessTokenExpired(function () {
//   mgr.signoutRedirect().then(function (resp) {
//     store.commit('set_user', null); //clear user details in vuex
//   }).catch(function (err) {
//     console.log(err)
//   })
// });

// mgr.events.addSilentRenewError(function () {
//   console.error('Silent Renew Error：', arguments);
// });

// mgr.events.addUserSignedOut(function () {
//   mgr.signoutRedirect().then(function (resp) {
//     store.commit('set_user', null); //clear user details in vuex
//   }).catch(function (err) {
//     console.log(err)
//   })
// });

export default mgr;
