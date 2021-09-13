<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll id="tab-content" ref="scroll">
        <tab-content-category :subcategories="showSubcategory"></tab-content-category>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from "components/common/scroll/Scroll"

import TabMenu from "./childComps/TabMenu.vue";
import TabContentCategory from "./childComps/TabContentCategory.vue";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from 'network/category.js'

export default {
  name: 'Category',
  data() {
    return {
      categories: [],
      categoryData: {},
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
      } else {
        return this.categoryData[this.currentIndex].subcategories
      }
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) {
        return []
      } else {
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    }
  },
  created() {
    //   1.请求分类信息
    this._getCategory()
  },
  mounted() {

  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 先请求第一个分类的数据
        this._getSubCategory(0)
      })
    },
    _getSubCategory(index) {
      this.currentIndex = index
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = { ...this.categoryData }
        this._getCategoryDetail('pop')
        this._getCategoryDetail('sell')
        this._getCategoryDetail('new')
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = { ...this.categoryData }
      })
    },
    selectItem(index) {
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