import { createApp } from 'vue'

import '@fontsource-variable/source-serif-4/wght.css'
import '@fontsource-variable/source-serif-4/wght-italic.css'
import './styles/tokens.css'
import './styles/base.css'

import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
