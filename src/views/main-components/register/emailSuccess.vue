<style lang="less" scpoped>
    @import '../../../styles/common.less';
    body {
        background: #ffffff!important;
    }
    .container {
        margin:80px auto; 
        width: 500px; 
        padding: 100px; 
        background: #f4f4f4; 
        text-align:center;
    }
    h1 {
        font-size: 1.8rem;
    }
</style>
<template>
    <div class="container">
        <h1><Icon type="checkmark-circled" style="color:#19be6b;"></Icon> 恭喜您，注册成功</h1>
        <p class="margin-top-20">已发邮件至<span style="color:#2d8cf0;">{{email}}</span>, 请到邮箱激活账号。</p>
    </div>
</template>
<script>
export default {
    name: 'email-success',
    props: {
        email: String
    },
    data() {
        return {

        }
    }
    
}
</script>
