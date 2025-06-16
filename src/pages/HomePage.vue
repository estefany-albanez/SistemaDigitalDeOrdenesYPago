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
        <div class="text-body1 q-pa-md text-right q-mb-md">100 Resultados...</div>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="item in filteredMenuItems" :key="item.id">
            <q-card class="my-product-card bg-grey-1 fit column no-wrap">
              <q-img :src="item.image" :alt="item.name" class="col-auto" />

              <q-card-section>
                <div class="text-h6">{{ item.name }}</div>
                <div class="text-subtitle2 text-grey-8">{{ item.description }}</div>
                <div class="row items-center q-mt-sm">
                  <div class="col-auto text-h6 text-red-8">{{ item.price }}</div>
                  <q-space />
                  <q-btn color="red-8" label="Ordenar" rounded dense class="q-px-md" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedCategory = ref('Todo') // Default selected category

const categories = ref([
  { name: 'Todo', count: 15 },
  { name: 'Desayuno', count: 15 },
  { name: 'Almuerzo', count: 15 },
  { name: 'Cena', count: 15 },
  { name: 'Bocadillos', count: 15 },
  { name: 'Bebidas', count: 15 },
])

const menuItems = ref([
  {
    id: 1,
    name: 'Cheesy melt Burger',
    description: 'Deliciosa hamburguesa con queso derretido.',
    price: '$28.99',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg', // Placeholder image
    category: 'Almuerzo',
  },
  {
    id: 2,
    name: 'Hut Cheese Grande',
    description: 'Pizza grande con extra queso.',
    price: '$15.99',
    image: 'https://cdn.quasar.dev/img/parallax1.jpg', // Placeholder image
    category: 'Cena',
  },
  {
    id: 3,
    name: 'Combo 06 Alitas',
    description: '6 alitas de pollo con tu salsa favorita.',
    price: '$23.99',
    image: 'https://cdn.quasar.dev/img/mountains.jpg', // Placeholder image
    category: 'Bocadillos',
  },
  {
    id: 4,
    name: 'Cheesy melt Burger',
    description: 'Deliciosa hamburguesa con queso derretido.',
    price: '$28.99',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg', // Placeholder image
    category: 'Almuerzo',
  },
  {
    id: 5,
    name: 'Hut Cheese Grande',
    description: 'Pizza grande con extra queso.',
    price: '$15.99',
    image: 'https://cdn.quasar.dev/img/parallax1.jpg', // Placeholder image
    category: 'Cena',
  },
  {
    id: 6,
    name: 'Combo 06 Alitas',
    description: '6 alitas de pollo con tu salsa favorita.',
    price: '$23.99',
    image: 'https://cdn.quasar.dev/img/mountains.jpg', // Placeholder image
    category: 'Bocadillos',
  },
  {
    id: 7,
    name: 'Cheesy melt Burger',
    description: 'Deliciosa hamburguesa con queso derretido.',
    price: '$28.99',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg', // Placeholder image
    category: 'Almuerzo',
  },
  {
    id: 8,
    name: 'Hut Cheese Grande',
    description: 'Pizza grande con extra queso.',
    price: '$15.99',
    image: 'https://cdn.quasar.dev/img/parallax1.jpg', // Placeholder image
    category: 'Cena',
  },
  {
    id: 9,
    name: 'Combo 06 Alitas',
    description: '6 alitas de pollo con tu salsa favorita.',
    price: '$23.99',
    image: 'https://cdn.quasar.dev/img/mountains.jpg', // Placeholder image
    category: 'Bocadillos',
  },
  {
    id: 10,
    name: 'Breakfast Burrito',
    description: 'Un delicioso burrito para empezar el día.',
    price: '$8.50',
    image: 'https://cdn.quasar.dev/img/quasar-logo-inner.svg', // Another placeholder
    category: 'Desayuno',
  },
])

const filteredMenuItems = computed(() => {
  let items = menuItems.value

  if (selectedCategory.value !== 'Todo') {
    items = items.filter((item) => item.category === selectedCategory.value)
  }

  if (search.value) {
    const searchTerm = search.value.toLowerCase()
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm),
    )
  }

  return items
})

const selectCategory = (categoryName) => {
  selectedCategory.value = categoryName
}
</script>
