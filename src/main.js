import { createApp } from 'vue'
import './assets/styles/style.css'
import App from './App.vue'

// plugins
import '@coddicat/vue-pinch-scroll-zoom/style.css';

const app = createApp(App);
app.mount('#app')
