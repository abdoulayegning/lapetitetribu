import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {path: '/', component: () => import('../views/Home.vue'), name: 'Home'},
    {path: '/work', component: () => import('../views/Work.vue'), name: 'Work'}, 
    {path: '/:slug', component: () => import('../views/Project.vue'), name: 'Project'},  
    {path: '/brief', component: () => import('../views/Brief.vue'), name: 'Brief'},
    {path: '/success', component: () => import('../views/Success.vue'), name: 'Succes'},
    {path: '/:pathMatch(.*)*', component:  () => import('../views/NotFound.vue'), name: 'NotFound'}, 
]

const router = createRouter({ 
    routes: routes, 
    history: createWebHistory()
})

export default router
