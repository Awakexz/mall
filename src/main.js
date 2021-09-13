import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import fastclick from 'fastclick'

import toast from 'components/common/toast/index.js'

Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟问题
fastclick.attach(document.body)

Vue.prototype.$bus = new Vue()
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')

