import { createApp } from 'vue'
import Datepicker from '@vuepic/vue-datepicker';
import App from './App.vue'
import router from './router'
import store from './store'
import BaseSelect from './components/BaseSelect.vue';
import './styles/helper-classes.scss';
import './styles/typography.scss';
import './styles/base.scss';
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

app
  .component('BaseSelect', BaseSelect)
  .component('Datepicker', Datepicker)
  .use(store)
  .use(router)
  .mount('#app');
