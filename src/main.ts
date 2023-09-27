// import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');

import '../node_modules/ant-design-vue/dist/reset.css';
