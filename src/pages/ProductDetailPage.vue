<template>
  <q-page class="q-pa-md flex flex-center product-detail-page">
  <q-card v-if="product" class="product-card shadow-2">
  <div class="row no-wrap">
  <div class="col-xs-12 col-md-6 q-pa-md flex flex-center">
  <q-img
  :src="product.image"
  alt="Imagen del producto"
  fit="contain"
  class="product-image"
  />
  </div>
  <div class="col-xs-12 col-md-6 q-pa-md">
  <div class="text-h4 q-mb-sm">{{ product.name }}</div>
  <div class="text-subtitle1 text-grey-7 q-mb-md">{{ product.shortDescription }}</div>
  <div class="text-h3 text-primary text-bold q-mb-md">$ {{ product.price.toFixed(2)
  }}</div>
  <q-separator class="q-my-md" />
  <div class="text-body1 q-mb-md">{{ product.description }}</div>
  <q-separator class="q-my-md" />
  <div class="row items-center q-mb-md">
  <span class="text-h6 q-mr-md">Cantidad:</span>
  <q-btn icon="remove" color="grey-7" flat dense @click="decreaseQuantity"
  :disable="quantity <= 1" />
  <span class="text-h6 q-mx-md">{{ quantity }}</span>
  <q-btn icon="add" color="grey-7" flat dense @click="increaseQuantity" />
  </div>
  <q-btn
  label="Añadir al Carrito"
  color="primary"
  icon="add_shopping_cart"
  class="full-width q-mt-md"
  @click="addToCart"
  />
  <q-btn
  label="Volver a la Tienda"
  flat
  color="secondary"
  class="full-width q-mt-sm"
  @click="router.push('/')"
  />
  </div>
  </div>
  </q-card>
  <q-card v-else class="product-card q-pa-md text-center shadow-2">
  <q-icon name="error_outline" size="xl" color="negative" />
  <div class="text-h5 q-mt-md">Producto no encontrado</div>
  <p class="text-body1 q-mt-sm">El producto que buscas no existe o no está
  disponible.</p>
  <q-btn label="Volver a la tienda" color="primary" to="/" class="q-mt-md" />
  </q-card>
  </q-page>
  </template>
  <script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';
  import { useCartStore } from 'src/stores/cart-store'; // Importa tu store del carrito
  const route = useRoute();
  const router = useRouter();
  const $q = useQuasar();
  const cartStore = useCartStore();
  const product = ref(null);
  const quantity = ref(1);
  // Datos de productos de ejemplo (en una aplicación real, esto vendría de una API)
  const allProducts = [
  {
  id: 1,
  name: 'Pizza Pepperoni',
  shortDescription: 'La clásica con extra de pepperoni y queso.',
  description: 'Nuestra pizza de pepperoni extra grande, con una generosa capa de queso
  mozzarella derretido y rodajas de pepperoni crujiente. Perfecta para compartir o disfrutar
  solo.',
  price: 15.99,
  image: 'https://cdn.quasar.dev/img/donuts.png'
  },
  {
  id: 2,
  name: 'Hamburguesa Deluxe',
  shortDescription: 'Carne premium, queso, bacon y salsa especial.',
  description: 'Una hamburguesa gourmet con 1/2 libra de carne de res premium, queso
  cheddar madurado, crujiente bacon ahumado, lechuga fresca, tomate y nuestra salsa
  secreta, todo en un pan brioche tostado.',
  price: 10.50,
  image: 'https://cdn.quasar.dev/img/parallax2.jpg'
  },
  {
  id: 3,
  name: 'Ensalada César',
  shortDescription: 'Lechuga fresca, crutones, pollo a la parrilla y aderezo César.',
  description: 'Deliciosa ensalada César con lechuga romana crujiente, jugoso pollo a la
  parrilla, crutones caseros y un cremoso aderezo César, espolvoreada con queso
  parmesano.',
  price: 8.75,
  image: 'https://cdn.quasar.dev/img/ice-cream.png'
  },
  {
  id: 4,
  name: 'Refresco Grande',
  shortDescription: 'Selección de bebidas carbonatadas.',
  description: 'Elige tu bebida favorita de nuestra amplia selección de refrescos. Tamaño
  grande para refrescarte al máximo.',
  price: 2.50,
  image: 'https://cdn.quasar.dev/img/material.png'
  },
  {
  id: 5,
  name: 'Brownie de Chocolate',
  shortDescription: 'Cálido y delicioso con trozos de chocolate.',
  description: 'Nuestro famoso brownie de chocolate, húmedo y denso, con trozos de
  chocolate derretido. Ideal para los amantes del cacao.',
  price: 4.00,
  image: 'https://cdn.quasar.dev/img/mountains.jpg'
  },
  ];
  // Función para cargar los detalles del producto
  const loadProductDetails = (productId) => {
  const foundProduct = allProducts.find(p => p.id === parseInt(productId));
  if (foundProduct) {
  product.value = foundProduct;
  quantity.value = 1; // Reiniciar cantidad al cargar un nuevo producto
  } else {
  product.value = null;
  $q.notify({
  message: 'Producto no encontrado.',
  color: 'negative',
  icon: 'error_outline'
  });
  // Opcional: redirigir a una página de 404 o de productos
  // router.replace('/404');
  }
  };
  // Cargar producto cuando el componente se monta
  onMounted(() => {
  loadProductDetails(route.params.id);
  });
  // Observar cambios en el parámetro de la ruta para cargar un nuevo producto
  watch(() => route.params.id, (newId) => {
  if (newId) {
  loadProductDetails(newId);
  }
  });
  const increaseQuantity = () => {
  quantity.value++;
  };
  const decreaseQuantity = () => {
  if (quantity.value > 1) {
  quantity.value--;
  }
  };
  const addToCart = () => {
  if (product.value) {
  // Añadir el producto con la cantidad seleccionada al carrito
  for (let i = 0; i < quantity.value; i++) {
  cartStore.addItem(product.value, $q);
  }
  $q.notify({
  message: `${quantity.value} ${product.value.name}(s) añadido(s) al carrito.`,
  color: 'positive',
  icon: 'add_shopping_cart'
  });
  quantity.value = 1; // Resetear la cantidad después de añadir al carrito
  }
  };
  </script>
  <style lang="scss" scoped>
  .product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  }
  .product-card {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  }
  .product-image {
  max-height: 400px; // Altura máxima para la imagen
  width: 100%;
  border-radius: 8px;
  }
  @media (max-width: $breakpoint-md-down) {
  .product-detail-page {
  flex-direction: column;
  }
  .product-card {
  .row {
  flex-direction: column;
  }
  }
  .product-image {
  max-height: 300px; // Ajuste para pantallas más pequeñas
  }
  }
  </style>
