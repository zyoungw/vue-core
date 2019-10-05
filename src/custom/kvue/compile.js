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
    while (child === el.firstChile) {
      fragment.appendChild(child)
    }
    return fragment
  }

  // 递归遍历el, 分别处理元素节点和插值表达式
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        console.log('编译元素' + node.nodeName)
      } else if (this.isInterpolation(node)) {
        console.log('编译插值文本' + node.textContent)
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
}
