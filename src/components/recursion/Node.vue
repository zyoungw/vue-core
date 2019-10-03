<template>
  <div>
    <h3>{{data.title}}</h3>
    <!-- 有条件嵌套 -->
    <Node v-for="d in data.children" :key="d.id" :data="d"></Node>
  </div>
</template>

<script>
export default {
  name: 'Node',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
</style>