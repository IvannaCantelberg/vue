import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

import '../node_modules/ant-design-vue/dist/reset.css';

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(Antd)
  .component(MenuUnfoldOutlined.name, MenuUnfoldOutlined)
  .component(MenuFoldOutlined.name, MenuFoldOutlined)
  .mount('#app');
