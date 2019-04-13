import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

const Home = resolve => require(['@/views/Home'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Html = resolve => require(['@/views/Html'], resolve)
const Form = resolve => require(['@/views/Form'], resolve)
const FormDetail = resolve => require(['@/views/FormDetail'], resolve)
const FormEdit = resolve => require(['@/views/FormEdit'], resolve)
const FormAdd = resolve => require(['@/views/FormEdit'], resolve)
const Question = resolve => require(['@/views/Question'], resolve)
const Know = resolve => require(['@/views/Know'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/cat/html',
        component: Html
    },
    {
        path: '/question',
        component: Question
    },
    {
        path: '/form/add',
        component: FormAdd
    },
    {
        path: '/forms/:id',
        component: FormDetail
    },
    {
        path: '/forms/:id/edit',
        component: FormEdit
    },
    {
        path: '/forms',
        component: Form
    },
    {
        path: '/know',
        component: Know
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})
router.afterEach(transition => {
    NProgress.done()
})

export default router
