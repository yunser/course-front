<template>
    <my-page class="page-know" title="知识王者">
        <svg width="200" height="200">
            <g>
                <polygon points="100,20 169.28203230275508,59.99999999999999 169.2820323027551,140 100.00000000000001,180 30.717967697244916,140.00000000000003 30.717967697244873,60.00000000000006"></polygon> 
                <circle cx="100" cy="100" r="80" stroke="#ffffff" stroke-width="2" ></circle>
                <text x="100" y="12">文科</text>
                <text x="176.21023553303058" y="55.99999999999999">理科</text>
                <text x="176.2102355330306" y="143.99999999999997">娱乐</text>
                <text x="100.00000000000001" y="188">流行</text>
                <text x="23.789764466969416" y="144.00000000000006">生活</text>
                <text x="23.78976446696936" y="56.00000000000006">常识</text>
            </g>
        </svg>

        <div class="wrap-box">
            <div class="left">
                <div class="section">
                    <h2 class="title">趣味场</h2>
                </div>
                <div class="section">
                    <h2 class="title">好友对战</h2>
                </div>
                <div class="section">
                    <h2 class="title">商城</h2>
                </div>
            </div>
            <div class="right">
                <div class="section">
                    <h2 class="title">趣味场</h2>
                </div>
                <div class="section">
                    <h2 class="title">好友对战</h2>
                </div>
                <div class="section">
                    <h2 class="title">商城</h2>
                </div>
                <div class="section">
                    <h2 class="title">商城</h2>
                </div>
            </div>
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {
        }
    }
</script>

<style lang="scss" scoped>
    .page-know {
        background-color: #09c;
        .ui-page-header {

        }
    }
    .wrap-box {
        max-width: 350px;
        margin: 0 auto;
        padding: 16px;
        background-color: #f00;
        overflow: hidden;
        .left {
            float: left;
            width: 50%;
        }
        .right {
            float: left;
            width: 50%;
        }
        .section {
            margin-bottom: 16px;
            background-color: #fff;
        }
    }
    svg {
        display: block;
        margin: 0 auto;
    }
    polygon {
        fill: #42b983;
        opacity: .75;
    }

    circle {
        fill: transparent;
        stroke: #999;
    }

    text {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 10px;
        fill: #666;
    }

    label {
        display: inline-block;
        margin-left: 10px;
        width: 20px;
    }

    #raw {
        position: absolute;
        top: 0;
        left: 300px;
    }
</style>
