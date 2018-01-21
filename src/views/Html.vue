<template>
    <my-page title="HTML">
        <h2>HTML/HTML5 教程</h2>
        <div>不讲解过时的知识</div>

        <h3>知识点</h3>
        <ul>
            <li></li>
        </ul>

        <h3>工具</h3>
        <ul>
            <li></li>
        </ul>

        <ui-article>
            <ui-markdown :content="exampleFormCode"></ui-markdown>
            <!--<ui-demo :code="demoCode">-->
                <!--<demo></demo>-->
            <!--</ui-demo>-->
        </ui-article>

        <h3>测验</h3>
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

        <router-link to="/about">关于21212127</router-link>
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
                demoCode: demoCode
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
