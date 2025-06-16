const routes = [
{path: '/',
component: () => import('layouts/MainLayout.vue'),
children: [
{ path: '', component: () => import('pages/ProductsPage.vue') },
{ path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
{ path: 'order-modification', component: () => import('pages/OrderModificationPage.vue')
},
{ path: 'payment', component: () => import('pages/PaymentPage.vue') },
{ path: 'contact', component: () => import('pages/ContactPage.vue') },
  { path: 'product/:id', name: 'product-detail', component: () =>
    import('pages/ProductDetailPage.vue') }
 // Añade esta línea
]
},
{
path: '/:catchAll(.)',
component: () => import('pages/ErrorNotFound.vue')
}
]
export default routes
