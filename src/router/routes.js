const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'agregar', component: () => import('pages/agregarPlatillo.vue') },
      { path: 'contacto', component: () => import('pages/ContactPage.vue') },
      { path: 'promociones', component: () => import('pages/PromotionsPage.vue') },
      { path: 'detalles', component: () => import('pages/ProductPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.)',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]
export default routes
