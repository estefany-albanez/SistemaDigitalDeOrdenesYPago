<template>
  <q-page class="q-pa-md bg-grey-2 page-margin-top">
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-2">
        <q-card flat bordered class="q-pa-md">
          <div class="text-h6 q-mb-md">FILTRAR</div>
          <div class="q-mb-md row items-center q-gutter-sm">
            <q-btn flat icon="filter_list" label="Borrar filtros" color="primary" class="full-width btn-filtro"
              @click="clearFilters" />
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

      <div class="col-xs-12 col-sm-10">
        <div class="row q-col-gutter-md">
          <q-card v-for="(item, key) in platillosFiltrados" :key="key"
            class="text-center q-pa-sm q-mb-md card-responsive" :class="[
              'col-12',
              'col-sm-6',
              'col-md-4',
              'col-lg-3',
              'col-xl-2'
            ]">
            <img v-if="item.urlImagen" :src="item.urlImagen" class="q-px-sm card-img-responsive"
              :style="$q.platform.is.mobile ? 'height:140px' : 'height: 250px'">
            <q-skeleton v-else
              :style="$q.platform.is.mobile ? 'height:140px; width: 100%;' : 'height: 250px; width: 100%;'"
              type="QAvatar" animation="fade" />
            <q-card-section class="bg-deep-orange-1">
              <span style="font-weight: bold; font-size: 1.4em;">{{ item.nombrePlatillo }}</span>
              <div class="row items-center justify-center q-mt-sm q-gutter-sm">
                <span class="text-h6 text-center text-negative q-mr-sm" style="font-size:1.1em; font-weight:bold;">
                  $ {{ item.Precio != null ? Number(item.Precio).toFixed(2) : '--' }}
                </span>
                <q-btn style="border-radius: 20px;" color="red-10" class="shadow-1 btn-ordenar" size="sm"
                  @click="ordenarProducto(item)">Ordenar</q-btn>
                <q-btn @click.stop="goToDetail(item.__id || item.id)" color="red-10" class="shadow-10 btn-ordenar" size="sm">Ver Detalles</q-btn>
              </div>
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch, computed, nextTick, inject } from 'vue'
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db, storage } from "boot/firebase";
import { ref as refStorage, listAll, getDownloadURL } from 'firebase/storage'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const platillos = useCollection(collection(db, 'platillos'))
const platillosConImg = ref([])
const router = useRouter();
const $q = useQuasar();

// Usa el estado global de búsqueda del header si existe
const globalSearch = inject('globalSearch', null);
const busqueda = computed({
  get: () => globalSearch?.value ?? localBusqueda.value,
  set: val => {
    if (globalSearch) globalSearch.value = val;
    else localBusqueda.value = val;
  }
});
const localBusqueda = ref("");

// Mapeo para buscar por label de categoría
const categoriaLabelMap = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena',
  postres: 'Postres',
  bebidas: 'Bebidas',
  entradas: 'Entradas',
  platos_fuertes: 'Platos Fuertes',
  ensaladas: 'Ensaladas',
  sopas: 'Sopas',
};

const selectedCategory = ref('Todo');

function selectCategory(name) {
  selectedCategory.value = name;
}

function clearFilters() {
  selectedCategory.value = 'Todo';
  if (globalSearch) globalSearch.value = '';
  else localBusqueda.value = '';
}

const platillosFiltrados = computed(() => {
  const arr = platillosConImg.value || [];
  let filtered = arr;
  // Filtrar por categoría
  if (selectedCategory.value && selectedCategory.value !== 'Todo') {
    const cat = selectedCategory.value.toLowerCase();
    filtered = filtered.filter(p => {
      const categoriaValue = (p.Categoria || '').toLowerCase();
      const categoriaLabel = (categoriaLabelMap[categoriaValue] || '').toLowerCase();
      return categoriaValue === cat || categoriaLabel === cat;
    });
  }
  // Filtrar por búsqueda
  if (busqueda.value) {
    const search = busqueda.value.toLowerCase();
    filtered = filtered.filter(p => {
      const nombre = (p.nombrePlatillo || '').toLowerCase();
      const descripcion = (p.Descripcion || p.descripcion || '').toLowerCase();
      const categoriaValue = (p.Categoria || '').toLowerCase();
      const categoriaLabel = (categoriaLabelMap[categoriaValue] || '').toLowerCase();
      return (
        nombre.includes(search) ||
        descripcion.includes(search) ||
        categoriaValue.includes(search) ||
        categoriaLabel.includes(search)
      );
    });
  }
  return filtered;
});

const categories = ref([
  { name: 'Todo', count: 15 },
  { name: 'Desayuno', count: 15 },
  { name: 'Almuerzo', count: 15 },
  { name: 'Cena', count: 15 },
  { name: 'Bocadillos', count: 15 },
  { name: 'Bebidas', count: 15 },
])

watch(platillos, async (newPlatillos) => {
  if (newPlatillos && newPlatillos.length > 0) {
    platillosConImg.value = await cargarImagenes(newPlatillos);
    await nextTick(); // Asegura reactividad
  } else {
    platillosConImg.value = [];
  }
}, { immediate: true });

async function cargarImagenes(platillosData) {
  const platillosConImagenes = [];
  for (const arti of platillosData) {
    try {
      const listRef = refStorage(storage, arti.__id || arti.id);
      const res = await listAll(listRef);
      let urlImagen = '';
      if (res.items.length > 0) {
        urlImagen = await getDownloadURL(refStorage(storage, res.items[0].fullPath));
      }
      platillosConImagenes.push({ ...arti, urlImagen: urlImagen });
    } catch {
      platillosConImagenes.push({ ...arti, urlImagen: '' });
    }
  }
  return platillosConImagenes;
}

function goToDetail(id) {
  router.push(`/platillo/${id}`)
}

function ordenarProducto(item) {
  $q.notify({
    type: 'positive',
    message: `Platillo "${item.nombrePlatillo}" agregado a la orden.`
  })
}

watch([busqueda, platillosConImg], () => {
  console.log('Filtro búsqueda:', busqueda.value);
  console.log('Productos disponibles:', platillosConImg.value.map(p => p.nombrePlatillo));
  console.log('Resultados filtrados:', platillosFiltrados.value.map(p => p.nombrePlatillo));
});
</script>

<style scoped>
.page-margin-top {
  margin-top: 32px;
}

.card-responsive {
  min-width: 220px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-img-responsive {
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.btn-ordenar {
  min-width: 120px;
  max-width: 120px;
  justify-content: center;
}

.btn-filtro {
  min-width: 100%;
  max-width: 100%;
}

@media (max-width: 600px) {
  .card-responsive {
    min-width: 100%;
    margin-bottom: 16px;
  }

  .card-img-responsive {
    height: 140px !important;
  }
}
</style>
