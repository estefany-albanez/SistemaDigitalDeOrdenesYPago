<template>
  <q-page class="q-pa-md">
    <h4 class="text-h4 q-mb-md text-center">Nuestros Productos</h4>
    <div class="row q-col-gutter-md justify-center">
      <div v-for="product in products" :key="product.id" class="col-xs-12 col-sm-6 col-md-4
  col-lg-3">
        <q-card class="my-card q-hoverable cursor-pointer" @click="goToProductDetail(product.id)">
          <q-img :src="product.image" ratio="1" />
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle2 text-grey-8">{{ product.description }}</div>
            <div class="text-h5 text-bold q-mt-sm">$ {{ product.price.toFixed(2) }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Añadir" color="primary" icon="add_shopping_cart" @click.stop="addToCart(product)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importar useRouter
import { useCartStore } from 'src/stores/cart-store';
import { useQuasar } from 'quasar';
const cartStore = useCartStore();
const $q = useQuasar();
const router = useRouter(); // Inicializar useRouter
// Productos de ejemplo (mantén estos datos, son los mismos que en ProductDetailPage por simplicidad)
const products = ref([
  {
    id: 1,
    name: 'Pizza Pepperoni',
    description: 'La clásica con extra de pepperoni y queso.',
    price: 15.99,
    image: 'https://cdn.quasar.dev/img/donuts.png'
  },
  {
    id: 2,
    name: 'Hamburguesa Deluxe',
    description: 'Carne premium, queso, bacon y salsa especial.',
    price: 10.50,
    image: 'https://cdn.quasar.dev/img/parallax2.jpg'
  },
  {
    id: 3,
    name: 'Ensalada César',
    description: 'Lechuga fresca, crutones, pollo a la parrilla y aderezo César.',
    price: 8.75,
    image: 'https://cdn.quasar.dev/img/ice-cream.png'
  },
  {
    id: 4,
    name: 'Refresco Grande',
    description: 'Selección de bebidas carbonatadas.',
    price: 2.50,
    image: 'https://cdn.quasar.dev/img/material.png'
  },
  {
    id: 5,
    name: 'Brownie de Chocolate',
    description: 'Cálido y delicioso con trozos de chocolate.',
    price: 4.00,
    image: 'https://cdn.quasar.dev/img/mountains.jpg'
  },
]);
const addToCart = (product) => {
  cartStore.addItem(product, $q);
};
// Nueva función para navegar a la página de detalle del producto
const goToProductDetail = (productId) => {
  router.push({ name: 'product-detail', params: { id: productId } });
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 300px;
  margin: auto;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
}
</style>