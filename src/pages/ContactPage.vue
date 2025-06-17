<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="contact-card shadow-2">
      <q-card-section class="text-center bg-primary text-white">
        <div class="text-h4 q-my-md">Contáctanos</div>
        <p class="text-subtitle1">Estamos aquí para ayudarte. Rellena el formulario o usa
          nuestra información de contacto.</p>
      </q-card-section>
      <q-card-section class="q-pt-md q-pb-none">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input filled v-model="formData.name" label="Tu Nombre *" hint="Nombre completo" lazy-rules
            :rules="[val => (val && val.length > 0) || 'Por favor, escribe tu nombre']" />
          <q-input filled v-model="formData.email" label="Tu Email *" hint="ejemplo@dominio.com" type="email" lazy-rules
            :rules="[
              val => (val && val.length > 0) || 'Por favor, escribe tu email',
              val => /.+@.+\..+/.test(val) || 'Por favor, escribe un email válido'
            ]" />
          <q-input filled v-model="formData.phone" label="Tu Teléfono (opcional)" type="tel" mask="(###) ### - ####"
            unmasked-value hint="Ej: (123) 456 - 7890" />
          <q-input filled v-model="formData.message" label="Tu Mensaje *" type="textarea" rows="5" lazy-rules
            :rules="[val => (val && val.length > 0) || 'Por favor, escribe tu mensaje']" />
          <div>
            <q-btn label="Enviar Mensaje" type="submit" color="primary" />
            <q-btn label="Resetear" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
      <q-card-section class="q-pt-lg text-center">
        <q-separator inset class="q-my-md" />
        <div class="text-h6 q-mb-sm">Información de Contacto</div>
        <p class="text-body1">
          <q-icon name="location_on" class="q-mr-sm" />123 Calle principal, Ciudad San Salvador, El Salvador<br>
          CP 00000<br>
          <q-icon name="phone" class="q-mr-sm" />+503 1234-5678<br>
          <q-icon name="email" class="q-mr-sm" />info@mitienda.com
        </p>
        <div class="q-mt-md">
          <div v-if="lat && lng">
            <div class="text-subtitle2 q-mb-xs">Tu ubicación en tiempo real:</div>
            <iframe :src="`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`" width="100%" height="300"
              style="border:0;" allowfullscreen loading="lazy"></iframe>
            <div class="text-caption text-grey-7 q-mt-xs">Lat: {{ lat }}, Lng: {{ lng }}</div>
          </div>
          <div v-else class="text-caption text-negative q-mt-md">
            No se pudo obtener tu ubicación en tiempo real.
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});
const lat = ref(null)
const lng = ref(null)

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        lat.value = pos.coords.latitude;
        lng.value = pos.coords.longitude;
      },
      () => {
        lat.value = null;
        lng.value = null;
      }
    );
  }
});

const onSubmit = () => {
  // Aquí es donde enviarías los datos del formulario a un backend.
  // Por ahora, solo mostraremos una notificación.
  console.log('Datos del formulario:', formData.value);
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Mensaje enviado con éxito! Nos pondremos en contacto pronto.'
  });
  onReset(); // Opcional: resetear el formulario después de enviar
};
const onReset = () => {
  formData.value.name = '';
  formData.value.email = '';
  formData.value.phone = '';
  formData.value.message = '';
};
</script>
<style lang="scss" scoped>
.contact-card {
  width: 100%;
  max-width: 700px;
  border-radius: 8px;
}
</style>
