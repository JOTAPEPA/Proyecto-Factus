import login from '../components/login.vue'
import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [

    {
        path: '/',
        name:'login',
        component: login}
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})