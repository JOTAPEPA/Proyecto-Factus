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
                <q-route-tab to="/facturas" label="Facturas" />
                <q-route-tab to="/productos" label="Productos" />
            </q-tabs>
        </q-header>

        <q-page-container>
            <div class="q-pa-md q-gutter-sm" id="modalItems">
                <q-btn style="background-color: rgb(0,62,133); color: white;" v-for="filter in backdropFilterList"
                    :key="filter.label" :label="filter.label" no-caps @click="filter.onClick" />

                <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
                    <q-card style="max-width: 100%;">
                        <q-card-section class="row items-center q-pb-none text-h6">
                        </q-card-section>

                        <q-card-section>
                            <div class="containerModalProductos">
                                <h3 style="text-align: center; padding: 20px; color:  rgb(0,62,133) ;">Ingresar Producto
                                </h3>
                                <div id="formularioProductos">
                                    <div id="columnasProductos">
                                        <q-input outlined v-model="NuevoProducto.codeReference"
                                            label="Código de Referencia" class="custom-input" />

                                        <q-input style="margin-top: 20px; margin-bottom: 20px;" outlined
                                            v-model="NuevoProducto.name" label="Nombre del producto"
                                            class="custom-input" />

                                        <q-input outlined type="number" v-model="NuevoProducto.price"
                                            label="Precio del producto" class="custom-input" />

                                        <q-input outlined v-model="NuevoProducto.discount_rate" label="Descuento (%)"
                                            class="custom-input" style="margin-top: 20px;" />
                                    </div>
                                    <div id="columnasProductos">
                                        <q-input outlined v-model="NuevoProducto.quantity" label="Cantidad"
                                            class="custom-input" />

                                        <q-select outlined v-model="NuevoProducto.unit_measure_id"
                                            :options="unitMeasureOptions" label="Unidad de medida"
                                            class="custom-input" />

                                        <q-input outlined v-model="NuevoProducto.tax_rate" label="Tasa de impuesto (%)"
                                            class="custom-input" />
                                    </div>
                                    <div id="columnasProductos">
                                        <q-select outlined v-model="NuevoProducto.is_excluded" :options="['Sí', 'No']"
                                            label="Excluido de impuesto" class="custom-input" />

                                        <q-input style="margin-top: 20px; margin-bottom: 20px;" outlined
                                            v-model="NuevoProducto.standard_code_id" label="Codigo Estandar"
                                            class="custom-input" />

                                        <q-select outlined v-model="NuevoProducto.tribute_id" :options="tributeOptions"
                                            label="Tributo" class="custom-input" />
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: center;">
                                    <q-btn :disable="!formValido" @click="postProducto" label="Crear Producto"
                                        style="width: 180px; height: 50px; background-color: rgb(0,62,133); color: white" />
                                </div>
                            </div>
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn flat label="Close" color="primary" v-close-popup />
                        </q-card-actions>
                    </q-card>
                </q-dialog>
            </div>

            <div class="q-pa-md">
                <q-table flat bordered :rows="rows" :columns="columns" row-key="name" />
            </div>

        </q-page-container>

    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'


const router = useRouter()

const list = [
    'Ingresar Producto',
]

const dialog = ref(false)
const backdropFilter = ref(null)

const backdropFilterList = list.map(filter => ({
    label: filter,
    onClick: () => {
        backdropFilter.value = filter
        dialog.value = true
    }
}))

const columns = [
    {
        name: 'numero',
        label: 'Numero',
        field: 'numero'
    },
    {
        name: 'codigo',
        required: true,
        label: 'codigo',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'nombre del producto', align: 'center', label: 'Nombre del producto', field: 'nombre', sortable: true },
    { name: 'cantidad', label: 'Cantidad', field: 'cantidad', sortable: true },
    { name: 'precio', label: 'Precio', field: 'precio' },
    { name: 'tax_rate', label: 'Tasa de impuesto (%)', field: 'tax_rate' },
]

const rows = ref([])


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