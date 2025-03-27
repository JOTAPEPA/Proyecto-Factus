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
                    <div>
                        <q-select outlined v-model="NuevoCliente.legalOrganizationId"
                            :options="tiposDeOrganizacion" option-value="id" option-label="name"
                            label="Tipo de persona" emit-value map-options filled class="custom-input"
                            :rules="[val => !!val || 'Este campo es requerido']"
                            @update:model-value="cambioDeOrganizacion" />
                    </div>

                    <div class="cliente">
                        <div>

                            <q-input v-if="NuevoCliente.legalOrganizationId === 1"
                                v-model="NuevoCliente.company" label="Razón Social" filled
                                class="custom-input" />

                            <q-input v-if="NuevoCliente.legalOrganizationId === 1"
                                v-model="NuevoCliente.tradeName" label="Nombre comercial" filled
                                class="custom-input" />

                            <q-input v-if="NuevoCliente.legalOrganizationId === 2" v-model="NuevoCliente.names"
                                label="Nombre completo" filled class="custom-input" />

                            <q-select outlined v-model="NuevoCliente.identificationDocumentId"
                                :options="tiposDeDocumento" label="Tipo de identificacion" filled emit-value
                                map-options class="custom-input"
                                :rules="[val => !!val || 'Este campo es requerido']" />

                            <q-input outlined v-model="NuevoCliente.identification" label="identificacion"
                                filled class="custom-input"
                                :rules="[val => !!val || 'Este campo es requerido']" />

                        </div>

                        <div>
                            <q-select outlined v-model="NuevoCliente.tributeId" :options="tributeOptions"
                                label="Tributo" filled class="custom-input" emit-value map-options
                                :rules="[val => !!val || 'Este campo es requerido']" />

                            <q-input outlined v-model="NuevoCliente.addres" label="Direccion" filled
                                class="custom-input" :rules="[val => !!val || 'Este campo es requerido']" />

                            <q-input outlined v-model="NuevoCliente.email" label="Correo electronico" filled
                                class="custom-input" :rules="[val => !!val || 'Este campo es requerido']" />


                        </div>

                        <div>

                            <q-input outlined v-model="NuevoCliente.phone" label="Telefono" filled
                                class="custom-input" type="tel"
                                :rules="[val => !!val || 'Este campo es requerido']" />

                            <q-select outlined v-model="NuevoCliente.municipalityId"
                                :options="municipalityOptions" label="Municipio" filled class="custom-input"
                                emit-value map-options type="String"
                                :rules="[val => val !== null || 'El municipio es obligatorio']" />
                        </div>

                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Close" color="primary" v-close-popup />
                    <q-btn flat label="Crear" color="primary" @click="postCliente" />
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
const maximizedToggle = ref(true)
const municipalityOptions = ref([])

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
</style>