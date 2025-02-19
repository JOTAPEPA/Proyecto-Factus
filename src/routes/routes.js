import login from '../components/login.vue'
import home from '../components/home.vue'
import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [

    {
        path: '/',
        name: 'login',
        component: login
    },
    {
        path: '/home',
        name: 'home',
        component: home
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})