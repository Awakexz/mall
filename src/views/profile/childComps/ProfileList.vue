<template>
  <div class="profile-list">
    <div v-for="(item, index) in listData" :key="index" class="item" @click="listClick(item)">
      <span class="icon">
        <img :src="iconURL(item)" alt="">
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileList',
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    iconURL(item) {
      return require('assets/img/profile/' + item.icon)
    },
    listClick(item) {
      if (item.info === '我的购物车') {
        this.$router.replace('/cart')
      }
    }
  }

}
</script>

<style scoped>
.profile-list {
  background-color: #fff;
  font-size: 15px;
  color: #333;
  margin-top: 15px;
}

.profile-list .item {
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  position: relative;
}

.icon img {
  width: 20px;
  height: 20px;
}

.item .icon {
  margin-top: 10px;
  position: absolute;
  left: 16px;
  top: -7px;
}

.item .info {
  margin-left: 40px;
  padding-left: 5px;
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>
