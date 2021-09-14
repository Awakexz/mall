<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" ref="scroll">
        <tab-content-category :subcategory="showSubcategory"></tab-content-category>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from "components/common/scroll/Scroll"

import TabMenu from "./childComps/TabMenu.vue";
import TabContentCategory from "./childComps/TabContentCategory.vue";

import { itemImgListenerMixin } from "common/mixin.js";

import {
  getCategory,
  getSubcategory
} from 'network/category.js'

export default {
  name: 'Category',
  data() {
    return {
      categories: [],
      subcategories: [],
      currentIndex: -1
    }
  },
  components: {
    NavBar,
    Scroll,
    TabMenu,
    TabContentCategory
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) {
        return {}
      }
      return this.subcategories[this.currentIndex]
    }
  },
  mixins: [itemImgListenerMixin],
  created() {
    //  请求分类信息
    this._getCategory()
  },
  activated() {
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
  deactivated() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list
        // 初始化每个类别数据
        for (let i = 0; i < this.categories.length; i++) {
          this.subcategories[i] = {}
        }
        this._getSubCategory(0)
      })
    },
    _getSubCategory(index) {
      // 请求当前分类的详情列表信息
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        this.subcategories[index] = res.data
        this.currentIndex = index
      })
    },
    selectItem(index) {
      // 切换分类
      this._getSubCategory(index)
    }
  }
}
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}

#tab-content {
  overflow: hidden;
  height: 100%;
  flex: 1;
}
</style>