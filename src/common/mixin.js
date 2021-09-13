import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop"

export const itemImgListenerMixin = {
    data() {
        itemImgListener: null
    },
    mounted() {
        // 3.监听item中图片加载完成
        this.itemImgListener = () => {
            refresh();
        };
        const refresh = debounce(this.$refs.scroll.refresh, 100)
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        }
    }
}