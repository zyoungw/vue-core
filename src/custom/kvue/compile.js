// 编译器用法： new Compile(e;, vm)
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if (this.$el) {
      // 把$el里面内容搬到片段里面操作保证效率
      this.$fragment = this.node2Fragment(this.$el)
      // 执行编译，替换动态内容
      this.compile(this.$fragment)
      // 重新放回到$el中
      this.$el.appendChild(this.$fragment)
    }
  }

  // 把el里面内容搬到fragment里面操作保证效率
  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while ((child = el.firstChild)) {
      fragment.appendChild(child)
    }
    return fragment
  }

  // 递归遍历el, 分别处理元素节点和插值表达式
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        // console.log('编译元素' + node.nodeName)
        this.compileElement(node)
      } else if (this.isInterpolation(node)) {
        console.log('编译插值文本' + node.textContent)
        this.compileText(node)
      }
      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  isElement(node) {
    return node.nodeType == 1
  }

  isInterpolation(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  // 编译元素：处理指令k-和实践@开头属性
  compileElement(node) {
    // 获取节点属性
    let nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 规定： 指令以k-xxx命名
      let attrName = attr.name // 属性名称
      let exp = attr.value // 表达式
      if (this.isDirective(attrName)) {
        let dir = attrName.substring(2) // 截取指令名称
        // 执行指令解析
        this[dir] && this[dir](node, this.$vm, exp)
      }
    })
  }

  compileText(node) {
    // console.log('RegExp', RegExp, RegExp.$1)
    // node.textContent =this.$vm.$data[RegExp.$1]
    // 调用更新函数
    const exp = RegExp.$1
    this.update(node, this.$vm, exp, 'text')
  }

  // 调用更新函数，根据指令决定调用哪个更新器
  update(node, vm, exp, dir) {
    let updateFn = this[dir + 'Updater']
    // 去掉收尾空格（html eslint的时候会自动加上，必须去掉，不然get不到值）
    exp = (exp && exp.trim()) || ''
    updateFn && updateFn(node, vm[exp])
    new Watcher(vm, exp, function(value) {
      updateFn && updateFn(node, value)
    })
  }

  // 插值文本更新器
  textUpdater(node, value) {
    console.log('99', node, value)
    node.textContent = value
  }

  isDirective(attr) {
    return attr.indexOf('k-') == 0
  }

  text(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }
}
