import login from '../components/login.vue'
import home from '../components/home.vue'
import { createWebHashHistory, createRouter } from 'vue-router';
import createFactura from '../components/createFactura.vue';
import createItem from '../components/createItems.vue';

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
        path:'/createItems',
        name:'createItem',
        component: createItem
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})