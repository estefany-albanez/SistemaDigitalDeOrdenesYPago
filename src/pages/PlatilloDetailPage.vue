<template>
  <q-page class="q-pa-md flex flex-center product-detail-page">
    <q-card v-if="product" class="product-card shadow-2">
      <div class="row no-wrap">
        <div class="col-xs-12 col-md-6 q-pa-md flex flex-center">
          <q-carousel v-if="product.gallery && product.gallery.length" v-model="slide" animated arrows navigation
            infinite thumbnails control-color="white" class="product-carousel rounded-borders" height="400px">
            <q-carousel-slide v-for="(imgUrl, index) in product.gallery" :key="index" :name="index" :img-src="imgUrl"
              class="carousel-slide-content" />
          </q-carousel>
          <div v-else class="q-pa-md text-grey-7 text-center">
            <q-icon name="image_not_supported" size="64px" color="grey-5" />
            <div>No hay imágenes disponibles para este producto.</div>
          </div>
        </div>
        <div class="col-xs-12 col-md-6 q-pa-md">
          <div class="text-h4 q-mb-sm">{{ product.nombrePlatillo }}</div>
          <div class="text-h3 text-primary text-bold q-mb-md">$ {{ product.Precio }}</div>
          <q-separator class="q-my-md" />
          <div class="text-body1 q-mb-md">{{ product.descripcion }}</div>
        </div>
      </div>
    </q-card>
    <q-card v-else class="product-card q-pa-md text-center shadow-2">
      <q-icon name="error_outline" size="xl" color="negative" />
      <div class="text-h5 q-mt-md">Producto no encontrado</div>
      <q-btn label="Volver" color="primary" to="/" class="q-mt-md" />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';
import { db, storage } from "boot/firebase";
import { ref as refStorage, listAll, getDownloadURL } from 'firebase/storage';

const route = useRoute();
const slide = ref(0);
const product = ref(null);

const platillos = useCollection(collection(db, 'platillos'));

onMounted(findProduct);

watch(platillos, findProduct);

// LOGS PARA DEPURACIÓN EN DETALLE
watch(product, (val) => {
  console.log('Producto seleccionado en detalle:', val);
});

async function findProduct() {
  const id = route.params.id;
  let found = null;
  if (platillos.value && platillos.value.length > 0) {
    found = platillos.value.find(p => String(p.__id || p.id) === String(id));
  }
  if (found) {
    product.value = await cargarImagenes(found);
  } else {
    product.value = null;
  }
}

async function cargarImagenes(arti) {
  try {
    const listRef = refStorage(storage, arti.__id || arti.id);
    const res = await listAll(listRef);
    let gallery = [];
    if (res.items.length > 0) {
      for (const item of res.items) {
        const url = await getDownloadURL(refStorage(storage, item.fullPath));
        gallery.push(url);
      }
    }
    console.log('Imágenes encontradas para', arti.__id || arti.id, ':', gallery);
    return { ...arti, gallery };
  } catch (e) {
    console.error('Error al cargar imágenes para', arti.__id || arti.id, e);
    return { ...arti, gallery: [] };
  }
}
</script>

<style scoped>
.product-card {
  max-width: 900px;
  width: 100%;
}

.product-carousel {
  width: 100%;
  height: 400px;
}

.carousel-slide-content {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
</style>
