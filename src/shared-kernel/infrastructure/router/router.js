import HomePage from '@/contexts/public/pages/home-page.page.vue'
import AboutPage from '@/contexts/public/pages/about-page.page.vue'
import NotFoundComponent from '@/shared-kernel/presentation/ui/components/not-found.component.vue'
import TutorialList from '@/contexts/tutorial/presentation/pages/tutorial-list.page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage, exact: true },
  { path: '/tutorials', component: TutorialList, exact: true },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundComponent },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
