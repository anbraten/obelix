import { createApp } from 'vue';

import router from './router';
import App from './App.vue';
import Oruga from './libs/oruga';

const app = createApp(App);
app.use(router);
Oruga(app);
app.mount('#app');
