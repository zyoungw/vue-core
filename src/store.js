import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '@/custom/kVuex/kvuex.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count += 1
    }
  },
  actions: {
    increment({ getters, commit }) {
      //添加业务逻辑
      if (getters.left > 0) {
        commit('increment')
        return true
      }
      return false
    },
    asyncIncrement({ dispatch }) {
      // 异步逻辑返回promise
      return new Promise(resolve => {
        setTimeout(() => {
          //复用其他action
          resolve(dispatch('increment'))
        }, 1000)
      })
    }
  },
  getters: {
    // 计算剩余数量
    left(state) {
      return 10 - state.count
    }
  }
})
