<template>
    <my-page title="我的题目">
        <article class="article">
            <ul>
                <li v-for="exam in exams">
                    <router-link :to="'/exams/' + exam.id">{{ exam.name }}</router-link>
                </li>
            </ul>
            <ui-raised-button label="制作试卷" primary to="/exam/add"/>
        </article>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                exams: [
                    {
                        id: '1',
                        name: '测试一'
                    },
                    {
                        id: '2',
                        name: '测试二'
                    }
                ]
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
</style>
