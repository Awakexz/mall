<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="titleItem" :class="{active: currentIndex === index}"
          @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      // 点击导航栏切换
      this.currentIndex = index
      this.$emit('titleClick', index)

    },
    // 返回首页
    backClick() {
      this.$router.back()
    }
  }

}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
}

.titleItem {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 12px;
}
</style>
