import { request } from './request'

// 分类菜单信息
export function getCategory() {
    return request({
        url: '/category'
    })
}

// 详细分类菜单信息
export function getSubcategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}
