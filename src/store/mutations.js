export default {
    //mutations中尽量只做单一的操作
    addCount(state, payload) {
        payload.count++
    },
    subCount(state, payload) {
        payload.count--
    },
    addCart(state, payload) {
        payload.checked = false
        payload.count = 1
        state.cartList.push(payload)
    },
    changeChecked(state, payload) {
        payload.checked = !payload.checked
    },
    changeCheckAll(state, payload) {
        state.cartList.forEach(item => item.checked = !payload)
    }

}