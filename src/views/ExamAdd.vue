<template>
    <my-page title="添加试卷">
        <div class="exam-add-box">
            <ui-text-field class="input" v-model="exam.name" hintText="试卷名称" />
            <div v-if="!question">
                <div class="tip">选择要添加的题目类型</div>
                <ui-raised-button class="btn" label="判断题" @click="addJudgment"/>
                <ui-raised-button class="btn" label="单选题" @click="addSingle"/>
                <ui-raised-button class="btn" label="多选题" @click="addMutiple"/>
                <ui-raised-button class="btn" label="问答题" @click="addAq"/>
                <ui-raised-button class="btn" label="填空题" @click="addFill"/>
            </div>
            <div v-if="question">
                <h2 class="box-title">编辑题目</h2>
                <div v-if="question.type === 'judgment'">
                    <div>
                        <ui-badge class="type" :content="type" />
                    </div>
                    <ui-text-field class="input" v-model="question.content" hintText="内容" />
                    <div>
                        <ui-radio class="demo-radio" label="正确" name="group" nativeValue="true" v-model="question.answer"/> <br/>
                        <ui-radio class="demo-radio" label="错误" name="group"nativeValue="false" v-model="question.answer"/> <br/>
                    </div>
                </div>
                <div v-if="question.type === 'single' || question.type === 'multiple'">
                    <ui-badge class="type" :content="type" />
                    <ui-text-field class="input" v-model="question.content" hintText="内容" />
                    <ul class="option-list">
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
                <div v-if="question.type === 'aq'">
                    <ui-badge class="type" :content="type" />
                    <ui-text-field class="input" v-model="question.content" hintText="内容" />
                    <div>
                        <ui-text-field class="input" v-model="question.answer" hintText="回答" />
                    </div>
                </div>
                <div v-if="question.type === 'fill'">
                    <ui-badge class="type" :content="type" />
                    <div>
                        <div>输入内容：空格用（___表示）</div>
                        <ui-text-field class="input" v-model="question.content" hintText="内容" />
                    </div>
                    <div>
                        <div>输入答案：多个答案用（,）分隔</div>
                        <ui-text-field class="input" v-model="question.answer" hintText="回答" />
                    </div>
                </div>
                <ui-raised-button class="btn" label="完成" primary @click="finish"/>
                <ui-raised-button class="btn" label="放弃编辑" @click="cancel"/>
                <ui-raised-button class="btn" label="删除" @click="removeQuestion"/>
            </div>
            <h2 class="box-title">题目</h2>
            <div v-if="!exam.questions.length">你还没有添加题目</div>
            <div v-else>
                <ul class="question-list">
                    <li class="item" v-for="(q, index) in exam.questions" @click="edit(q, index)">
                        {{ q.content }}
                    </li>
                </ul>
                <ui-raised-button class="btn" label="完成" primary @click="test"/>
            </div>
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
                isAdd: true,
                isEdit: false,
                exam: {
                    id: new Date().getTime(),
                    name: '无聊的测试',
                    questions: []
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
            this.init()
        },
        methods: {
            init() {
                if (this.$route.params.id) {
                    this.isAdd = false
                    let exam = this.$storage.get('exam-' + this.$route.params.id)
                    if (exam) {
                        this.exam = exam
                    }
                }

//            this.addJudgment()
//            this.addSingle()
//            this.addMutiple()
//            this.addAq()
//            this.addFill()
            },
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
                } else if (this.question.type === 'fill') {
                    question.answer = question.answer.split(',')
                } else if (question.type === 'judgment') {
                    question.answer = question.answer === 'true'
                }

                if (this.isEdit) {
                    this.exam.questions.splice(this.editIndex, 1, question)
                } else {
                    this.exam.questions.push(question)
                }
                this.question = null
                this.save()
            },
            cancel() {
                this.question = null
            },
            removeQuestion() {
                this.exam.questions.splice(this.editIndex, 1)
                this.save()
                this.question = null
            },
            edit(q, index) {
                this.isEdit = true
                this.editIndex = index
                this.question = q
                if (this.question.type === 'judgment') {
                    this.question.answer = this.question.answer ? 'true' : 'false'
                }
            },
            addJudgment() {
                this.isEdit = false
                this.question = {
                    type: 'judgment',
                    content: '',
                    answer: 'true'
                }
            },
            addSingle() {
                this.isEdit = false
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
                this.isEdit = false
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
            addAq() {
                this.isEdit = false
                this.question = {
                    type: 'aq',
                    content: '1+2等于几？',
                    answer: '3'
                }
            },
            addFill() {
                this.isEdit = false
                this.question = {
                    type: 'fill',
                    content: '___秋月何时了，往事___',
                    answer: '春花,知多少'
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
            save() {
                this.$storage.set('exam-' + this.exam.id, this.exam)
            },
            test() {
                this.$storage.set('exam-' + this.exam.id, this.exam)
                let exams = this.$storage.get('exams', [])
                exams.push({
                    id: this.exam.id,
                    name: this.exam.name
                })
                this.$storage.set('exams', exams)
                this.$router.push('/exams')
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
        .tip {
            margin-bottom: 16px;
        }
        .btn {
            margin-right: 8px;
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
        .question-list {
            .item {
                cursor: pointer;
            }
        }
    }
</style>
