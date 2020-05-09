
<template>
    <div>
        <h1 class="margin-bottom-10">设置新密码</h1>
        <h3 class="margin-bottom-10">新密码应不少于 6 位.</h3>
        <Form @submit.native.prevent>
            <FormItem label="新密码">
                <Input v-model="newPwd" type="password">
                    <span slot="prepend">
                        <Icon :size="16" type="locked"></Icon>
                    </span>
                </Input>
            </FormItem>
            <FormItem label="再次输入新密码">
                <Input v-model="newPwdAgain" type="password">
                    <span slot="prepend">
                        <Icon :size="16" type="locked"></Icon>
                    </span>
                </Input>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="nextStep" :disabled=disabled>重置密码</Button>
            </FormItem>
        </Form>
    </div>
    
</template>
<script>
import PasswordService from '@/service/passwordService';
import { Base64 } from 'js-base64';
export default {
    name: 'reset-password',
    props: {
        mobileOrEmail: String,
        type: String
    },
    data() {
        return {
            disabled: false,
            newPwd: '',
            newPwdAgain: ''
        }
    },
    methods: {
        nextStep() {
            if (this.newPwd === '' || this.newPwdAgain === '') {
                return this.$Message.error("输入不能为空");
            } else if (this.newPwd.length < 6 || this.newPwdAgain.length < 6) {
                return this.$Message.error("输入密码长度不少于6位");
            } else {
                if(this.newPwd !== '' && this.newPwdAgain !== '' && this.newPwd === this.newPwdAgain) {
                    this.disabled = true;
                    PasswordService.resetPassword({type: this.type, mobileOrEmail: this.mobileOrEmail, password: Base64.encode(this.newPwd)}).then(res => {
                        this.disabled = false;
                        if(res.status === 200) {
                            this.disabled = true;
                            this.$Message.success("重置成功，即将跳转登录页");
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'login'
                                });
                            }, 2500);
                        } else {
                            this.disabled = false;
                            this.$Message.warning("重置失败，请重新尝试");
                        }
                    });
                } else {
                    return this.$Message.error("请检查两次输入的密码是否正确");
                }
                
            }
            
        }
    }
}
</script>

