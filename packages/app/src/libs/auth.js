import Oidc from 'oidc-client';
import config from '@/libs/config';
import Debug from '@/libs/debug';

const debug = Debug('Auth');

const APP_URL = config('url', 'http://localhost:8080');
const OIDC_URL = config('oidc_url');
const OIDC_CLIENT_ID = config('oidc_client_id');

if (!OIDC_URL || !OIDC_CLIENT_ID) {
  debug('OIDC is not properly configured!');
}

const settings = {
  authority: OIDC_URL,
  client_id: OIDC_CLIENT_ID,
  redirect_uri: `${APP_URL}/auth/callback`,
  response_type: 'code',
  scope: 'openid profile email api1',
  post_logout_redirect_uri: `${APP_URL}/`,
  userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }),
  filterProtocolClaims: true,
  automaticSilentRenew: true,

  // silent_redirect_uri: `${APP_URL}/static/silent-renew.html`,
  // accessTokenExpiringNotificationTime: 10,
  // loadUserInfo: true,
};

const mgr = new Oidc.UserManager(settings);

// Oidc.Log.logger = console;
// Oidc.Log.level = Oidc.Log.INFO;

export default mgr;
