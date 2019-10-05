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
    // 给obj定义属性
    Object.defineProperty(obj, key, {
      get() {
        return val
      },
      set(newVal) {
        if (newVal === val) return
        val = newVal
        console.log(`${key}属性更新了`)
      }
    })
  }
}
