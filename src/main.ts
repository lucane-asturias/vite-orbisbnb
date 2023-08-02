import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from './includes/apollo-config'
import VeeValidatePlugin from './includes/validation'
import { i18n } from './includes/i18n'
import App from './App.vue'
import './tailwind.css'

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(i18n)
  .use(createPinia())
  .use(router)
  .use(VeeValidatePlugin)
  .mount('#app');