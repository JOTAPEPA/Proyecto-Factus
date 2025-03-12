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
            <q-tabs align="center">
                <q-route-tab to="/createFactura" label="Crear Factura" />
                <q-route-tab to="/createItems" label="Crear Items" />
                <q-route-tab to="/page3" label="Page Three" />
            </q-tabs>
        </q-header>

        <q-page-container>
           
            <div class="container">
                <h3 style="text-align: center; padding: 20px;">Ingresar Producto</h3>
                <div id="formularioProductos">
                    <div id="columnasProductos">
                        <q-input outlined v-model="codeReference" label="Código de Referencia" class="custom-input" />
                        <q-input outlined v-model="name" label="Nombre del producto" class="custom-input" />
                        <q-input outlined type="number" v-model="price" label="Precio del producto" class="custom-input" />
                    </div>
                    <div id="columnasProductos">
                        <q-input outlined v-model="quantity" label="Cantidad" class="custom-input" />
                        <q-input outlined v-model="unit_measure_id" label="Unidad de medida" class="custom-input" />
                        <q-input outlined v-model="tax_rate" label="Tasa de impuesto (%)" class="custom-input" />
                    </div>
                    <div id="columnasProductos">
                        <q-select outlined v-model="is_excluded" :options="['Sí', 'No']" label="Excluido de impuesto" class="custom-input" />
                        <q-input outlined v-model="standard_code_id" label="Codigo Estandar" class="custom-input" />
                        <q-input outlined v-model="tribute_id" label="Tributo" class="custom-input" />
                    </div>
                </div>
                <div style="display: flex; justify-content: center;">
                    <q-btn @click="crearProducto" label="Crear Producto" style="width: 180px; height: 50px;" />
                </div>
            </div>
        </q-page-container>

    </q-layout>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const NuevoProducto = ref({
    codeReference: '',
    name: '',
    price: '',
    quantity: '',
    unit_measure_id: '',
    tax_rate: '',
    is_excluded: '',
    standard_code_id: '',
    tribute_id: ''
})

const postClient = async () => {
    try {
        NuevoProducto.value.codeReference = NuevoProducto.value.codeReference.trim();
        NuevoProducto.value.name = NuevoProducto.value.name.trim();
        NuevoProducto.value.price = NuevoProducto.value.price.trim();
        NuevoProducto.value.quantity = NuevoProducto.value.quantity.trim();
        NuevoProducto.value.unit_measure_id = NuevoProducto.value.unit_measure_id.trim();
        NuevoProducto.value.tax_rate = NuevoProducto.value.tax_rate.trim();
        NuevoProducto.value.is_excluded = NuevoProducto.value.is_excluded.trim();
        NuevoProducto.value.standard_code_id = NuevoProducto.value.standard_code_id.trim();
        NuevoProducto.value.tribute_id = NuevoProducto.value.tribute_id.trim()

        console.log(NuevoProducto.value);
        
    } catch (error){

    }
}
</script>

<style>
.container {
    min-height: auto;
    display: grid;
}

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

#formularioProductos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
    margin: 20px;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#columnasProductos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.custom-input {
    width: 350px;
    margin: 10px 0;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>