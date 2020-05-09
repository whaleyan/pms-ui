<style lang="less" scpoped>
    @import '../../../styles/common.less';
    body {
        background: #ffffff!important;
    }
</style>
<template>
    <div style="margin:80px auto; width: 400px; ">
        <FindPassword v-if="!isLastStep" @nextStep="nextStep"></FindPassword>
        <ResetPassword v-if="isLastStep" :mobileOrEmail="mobileOrEmail" :type="type"></ResetPassword>
    </div>
    
</template>
<script>
import FindPassword from './step1';
import ResetPassword from './step2';
import PasswordService from '@/service/passwordService';
export default {
    name: 'forget-password',
    components: { FindPassword, ResetPassword },
    data() {
        return {
            isLastStep: false,
            mobileOrEmail: '',
            type:''
        }
    },
    methods: {
        nextStep(val, type) {
            this.mobileOrEmail = val;
            this.type = type;
            this.isLastStep = true;
        }
    }
}
</script>
