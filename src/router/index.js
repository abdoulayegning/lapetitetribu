import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Work from '../views/Work.vue' 
import ViewProject from '../views/ViewProject.vue'
import Temp from '../views/Temp.vue'
const routes = [
    {path: '/', component: Home},
    {path: '/work', component: Work}, 
    {path: '/:slug', component: ViewProject}, 
    {path: '/temp', component: Temp}, 
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router
