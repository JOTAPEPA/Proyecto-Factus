<<<<<<< HEAD
import SignIn from '../components/SignIn.vue';
import inicio from '../components/inicio.vue';
import { createWebHistory, createRouter } from 'vue-router';

const routes = [

    {path: '/', component: inicio},
    {path: '/signIn', component: SignIn}
=======
import login from '../components/login.vue'
import { createWebHashHistory, createRouter } from 'vue-router';

const routes = [

    {
        path: '/',
        name:'login',
        component: login}
>>>>>>> 883e1ed352f387d44fce60f83e4a2082972e8d09
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})