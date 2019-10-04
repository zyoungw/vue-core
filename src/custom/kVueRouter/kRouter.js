import Vue from 'vue'
import KVueRouter from './kvue-router'
import Home from '@/views/Home'
import About from '@/views/About'
// 应用插件：做了什么？install
// install里面做了什么？
// 1.挂载$router
// 2.注册组件
Vue.use(KVueRouter)
// router做了什么？
// 1.解析路由配置
// 2.响应url变化
// 3.事件监听hashchange
// 4.组件切换？怎么切换
export default new KVueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
