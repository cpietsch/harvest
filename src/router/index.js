import Vue from 'vue'
import Router from 'vue-router'
import Vis from '@/components/Vis'
import Test from '@/components/Test'
import About from '@/components/About'
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
      name: 'About',
      component: About
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})
