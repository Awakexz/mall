<template>
  <div class="wrapper" ref="aaaa">
    <h2>分类</h2>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // console.log(this.$refs.aaaa);
    // console.log(document.querySelector('.wrapper'));
    this.scroll = new Bscroll(this.$refs.aaaa, {
      probeType: 3,
      pullUpLoad: true,
    });
    this.scroll.on('scroll', (position) => {
      console.log(position);
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多');
    })
    this.scroll.finishPullUp();
  }
}
</script>

<style scoped>
</style>