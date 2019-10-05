let Vue
// 声明Router类
export default class KVueRouter {
  constructor(options) {
    this.$options = options
    // path、component映射
    this.routeMap = {}
    // current保存当前hash
    // vue使其是响应式的
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }

  // 声明初始化函数
  init() {
    // 1. 事件监听
    this.bindEvents()
    // 2. 路由映射操作
    this.createRouteMap()
    // 3. 组件声明和注册
    this.initComponent()
  }

  // hash变更检测
  bindEvents() {
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }

  // 路径变更处理
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }

  // 创建路由映射表
  createRouteMap() {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item
    })
  }

  // router-link/router-view声明
  initComponent() {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(h) {
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
        return h(
          'a',
          {
            attrs: {
              href: '#' + this.to
            }
          },
          [this.$slots.default]
        )
      }
    })

    Vue.component('router-view', {
      render: h => {
        var component = this.routeMap[this.app.current].component
        return h(component)
      }
    })
  }
}

// 插件逻辑
KVueRouter.install = function(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        // 确保是根组件时执行一次，将router实例放到Vue原型，以后所有组件实例就均有$router
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}
