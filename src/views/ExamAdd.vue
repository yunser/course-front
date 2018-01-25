<template>
    <my-page title="关于">
        <article class="article">
            <div>
                <ui-text-field class="input" v-model="exam.name" hintText="试卷名称" />
                <h2 class="box-title">当前编辑题目</h2>
                <div v-if="!question">
                    <ui-raised-button class="btn" label="添加判断题" @click="addJudgment"/>
                    <ui-raised-button class="btn" label="添加单选题" @click="addSingle"/>
                </div>
                <div v-if="question">
                    <div v-if="question.type === 'judgment'">
                        <ui-badge class="type" :content="type" />
                        <ui-text-field class="input" v-model="question.content" hintText="内容" />
                        <div>
                            <ui-radio class="demo-radio" label="正确" name="group" :nativeValue="true" v-model="question.answer"/> <br/>
                            <ui-radio class="demo-radio" label="错误" name="group" :nativeValue="false" v-model="question.answer"/> <br/>
                        </div>
                    </div>
                    <div v-if="question.type === 'single'">
                        <ui-badge class="type" :content="type" />
                        <ui-text-field class="input" v-model="question.content" hintText="内容" />
                        <div>
                            <ui-radio class="demo-radio" label="正确" name="group" :nativeValue="true" v-model="question.answer"/> <br/>
                            <ui-radio class="demo-radio" label="错误" name="group" :nativeValue="false" v-model="question.answer"/> <br/>
                        </div>
                    </div>
                    <ui-raised-button class="btn" label="完成" primary @click="finish"/>
                    <ui-raised-button class="btn" label="放弃编辑" @click="cancel"/>
                </div>
                <h2 class="box-title">预览</h2>
                <ul class="question-list">
                    <li v-for="q in exam.questions">
                        {{ q.content }}
                    </li>
                </ul>
                <ui-raised-button class="btn" label="开始测试" primary @click="test"/>
            </div>
        </article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                exam: {
                    name: '无聊的测试',
                    questions: [
//                    {
//                        id: '1',
//                        type: 'join',
//                        content: '四大名著连一连',
//                        leftItems: ['《水浒传》', '《西游记》', '《三国演义》', '《红楼梦》'],
//                        rightItems: ['罗贯中', '施耐庵', '曹雪芹', '吴承恩'],
//                        answer: [[0, 1], [1, 3], [2, 0], [4, 2]],
//                        userAnswer: null
//                    },
                        {
                            id: '2',
                            type: 'fill',
                            content: '___秋月何时了，往事___',
                            answer: ['春花', '知多少'],
                            userAnswer: null
                        },
                        {
                            id: '3',
                            type: 'aq',
                            content: '1+2等于几？',
                            answer: '3',
                            userAnswer: null
                        },
                        {
                            id: '4',
                            type: 'multiple',
                            content: '哪些是对的',
                            options: ['1+1=2', '1+2=3', '1+1=3', '1+2=2'],
                            answer: [0, 1],
                            userAnswer: null
                        },
                        {
                            id: '5',
                            type: 'single',
                            content: '1+1=?',
                            options: ['1', '2', '3', '4'],
                            answer: 1,
                            userAnswer: null
                        }
                    ]
                },
                question: null // 当前题目
            }
        },
        computed: {
            type() {
                let types = {
                    single: '单选题',
                    multiple: '多选题',
                    fill: '填空题',
                    aq: '问答题',
                    judgment: '判断题',
                    join: '连线题',
                    code: '编程题' // Attachment
                }
                return types[this.question.type]
            }
        },
        mounted() {
            this.addJudgment()
//            this.addSingle()
        },
        methods: {
            finish() {
                let question = {
                    id: new Date().getTime(), // TODO
                    type: this.question.type,
                    content: this.question.content,
                    answer: this.question.answer,
                    userAnswer: this.question.userAnswer
                }
                this.exam.questions.push(question)
                this.question = null
            },
            cancel() {
                this.question = null
            },
            addJudgment() {
                this.question = {
                    type: 'judgment',
                    content: '水果是苹果吗',
                    answer: true,
                    userAnswer: null
                }
            },
            addSingle() {
                this.question = {
                    type: 'single',
                    content: '1+1=?',
                    options: ['1', '2', '3', '4'],
                    answer: 1,
                    userAnswer: null
                }
            },
            test() {
                this.$storage.set('exam', this.exam)
                this.$router.push('/exams/2')
            }
        }
    }
</script>

<style scoped>
    .btn {
        margin-right: 8px;
    }
    .box-title {
        margin: 16px 0;
        font-size: 24px;
    }
</style>
