import { request } from './request'

// 主页轮播图和推荐数据
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

// 主页商品列表信息
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}
