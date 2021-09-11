<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-parms-info :item-params="itemParams"></detail-parms-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommendInfo"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./chilidComps/DetailNavBar.vue";
import DetailSwiper from "./chilidComps/DetailSwiper.vue";
import DetailBaseInfo from "./chilidComps/DetailBaseInfo.vue";
import DetailShopInfo from "./chilidComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./chilidComps/DetailGoodsInfo.vue"
import DetailParmsInfo from "./chilidComps/DetailParmsInfo.vue";
import DetailCommentInfo from "./chilidComps/DetailCommentInfo.vue";

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';

import { getDetail, getRecommend, Goods, Shop } from "network/detail.js";


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
      recommendInfo: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParmsInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,

  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      const data = res.result
      // 1.获取轮播图信息
      this.topImages = data.itemInfo.topImages;
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

    getRecommend().then(res => {
      this.recommendInfo = res.data.list;
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
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
}
</style>
