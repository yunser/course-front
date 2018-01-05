// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/util/http'
import qs from 'qs'
import storage from '@/util/storage'
// 全部加载
import YunserUI from 'yunser-ui-vue'
import 'yunser-ui-vue/dist/yunser-ui.css'
// 单个组件加载
// import appBar from 'yunser-components/'
import './scss/main.scss'
// import 'yunser-components/styles2/base.scss' // 加载基础的样式
import ui from './components/index'
import 'yunser-ui-vue/dist/theme-carbon.css' // 使用 carbon 主题
// import appBar from 'yunser-components/appBar'
// import avatar from 'yunser-components/avatar'
// Vue.component(appBar.name, appBar)
// Vue.component(avatar.name, avatar)

// 全部加载
Vue.use(YunserUI)

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.$qs = qs
Vue.prototype.$storage = storage

Vue.use(ui)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})

// const renderer = require('vue-server-renderer').createRenderer()
//
// renderer.renderToString(app, (err, html) => {
//     if (err) throw err
//     console.log(html)
//     // => <div data-server-rendered="true">Hello World</div>
// })
