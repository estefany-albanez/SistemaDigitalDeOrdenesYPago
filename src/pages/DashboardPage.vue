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
                    <q-input filled v-model="formData.email" label="Tu Email *" hint="ejemplo@dominio.com" type="email"
                        lazy-rules :rules="[
                            val => (val && val.length > 0) || 'Por favor, escribe tu email',
                            val => /.+@.+\..+/.test(val) || 'Por favor, escribe un email válido'
                        ]" />
                    <q-input filled v-model="formData.phone" label="Tu Teléfono (opcional)" type="tel"
                        mask="(###) ### - ####" unmasked-value hint="Ej: (123) 456 - 7890" />
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
                    <q-icon name="location_on" class="q-mr-sm" />123 Calle Falsa, Ciudad Inventada,
                    CP 00000<br>
                    <q-icon name="phone" class="q-mr-sm" />+503 1234-5678<br>
                    <q-icon name="email" class="q-mr-sm" />info@mitienda.com
                </p>
                <div class="q-mt-md">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15739.066487532398!2
d-89.5701723226162!3d13.984000350389332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m
3!1m2!1s0x8f62f1d9a0d1e7c5%3A0xc3f8f170b6f9d2d4!2sSanta%20Ana!5e0!3m2!1ses-419
!2ssv!4v1701886816000!5m2!1ses-419!2ssv" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar(); const formData = ref({
    name: '',
    email: '',
    phone: '',
    message: ''
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