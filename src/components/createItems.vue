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
            <div class="container">
                <div id="containerProductos">
                    <h3>Ingresar Producto</h3>
                    <div id="formularioProductos">
                        <div id="columnasProductos">
                            <q-input outlined v-model="nombreProducto" label="Nombre del producto" style=" width: 250px;"/>
                            <q-input outlined type="number" v-model="precioProducto" label="Precio del producto" style="margin: 30px; width: 250px;"/>
                            <q-input outlined v-model="impuestoAplicado" label="Impuesto a aplicar" style=" width: 250px;"/>
                        </div>
                        <div id="columnasProductos">
                            <q-input outlined v-model="cantidadProducto" label="Cantidad del producto" style=" width: 250px;" />
                            <q-input outlined v-model="descripcionProducto" label="Descripcion del producto" style="margin: 30px; width: 250px;" />
                            <q-input outlined v-model="porcentajeImpuesto" label="Porcentaje de impuesto a aplicar" style=" width: 250px;" />
                        </div>
                    </div>
                    <q-btn @click="crearProducto" label="Crear Producto" style="margin-bottom: 50px;"/>
                </div>
            </div>
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const nombreProducto = ref('')
const precioProducto = ref('')
const cantidadProducto = ref('')
const descripcionProducto = ref('')

const crearProducto = () => {
    // Lógica para crear producto
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

#containerProductos {
    width: 50%;
    text-align: center;
    background-image: url('https://www.blogdelfotografo.com/wp-content/uploads/2021/12/fondo_blanco_gris.webp');
    background-size: cover;
}

#formularioProductos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    
    
    
}

#columnasProductos{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}



</style>