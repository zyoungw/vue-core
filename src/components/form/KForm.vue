<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    return {
      // 将组件实例作为提供者，子代组件可方便获取
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // 调用所有含有prop属性的子组件的validate方法并得到promise数组
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())
      console.log(tasks)
      // 所有任务必须全部成功才算校验通过，任一失败则校验失败
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style>
</style>