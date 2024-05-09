import { createApp } from 'vue';
import App from './App.vue';
import robonomics from "./plugins/robonomics";

import './assets/styles/style.css';

// plugins
import '@coddicat/vue-pinch-scroll-zoom/style.css';

const app = createApp(App);
app.use(robonomics, {
  endpoint: "wss://kusama.rpc.robonomics.network/"
})
app.mount('#app')
