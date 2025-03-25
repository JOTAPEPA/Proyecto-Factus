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
                <q-route-tab to="/clientes" label="Clientes" />
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
                            <h5 style="text-align: center;">Cliente</h5>
                            <div class="cliente">
                                <div>
                                    <q-input outlined v-model="NuevaFactura.legalOrganizationId" label="Tipo de cliente"
                                        filled class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El tipo de cliente es obligatorio']" />

                                    <q-input outlined v-model="NuevaFactura.identificationDocumentId"
                                        label="Tipo de identificacion" filled class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El tipo de identificacion es obligatorio']" />

                                    <q-input outlined v-model="NuevaFactura.identification"
                                        label="numero de identificacion" filled class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El numero de identificacion es obligatorio']" />

                                    <q-input outlined v-model="NuevaFactura.dv" label="dv" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El dv es obligatorio']" />

                                </div>

                                <div>
                                    <q-input outlined v-model="NuevaFactura.names" label="Nombre" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El nombre es obligatorio']" />

                                    <q-input outlined v-model="NuevaFactura.addres" label="Direccion" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'La direccion es obligatoria']" />

                                    <q-input outlined v-model="NuevaFactura.email" label="Correo electronico" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El correo electronico es obligatorio']" />

                                    <q-input outlined v-model="NuevaFactura.phone" label="Telefono" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El telefono es obligatorio']" />
                                </div>

                                <div>
                                    <q-input outlined v-model="NuevaFactura.company" label="Compañia" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'La compañia es obligatoria']" />

                                    <q-input outlined v-model="NuevaFactura.tradeName" label="Trade Name" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El trade name es obligatorio']" />

                                    <q-input outlined v-model="NuevaFactura.tributeId" label="Tributo" filled
                                        class="custom-input" type="String"
                                        :rules="[val => val && val.length > 0 || 'El tributo es obligatorio']" />

                                    <q-select outlined v-model="NuevaFactura.municipalityId"
                                        :options="municipalityOptions" label="Municipio" filled class="custom-input"
                                        type="String"
                                        :rules="[val => val && val.length > 0 || 'El municipio es obligatorio']" />
                                </div>

                            </div>
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn flat label="Close" color="primary" v-close-popup />
                            <q-btn flat label="Crear" color="primary" @click="postFactura" :disable="!formValido" />
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
import { ref, onMounted, computed } from 'vue'
import { getData } from '../services/apiClient.js'
import { getDataBackend, postDataBackend } from '../services/apiClientBackend.js'

const dialog = ref(false)
const backdropFilter = ref(null)
const municipalityOptions = ref([])

const list = [
    'Ingresar Producto',
]

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

const NuevaFactura = ref({
    legalOrganizationId: '',
    identificationDocumentId: '',
    identification: '',
    dv: '',
    names: '',
    addres: '',
    email: '',
    phone: '',
    company: '',
    tradeName: '',
    tributeId: '',
    municipalityId: ''
})

const formValido = computed(() => {
    return NuevaFactura.value.legalOrganizationId &&
        NuevaFactura.value.identificationDocumentId &&
        NuevaFactura.value.identification &&
        NuevaFactura.value.dv &&
        NuevaFactura.value.names &&
        NuevaFactura.value.addres &&
        NuevaFactura.value.email &&
        NuevaFactura.value.phone &&
        NuevaFactura.value.company &&
        NuevaFactura.value.tradeName &&
        NuevaFactura.value.tributeId &&
        NuevaFactura.value.municipalityId
})

onMounted(async () => {
    await getMunicipalityOptions()
})

const postFactura = async () => {
    try {
        NuevaFactura.value.legalOrganizationId = (NuevaFactura.value.legalOrganizationId || '').trim();
        NuevaFactura.value.identificationDocumentId = (NuevaFactura.value.identificationDocumentId || '').trim();
        NuevaFactura.value.identification = (NuevaFactura.value.identification || '').trim();
        NuevaFactura.value.dv = (NuevaFactura.value.dv || '').trim();
        NuevaFactura.value.names = (NuevaFactura.value.names || '').trim();
        NuevaFactura.value.addres = (NuevaFactura.value.addres || '').trim();
        NuevaFactura.value.email = (NuevaFactura.value.email || '').trim();
        NuevaFactura.value.phone = (NuevaFactura.value.phone || '').trim();
        NuevaFactura.value.company = (NuevaFactura.value.company || '').trim();
        NuevaFactura.value.tradeName = (NuevaFactura.value.tradeName || '').trim();
        NuevaFactura.value.tributeId = (NuevaFactura.value.tributeId || '').trim();
        NuevaFactura.value.municipalityId = (NuevaFactura.value.municipalityId || '').trim();

        console.log(NuevaFactura.value);

        const response = await postDataBackend('factura', NuevaFactura.value);
        console.log('Factura creada con exito', response);
        dialog.value = false;

    } catch (error) {
        console.error('Error al crear la factura', error.response ? error.response.data : error);
    }
};

async function getMunicipalityOptions() {
    try {
        const response = await getData('/v1/municipalities?name=')
        if (response.data && Array.isArray(response.data)) {
            municipalityOptions.value = response.data.map(item => ({ label: item.name, value: item.id }));
            console.log("Municipios obtenidos", municipalityOptions.value);
        } else {
            console.error("La respuesta no contiene los datos esperados");
        }
    } catch (error) {
        console.log("Error al obtener los municipios", error.response ? error.response.data : error);
    }
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