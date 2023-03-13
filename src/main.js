import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta';
import { TroisJSVuePlugin } from 'troisjs';


/* Styles */
import './styles/global.css'
import './styles/layouts.css'

import './assets/NeueMachina/stylesheet.css'
import './assets/Benton/stylesheet.css' 

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

createApp(App).use(router, TroisJSVuePlugin, VueMeta).mount('#app')
