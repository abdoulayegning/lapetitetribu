import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Work from '../views/Work.vue' 

const routes = [
    {path: '/', component: Home},
    {path: '/work', component: Work}, 
]

const router = createRouter({
    routes: routes,
    history: createWebHistory()
})

export default router
