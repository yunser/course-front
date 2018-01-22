<template>
    <my-page title="首页">
        云设教程，做最好的教程网站。
        <div>
            <h2>教程</h2>
            <router-link to="/cat/html">HTML 教程</router-link>
            <router-link to="/cat/css">CSS 教程</router-link>
            <router-link to="/cat/javascript">JavaScript 教程</router-link>

        </div>
        <div>
            <h2>前端工程师</h2>
            <p>1. 基础：HTML、CSS、JavaScript</p>
            <p>2. 进阶：HTML、CSS</p>
            <p>2. 进阶：HTML、CSS</p>
        </div>
        <div class="media"></div>
        <div>奖章矢量图：</div>
        <div></div>
        <div></div>
        <div></div>
        <div>http://sc.chinaz.com/shiliang/170528017143.htm</div>
        <div>http://sc.chinaz.com/shiliang/170613465820.htm</div>
        <div>http://sc.chinaz.com/shiliang/170403311131.htm</div>
        <div>http://sc.chinaz.com/shiliang/140727445981.htm</div>
        <div class="ui-medal">
            <div class="medal-content">
                <img class="medal-img" src="/static/img/medal.svg">
                <div class="number">
                    <span class="big">1</span>st
                </div>
            </div>
            <footer class="medal-footer">
                <div class="title">连走三周</div>
                <div class="content">连续三周行走12121212</div>
            </footer>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
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
