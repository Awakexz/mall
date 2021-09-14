<template>
  <div>
    <grid-view :cols="3" :lineSpace="15" :v-margin="20" v-if="subcategory.list">
      <div class="item" v-for="(item, index) in subcategory.list" :key="index">
        <!-- <a :href="item.link"> -->
        <img class="item-img" :src="item.image" alt="" @load="itemImageLoad">
        <div class="item-text">{{item.title}}</div>
        <!-- </a> -->
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridView/GridView.vue";
export default {
  name: 'TabContentCategory',
  props: {
    subcategory: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    GridView
  },
  methods: {
    itemImageLoad() {
      this.$bus.$emit('itemImageLoad')
    }
  }

}
</script>

<style scoped>
.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
