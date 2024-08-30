import { createRouter, createWebHistory } from "vue-router";

const routes = [
    // Standard pages/vues
    {path: '/', component: () => import('../views/Home.vue'), name: 'Home'},
    {path: '/work', component: () => import('../views/Work.vue'), name: 'Work'}, 
    {path: '/:slug', component: () => import('../views/Project.vue'), name: 'Project'},  
    {path: '/brief', component: () => import('../views/Brief.vue'), name: 'Brief'},
    {path: '/contact', component: () => import('../views/Contact.vue'), name: 'Contact'},
    {path: '/:pathMatch(.*)*', component:  () => import('../views/NotFound.vue'), name: 'NotFound'}, 
    //Special Projects
    {path: '/wave-summer-xeweul', component: () => import('../views/Special/WaveSummerXeweul.vue'), name: 'WaveSummerXeweul'},

]

const router = createRouter({ 
    routes: routes, 
    history: createWebHistory()
})

export default router
