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
                <q-route-tab to="/createFactura" label="Crear Factura" />
                <q-route-tab to="/createItems" label="Crear Items" />
                <q-route-tab to="/page3" label="Page Three" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view />
            <div id="containerPrincipal">
                <h3>Ingresar Producto</h3>
                <div>
                    <q-input outlined v-model="nombreProducto" label="Nombre del producto" />
                    <q-input outlined v-model="precioProducto" label="Precio del producto" />
                    <q-input outlined v-model="cantidadProducto" label="Cantidad del producto" />
                    <q-input outlined v-model="descripcionProducto" label="Descripcion del producto" />
                    <q-btn @click="crearProducto" label="Crear Producto" />
                </div>

            </div>

        </q-page-container>

    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


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

#desplegableFacturas {
    background-color: rgb(170, 196, 230);
    height: 100%;
    border: none;
    text-align: center;
    border-radius: 0;
}

#desplegableFacturas option {
    background-color: rgb(170, 196, 230);
    text-align: center;
    border-radius: 0px;
    border-radius: 0;
}

#opcionesNavegacion ul {
    display: flex;
    list-style: none;

}
</style>