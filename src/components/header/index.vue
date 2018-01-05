<template>
    <header class="page-header">
        <ui-appbar title="标题">
            <ui-icon-button icon="menu" slot="left"/>
            <ui-flat-button label="expand_more" slot="right"/>
            <ui-icon-button icon="expand_more" slot="right"/>
        </ui-appbar>
        <div class="container">
            <!--<ui-raised-button label="Default" class="demo-raised-button"/>-->
            <div>这是页面头部</div>
        </div>
    </header>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
        }
    }
</script>
