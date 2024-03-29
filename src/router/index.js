import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Work from '../views/Work.vue' 
import Project from '../views/Project.vue'
// import Temp from '../views/Temp.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/work', component: Work}, 
    {path: '/:slug', component: Project}, 
    // {path: '/temp', component: Temp}, 
    {path: '/brief', component: () => import('../views/Brief.vue')},
    {path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound'}, 
]

const router = createRouter({ 
    routes: routes, 
    history: createWebHistory()
})

export default router
