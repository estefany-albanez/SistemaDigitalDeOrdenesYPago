<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="bg-primary text-white">
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-quasar-generic.svg" alt="Logo"
          style="height: 30px; margin-right: 10px" />
        <q-input dark dense standout v-model="search" placeholder="Search your food menu..." input-class="text-right"
          class="q-ml-md" style="width: 300px">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>

        <q-space />

        <q-btn flat dense round icon="menu" aria-label="Menu" class=" text-caption q-mx-md text-weight-medium" />
        <q-btn flat dense label="Promociones" class=" text-caption q-mx-md text-weight-medium" to="/promotions" />
        <q-btn flat dense label="Dashboard" class=" text-caption q-mx-md  text-weight-medium" to="/dashboard" />
        <q-btn flat dense label="Pagos" class=" text-caption q-mx-md text-weight-medium" to="/payments" />
        <q-btn flat dense label="Contactanos" class=" text-caption q-mx-md text-weight-medium" to="/feedback" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, provide } from 'vue';

// Estado global para la búsqueda
const search = ref("");
provide('globalSearch', search);

// Estado global para la orden/mesa
const mesaConsumo = ref([]); // [{ nombre, cantidad, precio }]
provide('mesaConsumo', mesaConsumo);
</script>
<style lang="sass"></style>
