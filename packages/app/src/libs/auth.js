import Vue from 'vue';
import { createOidcAuth, SignInType, LogLevel } from 'vue-oidc-client';
import { WebStorageStateStore } from 'oidc-client';

import config from '@/libs/config';
import Debug from '@/libs/debug';

const debug = Debug('Auth');

const APP_URL = `${window.location.protocol}//${window.location.host}${process.env.BASE_URL}`;
const OIDC_URL = config('oidc_url');
const OIDC_CLIENT_ID = config('oidc_client_id');

if (!OIDC_URL || !OIDC_CLIENT_ID) {
  debug('OIDC is not properly configured!');
}

const settings = {
  authority: OIDC_URL,
  client_id: OIDC_CLIENT_ID,
  // response_type: 'id_token token',
  response_type: 'code',
  scope: 'openid profile email',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const mainOidc = createOidcAuth('main', SignInType.Window, APP_URL, settings, console, LogLevel.Error);

Vue.prototype.$oidc = mainOidc;

export default mainOidc;
