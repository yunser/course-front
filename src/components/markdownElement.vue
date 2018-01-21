<template>
    <div class="markdown-body" v-html="marked(content)"/>
</template>

<script>
    import marked from 'marked'

    export default {
        props: {
            content: {
                type: String,
                default: ''
            }
        },
        created () {
            marked.setOptions({
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight (code, lang) {
                    return require('highlight.js').highlight(lang, code).value
                }
            })
        },
        methods: {
            marked(content) {
                return marked(content)
            }
        }
    }
</script>

<style lang="scss">
    /*@import "../assets/github-markdown.css";*/
    @import "../assets/atom-one-light.css";
</style>