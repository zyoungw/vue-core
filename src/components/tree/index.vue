<template>
  <div id="app">
    <ul>
      <item class="item" :model="treeData"></item>
    </ul>
  </div>
</template>

<script>
import Item from './Item'
export default {
  data() {
    return {
      treeData: {
        title: 'hahah',
        children: [
          {
            title: 'Java架构'
          },
          {
            title: 'JS高级',
            children: [
              {
                title: 'Es6'
              },
              {
                title: '动效'
              }
            ]
          },
          {
            title: 'Web 全栈',
            children: [
              {
                title: 'Vue 练习',
                expand: true,
                children: [
                  {
                    title: '组件化'
                  },
                  {
                    title: 'React',
                    children: [
                      {
                        title: 'JSX'
                      },
                      {
                        title: '虚拟DOM'
                      },
                      {
                        title: 'NodeJS'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  components: {
    Item
  }
}
</script>

<style scoped>
.item {
  text-align: left;
}
</style>