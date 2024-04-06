import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Work from '../views/Work.vue' 
import Project from '../views/Project.vue'
// import Temp from '../views/Temp.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/work', component: Work, name: 'Work'}, 
    {path: '/:slug', component: Project, name: 'Project'},  
    {path: '/brief', component: () => import('../views/Brief.vue'), name: 'Brief'},
    {path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound'}, 
]

const router = createRouter({ 
    routes: routes, 
    history: createWebHistory()
})

export default router
