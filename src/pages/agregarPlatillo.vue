<template>
    <q-page padding>
        <q-card class="q-pa-md">
            <q-card-section class="bg-light-blue-1 text-blue-grey-10 q-pa-md q-mb-md rounded-borders">
                <div class="row items-center justify-center">
                    <q-icon name="restaurant_menu" color="blue-grey-8" size="lg" class="q-mr-sm" />
                    <div class="text-h5 text-weight-bold text-center">
                        Agregar Nuevo Platillo
                    </div>
                </div>
            </q-card-section>
            <q-card-section>
                <q-form ref="formulario" @submit.prevent="enviarFormulario" @reset="onReset" class="q-gutter-md">
                    <div class="row q-col-gutter-md">
                        <div class="col-xs-12 col-sm-12 col-md-6">
                            <q-input filled v-model="dish.nombrePlatillo" label="Nombre del Platillo *"
                                hint="Ej: Pupusas de Chicharrón" lazy-rules
                                :rules="[val => (val && val.length > 0) || 'Por favor, ingrese el nombre del platillo']" />

                            <q-select filled v-model="dish.Categoria" :options="categories" label="Categoría *" emit-value
                                map-options lazy-rules
                                :rules="[val => (val !== null) || 'Por favor, seleccione una categoría']" class="q-mt-md" />

                            <q-input filled v-model="dish.Descripcion" label="Descripción del Platillo" type="textarea"
                                rows="3" hint="Breve descripción del platillo" class="q-mt-md" lazy-rules
                                :rules="[val => (val && val.length > 0) || 'Por favor, ingrese una descripcion del platillo']" />

                            <q-toggle v-model="dish.Disponible" label="Disponible" checked-icon="check"
                                unchecked-icon="clear" color="green" class="q-mt-md" />

                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-6">

                            <!--Imagenes-->
                            <div class="row justify-center">
                                <q-carousel control-color="orange" height="200px" navigation-icon="radio_button_unchecked"
                                    class="col-12 col-md-8" control-type="regular" control-text-color="grey-8" animated
                                    v-model="slide" arrows navigation v-if="fotosURL.length > 0">
                                    <q-carousel-slide v-for="(img, id) in fotosURL" :key="id" :name="id + 1" :img-src="img" />
                                </q-carousel>

                                <q-file dense class="col-12 col-md-5 q-mt-sm text-red q-mb-md" color="red-8" v-model="fotos"
                                    @update:model-value="obtenerURL" accept=".jpg, image/*"
                                    label="Agregar imagen de los platillos" outlined multiple append
                                    style="max-width: 300px">
                                    <template v-slot:prepend>
                                        <q-icon name="add_circle" class="text-positive" />
                                    </template>
                                </q-file>
                            </div>

                            <div class="row justify-center">
                                <q-input style="width: 200px !important;" filled v-model.number="dish.Precio" type="number"
                                    label="Precio *" prefix="$" lazy-rules :rules="[
                                        val => (val !== null && val !== '') || 'Por favor, ingrese el precio',
                                        val => (val > 0) || 'El precio debe ser un número positivo'
                                    ]" />
                            </div>

                            <div class="row q-mb-md justify-center">
                                <q-btn label="Agregar Platillo" type="submit" color="green" class="text-weight-bold" />
                                <q-btn label="Limpiar" type="reset" color="red-10" class="q-ml-lg text-weight-bold" />
                            </div>
                        </div>
                    </div>

                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template> 
  
<script setup>
import { ref } from 'vue';
import { collection, addDoc } from "firebase/firestore";
import { db } from "boot/firebase";
//import { useRouter } from 'vue-router'
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import { useQuasar } from 'quasar';

const slide = ref(1)
const formulario = ref(null)
const fotos = ref(null)
const fotosURL = ref([])
const contaImg = ref(0)
const idArticulo = ref('')
const $q = useQuasar();
//const router = useRouter()
const dish = ref({
    nombrePlatillo: '',
    Categoria: null,
    Descripcion: '',
    Precio: null,
    Disponible: true,
});

const categories = [
    { label: 'Desayuno', value: 'desayuno' },
    { label: 'Almuerzo', value: 'almuerzo' },
    { label: 'Cena', value: 'cena' },
    { label: 'Postres', value: 'postres' },
    { label: 'Bebidas', value: 'bebidas' },
    { label: 'Entradas', value: 'entradas' },
    { label: 'Platos Fuertes', value: 'platos_fuertes' },
    { label: 'Ensaladas', value: 'ensaladas' },
    { label: 'Sopas', value: 'sopas' },
];

function obtenerURL() {
    if (fotos.value) {
        fotosURL.value = []
        fotos.value.forEach(element => {
            fotosURL.value.push(URL.createObjectURL(element))
        })
    }
}

async function enviarFormulario() {
    try {
        const docRef = await addDoc(collection(db, "platillos"), dish.value); {
            console.log("Document written with ID: ", docRef.id);
            idArticulo.value = docRef.id
            console.log('siiiiii llega')
            $q.notify({
                type: 'positive',
                color: 'positive',
                message: 'Platillo guardado con exito'
            })

            subirImagenes()
            onReset()
        };
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const subirImagenes = function () {
    const storage = getStorage()
    fotos.value.forEach((foto) => {
        const storageRef = refStorage(storage, idArticulo.value + '/' + foto.name)
        uploadBytes(storageRef, foto).then(() => {
            contaImg.value++
            eslaUltima()
        })
    })
}

function eslaUltima() {
    if (contaImg.value === fotos.value.length) {

        //router.push('/')
    }
}

const onReset = () => {
    slide.value = (1)
    fotos.value = null
    fotosURL.value = []
    dish.value = {
        nombrePlatillo: '',
        Categoria: null,
        Descripcion: '',
        Precio: null,
        Disponible: true,
    };
};

</script> 
  
<style scoped>
/* Puedes agregar estilos específicos si es necesario, pero Quasar maneja gran parte de la responsividad */
</style>