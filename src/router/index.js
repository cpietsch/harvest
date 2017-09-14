import Vue from 'vue'
import Router from 'vue-router'
import Vis from '@/components/Vis'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/vis/:addr/:view',
      name: 'Vis',
      component: Vis
    },
    {
      path: '/',
      name: 'Vis',
      component: Vis
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
