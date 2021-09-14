export default {
    //mutations中尽量只做单一的操作
    // 商品数量+1
    addCount(state, payload) {
        payload.count++
    },
    // 商品数量-1
    subCount(state, payload) {
        payload.count--
    },
    // 添加新商品
    addCart(state, payload) {
        payload.checked = false
        payload.count = 1
        state.cartList.push(payload)
    },
    // 改变商品选中状态
    changeChecked(state, payload) {
        payload.checked = !payload.checked
    },
    // 改变全选按钮
    changeCheckAll(state, payload) {
        state.cartList.forEach(item => item.checked = !payload)
    }

}