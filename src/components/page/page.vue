<template>
    <ui-page :title="title || page.title" :page="page" ref="page" :backbale="backable" :containerMaxWidth="containerMaxWidth">
        <div slot="drawer">
            <ui-appbar title=""></ui-appbar>
            <ui-list @itemClick="toggle()">
                <ui-list-item title="首页" to="/">
                    <ui-icon value="home" slot="left" />
                </ui-list-item>
                <!--<ui-list-item title="所有工具" to="/all" />-->
                <ui-list-item title="HTML" to="/cat/html">
                    <ui-icon value="star" slot="left" />
                </ui-list-item>
                <ui-list-item title="我的试卷" to="/exams">
                    <ui-icon value="star" slot="left" />
                </ui-list-item>
                <ui-divider />
                <ui-list-item title="关于" to="/about">
                    <ui-icon value="info" slot="left" />
                </ui-list-item>
            </ui-list>
        </div>
        <slot></slot>
    </ui-page>
</template>

<script>
    export default {
        data() {
            return {
                open: false,
                docked: true
            }
        },
        props: {
            page: {
                type: Object,
                default: function () {
                    return {
                        title: '云设'
                    }
                }
            },
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: '11'
            },
            containerMaxWidth: {
                type: Number,
                default: 1000
            },
            backable: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
        },
        methods: {
            toggle() {
                this.$refs.page.hideDrawerIfMobile()
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
