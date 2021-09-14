<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isCheckedAll" @click.native="checkAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">去计算({{checkedLength}})</div>
  </div>

</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from "vuex"

export default {
  name: 'CarBottomBar',
  components: {
    CheckButton
  },
  computed: {
    //   映射vuex中getters
    ...mapGetters({
      list: 'cartList',
      listLength: 'cartLength'
    }),
    totalPrice() {
      return '￥' + this.list.filter(item => item.checked).reduce(
        (preValue, item) => preValue + item.price * item.count, 0).toFixed(2)
    },
    checkedLength() {
      return this.list.filter(item => item.checked).length
    },
    isCheckedAll() {
      if (!this.listLength) {
        return false
      } else {
        return this.listLength === this.checkedLength
      }
    }
  },
  methods: {
    checkAllClick() {
      if (this.listLength) {
        this.$store.commit('changeCheckAll', this.isCheckedAll)
      } else {
        this.$toast.show('购物车为空')
      }
    },
    calcClick() {
      if (!this.checkedLength) {
        this.$toast.show('请选择您想要购买的商品')
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  position: fixed;
  display: flex;
  width: 100%;
  bottom: 49px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  background-color: #eee;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.cart-bottom-bar .total-price {
  margin-left: 15px;
  font-size: 16px;
  color: #666;
}

.cart-bottom-bar .calculate {
  position: absolute;
  right: 0;
  background-color: orangered;
  color: #fff;
  width: 100px;
  text-align: center;
}
</style>
