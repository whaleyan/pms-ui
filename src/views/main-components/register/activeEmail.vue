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
        <div v-if="isSuccess">
            <h1><Icon type="checkmark-circled" style="color:#19be6b;"></Icon> 恭喜您，激活成功</h1>
            <p class="margin-top-20">即将跳转登录页面</p>
            <p class="margin-top-20">如果长时间没有跳转，请点这里<a href="javascript:void(0)" @click="goLogin">手动跳转</a></p>
        </div>
        <div v-if="isFail">
            <h1><Icon type="information-circled" style="color:#ff9900;"></Icon> 非常遗憾，激活失败</h1>
            <p class="margin-top-20">您的链接可能已过期，请点这里<a href="javascript:void(0)" @click="registerAgain">重新申请</a></p>
        </div>
    </div>
    
</template>
<script>
import RegisterService from '@/service/registerService';
import { Base64 } from 'js-base64';
export default {
    name: 'email-success',
    data() {
        return {
            isSuccess: false,
            isFail: false
        }
    },
    methods: {
        goLogin() {
            this.$router.push({
                name: 'login'
            });
        },
        activeEmail(params) {
            let vm = this;
            RegisterService.activeEmail(params).then(res => {
                if(res.status === 200) {
                    // this.$Message.success('激活成功');
                    this.isSuccess = true;
                    setTimeout(() => {
                        vm.$router.push({
                            name: 'login'
                        });
                    }, 3000);
                } else {
                    this.isFail = true;
                    this.$Message.error(res.msg);
                }
            });
        },
        registerAgain() {
            this.$router.push({
                name: 'register'
            });
        }
    },
    mounted() {
        let code = Base64.decode(this.$route.query.code);
        let params = {
            email: code.split("&")[0],
            code: code.split("&")[1]
        }
        this.activeEmail(params);
    }
}
</script>
