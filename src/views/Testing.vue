<template>
    <my-page title="测试">
        <div>
            <ui-raised-button label="开始测试" primary @click="start" v-if="state === ''" />
        </div>
        <div class="simple-answer-card" v-if="state === 'start'">
            <h2 class="card-title">答题卡</h2>
            <ul class="answer-list">
                <li class="item" v-for="(q, index) in questions">
                    <ui-raised-button class="round-btn unknown"
                                      :class="{finish: q.userAnswer || q.userAnswer === 0, current: index === questionIndex}"
                                      :label="'' + (index + 1)"
                                      @click="selectIndex(index)" />
                </li>
            </ul>
        </div>
        <div class="exam-box" v-if="state === 'start'">
            <!--<div class="index">第 {{ questionIndex + 1 }} 题</div>-->
            <h2 class="title">{{ question.content }}</h2>
            <ul class="options">
                <li class="item" v-for="(option, index) in question.options"
                    :key="option"
                    :class="{selected: question.userAnswer === index}"
                    @click="doOption(index)">{{ option }}</li>
            </ul>
            <div class="op">
                <ui-raised-button class="btn" label="上一题" @click="prevQuestion" :disabled="questionIndex === 0" />
                <ui-raised-button class="btn" label="下一题" primary @click="nextQuestion" :disabled="questionIndex === questions.length - 1" />
                <ui-raised-button class="btn" label="查看答案" @click="viewAnswer" :disabled="false" />
            </div>
        </div>

        <div class="answer-card" v-if="state === 'end'">
            <h2 class="card-title">答案</h2>
            <div>分数：{{ score }}</div>
            <ul class="answer-list">
                <li class="item"
                    :class="{success: q.userAnswer === q.answer, error: q.userAnswer !== q.answer}"
                    v-for="(q, index) in questions">
                    <h3>问题：{{ q.content }}</h3>
                    <h3>答案：{{ numberToLetter(q.answer) }}. {{ q.options[q.answer] }}</h3>
                    <div v-if="q.userAnswer || q.userAnswer === 0">
                        你的回答：{{ numberToLetter(q.userAnswer) }}. {{ q.options[q.userAnswer] }}
                    </div>
                    <div v-else>你还没有回答</div>
                </li>
            </ul>
            <ui-raised-button class="btn" label="我不服" primary @click="restart"/>
        </div>

        <ul>
            <li></li>
            <div>应该通过 iframe 嵌入的方式</div>

            <div>开始时间：2018-1-5 17:29:55</div>
            <div>结束时间：2018-1-5 17:50:08</div>
            <div>已用时间：1 分钟</div>

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
    /* eslint-disable */
    import demoCode from '!raw-loader!./demo.vue'
    import exampleFormCode from 'raw-loader!./README.md'

    export default {
        data () {
            return {
                exampleFormCode: exampleFormCode,
                demoCode: demoCode,
                questionIndex: 0,
                questions: [
                    {
                        id: '1',
                        type: 'single',
                        content: '1+1=?',
                        options: ['1', '2', '3', '4'],
                        answer: 1,
                    },
                    {
                        id: '1',
                        type: 'single',
                        content: '3+1=?',
                        options: ['1', '2', '3', '4'],
                        answer: 3,
                    },
                    {
                        id: '1',
                        type: 'single',
                        content: '3+5=?',
                        options: ['1', '2', '8', '4'],
                        answer: 2,
                    }
                ],
                question: {},
                state: '' // 'start', 'end'
            }
        },
        computed: {
            score() {
                let successCount = 0
                for (let question of this.questions) {
                    if (question.userAnswer === question.answer) {
                        successCount++
                    }
                }
                return parseInt(100 * successCount / this.questions.length)
            }
        },
        mounted() {
            this.question = this.questions[this.questionIndex]
            // 测试
            this.start()
        },
        methods: {
            doOption(index) {
                this.questions[this.questionIndex].userAnswer = index
                if (this.questionIndex === this.questions.length - 1) {
                    this.questionIndex = 0 // 遮住某个 bug
//                    this.state = 'end'
                } else {
                    this._nextQuestion()
                }
            },
            prevQuestion() {
                this.questionIndex--
                this.question = this.questions[this.questionIndex]
            },
            _prevQuestion() {
                this.questionIndex--
                this.question = this.questions[this.questionIndex]
            },
            selectIndex(index) {
                this.questionIndex = index
                this.question = this.questions[this.questionIndex]
            },
            nextQuestion() {
                this.questionIndex++
                this.question = this.questions[this.questionIndex]
            },
            _nextQuestion() {
                this.questionIndex++
                this.question = this.questions[this.questionIndex]
            },
            start() {
                this.state = 'start'
            },
            restart() {
                // 清空回答
                for (let question of this.questions) {
                    question.userAnswer = null
                }
                this.questionIndex = 0
                this.state = 'start'
            },
            viewAnswer() {
                this.state = 'end'
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
