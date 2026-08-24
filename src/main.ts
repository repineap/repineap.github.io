import { createApp } from 'vue'

import '@fontsource-variable/source-serif-4/wght.css'
import '@fontsource-variable/source-serif-4/wght-italic.css'
import './styles/tokens.css'
import './styles/base.css'

import App from './App.vue'
import PhotoGallery from './components/PhotoGallery.vue'
import router from './router'

// Markdown bodies compile to components with no imports of their own, so any
// component a body may use has to be registered globally.
createApp(App).use(router).component('PhotoGallery', PhotoGallery).mount('#app')
