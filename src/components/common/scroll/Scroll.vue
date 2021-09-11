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
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probetype: this.probeType,
      click: true
    })

    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position);
    })

  }
}
</script>

<style scoped>
</style>