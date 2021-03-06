<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1"
      v-show="switchTabControl"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll"
      @pulling="pullingLoad">
      <home-swiper :banners="showBanners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <home-feature-view></home-feature-view>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import {
  getHomeMultidata,
  getHomeGoods
} from 'network/home.js'

import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeatureView from "./childComps/HomeFeatureView.vue"

import NavBar from 'components/common/navbar/NavBar'
import Scroll from "components/common/scroll/Scroll"
import TabControl from "components/content/tabControl/TabControl"
import GoodsList from 'components/content/goods/GoodsList'

import { itemImgListenerMixin, backTopMixin } from 'common/mixin.js'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  data() {
    return {
      banners: [],
      recommends: [],
      //   存放商品数据
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      currentType: 'pop',
      switchTabControl: false,
      taboffsetTop: 0,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    },
    showBanners() {
      if (this.banners.length === 0) {
        return []
      }
      return this.banners
    }
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 20)
    this.$refs.scroll.refresh()
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  deactivated() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
    this.saveY = this.$refs.scroll.scrollY
  },
  created() {
    // 1.请求轮播图和推荐数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    //   tab栏切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        default:
          this.currentType = 'sell'
          break;
      }
      //   同步两个tab-control
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      this.isShowBackTop = position.y <= -this.taboffsetTop
      this.switchTabControl = position.y <= -this.taboffsetTop
    },
    pullingLoad() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // $el获取组件中元素
      // 设置tabControl的offsetTop
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    //   网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page++
        // 完成上拉加载
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>