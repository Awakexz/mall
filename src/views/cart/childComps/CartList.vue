<template>
  <div class="cart-list">
    <ul>
      <cart-list-item v-for="(item,index) in list" :item-info="item" :key="index"></cart-list-item>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";


export default {
  name: 'CartList',
  computed: {
    ...mapGetters({
      list: 'cartList'
    })
  },
  components: {
    CartListItem
  }

}
</script>

<style scoped>
</style>
