import { createRouter, createWebHistory } from 'vue-router'
import { entryBySlug } from './content'
import { site } from './site'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/HomePage.vue'),
      meta: { title: site.name },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./pages/AboutPage.vue'),
      meta: { title: 'About' },
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./pages/ProjectsPage.vue'),
      meta: { title: 'Projects' },
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('./pages/EntryPage.vue'),
      props: { collection: 'projects' },
      beforeEnter: (to) =>
        entryBySlug('projects', String(to.params.slug)) ? true : { name: 'projects' },
    },
    {
      path: '/interests',
      name: 'interests',
      component: () => import('./pages/InterestsPage.vue'),
      meta: { title: 'Interests' },
    },
    {
      path: '/interests/:slug',
      name: 'interest',
      component: () => import('./pages/EntryPage.vue'),
      props: { collection: 'interests' },
      beforeEnter: (to) =>
        entryBySlug('interests', String(to.params.slug)) ? true : { name: 'interests' },
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'home' } },
  ],
  scrollBehavior(_to, _from, saved) {
    return saved ?? { top: 0 }
  },
})

router.afterEach((to) => {
  const slug = typeof to.params.slug === 'string' ? to.params.slug : ''
  const collection = to.name === 'project' ? 'projects' : to.name === 'interest' ? 'interests' : null
  const title = collection
    ? entryBySlug(collection, slug)?.title
    : (to.meta.title as string | undefined)
  document.title = title && title !== site.name ? `${title} — ${site.name}` : site.name
})

export default router
