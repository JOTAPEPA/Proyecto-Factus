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

            <q-tabs align="left">
                <q-tab name ="Facturas" label = "Facturas" @click="navigateTo('/facturas')">"
                    <q-item-section>Facturas</q-item-section>
                    </q-tab>
                 <q-route-tab to="/page2" label="Page Two" />
                <q-route-tab to="/page3" label="Page Three" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>



</template>

<script setup>
import { ref } from 'vue'

const menuVisible = ref(false)
const leftDrawerOpen = ref(false)


const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const navigateTo = (path) => {
    menuVisible.value = !menuVisible.value
}
</script>

<style>

#titleBar{
 display: flex;
 justify-content: center;
}
#headerHome{
 background-color: rgb(170,196,230);
 color: black;
}

</style>