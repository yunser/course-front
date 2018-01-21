import header from './header'
import footer from './footer'
import page from './page'
import markdown from './markdownElement.vue'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('ui-header', header)
        Vue.component('ui-footer', footer)
        Vue.component('ui-markdown', markdown)
    }
}
