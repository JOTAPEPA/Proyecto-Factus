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
import { ref, onMounted } from 'vue'
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
        name: 'names',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row.names,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'identificationDocumentId', align: 'center', label: 'Tipo de documento', field: 'identificationDocumentId', sortable: true },
    { name: 'identification', label: 'Identificacion', field: 'identification', sortable: true },
    { name: 'email', label: 'Correo', field: 'email' },
    { name: 'phone', label: 'Telefono', field: 'phone' },
]



const rows = ref([])

const tiposDeOrganizacion = [
    { id: 1, name: 'Persona Jurídica' },
    { id: 2, name: 'Persona Natural' },
]

const cambioDeOrganizacion = () => {
    if (NuevoCliente.value.legalOrganizationId === 1) {
        // Si es Persona Jurídica, vaciar el campo 'names'
        NuevoCliente.value.names = '';
    } else {
        // Si es Persona Natural, vaciar campos de empresa y nombre comercial
        NuevoCliente.value.company = '';
        NuevoCliente.value.tradeName = '';
    }
}

const tiposDeDocumento = ref([
    { label: 'Registro civil', value: 1 },
    { label: 'Tarjeta de identidad', value: 2 },
    { label: 'Cédula de ciudadanía', value: 3 },
    { label: 'Tarjeta de extranjería', value: 4 },
    { label: 'Cédula de extranjería', value: 5 },
    { label: 'NIT', value: 6 },
    { label: 'Pasaporte', value: 7 },
    { label: 'Documento de identificación extranjero', value: 8 },
    { label: 'PEP', value: 9 },
    { label: 'NIT otro país', value: 10 },
    { label: 'NUIP', value: 11 }
]);


const tributeOptions = ref([
    { label: 'IVA', value: 18 },
    { label: 'No aplica', value: 21 }
]);

const getMunicipalityOptions = async () => {
    try {

        const response = await getData('/v1/municipalities?name=&code=');
        if (response.data && Array.isArray(response.data)) {
            municipalityOptions.value = response.data.map(item => ({
                label: item.name, value: item.id
            }));    
        } else {
            console.error('Estructura inesperada en la respuesta:', response.data);
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

async function getClientes() {
    try {
        const response = await getDataBackend('customers');
        rows.value = response;
        console.log(response);
    } catch (error) {

        console.error('Error cargando clientes:', error);
    }
}

const NuevoCliente = ref({
    legalOrganizationId: null,
    identificationDocumentId: null,
    identification: '',
    dv: '',
    names: '',
    addres: '',
    email: '',
    phone: '',
    company: '',
    tradeName: '',
    tributeId: '',
    municipalityId: null,
})



const postCliente = async () => {
    const newCustomer = {
        ...NuevoCliente.value,
        identification: String(NuevoCliente.value.identification),
        municipalityId: Number(NuevoCliente.value.municipalityId),
        legalOrganizationId: Number(NuevoCliente.value.legalOrganizationId),
        tributeId: Number(NuevoCliente.value.tributeId),
        identificationDocumentId: Number(NuevoCliente.value.identificationDocumentId),
    };

    try {

        const response = await postDataBackend('customers', newCustomer);
        console.log(response);

        dialog.value = false;
        await getClientes();
    } catch (error) {
        console.error('Error al guardar cliente:', error);
    }
};


onMounted(async () => {
    await getMunicipalityOptions();
    await getClientes()
});
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