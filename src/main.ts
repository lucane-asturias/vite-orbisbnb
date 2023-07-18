import { createApp } from 'vue'
import router from './router'
import apolloClient from './includes/apollo-config'
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue'
import './tailwind.css'

createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .mount('#app');