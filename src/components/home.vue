<template>
    <q-layout view="hHh lpR fFf">

        <q-header height-hint="98" id="headerHome">
            <q-toolbar>
                <q-toolbar-title id="titleBar">
                    <q-avatar>
                    </q-avatar>
                    Factus
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const menuVisible = ref(false)
const leftDrawerOpen = ref(false)
const router = useRouter()

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const navigateTo = (path) => {
    menuVisible.value = !menuVisible.value
    router.push(path)
}
</script>

<style>
#titleBar {
    display: flex;
    justify-content: center;
}

#headerHome {
    background-color: rgb(170, 196, 230);
    color: black;
}

#desplegableFacturas{
    background-color:rgb(170,196,230) ;
    height: 100%;
    border: none;
    text-align: center;
    border-radius: 0;
}

#desplegableFacturas option{
    background-color:rgb(170,196,230) ;
    text-align: center;
    border-radius:0px ;
    border-radius: 0;
}
</style>