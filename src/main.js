import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { TroisJSVuePlugin } from 'troisjs';


/* Styles */
import './style.css'
import './assets/NeueMachina/stylesheet.css'
import './assets/Benton/stylesheet.css'
import './assets/FKGrotesk/stylesheet.css'

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

createApp(App).use(router, TroisJSVuePlugin).mount('#app')
