import { createApp } from 'vue'
import Datepicker from '@vuepic/vue-datepicker';
import Vue3Lottie from 'vue3-lottie';
import App from './App.vue'
import router from './router'
import store from './store'
import BaseSelect from './components/BaseSelect.vue';
import BaseLoader from './components/BaseLoader.vue';
import './styles/helper-classes.scss';
import './styles/typography.scss';
import './styles/base.scss';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

app
  .component('BaseSelect', BaseSelect)
  .component('Datepicker', Datepicker)
  .component('BaseLoader', BaseLoader)
  .use(Vue3Lottie)
  .use(store)
  .use(router)
  .mount('#app');
