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
            }
        }
    }
</script>

<style scoped>
</style>
