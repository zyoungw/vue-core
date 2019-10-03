<template>
  <div>
    <h3>KForm表单</h3>
    <hr />
    <k-form-item label="用户名" prop="username">
      <k-input v-model="model.username"></k-input>
    </k-form-item>
    <k-form-item label="确认密码" prop="password">
      <k-input type="password" v-model="model.password"></k-input>
    </k-form-item>
  </div>
</template>

<script>
import KInput from './KInput'
import KFormItem from './KFormItem'
export default {
  components: {
    KInput,
    KFormItem
  },
  data() {
    return {
      model: {
        username: 'tom',
        password: ''
      }
    }
  }
}
</script>

<style>
</style>