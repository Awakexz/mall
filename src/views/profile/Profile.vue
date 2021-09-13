<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">我的档案</div>
    </nav-bar>
    <user-info @click.native="undoClick"></user-info>
    <account-info @click.native="undoClick"></account-info>
    <profile-list :list-data="orderList" @click.native="undoClick"></profile-list>
    <profile-list :list-data="serviceList"></profile-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import UserInfo from "./childComps/UserInfo.vue";
import AccountInfo from "./childComps/AccountInfo.vue";
import ProfileList from "./childComps/ProfileList.vue";

export default {
  name: 'Profile',
  components: {
    NavBar,
    UserInfo,
    AccountInfo,
    ProfileList
  },
  data() {
    return {
      orderList: [
        { icon: 'message.svg', info: '我的消息' },
        { icon: 'pointer.svg', info: '积分商城' },
        { icon: 'vip.svg', info: '会员卡' },
      ],
      serviceList: [
        { icon: 'cart.svg', info: '我的购物车' },
        { icon: 'shopping.svg', info: '下载购物APP' },
      ]
    }
  },
  methods: {
    undoClick() {
      this.$toast.show('当前功能尚未开发,请见谅')
    }
  }
}
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>