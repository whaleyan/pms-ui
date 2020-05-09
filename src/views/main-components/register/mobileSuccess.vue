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
</style>
<template>
    <div class="container">
        <h1><Icon type="checkmark-circled" style="color:#19be6b;"></Icon> 恭喜您，注册成功</h1>
        <p class="margin-top-20">即将跳转登录页面</p>
        <p class="margin-top-20">如果长时间没有跳转，请点这里<a href="javascript:void(0)" @click="goLogin">手动跳转</a></p>
    </div>
    
</template>
<script>
export default {
    name: 'mobile-success',
    data() {
        return {
            
        }
    },
    methods: {
        goLogin() {
            this.$router.push({
                name: 'login'
            });
        }
    }
}
</script>
