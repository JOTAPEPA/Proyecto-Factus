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
            <div class="q-pa-md q-gutter-sm">
                <q-btn v-for="filter in backdropFilterList" :key="filter.label" color="primary" :label="filter.label"
                    no-caps @click="filter.onClick" />

                <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
                    <q-card>
                        <q-card-section class="row items-center q-pb-none text-h6">
                            Dialog
                        </q-card-section>

                        <q-card-section>
                            This dialog has a backdrop filter of {{ backdropFilter }}.
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

// Lista de filtros para el fondo (backdrop-filter)
const list = [
    'Agregar factura',

]

const dialog = ref(false) // Controla la visibilidad del diálogo
const backdropFilter = ref(null) // El filtro de fondo seleccionado

// Genera la lista de filtros de fondo con una función de clic para aplicar el filtro
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
        field: row => row.codeReference,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'nombre del producto', align: 'center', label: 'Nombre del producto', field: 'name', sortable: true },
    { name: 'cantidad', label: 'Cantidad', field: 'quantity', sortable: true },
    { name: 'precio', label: 'Precio', field: 'price' },
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

#modalFacturas {
    display: flex;
    flex-direction: row-reverse;
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