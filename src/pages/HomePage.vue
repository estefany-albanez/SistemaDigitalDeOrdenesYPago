<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-3">
        <q-card flat bordered class="q-pa-md">
          <div class="text-h6 q-mb-md">FILTRAR</div>
          <div class="q-mb-md">
            <q-btn flat icon="filter_list" label="Borrar filtros" color="primary" class="full-width" />
          </div>
          <q-separator class="q-mb-md" />
          <div class="text-subtitle1 q-mb-sm">Categorias</div>
          <q-list dense>
            <q-item clickable v-ripple v-for="category in categories" :key="category.name"
              @click="selectCategory(category.name)" :active="selectedCategory === category.name"
              active-class="text-primary text-bold">
              <q-item-section>{{ category.name }}</q-item-section>
              <q-item-section side>{{ category.count }}</q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-9">
        <div class="text-body1 q-pa-md text-right q-mb-md">{{ displayedPlatillos.length }} Resultados...</div>
        <div class="row q-col-gutter-md">

          <div class="row q-ml-sm q-mr-sm">
            <q-card class="my-card text-center col-6 col-sm-3 q-pa-sm q-mb-md" v-for="(item, key) in displayedPlatillos"
              :key="key">
              <img v-if="item.urlImagen" :src="item.urlImagen" class="q-px-xl"
                :style="$q.platform.is.mobile ? 'height:140px' : 'height: 250px'">
              <q-skeleton v-else
                :style="$q.platform.is.mobile ? 'height:140px; width: 100%;' : 'height: 250px; width: 100%;'"
                type="QAvatar" animation="fade" />
              <q-card-section class="bg-deep-orange-1">
                <div class="text-h6 text-center text-negative">$ {{ item.Precio }}</div>
                {{ item.nombrePlatillo }}
              </q-card-section>
              <q-separator />
              <q-card-actions vertical align="center" class="bg-lime-2">
                <q-btn :to="'/platillo/' + item.id" color="orange-8" class="shadow-10">Ver Detalles</q-btn>
              </q-card-actions>
            </q-card>
          </div>

        </div>
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue' // Importa watch
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db, storage } from "boot/firebase"; // Asegúrate de que "boot/firebase" sea la ruta correcta
import { ref as refStorage, listAll, getDownloadURL } from 'firebase/storage'

const selectedCategory = ref('Todo') // Default selected category

const platillos = useCollection(collection(db, 'platillos'))
const displayedPlatillos = ref([]) // Nueva ref para los platillos con URLs de imagen

const categories = ref([
  { name: 'Todo', count: 15 },
  { name: 'Desayuno', count: 15 },
  { name: 'Almuerzo', count: 15 },
  { name: 'Cena', count: 15 },
  { name: 'Bocadillos', count: 15 },
  { name: 'Bebidas', count: 15 },
])

const selectCategory = (categoryName) => {
  selectedCategory.value = categoryName
  // Aquí podrías implementar el filtrado si lo deseas
  // Por ahora, displayedPlatillos se actualiza cuando platillos cambian
}

// Observa los cambios en platillos (de useCollection)
watch(platillos, async (newPlatillos) => {
  if (newPlatillos && newPlatillos.length > 0) {
    // Cuando los platillos de Firestore estén disponibles, carga sus imágenes
    displayedPlatillos.value = await cargarImagenes(newPlatillos);
  } else {
    displayedPlatillos.value = []; // Si no hay platillos, vacía la lista
  }
}, { immediate: true }); // `immediate: true` para que se ejecute la primera vez al montar el componente

// Función para cargar las URLs de las imágenes
async function cargarImagenes(platillosData) {
  const platillosWithImages = [];
  for (const arti of platillosData) {
    try {
      const listRef = refStorage(storage, arti.id);
      const res = await listAll(listRef);

      let urlImagen = '';
      if (res.items.length > 0) {
        urlImagen = await getDownloadURL(refStorage(storage, res.items[0].fullPath));
      }

      platillosWithImages.push({ ...arti, urlImagen: urlImagen }); // Crea una nueva copia del objeto
    } catch (error) {
      console.error(`Error al cargar imagen para ${arti.id}:`, error);
      platillosWithImages.push({ ...arti, urlImagen: '' }); // Agrega el platillo sin imagen si hay un error
    }
  }
  return platillosWithImages;
}

// onMounted ya no necesita cargarImagenes directamente porque `watch` lo manejará
// onMounted(() => {
//   // Ya no es necesario aquí, el `watch` lo maneja
// });
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  /* Ajusta según tus necesidades */
  margin: 0 auto;
}
</style>