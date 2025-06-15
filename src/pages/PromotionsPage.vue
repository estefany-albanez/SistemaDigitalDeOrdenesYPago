<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated class="bg-primary text-white">
            <q-toolbar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-quasar-generic.svg" alt="Logo"
                    style="height: 30px; margin-right: 10px;">
                <q-toolbar-title>
                    Promociones Especiales
                </q-toolbar-title>
                <q-space />
                <q-btn flat dense label="Menú Inicio" class="q-ml-sm" to="/menu" />
                <q-btn flat dense label="Promociones" class="q-ml-sm" to="/promotions" />
                <q-btn flat dense label="Dashboard" class="q-ml-sm" to="/dashboard" />
                <q-btn flat dense label="Pagos" class="q-ml-sm" to="/payments" />
                <q-btn flat dense label="Comentarios" class="q-ml-sm" to="/feedback" />
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page class="q-pa-md bg-grey-2">
                <div class="row q-col-gutter-md">
                    <div class="col-xs-12 text-h5 q-mb-md">¡Ofertas que no puedes dejar pasar!</div>
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" v-for="promo in promotions" :key="promo.id">
                        <q-card class="promotion-card">
                            <q-img :src="promo.image" :ratio="16 / 9" />
                            <q-card-section>
                                <div class="text-h6 text-primary q-mb-xs">{{ promo.name }}</div>
                                <div class="text-subtitle2 text-grey-8">{{ promo.description }}</div>
                                <div v-if="promo.originalPrice" class="text-caption text-strike text-grey-6 q-mt-sm">
                                    Precio regular: {{ promo.originalPrice }}
                                </div>
                                <div v-if="promo.discountPrice" class="text-h5 text-positive q-mt-sm">
                                    ¡Solo hoy: {{ promo.discountPrice }}!
                                </div>
                                <div v-if="promo.validUntil" class="text-caption text-grey-7 q-mt-sm">

                                    Válido hasta: {{ promo.validUntil }}
                                </div>
                                <div class="q-mt-md text-right">
                                    <q-btn color="orange-8" label="Ver Detalles" rounded dense class="q-px-md"
                                        @click="showPromotionDetails(promo)" />
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div v-if="promotions.length === 0" class="col-12 text-center text-h6 text-grey-6
q-mt-xl">
                        No hay promociones activas en este momento. ¡Vuelve pronto!
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const promotions = ref([
    {
        id: 1,
        name: '¡2x1 en Pizzas Grandes!',
        description: 'Compra una pizza grande y lleva la segunda GRATIS. Aplica en todas nuestras variedades.',
        image: 'https://images.unsplash.com/photo-1593560704721-db7528e93892?q=80&w=2832&auto=format & fit=crop& ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D',
        originalPrice: '$25.00',
        discountPrice: '$25.00 (por 2)',
        validUntil: '30 de Junio de 2025',
        conditions: 'Válido solo para llevar. No acumulable con otras promociones.'
    },

    {
        id: 2,
        name: 'Combo Burger Familiar',
        description: '4 hamburguesas Cheesy Melt, 2 papas grandes y 4 bebidas.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2881&auto=format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D',
        originalPrice: '$60.00',
        discountPrice: '$45.99',
        validUntil: '15 de Julio de 2025',
        conditions: 'Disponible solo para entrega a domicilio.'
    },
    {
        id: 3,
        name: 'Desayuno Express - 20% OFF',
        description: 'Disfruta de un 20% de descuento en todos nuestros combos de desayuno antes de las 10 AM.',
        image: 'https://images.unsplash.com/photo-1484723091739-cd68ae72ad45?q=80&w=2868&auto=format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D',
        originalPrice: '', // No aplica precio original si es un porcentaje
        discountPrice: '', // No aplica precio de descuento si es un porcentaje
        validUntil: '31 de Agosto de 2025',
        conditions: 'Válido de Lunes a Viernes de 7 AM a 10 AM.'
    },
    {
        id: 4,
        name: 'Postre Gratis con tu Cena',
        description: 'Por la compra de cualquier plato principal de la sección de cenas, recibe un postre de la casa GRATIS.',
        image: 'https://images.unsplash.com/photo-1563721382582-74d32092c4d9?q=80&w=2874&auto=format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D',
        originalPrice: '',
        discountPrice: 'Postre Gratis',
        validUntil: '10 de Julio de 2025',
        conditions: 'Postres seleccionados aplican.'
    }
]);
const showPromotionDetails = (promo) => {
    $q.dialog({
        title: promo.name,
        message: `
<div class="text-center">

<img src="${promo.image}" style="max-width: 100%; height: auto; border-radius: 8px;
margin-bottom: 10px;" />
</div>
<div>${promo.description}</div>
${promo.originalPrice ? `<div class="text-strike text-grey-6">Precio regular:
${promo.originalPrice}</div>` : ''}
${promo.discountPrice ? `<div class="text-h6 text-positive">¡Oferta:
${promo.discountPrice}!</div>` : ''}
${promo.validUntil ? `<div class="text-caption text-grey-7">Válido hasta:
${promo.validUntil}</div>` : ''}
${promo.conditions ? `<div class="text-caption text-grey-8 q-mt-sm">Condiciones:
${promo.conditions}</div>` : ''}
`,
        html: true, // Importante para que el HTML en el mensaje se renderice
        persistent: true,
        ok: 'Cerrar'
    });
};
</script>
<style lang="sass">
.promotion-card
    width: 100%
    max-width: 350px // Puedes ajustar el ancho máximo de las tarjetas de promoción
    margin: auto
    border-radius: 8px
    overflow: hidden
    box-shadow: 0 4px 8px rgba(0,0,0,0.1) // Sombra suave para destacar
    transition: transform 0.2s ease-in-out
&:hover
    transform: translateY(-5px) // Efecto hover sutil
.q-img
    height: 180px // Altura fija para todas las imágenes de promoción
    width: 100%
    object-fit: cover // Asegura que la imagen cubra el área sin distorsión
    object-position: center // Centra la imagen dentro del contenedor
    border-bottom: 1px solid rgba(0,0,0,0.08)
// Estilos comunes (puedes moverlos a un archivo CSS global si los usas en varias páginas)
.bg-primary
    background: linear-gradient(to right, #f87171, #ef4444) !important
.text-primary
    color: #ef4444 !important
.q-btn.text-primary
    color: #ef4444 !important

// Opcional: Si quieres un estilo diferente para el título de la barra de herramientas de
promociones
.q-toolbar-title
    font-weight: bold
    font-size: 1.5rem
</style>