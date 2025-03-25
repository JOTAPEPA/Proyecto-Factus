import login from '../views/login.vue'
import home from '../views/home.vue'
import { createWebHashHistory, createRouter } from 'vue-router';
import facturas from '../views/facturas.vue';
import productos from '../views/productos.vue';
import clientes from '../views/clientes.vue';

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
        path:'/facturas',
        name:'facturas',
        component: facturas
    },
    {
        path:'/productos',
        name:'productos',
        component: productos
    },

    {
        path: '/clientes',
        name: 'clientes',
        component: clientes

    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})