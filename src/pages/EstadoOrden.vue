<template>
  <q-page class="q-pa-xl order-status-page bg-grey-1">
    <div class="row justify-center">
      <div class="col-xs-12 col-md-10 col-lg-8">
        <q-card class="q-pa-xl shadow-4">
          <div class="text-h3 text-center q-mb-xl text-primary text-bold">Estado de tu Orden</div>

          <q-list bordered separator class="q-mb-xl">
            <q-item>
              <q-item-section avatar>
                <q-icon name="table_restaurant" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Mesa</q-item-label>
                <q-item-label class="text-h5 text-bold">#{{ mesaStatus.numero }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="group" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Comensales</q-item-label>
                <q-item-label class="text-h6">{{ mesaStatus.comensales }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="event" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Hora de llegada</q-item-label>
                <q-item-label class="text-h6">{{ mesaStatus.horaLlegada }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="info" color="primary" size="md" />
              </q-item-section>
              <q-item-section>
                <q-item-label caption>Estado</q-item-label>
                <q-item-label class="text-h6 text-bold text-primary">{{ mesaStatus.estado }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

          <div class="text-h5 q-mb-md">Consumo actual:</div>
          <q-table :rows="mesaStatus.consumo" :columns="columns" row-key="nombre" flat dense
            class="q-mb-xl bg-white rounded-borders shadow-1" hide-bottom :pagination="{ rowsPerPage: 10 }" />

          <div class="text-h4 text-right text-green-8 q-mt-lg q-mb-xl">
            Total: $ {{ mesaStatus.total.toFixed(2) }}
          </div>

          <div class="q-mt-xl">
            <div class="row q-col-gutter-md justify-center">
              <div class="col-12 col-md-6">
                <q-btn label="Solicitar Cuenta" color="primary" size="sm" icon="receipt_long"
                  class="full-width btn-accion estilizado" @click="limpiarOrden" />
              </div>
              <div class="col-12 col-md-6">
                <q-btn label="Llamar Mesero" color="secondary" size="sm" icon="support_agent"
                  class="full-width btn-accion estilizado" />
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const mesaConsumo = inject('mesaConsumo', ref([]));

const mesaStatus = computed(() => {
  const consumo = mesaConsumo.value.length > 0 ? mesaConsumo.value : [
    { nombre: 'Pizza Pepperoni', cantidad: 2, precio: 15.99 },
    { nombre: 'Refresco Grande', cantidad: 4, precio: 2.50 },
    { nombre: 'Brownie de Chocolate', cantidad: 2, precio: 4.00 }
  ];
  const total = consumo.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  return {
    numero: 12,
    comensales: 4,
    horaLlegada: '13:15',
    estado: 'Atendida',
    consumo,
    total
  };
});

const columns = [
  { name: 'nombre', label: 'Platillo', field: 'nombre', align: 'left' },
  { name: 'cantidad', label: 'Cantidad', field: 'cantidad', align: 'center' },
  { name: 'precio', label: 'Precio', field: row => `$${Number(row.precio).toFixed(2)}`, align: 'right' }
];

function limpiarOrden() {
  mesaConsumo.value = [];
  $q.notify({
    type: 'positive',
    message: '¡Cuenta solicitada! La orden ha sido enviada y tu mesa se ha limpiado.'
  });
}
</script>

<style lang="scss" scoped>
.order-status-page {
  min-height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  background: #f5f5f5;

  .q-card {
    width: 100%;
    max-width: 900px;
    border-radius: 16px;
    font-size: 1.2em;
    margin: 0 auto;
  }

  .q-table {
    font-size: 1.1em;
  }

  .btn-accion {
    min-width: 120px;
    max-width: 100%;
    height: 40px;
    font-size: 1em;
    border-radius: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.10);
    transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .btn-accion:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
    transform: translateY(-2px) scale(1.03);
    filter: brightness(1.08);
  }

  @media (max-width: 600px) {
    .btn-accion {
      min-width: 100%;
      height: 36px;
      font-size: 0.95em;
    }
  }
}
</style>
