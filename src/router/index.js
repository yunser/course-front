import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

const Home = resolve => require(['@/views/Home'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const Html = resolve => require(['@/views/Html'], resolve)
const Exam = resolve => require(['@/views/Exam'], resolve)
const ExamDetail = resolve => require(['@/views/ExamDetail'], resolve)
const ExamEdit = resolve => require(['@/views/ExamAdd'], resolve)
const ExamAdd = resolve => require(['@/views/ExamAdd'], resolve)
const Question = resolve => require(['@/views/Question'], resolve)
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
        path: '/exam/add',
        component: ExamAdd
    },
    {
        path: '/exams/:id',
        component: ExamDetail
    },
    {
        path: '/exams/:id/edit',
        component: ExamEdit
    },
    {
        path: '/exams',
        component: Exam
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
