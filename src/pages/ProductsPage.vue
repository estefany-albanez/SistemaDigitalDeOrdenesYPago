<template>
  <q-page class="q-pa-md products-page">
    <div class="text-h4 q-mb-lg text-center">Nuestros Productos</div>

    <div class="row q-col-gutter-md">
      <div v-for="product in products" :key="product.id" class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="product-card cursor-pointer" @click="goToProductDetail(product.id)">
          <q-img :src="product.image" :alt="product.name" ratio="1" />

          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2 text-grey-8">{{ product.shortDescription }}</div>
            <div class="text-h5 text-primary text-bold q-mt-sm">$ {{ product.price.toFixed(2) }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Ver Detalles" color="primary" @click.stop="goToProductDetail(product.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importa useRouter

const router = useRouter(); // Inicializa router

// Datos de productos de ejemplo (deberían ser los mismos que en ProductDetailPage.vue
// o venir de una fuente centralizada para evitar duplicación)
const products = ref([
  {
    id: 1,
    name: 'Pizza Pepperoni',
    shortDescription: 'La clásica con extra de pepperoni y queso.',
    price: 15.99,
    image: 'https://cdn.quasar.dev/img/donuts.png'
  },
  {
    id: 2,
    name: 'Hamburguesa Deluxe',
    shortDescription: 'Carne premium, queso, bacon y salsa especial.',
    price: 10.50,
    image: 'https://cdn.quasar.dev/img/parallax2.jpg'
  },
  {
    id: 3,
    name: 'Ensalada César',
    shortDescription: 'Lechuga fresca, crutones, pollo a la parrilla y aderezo César.',
    price: 8.75,
    image: 'https://cdn.quasar.dev/img/ice-cream.png'
  },
  {
    id: 4,
    name: 'Refresco Grande',
    shortDescription: 'Selección de bebidas carbonatadas.',
    price: 2.50,
    image: 'https://cdn.quasar.dev/img/material.png'
  },
  {
    id: 5,
    name: 'Brownie de Chocolate',
    shortDescription: 'Cálido y delicioso con trozos de chocolate.',
    price: 4.00,
    image: 'https://cdn.quasar.dev/img/mountains.jpg'
  },
]);

// Función para navegar a la página de detalles del producto
const goToProductDetail = (productId) => {
  router.push(`/product/${productId}`);
};
</script>

<style lang="scss" scoped>
.products-page {
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  height: 100%; // Asegura que todas las tarjetas tengan la misma altura si el contenido lo permite
  display: flex;
  flex-direction: column;

  .q-img {
    height: 180px; // Altura fija para la imagen de la tarjeta
  }

  .q-card-section {
    flex-grow: 1; // Permite que la sección de contenido ocupe el espacio restante
  }
}
</style>
