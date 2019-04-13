<template>
    <my-page title="我的表单">
        <ui-raised-button label="制作表单" primary to="/form/add"/>
        <section>
            <h2 class="box-title">所有表单</h2>
            <ul>
                <li>
                    <router-link to="/forms/1">示例表单</router-link>
                </li>
                <li v-for="form in forms">
                    {{ form.name }}
                    <router-link :to="'/forms/' + form.id">查看</router-link>
                    <router-link :to="`/forms/${form.id}/edit`">编辑</router-link>
                    <a href="#" @click.prevent="remove(form)">删除</a>
                </li>
            </ul>
        </section>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                forms: [
                ]
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                let forms = this.$storage.get('forms')
                if (forms) {
                    this.forms = forms
                } else {
                    this.$storage.get('forms', [])
                }
            },
            remove(form) {
                let forms = this.$storage.get('forms')
                for (let i = 0; i < forms.length; i++) {
                    if (forms[i].id === form.id) {
                        forms.splice(i, 1)
                        this.forms.splice(i, 1)
                    }
                }
                this.$storage.set('forms', forms)
            }
        }
    }
</script>

<style scoped>
</style>
