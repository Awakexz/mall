export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let product = context.state.cartList.find(function (item) {
                return item.iid === payload.iid
            })
            if (product) {
                context.commit('addCount', product)
                resolve('当前商品数量+1')
            } else {
                context.commit('addCart', payload)
                resolve('成功加入购物车')
            }
        })
    },
    changeCount(context, payload) {
        if (payload.step > 0) {
            context.commit('addCount', payload.obj)
        } else {
            context.commit('subCount', payload.obj)
        }
    }
}