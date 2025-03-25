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
                <q-btn label="Maximized" color="primary" @click="dialog = true" />

                <q-dialog v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up"
                    transition-hide="slide-down">
                    <q-card class="bg-primary text-white">
                        <q-bar>
                            <q-space />
                            <q-btn dense flat icon="close" v-close-popup>
                                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                            </q-btn>
                        </q-bar>

                        <q-card-section>
                            <div class="text-h6">Crear Factura</div>
                        </q-card-section>

                        <q-card-section class="q-pt-none">
                            <h5 style="text-align: center;">Cliente</h5>
                            <div class="cliente">
                                <div>
                                    <q-input outlined v-model="typeOfPerson" label="Tipo de cliente" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El tipo de cliente es obligatorio']" />

                                    <q-input outlined v-model="typeOfIdentification" label="Tipo de identificacion"
                                        filled class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El tipo de identificacion es obligatorio']" />

                                    <q-input outlined v-model="identification" label="numero de identificacion" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El numero de identificacion es obligatorio']" />

                                    <q-input outlined v-model="names" label="Nombre" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El numero de identificacion es obligatorio']" />

                                </div>

                                <div>
                                    <q-input outlined v-model="names" label="Nombre" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El numero de identificacion es obligatorio']" />

                                    <q-input outlined v-model="addres" label="Direccion" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El numero de identificacion es obligatorio']" />

                                    <q-input outlined v-model="email" label="Correo electronico" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El numero de identificacion es obligatorio']" />

                                    <q-input outlined v-model="phone" label="Telefono" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El numero de identificacion es obligatorio']" />
                                </div>

                                <div>
                                    <q-input outlined v-model="dv" label="dv" filled class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />

                                    <q-input outlined v-model="company" label="Compañia" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />

                                    <q-input outlined v-model="tradeName" label="Trade Name" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />

                                    <q-input outlined v-model="tradeName" label="Trade Name" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />

                                </div>

                                <div>
                                    <q-input outlined v-model="legalOrganizationId" label="Id de organizacion" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />

                                    <q-input outlined v-model="tributeId" label="Tributo" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />

                                    <q-input outlined v-model="municipalityId" label="Municipio" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />


                                </div>
                            </div>
                            <h5 style="text-align: center;">Productos</h5>
                            <div class="Productos">

                            </div>
                        </q-card-section>
                    </q-card>
                </q-dialog>
            </div>

            <div class="q-pa-md">
                <q-table style="height: 400px" flat bordered title="Treats" :rows="rows" :columns="columns"
                    row-key="index" virtual-scroll v-model:pagination="pagination" :rows-per-page-options="[0]" />
            </div>


        </q-page-container>

    </q-layout>

</template>
<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const maximizedToggle = ref(true)

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

.cliente {
    display: flex;
    justify-content: center;
}
</style>