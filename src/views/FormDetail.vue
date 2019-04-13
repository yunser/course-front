<template>
    <my-page title="测试">
        <div>
            <ui-raised-button label="开始测试" primary @click="start" v-if="state === ''" />
        </div>
        <ul class="meta-list" v-if="state === 'start' || state === 'end'">
            <li class="item">开始时间：{{ startTimeStr }}</li>
            <li class="item">用时：{{ minute }} 分钟</li>
            <!--<li><div>结束时间：2018-1-5 17:50:08</div></li>-->
        </ul>
        <div class="simple-answer-card" v-if="state === 'start'">
            <h2 class="card-title">答题卡</h2>
            <ul class="answer-list">
                <li class="item" v-for="(q, index) in forms">
                    <ui-raised-button class="round-btn unknown"
                                      :class="{finish: isDone(q), current: index === formIndex}"
                                      :label="'' + (index + 1)"
                                      @click="selectIndex(index)" />
                </li>
            </ul>
        </div>
        <div class="exam-box" v-if="state === 'start'">
            <!--<div class="index">第 {{ formIndex + 1 }} 题</div>-->
            <ui-badge class="type" :content="type" />
            <!--<h2 class="type">{{ type }}</h2>-->
            <h3 class="title" v-if="form.type !== 'fill'">{{ form.content }}</h3>
            <ui-text-field class="input" v-model="form.userAnswer" v-if="form.type === 'aq'" />
            <div v-if="form.type === 'fill'">
                <span v-for="(content, index) in form._content">
                    <ui-text-field class="fill-input"
                                   :style="{width: (content.length * 40) + 'px'}"
                                   v-model="form['fill' + content.index]"
                                   v-if="content.type === 'blank'" />
                    <!--<input/>-->
                    <span v-else>{{ content.text }}</span>
                </span>
            </div>
            <ul class="options" v-if="form.type === 'judgment'">
                <li class="item"
                    :class="{selected: isSelected(form, true)}"
                    @click="doOption(true)">正确</li>
                <li class="item"
                    :class="{selected: isSelected(form, false)}"
                    @click="doOption(false)">错误</li>
            </ul>
            <ul class="options">
                <li class="item" v-for="(option, index) in form.options"
                    :key="option"
                    :class="{selected: isSelected(form, index)}"
                    @click="doOption(index)">{{ option }}</li>
            </ul>
            <div class="op">
                <ui-raised-button class="btn" label="上一题" @click="prevForm" :disabled="formIndex === 0" />
                <ui-raised-button class="btn" label="下一题" primary @click="nextForm" :disabled="formIndex === forms.length - 1" />
                <!--<ui-raised-button class="btn" label="查看答案" @click="viewAnswer" :disabled="false" />-->
                <ui-raised-button class="btn" label="交卷" @click="viewAnswer" :disabled="false" />
            </div>
        </div>

        <div class="answer-card" v-if="state === 'end'">
            <h2 class="card-title">答案</h2>
            <div>分数：{{ score }}</div>
            <ul class="answer-list">
                <li class="item"
                    :class="{success: isSuccess(q)}"
                    v-for="(q, index) in forms">
                    <h3 v-if="q.type !== 'fill'">问题：{{ q.content }}</h3>
                    <h3 v-if="q.type === 'fill'">问题：{{ getFillContent(q.content) }}</h3>
                    <h3 v-if="q.type === 'single'">答案：{{ numberToLetter(q.answer) }}. {{ q.options[q.answer] }}</h3>
                    <h3 v-if="q.type === 'multiple'">
                        答案：
                        <div v-for="answer in q.answer">
                            {{ numberToLetter(answer) }}. {{ q.options[answer] }}
                        </div>
                    </h3>
                    <h3 v-if="q.type === 'aq'">答案：{{ q.answer }}</h3>
                    <h3 v-if="q.type === 'fill'">
                        答案：{{ q.answer.join(', ') }}
                        <!--<div v-for="answer in q.answer">-->
                            <!--{{ answer }}-->
                        <!--</div>-->
                    </h3>
                    <h3 v-if="q.type === 'judgment'">
                        答案：{{ boolToText(q.answer) }}
                    </h3>

                    <div v-if="q.type === 'single' || q.type === 'multiple' || q.type === 'aq'">
                        <div v-if="q.userAnswer || q.userAnswer === 0">
                            <div v-if="q.type === 'single'"> 你的回答：{{ numberToLetter(q.userAnswer) }}. {{ q.options[q.userAnswer] }}</div>
                            <div v-if="q.type === 'multiple'">
                                你的回答：
                                <div v-for="answer in q.userAnswer">
                                    {{ numberToLetter(answer) }}. {{ q.options[answer] }}
                                </div>
                            </div>
                            <div v-if="q.type === 'aq'">
                                你的回答：{{ q.userAnswer }}
                            </div>
                        </div>
                        <div v-else>你还没有回答</div>
                    </div>
                    <div v-if="q.type === 'fill'">
                        你的回答：{{ getFillUserAnswer(q).join(', ') }}
                    </div>
                    <div v-if="q.type === 'judgment'">
                        <div v-if="q.userAnswer === true || q.userAnswer === false">
                            你的回答：{{ boolToText(q.userAnswer) }}
                        </div>
                        <div v-else>你还没有回答</div>
                    </div>
                </li>
            </ul>
            <ui-raised-button class="btn" label="我不服" primary @click="restart"/>
        </div>

        <ul>
            <!--请选择产生斜体字的 HTML 标签：-->
            <!--<i>-->
            <!--<italics>-->
            <!--<ii>-->

            <!--在下列的 HTML 中，哪个可以产生超链接？-->
            <!--<a url="http://www.w3school.com.cn">W3School.com.cn</a>-->
            <!--<a href="http://www.w3school.com.cn">W3School</a>-->
            <!--<a>http://www.w3school.com.cn</a>-->
            <!--<a name="http://www.w3school.com.cn">W3School.com.cn</a>-->

            <!--如何在新窗口打开链接？-->
            <!--<a href="url" new>-->
            <!--<a href="url" target="_blank">-->
            <!--<a href="url" target="new">-->


        </ul>
    </my-page>
</template>

<script>
    import {format} from '@/util/time'
    const FILL = '___'

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

    export default {
        data () {
            return {
                formIndex: 0,
                forms: [
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
                        id: '1',
                        type: 'judgment',
                        content: '所有的苹果都是水果',
                        answer: true,
                        userAnswer: null
                    },
                    {
                        id: '1',
                        type: 'judgment',
                        content: '所有的苹果都是水果',
                        answer: true,
                        userAnswer: null
                    },
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
                ],
                form: {},
                state: '', // 'start', 'end',
                startTime: null,
                endTime: null,
                minute: 0
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
                return types[this.form.type]
            },
            score() {
                let successCount = 0
                for (let form of this.forms) {
                    if (form.type !== 'fill' && !form.userAnswer) {
                        continue
                    }
                    if (form.type === 'single' || form.type === 'aq') {
                        if (form.userAnswer === form.answer) {
                            successCount++
                        }
                    } else if (form.type === 'multiple') {
                        if (form.answer.length !== form.userAnswer.length) {
                            continue
                        }
                        let isRight = true
                        for (let i = 0; i < form.answer.length; i++) {
                            if (form.answer[i] !== form.userAnswer[i]) {
                                isRight = false
                                break
                            }
                        }
                        if (isRight) {
                            successCount++
                        }
                    } else if (form.type === 'fill') {
                        if (this.isSuccess(form)) {
                            successCount++
                        }
                        console.log('判断', this.isSuccess(form))
                    } else if (form.type === 'judgment') {
                        if (form.userAnswer === form.answer) {
                            successCount++
                        }
                    }
                }
                return parseInt(100 * successCount / this.forms.length)
            },
            startTimeStr() {
                return format(new Date(this.startTime), 'hh:mm')
            }
        },
        mounted() {
            let id = this.$route.params.id
            if (id === '1') {
            } else {
                this.exam = this.$storage.get('exam-' + id)
                this.forms = this.exam.forms
            }
            this.form = this.forms[this.formIndex]
            this.init()
            // 测试
            this.start()
        },
        destroyed() {
            clearInterval(this.timer)
        },
        methods: {
            init() {
                for (let form of this.forms) {
                    if (form.type === 'fill') {
                        let content = form.content.replace(new RegExp(FILL, 'g'), '|?|' + FILL + '|?|')
                        let arr = content.split('|?|')
                        let result = []
                        let blankIndex = 0
                        for (let item of arr) {
                            if (item === FILL) {
                                result.push({
                                    type: 'blank',
                                    index: blankIndex,
                                    length: form.answer[blankIndex].length
                                })
                                blankIndex++
                            } else {
                                result.push({
                                    type: 'text',
                                    text: item
                                })
                            }
                        }
                        form._content = result
                    }
                }
            },
            boolToText(bool) {
                return bool ? '正确' : '错误'
            },
            getFillContent(content) {
                return content.replace(new RegExp(FILL, 'g'), '___')
            },
            getFillUserAnswer(form) {
                let answer = []
                for (let i = 0; i < form.answer.length; i++) {
                    if (form['fill' + i]) {
                        answer.push(form['fill' + i])
                    } else {
                        answer.push(null)
                    }
                }
                return answer // .join(', ')
            },
            isSelected(form, index) {
                if (form.type === 'single') {
                    return form.userAnswer === index
                } else if (form.type === 'multiple') {
                    if (!form.userAnswer) {
                        return false
                    }
                    for (let answer of form.userAnswer) {
                        if (answer === index) {
                            return true
                        }
                    }
                    return false
                } else if (form.type === 'judgment') {
                    return form.userAnswer === index
                }
                return false
            },
            isSuccess(form) {
                console.log('判断')
                if (form.type === 'judgment') {
                    console.log('呵呵')
                    console.log(form.userAnswer, form.answer)
                    console.log(form.userAnswer === form.answer)
                    return form.userAnswer === form.answer
                }
                if (form.type === 'single') {
                    console.log('单选题' + form.userAnswer === form.answer)
                    return form.userAnswer === form.answer
                }
                if (form.type !== 'fill' && !form.userAnswer) {
                    return false
                }
                if (form.type === 'multiple') {
                    // 少选多选不给分
                    if (form.answer.length !== form.userAnswer.length) {
                        return false
                    }
                    for (let i = 0; i < form.answer.length; i++) {
                        if (form.answer[i] !== form.userAnswer[i]) {
                            return false
                        }
                    }
                    return true
                }
                if (form.type === 'aq') {
                    return form.userAnswer === form.answer
                }
                if (form.type === 'fill') {
                    let userAnswer = this.getFillUserAnswer(form)
                    if (form.answer.length !== userAnswer.length) {
                        return false
                    }
                    for (let i = 0; i < form.answer.length; i++) {
                        if (form.answer[i] !== userAnswer[i]) {
                            return false
                        }
                    }
                    return true
                }
                return false
            },
            isDone(form) {
                if (form.type === 'single') {
                    return form.userAnswer || form.userAnswer === 0
                }
                if (form.type === 'multiple') {
                    return form.userAnswer && form.userAnswer.length
                }
                if (form.type === 'aq') {
                    return form.userAnswer
                }
                if (form.type === 'fill') {
                    let answer = this.getFillUserAnswer(form)
                    for (let item of answer) {
                        if (!item) {
                            return false
                        }
                    }
                    return true
                }
                if (form.type === 'judgment') {
                    return form.userAnswer === true || form.userAnswer === false
                }
                return false
            },
            doOption(index) {
                if (this.form.type === 'single') {
                    this.forms[this.formIndex].userAnswer = index
//                    // 检查后面是否有未完成的题目
//                    for (let i = this.formIndex + 1; i < this.forms.length; i++) {
//                        if (!this.forms[i].userAnswer) {
//                            this.formIndex = i
//                            this.form = this.forms[this.formIndex]
//                            return
//                        }
//                    }
//                    // 检查前面是否有未完成的题目
//                    for (let i = 0; i < this.formIndex; i++) {
//                        if (!this.forms[i].userAnswer) {
//                            this.formIndex = i
//                            this.form = this.forms[this.formIndex]
//                            return
//                        }
//                    }
//                    // 遮住某个 bug
//                    this.formIndex++
//                    if (this.formIndex > this.forms.length - 1) {
//                        this.formIndex = 0
//                    }
//                    this.form = this.forms[this.formIndex]
                } else if (this.form.type === 'multiple') {
                    let userAnswer = this.forms[this.formIndex].userAnswer
                    if (!userAnswer) {
                        userAnswer = []
                    }
                    if (userAnswer.contains(index)) {
                        for (let i = 0; i < userAnswer.length; i++) {
                            if (userAnswer[i] === index) {
                                userAnswer.splice(i, 1)
                                return
                            }
                        }
                    }

                    userAnswer.push(index)
                    // 答案排序
                    userAnswer = userAnswer.sort()
                    this.forms[this.formIndex].userAnswer = userAnswer
                } else if (this.form.type === 'judgment') {
                    this.forms[this.formIndex].userAnswer = index
                }
            },
            prevForm() {
                this.formIndex--
                this.form = this.forms[this.formIndex]
            },
            selectIndex(index) {
                this.formIndex = index
                this.form = this.forms[this.formIndex]
            },
            nextForm() {
                this.formIndex++
                this.form = this.forms[this.formIndex]
            },
            start() {
                this.state = 'start'
                this.startTime = new Date()
                this.timer = setInterval(this.updateTime, 60 * 1000)
            },
            updateTime() {
                let time = (new Date().getTime() - this.startTime.getTime()) / 1000 / 60
                this.minute = parseInt(time)
            },
            restart() {
                // 清空回答
                for (let form of this.forms) {
                    form.userAnswer = null
                }
                this.formIndex = 0
                this.start()
            },
            viewAnswer() {
                this.state = 'end'
                this.endTime = new Date()
                this.updateTime()
                clearInterval(this.timer)
            },
            numberToLetter(number) {
                let arr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                return arr[number]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ui-medal {
        width: 282px;
        height: 375px;
        background-color: #fff;
        border: 1px solid #f00;
        text-align: center;
        .medal-content {
            width: 100%;
            position: relative;
            height: 200px;
            padding-top: 40px;
        }
        .number {
            position: absolute;
            left: 50%;
            bottom: -25px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            color: #fff;
            background-color: #31a56e;
            text-align: center;
            line-height: 50px;
            border: 2px solid #fff;
            margin-left: -25px;
        }
        .big {
            font-size: 30px;
        }
        .medal-img {
            width: 96px;
        }
        .medal-footer {
            width: 100%;
            height: 174px;
            padding-top: 50px;
            color: #fff;
            background-image: url("/static/img/medal-footer.png");
            background-size: 100% 100%;
            .title {
                margin-bottom: 28px;
                font-size: 18px;
            }
            .content {
            }
        }
    }

</style>
