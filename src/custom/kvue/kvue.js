class KVue {
  constructor(options) {
    console.log('options', options)
    // 保存选项
    this.$options = options
    // 传入data选项
    this.$data = options.data
    // 响应化
    this.observe(this.$data)
  }

  observe(value) {
    if (!value || typeof value !== 'object') {
      return
    }
    // 遍历，执行数据响应式
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      // 代理data中的属性到vue根上
      this.proxyData(key)
    })
  }

  // 在vue根上定义属性代理data中的数据
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
        console.log(`根${key}属性更新了`)
      }
    })
  }

  defineReactive(obj, key, val) {
    console.log('defineReactive', obj, key, val)
    // 递归
    this.observe(val)

    const dep = new Dep()
    // 给obj定义属性
    Object.defineProperty(obj, key, {
      get() {
        // 将Dep.target(即当前的Watcher对象存入Dep的deps中)
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        console.log(`${key}属性更新了`)
        // 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 dep.notify()
        dep.notify()
      }
    })
  }
}

class Dep {
  constructor() {
    // 存储所有的依赖
    this.deps = []
  }

  // 在deps中添加一个监听器对象
  addDep(dep) {
    console.log('dep', dep)
    this.deps.push(dep)
  }

  // 通知所有监听器去更新视图
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

class Watcher {
  constructor(vm, key) {
    // 在new一个监听器对象时将该对象赋值给Dep.target，在get中会用到
    Dep.target = this
    this.vm = vm
    this.key = key
  }

  update() {
    console.log(`属性${this.key}更新了`)
  }
}
