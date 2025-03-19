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
                <q-route-tab to="/factura" label="Crear Factura" />
                <q-route-tab to="/productos" label="Crear Items" />
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
import { useRouter } from 'vue-router'

const router = useRouter()


</script>

<style>

</style>