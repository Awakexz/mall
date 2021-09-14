export default {
    // 购物车商品长度
    cartLength(state) {
        return state.cartList.length;
    },
    // 购物车商品列表
    cartList(state) {
        return state.cartList
    }
}