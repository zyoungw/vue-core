<template>
  <div>
    <h3>KForm表单</h3>
    <hr />
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input v-model="model.username" placeholder="请输入用户名"></k-input>
      </k-form-item>
      <k-form-item label="确认密码" prop="password">
        <k-input type="password" v-model="model.password" placeholder="请输入密码"></k-input>
      </k-form-item>
      <KFormItem>
        <button @click.prevent="submitForm">登录</button>
      </KFormItem>
    </k-form>
    <hr />
    {{model.username}}
    {{model.password}}
  </div>
</template>

<script>
import KInput from './KInput'
import KForm from './KForm'
import KFormItem from './KFormItem'
import create from '@/utils/create'
import Notice from '@/components/Notice'
export default {
  components: {
    KInput,
    KFormItem,
    KForm,
    Notice
  },
  data() {
    return {
      model: {
        username: 'tom',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        const msg = valid ? '请求登录！' : '校验失败！'
        const notice = create(Notice, {
          title: '这是一个标题',
          message: msg,
          duration: 1000
        })
        notice.show()
      })
    }
  }
}
</script>

<style>
</style>