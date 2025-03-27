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
                            <div class="containerModalProductos">
                                <h3 style="text-align: center; padding: 20px; color:  rgb(0,62,133) ;">Ingresar Producto
                                </h3>
                                <div id="formularioProductos">
                                    <div id="columnasProductos">
                                        <q-input outlined v-model="NuevoProducto.codeReference"
                                            label="Código de Referencia" filled class="custom-input"
                                            :rules="[val => !!val || 'Este campo es requerido']" />

                                        <q-input style="margin-top: 20px; margin-bottom: 20px;" outlined
                                            v-model="NuevoProducto.name" label="Nombre del producto" filled
                                            class="custom-input" :rules="[val => !!val || 'Este campo es requerido']" />

                                        <q-input outlined type="Number" v-model="NuevoProducto.price"
                                            label="Precio del producto" filled class="custom-input"
                                            :rules="[val => !!val || 'Este campo es requerido']" />

                                        <q-toggle v-model="NuevoProducto.is_excluded" label="Está Excluido"
                                            color="primary" />

                                    </div>
                                    <div id="columnasProductos">

                                        <q-select outlined v-model="NuevoProducto.unit_measure_id"
                                            :options="unitMeasureOptions" label="Unidad de medida" emit-value
                                            map-options filled class="custom-input"
                                            :rules="[val => !!val || 'Este campo es requerido']"
                                            style="margin-top: 20px; margin-bottom: 20px;" />

                                        <q-input outlined v-model="NuevoProducto.tax_rate" label="Tasa de impuesto (%)"
                                            filled class="custom-input" type="Number" suffix="%"
                                            :rules="[val => !!val || 'Este campo es requerido']" />
                                    </div>
                                    <div id="columnasProductos">

                                        <q-select v-model="NuevoProducto.standard_code_id"
                                            :options="standardCodeOptions" option-label="name" option-value="name"
                                            emit-value map-options outlined filled label="Código Estándar"
                                            :rules="[val => !!val || 'Este campo es requerido']" />

                                        <q-select outlined v-model="NuevoProducto.tribute_id" :options="tributeOptions"
                                            map-options emit-value label="Tributo" filled class="custom-input"
                                            :rules="[val => !!val || 'Este campo es requerido']" />
                                    </div>


                                </div>
                                <div>
                                    <q-list bordered class="q-mb-md">
                                        <q-item v-for="(tax, index) in NuevoProducto.withholding_taxes" :key="index">
                                            <q-item-section>
                                                <q-input v-model="tax.code" label="Código de Retención" filled
                                                    outlined />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-input v-model="tax.withholding_tax_rate"
                                                    label="Tasa de Retención (%)" filled outlined type="number"
                                                    suffix="%" />
                                            </q-item-section>
                                            <q-item-section side>
                                                <q-btn icon="delete" color="red" dense flat @click="removeTax(index)" />
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                    <q-btn icon="add" color="primary" label="Añadir Retención" @click="addTax" flat />
                                </div>
                                <div style="display: flex; justify-content: center;">
                                    <q-btn label="Cancelar" color="grey" flat @click="resetForm" />
                                    <q-btn type="submit" label="Guardar" color="primary" unelevated @click="updateProduct" />
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
        name: 'codigo',
        required: true,
        label: 'codigo',
        align: 'left',
        field: row => row.codeReference,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'nombre del producto', align: 'center', label: 'Nombre del producto', field: 'name', sortable: true },
    { name: 'precio', label: 'Precio', field: 'price' },
    { name: 'tax_rate', label: 'Tasa de impuesto (%)', field: 'tax_rate' },
]

const rows = ref([])

const NuevoProducto = ref({
    codeReference: '',
    name: '',
    price: 0,
    unit_measure_id: null,
    tax_rate: 19,
    is_excluded: false,
    standard_code_id: null,
    tribute_id: null,
    withholding_taxes: []
})

const unitMeasureOptions = ref([])
const tributeOptions = ref([])
const standardCodeOptions = ref([
    { id: 1, name: 'Estándar de adopción del contribuyente' },
    { id: 2, name: 'UNSPSC' },
    { id: 3, name: 'Partida Arancelaria' },
    { id: 4, name: 'GTIN' }
])

const addTax = () => {
    NuevoProducto.value.withholding_taxes.push({ code: '', withholding_tax_rate: null });
};

const removeTax = (index) => {
    NuevoProducto.value.withholding_taxes.splice(index, 1);
};

onMounted(async () => {
    await getProductos();
    await getUnitMeasureOptions();
    await getTributeOptions();
})

async function getProductos() {
    try {
        const response = await getDataBackend('items');
        rows.value = response;
        console.log(response);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
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
            tributeOptions.value = response.data.map(item => ({ label: `${item.code} - ${item.name}`, value: item.name }));
            console.log("Tributos obtenidos:", tributeOptions.value);
        } else {
            console.log("La respuesta no contiene los datos esperados");
        }
    } catch (error) {
        console.log("Error al obtener los tributos", error.response ? error.response.data : error);
    }
}

const postProducto = async () => {
    const newProduct = {
        ...NuevoProducto.value,
        price: Number(NuevoProducto.value.price),
        tax_rate: Number(NuevoProducto.value.tax_rate),
        unit_measure_id: String(NuevoProducto.value.unit_measure_id),
        standard_code_id: String(NuevoProducto.value.standard_code_id),
        tribute_id: String(NuevoProducto.value.tribute_id),
        withholding_taxes: NuevoProducto.value.withholding_taxes.map(item => ({
            code: item.code,
            withholding_tax_rate: Number(item.withholding_tax_rate)
        }))
    }

    try {
        console.log(newProduct);
        const response = await postDataBackend('items', newProduct);
        console.log(response);
        dialog.value = false;
        await getProductos();
    } catch (error) {
        console.error('Error al guardar producto:', error);
    }
};

const resetForm = () => {
    NuevoProducto.value = {
        codeReference: '',
        name: '',
        price: 0,
        unit_measure_id: null,
        tax_rate: 19,
        is_excluded: false,
        standard_code_id: null,
        tribute_id: null,
        withholding_taxes: []
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