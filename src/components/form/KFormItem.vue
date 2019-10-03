<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p v-if="errormessage">{{errormessage}}</p>
  </div>
</template>

<script>
export default {
  props: {
    // 输入标签项
    label: {
      type: String,
      default: ''
    },
    // 字段名
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errormessage: '' // 校验错误
    }
  }
}
</script>

<style>
</style>
