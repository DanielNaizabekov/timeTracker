import { createRouter, createWebHashHistory } from 'vue-router'
import { routeNames } from './routeNames'

const mount = componentName => () => import(`@/pages/${componentName}.vue`)

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: routeNames.recordExplore.name,
      path: '/',
      component: mount('RecordExplore'),
      children: [
        {
          name: routeNames.recordForm.name,
          path: '/record/:id?',
          component: mount('RecordForm'),
          props: true,
        },
      ],
    },
  ],
})
