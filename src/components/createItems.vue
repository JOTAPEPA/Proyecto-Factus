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
                <nav id="opcionesNavegacion">
                    <ul>
                        <li>Facturas
                            <ul>
                                <li>Crear factura</li>
                                <li>Ver factura</li>
                            </ul>
                        </li>
                        <li>Productos
                            <ul>
                                <li>Agregar producto</li>
                                <li>Ver productos</li>
                            </ul>
                        </li>
                    </ul>
                </nav>
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