import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueMeta from 'vue-meta';
import { TroisJSVuePlugin } from 'troisjs';


/* Styles */
import './styles/style.css'
import './styles/global.css'
import './styles/layouts.css'

import './assets/NeueMachina/stylesheet.css'
import './assets/Benton/stylesheet.css' 
import './assets/Montreal/stylesheet.css' 

import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
 
import { library } from '@fortawesome/fontawesome-svg-core' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 
import { faArrowUp, faAsterisk, faChevronUp } from '@fortawesome/free-solid-svg-icons' 
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

library.add(faAsterisk, faInstagram, faLinkedinIn, faArrowUp, faChevronUp)

createApp(App)
.use(router, TroisJSVuePlugin, VueMeta)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
