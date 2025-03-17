import login from '../views/login.vue'
import home from '../views/home.vue'
import { createWebHashHistory, createRouter } from 'vue-router';
import createFactura from '../views/createFactura.vue';
import items from '../views/productos.vue';

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
    },

    {
        path:'/createFactura',
        name:'createFactura',
        component: createFactura
    },
    {
        path:'/items',
        name:'items',
        component: items
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})