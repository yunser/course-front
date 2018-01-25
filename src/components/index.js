import page from './page'
import question from './question'
import markdown from './markdownElement.vue'

export default {
    install: function (Vue) {
        Vue.component('my-page', page)
        Vue.component('question', question)
        Vue.component('ui-markdown', markdown)
    }
}
