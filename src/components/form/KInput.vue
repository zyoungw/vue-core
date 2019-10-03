<template>
  <div>
    <input :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      // $parent 指 FormItem
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style>
</style>