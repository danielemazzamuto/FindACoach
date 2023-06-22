// import { createApp, defineAsyncComponent } from 'vue';
import { createApp } from 'vue';

import router from './router.js';
import store from './store/index.js';

import BaseCard from './components/ui/BaseCard.vue';
import BaseButton from './components/ui/BaseButton.vue';
import BaseBadge from './components/ui/BaseBadge.vue';
import BaseSpinner from './components/ui/BaseSpinner.vue';
import BaseDialog from './components/ui/BaseDialog.vue';
// async component - only loaded when needed
// const BaseDialog = defineAsyncComponent(() =>
//   import('./components/ui/BaseSpinner.vue')
// );
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
