
<template>
    <div>
        <h1 class="margin-bottom-10">找回密码</h1>
        <h3 class="margin-bottom-10">
            <span v-if="!isSend">验证码将会发送至你的注册邮箱或手机</span>
            <Alert v-if="isSend" show-icon>验证码已发送至你的注册
                <span v-if="isMobile === 'mobile'"> 手机</span>
                <span v-if="isMobile === 'email'"> 邮箱</span>
            </Alert>
        </h3>
        <Form ref="stepForm" :rules="rules" @submit.native.prevent>
            <FormItem v-if="!isSend" label="找回方式">
                <RadioGroup v-model="isMobile">
                    <Radio label="mobile">手机号</Radio>
                    <Radio label="email">邮箱地址</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem v-if="isMobile === 'mobile'" prop="mobile">
                <Input type="text" ref="mobileInput" placeholder="请输入手机号" v-model="mobile" :disabled=isSend>
                    <span slot="prepend">
                        <Icon :size="16" type="iphone"></Icon>
                    </span>
                </Input>
            </FormItem>
            <FormItem v-if="isMobile === 'email'" prop="email">
                <Input placeholder="请输入邮箱" ref="emailInput" v-model="email" :disabled=isSend>
                    <span slot="prepend">
                        <Icon :size="16" type="email"></Icon>
                    </span>
                </Input>
            </FormItem>
            <FormItem v-if="isSend">
                <Row>
                    <Col span="14">
                        <Input v-model="sixCode" placeholder="请输入收到的6位验证码" clearable></Input>
                    </Col>
                    <Col span="8" offset="1">
                        <span v-if="!isCountOver">倒计时 {{secondToDate}} </span>
                        <Button v-if="isCountOver" type="ghost" long @click="sendAgain" :loading=loadingAgain>重新发送</Button>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" long :loading="loading" @click="nextStep">下一步</Button>
            </FormItem>
        </Form>
    </div>
    
</template>
<script>
import PasswordService from '@/service/passwordService';
import { validateEmail, validateMobile } from '@/libs/validate';
export default {
    name: 'find-password',
    data() {
        const isValiTel = (rule, value, callback) => {
            // 此处 value 为 undefined, BUG?
            let mobile = this.$refs.mobileInput.value;
            if (mobile === '') {
                callback(new Error("输入不能为空"));
            } else {
                if(!validateMobile(mobile)) {
                    callback(new Error("手机号码格式不正确"));
                } else {
                    callback();
                }
            }
        }
        const isValiEmail = (rule, value, callback) => {
            let email = this.$refs.emailInput.value;
            if (email === '') {
                callback(new Error("输入不能为空"));
            } else {
                if(!validateEmail(email)) {
                    callback(new Error("邮箱地址格式不正确"));
                } else {
                    callback();
                }
            }
        }
        return {
            isSend: false,
            mobile: '',
            email: '',
            isMobile: 'mobile',
            sixCode: '',
            resetCount: 5 * 60,
            count: 5 * 60, 
            isCountOver: false,
            loading: false,
            loadingAgain: false,
            rules: {
                mobile:[
                    { validator: isValiTel, trigger: 'blur'}
                ],
                email:[
                    { validator: isValiEmail, trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
        secondToDate() {
            let result = this.count;
            var m = Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60));
            return result = m + "分 " + s + "秒";
        }
    },
    methods: {
        nextStep() {
            if(!this.isSend) { // 第一步： 发送邮箱地址或手机号获取验证码
                if(this.isMobile === 'mobile') {
                    this.$refs.stepForm.validateField("mobile");
                    // if(this.mobile === '') {
                    //     return this.$Message.error("输入不能为空");
                    // } else {
                    //     let mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/; 
                    //     if(!mobileReg.test(this.mobile)) {
                    //         return this.$Message.error("手机号码格式不正确");
                    //     }
                    // }
                } else {
                    this.$refs.stepForm.validateField("email");
                    // if(this.email === '') {
                    //     return this.$Message.error("输入不能为空");
                    // } else {
                    //     let emailReg = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/ ; 
                    //     if(!emailReg.test(this.email)) {
                    //         return this.$Message.error("邮箱地址格式不正确");
                    //     }
                    // }
                }
                this.loading = true;
                PasswordService.getCode({type: (this.isMobile === 'mobile') ? 'mobile' : 'email', mobileOrEmail: (this.isMobile === 'mobile') ? this.mobile : this.email}).then(res => {
                    this.loading = false;
                    if (res.status === 200) {
                        this.isSend = true;
                        this.countDown();
                    } 
                });
            } else { // 第二步： 验证输入的校验码
                if(this.sixCode === '') {
                    return this.$Message.error("请输入校验码");
                }
                if(this.sixCode.length !== 6) {
                    return this.$Message.error("校验码长度不正确");
                }
                this.loading = true;
                PasswordService.validateCode({type: (this.isMobile === 'mobile') ? 'mobile' : 'email', code: this.sixCode, mobileOrEmail: (this.isMobile === 'mobile') ? this.mobile : this.email}).then(res => {
                    this.loading = false;
                    if(res.status === 200) {
                        this.$emit('nextStep', (this.isMobile === 'mobile') ? this.mobile : this.email, this.isMobile);
                    }
                });
                
            }
        },
        countDown() {
            this.count = this.resetCount;
            let ss = setInterval(() => {
                if(this.count === 0) {
                    this.isCountOver = true;
                    clearInterval(ss);
                } else {
                    this.count--;
                }
            }, 1000);
        },
        sendAgain() {
            this.loadingAgain = true;
            PasswordService.getCode({type: (this.isMobile === 'mobile') ? 'mobile' : 'email', mobileOrEmail: (this.isMobile === 'mobile') ? this.mobile : this.email}).then(res => {
                this.loading = false;
                this.loadingAgain = false;
                if (res.status === 200) {
                    this.isCountOver = false;
                    this.countDown();
                } 
            });
        }
    }
}
</script>

