import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'builder',
    component: () => import('../views/Builder.vue'),

    children: [
      {
        path: ':deviceId',
        name: 'device',
        component: () => import('../views/BuilderDeviceForm'),
      },
      {
        path: ':deviceId/pages/:pageId',
        name: 'page',
        component: () => import('../views/BuilderPageForm'),
      },
      {
        path: ':deviceId/pages/:pageId/groups/:groupId',
        name: 'group',
        component: () => import('../views/BuilderGroupForm'),
      },
      {
        path: ':deviceId/pages/:pageId/groups/:groupId/tiles/:tileId',
        name: 'tile',
        component: () => import('../views/BuilderTileForm'),
      },
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
