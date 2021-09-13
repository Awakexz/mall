<template>
  <div id="detail">
    <!-- $emit传属性时要使用-分割 传函数时可以使用驼峰命名 -->
    <detail-nav-bar @titleClick="titleClick" ref="navBar"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-params-info :item-params="itemParams" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendInfo" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./chilidComps/DetailNavBar.vue"
import DetailSwiper from "./chilidComps/DetailSwiper.vue"
import DetailBaseInfo from "./chilidComps/DetailBaseInfo.vue"
import DetailShopInfo from "./chilidComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./chilidComps/DetailGoodsInfo.vue"
import DetailParamsInfo from "./chilidComps/DetailParamsInfo.vue"
import DetailCommentInfo from "./chilidComps/DetailCommentInfo.vue"
import DetailBottomBar from "./chilidComps/DetailBottomBar.vue";

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { itemImgListenerMixin, backTopMixin } from 'common/mixin.js'
import { debounce } from 'common/utils.js'

import { getDetail, getRecommend, Goods, Shop } from "network/detail.js"


export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommendInfo: [],
      titilePositions: [],
      getTitilePositions: null
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result
      // 1.获取轮播图信息
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo)
      // 4.获取商品详情数据
      this.detailInfo = data.detailInfo
      // 5.获取商品的参数信息
      this.itemParams = data.itemParams
      // 6.获取评论信息
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 对获取标题对应的offsetTop进行防抖操作
    this.getTitilePositions = debounce(() => {
      this.titilePositions = []
      this.titilePositions.push(0)
      this.titilePositions.push(this.$refs.params.$el.offsetTop)
      this.titilePositions.push(this.$refs.comment.$el.offsetTop)
      this.titilePositions.push(this.$refs.recommend.$el.offsetTop)
      this.titilePositions.push(Number.MAX_VALUE)
    }, 100)

    getRecommend().then(res => {
      this.recommendInfo = res.data.list
    })
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      // 详情图片加载完获取title对应的offsetTop
      this.getTitilePositions()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.titilePositions[index], 500)
    },
    contentScroll(position) {
      const positionY = -position.y
      this.isShowBackTop = positionY >= 1000
      let length = this.titilePositions.length
      for (let i = 0; i < length - 1; i++) {
        if (this.$refs.navBar.currentIndex != i && positionY >= this.titilePositions[i]
          && positionY < this.titilePositions[i + 1]) {
          this.$refs.navBar.currentIndex = i
        }
      }
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res)
      })
    }
  }

}
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
  z-index: 9;
  background-color: #fff;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  left: 0;
  bottom: 0;
  margin-bottom: 58px;
}
</style>
