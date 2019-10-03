<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <p class="error" v-if="errormessage">{{errormessage}}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
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
  mounted() {
    this.$on('validate', () => {
      this.validate()
    })
  },
  data() {
    return {
      errormessage: '' // 校验错误
    }
  },
  methods: {
    validate() {
      // 获取对应FormItem校验规则
      // console.log(this.form.rules[this.prop])
      const rules = this.form.rules[this.prop]
      // 获取校验值
      // console.log(this.form.model[this.prop])
      const value = this.form.model[this.prop]
      // 校验描述对象
      const descriptor = {
        [this.prop]: rules
      }
      // 创建校验器
      const schema = new Schema(descriptor)
      // 返回Promise. 没有触发catch就说明验证通过
      return schema.validate(
        {
          [this.prop]: value
        },
        errors => {
          if (errors) {
            // 将错误信息显示
            this.errormessage = errors[0].message
          } else {
            // 校验通过
            this.errormessage = ''
          }
        }
      )
    }
  }
}
</script>

<style scoped>
.error {
  font-size: 12px;
  line-height: 1;
  color: red;
}
</style>
