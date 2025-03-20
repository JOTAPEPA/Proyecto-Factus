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
            <div class="q-pa-md q-gutter-sm" id="modalFactura">
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
                                            label="Código de Referencia" filled class="custom-input"
                                            :rules="[val => val && val.length > 0 || 'El codigo de referencia es obligatorio']" />

                                        <q-input style="margin-top: 20px; margin-bottom: 20px;" outlined
                                            v-model="NuevoProducto.name" label="Nombre del producto" filled
                                            class="custom-input"
                                            :rules="[val => val && val.length > 0 || 'El nombre es obligatorio']" />

                                        <q-input outlined type="number" v-model="NuevoProducto.price"
                                            label="Precio del producto" filled class="custom-input"
                                            :rules="[val => val && val.length > 0 || 'El Precio es obligatorio']" />


                                        <q-input outlined v-model="NuevoProducto.discount_rate" label="Descuento (%)"
                                            filled class="custom-input" style="margin-top: 20px;"
                                            :rules="[val => val && val.length > 0 || 'El Descuento es obligatorio']" />
                                    </div>
                                    <div id="columnasProductos">
                                        <q-input outlined v-model="NuevoProducto.quantity" label="Cantidad" filled
                                            class="custom-input"
                                            :rules="[val => val && val.length > 0 || 'La cantidad es obligatoria']" />

                                        <q-select outlined v-model="NuevoProducto.unit_measure_id"
                                            :options="unitMeasureOptions" label="Unidad de medida" filled
                                            class="custom-input" style="margin-top: 20px; margin-bottom: 20px;" />

                                        <q-input outlined v-model="NuevoProducto.tax_rate" label="Tasa de impuesto (%)"
                                            filled class="custom-input"
                                            :rules="[val => val && val.length > 0 || 'La tasa de impuesto es obligatoria']" />
                                    </div>
                                    <div id="columnasProductos">    
                                        <q-select outlined v-model="NuevoProducto.is_excluded" :options="['Sí', 'No']"
                                            label="Excluido de impuesto" filled class="custom-input" />

                                        <q-input style="margin-top: 20px; margin-bottom: 20px;" outlined
                                            v-model="NuevoProducto.standard_code_id" label="Codigo Estandar" filled
                                            class="custom-input"
                                            :rules="[val => val && val.length > 0 || 'El codigo estandar es obligatorio']" />

                                        <q-select outlined v-model="NuevoProducto.tribute_id" :options="tributeOptions"
                                            label="Tributo" filled class="custom-input" />
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { administrador } from '../store/useAuth.js'
import { getDataBackend, postDataBackend } from '../services/apiClientBackend.js'
import { getData } from '../services/apiClient.js'

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

const NuevoProducto = ref({
    codeReference: '',
    name: '',
    price: '',
    quantity: '',
    unit_measure_id: '',
    tax_rate: '',
    is_excluded: '',
    standard_code_id: '',
    tribute_id: '',
    discount_rate: ''
})

const unitMeasureOptions = ref([])
const tributeOptions = ref([])

const store = administrador()

const formValido = computed(() => {
    return NuevoProducto.value.codeReference &&
        NuevoProducto.value.name &&
        NuevoProducto.value.price &&
        NuevoProducto.value.quantity &&
        NuevoProducto.value.unit_measure_id &&
        NuevoProducto.value.tax_rate &&
        NuevoProducto.value.is_excluded &&
        NuevoProducto.value.standard_code_id &&
        NuevoProducto.value.tribute_id &&
        NuevoProducto.value.discount_rate;
})

onMounted(async () => {
    await getProductos();
    await getUnitMeasureOptions();
    await getTributeOptions();
})

async function getProductos() {
    const token = store.getToken();
    console.log("token recuperado de la store", token);
    if (!token) {
        console.log("token no encontrado");
        return
    }

    try {
        const response = await getDataBackend('items', token);
        if (response && Array.isArray(response)) {
            rows.value = response;
        } else {
            console.log("La respuesta no contiene los datos esperados");
        }
    } catch (error) {
        console.log("Error al obtener los productos", error.response ? error.response.data : error);
    }
}

async function getUnitMeasureOptions() {
    try {
        const response = await getData('/v1/measurement-units');
        if (response.data && Array.isArray(response.data)) {
            unitMeasureOptions.value = response.data.map(item => ({ label: item.name, value: item.id }));
            console.log("Unidades de medida obtenidas:", unitMeasureOptions.value);
        } else {
            console.log("La respuesta no contiene los datos esperados");
        }
    } catch (error) {
        console.log("Error al obtener las unidades de medida", error.response ? error.response.data : error);
    }
}

async function getTributeOptions() {
    try {
        const response = await getData('/v1/tributes/products?name=&code=');
        if (response.data && Array.isArray(response.data)) {
            tributeOptions.value = response.data.map(item => ({ label: item.name, value: item.id }));
            console.log("Tributos obtenidos:", tributeOptions.value);
        } else {
            console.log("La respuesta no contiene los datos esperados");
        }
    } catch (error) {
        console.log("Error al obtener los tributos", error.response ? error.response.data : error);
    }
}

const postProducto = async () => {

    const token = store.getToken();
    if(!token){
        console.log("token no encontrado");
        return;
    }

    try {
        NuevoProducto.value.codeReference = (NuevoProducto.value.codeReference || '').trim();
        NuevoProducto.value.name = (NuevoProducto.value.name || '').trim();
        NuevoProducto.value.price = (NuevoProducto.value.price || '').trim();
        NuevoProducto.value.quantity = (NuevoProducto.value.quantity || '').trim();
        NuevoProducto.value.unit_measure_id = (NuevoProducto.value.unit_measure_id || '');
        NuevoProducto.value.tax_rate = (NuevoProducto.value.tax_rate || '').trim();
        NuevoProducto.value.is_excluded = (NuevoProducto.value.is_excluded === 'Sí' ? 1 : 0);
        NuevoProducto.value.standard_code_id = (NuevoProducto.value.standard_code_id || '').trim();
        NuevoProducto.value.tribute_id = (NuevoProducto.value.tribute_id || '');
        NuevoProducto.value.discount_rate = (NuevoProducto.value.discount_rate || '').trim();

        console.log(NuevoProducto.value);
        
        const headers = {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        const response = await postDataBackend('items', NuevoProducto.value, headers); // Pasamos el token en el encabezado
        console.log('Producto creado con éxito', response);

        await getProductos();
        dialog.value = false; // Cerrar el diálogo después de crear el producto

    } catch (error) {
        console.log('Error al crear el producto', error.response ? error.response.data : error);
    }
}
</script>

<style>
#modalItems {
    display: flex;
    flex-direction: row-reverse;
}

#containerModalProductos {
    display: flex;
}

#formularioProductos {
    display: flex;
    margin-bottom: 30px;
}

.custom-input {
    width: 200px;
}

#columnasProductos {
    margin-right: 10px;
    margin-left: 10px;
}
</style>