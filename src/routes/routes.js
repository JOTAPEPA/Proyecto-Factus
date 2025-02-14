import login from '../components/login.vue'
import inicio from '../components/inicio.vue';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [

    {path: '/', component: inicio},
    {path: '/login', component: login}
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})