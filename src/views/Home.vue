<template>
  <div class="home">
    <h1>首页</h1>
    <div>
      <div>冲啊，手榴弹扔了{{$store.state.count}}个</div>
      <div>
        <span>还剩{{$store.getters.left}}个</span>
      </div>
      <button @click="add">扔一个</button>
      <button @click="asyncAdd">蓄力扔一个</button>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create'
import Notice from '@/components/Notice'

export default {
  name: 'home',
  methods: {
    add() {
      // if (this.$store.getters.left) {
      // this.$store.commit('increment')
      // 即使action执行同步代码返回的结果依然是promise
      this.$store.dispatch('increment').then(result => {
        if (!result) {
          const notice = create(Notice, {
            title: '这是一个标题',
            message: '"投掷失败!没货啦"',
            duration: 1000
          })
          notice.show()
        }
      })
      // }
    },
    asyncAdd() {
      this.$store.dispatch('asyncIncrement').then(result => {
        if (!result) {
          const notice = create(Notice, {
            title: '这是一个标题',
            message: '"投掷失败!没货啦"',
            duration: 1000
          })
          notice.show()
        }
      })
    }
  }
}
</script>
