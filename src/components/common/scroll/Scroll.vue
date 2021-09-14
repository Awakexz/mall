<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

import BScroll from "better-scroll";
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    click: {
      type: Boolean,
      default: true
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    scrollY() {
      return this.scroll.y
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      // 刷新scrollHeight
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  mounted() {
    //   创建bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: this.click,
    })
    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
    }
    // 监听底部上拉加载
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', position => {
        this.$emit('pulling')
      })
    }
  }
}
</script>

<style scoped>
</style>