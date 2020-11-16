import { vuexOidcCreateStoreModule } from 'vuex-oidc';
import config from '@/libs/config';
import Debug from '@/libs/debug';

const debug = Debug('Auth');

const APP_URL = `${window.location.protocol}//${window.location.host}${process.env.BASE_URL}`;
const OIDC_URL = config('oidc_url');
const OIDC_CLIENT_ID = config('oidc_client_id');

if (!OIDC_URL || !OIDC_CLIENT_ID) {
  debug('OIDC is not properly configured!');
}

const oidcSettings = {
  authority: OIDC_URL,
  clientId: OIDC_CLIENT_ID,
  scope: 'openid profile email',
  // responseType: 'id_token token',
  responseType: 'code',
  automaticSilentSignin: false,
  redirectUri: `${APP_URL}/auth/callback`,
  automaticSilentRenew: true,
  // silentRedirectUri: `${APP_URL}/silent-renew-oidc.html`,
  postLogoutRedirectUri: `${APP_URL}/`,
};

debug('oidc settings', oidcSettings);

export default vuexOidcCreateStoreModule(
  oidcSettings,
  {
    namespaced: true,
  },
  {
    userLoaded: (user) => debug('OIDC user is loaded:', user),
    userUnloaded: () => debug('OIDC user is unloaded'),
    accessTokenExpiring: () => debug('Access token will expire'),
    accessTokenExpired: () => debug('Access token did expire'),
    silentRenewError: () => debug('OIDC user is unloaded'),
    userSignedOut: () => debug('OIDC user is signed out'),
    oidcError: (payload) => debug('OIDC error', payload),
  },
);
