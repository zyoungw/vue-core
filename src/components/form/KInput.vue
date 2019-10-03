<template>
  <div>
    <input :value="value" @input="onInput" v-bind="$attrs">
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: string,
      default: ''
    }
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>