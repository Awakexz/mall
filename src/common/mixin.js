import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop"

export const itemImgListenerMixin = {
    data() {
        itemImgListener: null
    },
    mounted() {
        // 监听item中图片加载完成
        this.itemImgListener = () => {
            refresh();
        };
        const refresh = debounce(this.$refs.scroll.refresh)
        // 事件总线监听图片加载完成并且刷新scrollHeight
        this.$bus.$on('itemImageLoad', this.itemImgListener)
    }
}

// 回到顶部混入 在主页和详情页使用
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