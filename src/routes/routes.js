import SignIn from '../components/SignIn.vue';
import inicio from '../components/inicio.vue';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [

    {path: '/', component: inicio},
    {path: '/signIn', component: SignIn}
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})