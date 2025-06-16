<template>
  <q-page class="q-pa-md order-status-page bg-grey-1">
    <div class="row justify-center">
      <div class="col-xs-12 col-md-8 col-lg-6">
        <q-card class="q-pa-md shadow-2">
          <div class="text-h4 text-center q-mb-lg text-primary text-bold">Estado de tu Orden</div>

          <q-input v-model="orderIdInput" label="Ingresa tu ID de Orden" outlined dense class="q-mb-md"
            @keyup.enter="fetchOrderStatus">
            <template v-slot:append>
              <q-btn flat icon="search" color="primary" @click="fetchOrderStatus" />
            </template>
          </q-input>

          <q-separator class="q-my-md" />

          <div v-if="loading" class="text-center q-py-lg">
            <q-spinner-dots color="primary" size="3em" />
            <div class="q-mt-sm text-grey-7">Cargando estado de la orden...</div>
          </div>

          <div v-else-if="orderStatus">
            <div class="text-h5 q-mb-md">Orden #{{ orderStatus.id }}</div>

            <q-list bordered separator class="q-mb-lg">
              <q-item>
                <q-item-section avatar>
                  <q-icon name="person" color="grey-7" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Cliente</q-item-label>
                  <q-item-label>{{ orderStatus.customerName }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="event" color="grey-7" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Fecha y Hora</q-item-label>
                  <q-item-label>{{ new Date(orderStatus.dateTime).toLocaleString() }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="payments" color="grey-7" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Total</q-item-label>
                  <q-item-label class="text-bold text-green-8">$ {{ orderStatus.total.toFixed(2) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <div class="text-h6 q-mb-sm">Progreso de la Orden:</div>
            <q-stepper v-model="currentStep" vertical color="primary" animated flat class="rounded-borders">
              <q-step v-for="step in orderSteps" :key="step.name" :name="step.name" :title="step.title"
                :icon="step.icon" :done="currentStep > step.name" :active="currentStep === step.name">
                {{ step.description }}
              </q-step>
            </q-stepper>

            <div class="q-mt-lg text-center">
              <q-btn label="Volver a la Tienda" color="secondary" flat @click="router.push('/')" />
            </div>

          </div>

          <div v-else-if="orderIdSearched && !orderStatus" class="text-center q-py-lg">
            <q-icon name="error_outline" size="xl" color="negative" />
            <div class="text-h5 q-mt-md text-grey-8">Orden no encontrada</div>
            <p class="text-body1 q-mt-sm text-grey-7">Por favor, verifica el ID de la orden e inténtalo de nuevo.</p>
          </div>
          <div v-else class="text-center q-py-lg text-grey-6">
            <q-icon name="info_outline" size="xl" />
            <div class="text-h6 q-mt-md">Ingresa un ID de orden para ver su estado.</div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

const orderIdInput = ref('');
const orderStatus = ref(null);
const loading = ref(false);
const orderIdSearched = ref(false); // Para saber si ya se intentó buscar una orden

// Datos de órdenes de ejemplo
const sampleOrders = [
  {
    id: 'ORD12345',
    customerName: 'Juan Pérez',
    dateTime: '2025-06-15T10:30:00',
    total: 35.50,
    currentStepName: 'preparing', // Paso actual de la orden
    items: [
      { name: 'Pizza Pepperoni', quantity: 1, price: 15.99 },
      { name: 'Refresco Grande', quantity: 2, price: 2.50 }
    ]
  },
  {
    id: 'ORD67890',
    customerName: 'María García',
    dateTime: '2025-06-16T14:00:00',
    total: 22.00,
    currentStepName: 'delivered',
    items: [
      { name: 'Hamburguesa Deluxe', quantity: 1, price: 10.50 },
      { name: 'Ensalada César', quantity: 1, price: 8.75 }
    ]
  },
  {
    id: 'ORD54321',
    customerName: 'Carlos López',
    dateTime: '2025-06-16T09:15:00',
    total: 12.00,
    currentStepName: 'on_the_way',
    items: [
      { name: 'Brownie de Chocolate', quantity: 3, price: 4.00 }
    ]
  }
];

// Definición de los pasos de la orden
const orderSteps = [
  { name: 'placed', title: 'Pedido Realizado', icon: 'check_circle', description: 'Tu pedido ha sido recibido y está siendo procesado.' },
  { name: 'preparing', title: 'En Preparación', icon: 'restaurant', description: 'Estamos preparando tus deliciosos platillos.' },
  { name: 'on_the_way', title: 'En Camino', icon: 'delivery_dining', description: 'Tu pedido está en ruta para ser entregado.' },
  { name: 'delivered', title: 'Entregado', icon: 'done_all', description: '¡Tu pedido ha sido entregado exitosamente! ¡Buen provecho!' }
];

// Propiedad computada para determinar el paso actual para el stepper
const currentStep = computed(() => {
  if (orderStatus.value) {
    // Encuentra el índice del paso actual
    const stepIndex = orderSteps.findIndex(step => step.name === orderStatus.value.currentStepName);
    // Retorna el nombre del paso, si no se encuentra, retorna el primer paso
    return stepIndex !== -1 ? orderSteps[stepIndex].name : orderSteps[0].name;
  }
  return orderSteps[0].name; // Valor por defecto si no hay orden
});

const fetchOrderStatus = () => {
  if (!orderIdInput.value.trim()) {
    $q.notify({
      message: 'Por favor, ingresa un ID de orden.',
      color: 'warning',
      icon: 'info'
    });
    return;
  }

  loading.value = true;
  orderStatus.value = null; // Limpiar estado anterior
  orderIdSearched.value = true; // Indicar que se ha intentado buscar

  // Simular una llamada a API con un retardo
  setTimeout(() => {
    const foundOrder = sampleOrders.find(order => order.id.toLowerCase() === orderIdInput.value.trim().toLowerCase());
    orderStatus.value = foundOrder || null;
    loading.value = false;

    if (!foundOrder) {
      $q.notify({
        message: `La orden con ID "${orderIdInput.value}" no fue encontrada.`,
        color: 'negative',
        icon: 'error_outline'
      });
    }
  }, 1500); // Simula un retardo de 1.5 segundos
};
</script>

<style lang="scss" scoped>
.order-status-page {
  min-height: calc(100vh - 50px);
  /* Ajusta si tienes un header/footer */
  display: flex;
  align-items: flex-start;
  /* Alinea la tarjeta al inicio verticalmente */
  padding-top: 50px;
  /* Espacio superior */

  .q-card {
    width: 100%;
    max-width: 700px;
    /* Limita el ancho de la tarjeta */
    border-radius: 8px;
  }
}
</style>
