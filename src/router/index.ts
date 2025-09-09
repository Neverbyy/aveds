import { 
  createRouter, 
  createWebHistory, 
  type RouteRecordRaw, 
  type RouteLocationNormalized 
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/HomePage.vue'),
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../pages/ContactsPage.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../pages/AccountPage.vue'),
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to: RouteLocationNormalized) => {
  if (to.meta && (to.meta as any).requiresAuth) {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      return { name: 'home' }
    }
  }
  return true
})

export default router


