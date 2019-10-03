<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <test></test> -->
    <!-- <recursion></recursion> -->
    <tree></tree>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Test from './components/form/index'
import Recursion from './components/recursion'
import Tree from './components/tree'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Recursion,
    Tree
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
