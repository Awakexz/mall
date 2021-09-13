import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('views/home/Home.vue')
const Profile = () => import('views/profile/Profile.vue')
const Cart = () => import('views/cart/Cart.vue')
const Category = () => import('views/category/Category.vue')
const Detail = () => import('views/detail/Detail.vue')

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/detail/:iid',
        component: Detail
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router