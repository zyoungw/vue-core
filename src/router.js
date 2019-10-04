import Vue from 'vue'
import Router from 'vue-router'
const Load = view => () => import(`@/views/${view}`)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Load('Home'),
      children: [
        {
          path: '/detail/:id',
          name: 'child',
          component: Load('Detail')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: Load('About')
    }
  ]
})
