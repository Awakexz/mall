<template>
  <div id="cart-list-item">
    <div class="item-selector">
      <check-button :is-checked="itemInfo.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <a href="javascript:;" class="increment" @click="addCount">+</a>
        <div class="item-count right">{{itemInfo.count}}</div>
        <a href="javascript:;" class="decrement" @click="subCount">-</a>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  name: 'CartListItem',
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    subCount() {
      if (this.itemInfo.count > 1) {
        this.$store.dispatch('changeCount', {
          obj: this.itemInfo,
          step: -1
        })
      }
      else {
        this.$toast.show('当前商品数量不能小于1!')
      }
    },
    addCount() {
      this.$store.dispatch('changeCount', {
        obj: this.itemInfo,
        step: 1
      })
    },
    checkClick() {
      this.$store.commit('changeChecked', this.itemInfo)
    }
  }
}
</script>

<style scoped>
#cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  font-size: 20px;
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}

.decrement,
.increment {
  float: right;
  margin: 0 10px;
  border: 1px solid #cacbcb;
  height: 20px;
  line-height: 18px;
  width: 19px;
  text-align: center;
  color: #666;
  background: #fff;
}
</style>
