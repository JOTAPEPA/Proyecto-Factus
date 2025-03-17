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
<<<<<<< HEAD
                <q-route-tab to="/createFactura" label="Crear Factura" />
                <q-route-tab to="/createItems" label="Crear Items" />
=======
                <q-route-tab to="/factura" label="Crear Factura" />
                <q-route-tab to="/items" label="Crear Items" />
>>>>>>> fb9b2741e38fd130d7ad8eec33cb8cb8fb35255e
                <q-route-tab to="/page3" label="Page Three" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <router-view />
            <div class="container">
                <div id="containerProductos">
                    <h3>Crear Factura</h3>
                    <div>
                        <h4>Cliente</h4>
                        <div id="formularioProductos">
                            <div id="columnasProductos">
                                <q-input outlined v-model="nombreProducto" label="Nombre del producto"
                                    style=" width: 250px;" />
                                <q-input outlined type="number" v-model="precioProducto" label="Precio del producto"
                                    style="margin: 30px; width: 250px;" />
                                <q-input outlined v-model="impuestoAplicado" label="Impuesto a aplicar"
                                    style=" width: 250px;" />
                            </div>
                            <div id="columnasProductos">
                                <q-input outlined v-model="cantidadProducto" label="Cantidad del producto"
                                    style=" width: 250px;" />
                                <q-input outlined v-model="excluidoDeImpuesto" label="Excluido de impuestp"
                                    style="margin: 30px; width: 250px;" />
                                <q-input outlined v-model="porcentajeImpuesto" label="Porcentaje de impuesto a aplicar"
                                    style=" width: 250px;" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Producto</h4>
                        <div id="formularioProductos">
                            <div id="columnasProductos">
                                <q-input outlined v-model="nombreProducto" label="Nombre del producto"
                                    style=" width: 250px;" />
                                <q-input outlined type="number" v-model="precioProducto" label="Precio del producto"
                                    style="margin: 30px; width: 250px;" />
                                <q-input outlined v-model="impuestoAplicado" label="Impuesto a aplicar"
                                    style=" width: 250px;" />
                            </div>
                            <div id="columnasProductos">
                                <q-input outlined v-model="cantidadProducto" label="Cantidad del producto"
                                    style=" width: 250px;" />
                                <q-input outlined v-model="excluidoDeImpuesto" label="Excluido de impuestp"
                                    style="margin: 30px; width: 250px;" />
                                <q-input outlined v-model="porcentajeImpuesto" label="Porcentaje de impuesto a aplicar"
                                    style=" width: 250px;" />
                            </div>
                        </div>
                    </div>
                    <q-btn @click="crearProducto" label="Crear Producto" style="margin-bottom: 50px;" />
                </div>
            </div>
        </q-page-container>

        <div>

        </div>

    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


</script>

<style>
<<<<<<< HEAD
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
=======

</style>
>>>>>>> fb9b2741e38fd130d7ad8eec33cb8cb8fb35255e
