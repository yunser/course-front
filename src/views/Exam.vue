<template>
    <my-page title="我的试卷">
        <ui-raised-button label="制作试卷" primary to="/exam/add"/>
        <section>
            <h2 class="box-title">所有试卷</h2>
            <ul>
                <li>
                    <router-link to="/exams/1">示例试卷</router-link>
                </li>
                <li v-for="exam in exams">
                    {{ exam.name }}
                    <router-link :to="'/exams/' + exam.id">查看</router-link>
                    <router-link :to="`/exams/${exam.id}/edit`">编辑</router-link>
                    <a href="#" @click.prevent="remove(exam)">删除</a>
                </li>
            </ul>
        </section>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                exams: [
                ]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let exams = this.$storage.get('exams')
                if (exams) {
                    this.exams = exams
                } else {
                    this.$storage.get('exams', [])
                }
            },
            remove(exam) {
                let exams = this.$storage.get('exams')
                for (let i = 0; i < exams.length; i++) {
                    if (exams[i].id === exam.id) {
                        exams.splice(i, 1)
                        this.exams.splice(i, 1)
                    }
                }
                this.$storage.set('exams', exams)
            }
        }
    }
</script>

<style scoped>
</style>
