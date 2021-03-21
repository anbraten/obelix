import { createApp } from 'vue';

import App from '~/App.vue';
import { load as loadBackend } from '~/compositions/useBackend';
import Oruga from '~/libs/oruga';
import router from '~/router';

const app = createApp(App);
app.use(router);
Oruga(app);
app.mount('#app');

loadBackend();
