<template>
    <my-page title="添加试卷">
        <div class="exam-add-box">
            <ui-text-field class="input" v-model="exam.name" hintText="试卷名称" />
            <h2 class="box-title">当前编辑题目</h2>
            <div v-if="!question">
                <ui-raised-button class="btn" label="添加判断题" @click="addJudgment"/>
                <ui-raised-button class="btn" label="添加单选题" @click="addSingle"/>
                <ui-raised-button class="btn" label="添加多选题" @click="addMutiple"/>
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
                <div v-if="question.type === 'single' || question.type === 'multiple'">
                    <ui-badge class="type" :content="type" />
                    <ui-text-field class="input" v-model="question.content" hintText="内容" />
                    <ul class="option-list">
                        {{ question.options }}
                        {{ options }}
                        <li
                                class="item"
                                v-for="(item, index) in options"
                                :key="'option' + index">
                            <ui-icon-button icon="delete" @click="removeOption(index)"/>
                            <span class="index">{{ numberToLetter(index) }}</span>
                            <ui-text-field class="input" v-model="options[index]" hintText="内容" />
                            <span v-if="question.type === 'single' && isAnswer(index)">答案</span>
                            <span v-if="question.type === 'multiple' && isAnswer(index)" @click="setAnswer(index)">答案（取消答案）</span>
                            <span v-else @click="setAnswer(index)">设为答案</span>
                        </li>
                        <li class="item">
                            <!--<span class="index">{{ numberToLetter(index) }}</span>-->
                            <!--<ui-text-field class="input" v-model="options[index]" hintText="内容" />-->
                            <ui-icon-button class="btn-add" icon="add" @click="addOption"/>
                        </li>
                    </ul>
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
    </my-page>
</template>

<script>
    // eslint-disable-next-line
    Array.prototype.contains = function (obj) {
        var i = this.length
        while (i--) {
            if (this[i] === obj) {
                return true
            }
        }
        return false
    }
    // eslint-disable-next-line
    Array.prototype.removeOneValue = function (obj) {
        console.log(this[0])
    }

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
                        }
                    ]
                },
                question: null, // 当前题目
                options: []
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
//            this.addJudgment()
//            this.addSingle()
            this.addMutiple()
        },
        methods: {
            finish() {
                let question = {
                    id: new Date().getTime(), // TODO
                    type: this.question.type,
                    content: this.question.content,
                    answer: this.question.answer,
                    userAnswer: null
                }
                if (this.question.type === 'single' || this.question.type === 'multiple') {
                    question.options = this.options
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
                    answer: true
                }
            },
            addSingle() {
                this.question = {
                    type: 'single',
                    content: '1+1=?',
                    options: ['2', '1', '3', '4'],
                    answer: 0
                }
                for (let i = 0; i < this.question.options.length; i++) {
                    this.options[i] = this.question.options[i]
                }
            },
            addMutiple() {
                this.question = {
                    type: 'multiple',
                    content: '哪些是对的',
                    options: ['1+1=2', '1+2=3', '1+1=3', '1+2=2'],
                    answer: [0, 1]
                }
                for (let i = 0; i < this.question.options.length; i++) {
                    this.options[i] = this.question.options[i]
                }
            },
            addOption() {
                this.options.push('')
            },
            removeOption(index) {
                this.options.splice(index, 1)
                if (this.question.answer === index) {
                    this.question.answer = 0
                }
            },
            isAnswer(index) {
                if (this.question.type === 'single') {
                    return index === this.question.answer
                } else {
                    // multiple
                    return this.question.answer.contains(index)
                }
            },
            setAnswer(index) {
                if (this.question.type === 'single') {
                    this.question.answer = index
                } else {
                    // multiple
                    if (this.question.answer.contains(index)) {
//                        this.question.answer.removeOneValue(index)
                        for (let i = 0; i < this.question.answer.length; i++) {
                            if (this.question.answer[i] === index) {
                                this.question.answer.splice(i, 1)
                                break
                            }
                        }
                    } else {
                        this.question.answer.push(index)
                    }
                }
            },
            test() {
                this.$storage.set('exam', this.exam)
                this.$router.push('/exams/2')
            },
            numberToLetter(number) {
                let arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                return arr[number]
            }
        }
    }
</script>

<style lang="scss">
    @import "../scss/var";

    .exam-add-box {
        .btn {
            margin-right: 8px;
        }
        .box-title {
            margin: 16px 0;
            font-size: 24px;
        }
        .option-list {
            width: 520px;
            .item {
                @include clearfix;
            }
            .index {
                margin-right: 8px;
            }
            .btn-add {
                /*float: right;*/
            }
        }
    }
</style>
