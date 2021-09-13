<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{listLength}})</div>
    </nav-bar>
    <scroll ref="scroll" class="content">
      <cart-list></cart-list>
    </scroll>
    <car-bottom-bar></car-bottom-bar>
  </div>
</template>

<script>

import CartList from "./childComps/CartList.vue";
import CarBottomBar from "./childComps/CarBottomBar.vue";
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll.vue";

import { mapGetters } from "vuex";

export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    CarBottomBar
  },
  computed: {
    ...mapGetters({
      listLength: 'cartLength'
    })
  },
  activated() {
    this.$refs.scroll.refresh()
  }

}
</script>

<style scoped>
#cart {
  height: 100vh;
}

.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;
  height: calc(100% - 44px - 49px - 40px);
}
</style>