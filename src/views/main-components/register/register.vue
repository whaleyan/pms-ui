<style lang="less" scpoped>
    @import '../../../styles/common.less';
    body {
        background: #ffffff!important;
    }
</style>
<template>
    <div>
        <div v-if="isRegister" style="margin:80px auto; width: 340px; background:#f4f4f4; padding:20px;">
            <h1 class="margin-bottom-10">注册</h1>
            <Form ref="stepForm" :rules="rules" @submit.native.prevent>
                <FormItem style="margin-bottom: 10px;">
                    <RadioGroup v-model="isMobile">
                        <Radio label="mobile">手机号</Radio>
                        <Radio label="email">邮箱地址</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem v-show="isMobile === 'mobile'" prop="mobile">
                    <Input type="text" ref="mobileInput" placeholder="请输入手机号" v-model="mobile">
                        <span slot="prepend">
                            <Icon :size="16" type="iphone"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem v-show="isMobile === 'email'" prop="email">
                    <Input placeholder="请输入邮箱" ref="emailInput" v-model="email" >
                        <span slot="prepend">
                            <Icon :size="16" type="email"></Icon>
                        </span>
                    </Input>
                </FormItem>

                <Captcha ref="captchaInput" @onVali="valiCaptcha" @onValue="getCaptcha"></Captcha>

                <FormItem v-show="isMobile === 'mobile'" prop="sixCode">
                    <Row type="flex" justify="space-between">
                        <Col span="14">
                            <Input v-model="sixCode" ref="codeInput" placeholder="请输入收到的6位验证码" clearable></Input>
                        </Col>
                        <Col span="8">
                            <span @click="sendSixCode" style="color:#2d8cf0; cursor:pointer;">获取短信验证码</span>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem prop="password">
                    <Input placeholder="请输入密码" v-model="password" ref="pwdInput" type="password">
                        <span slot="prepend">
                            <Icon :size="16" type="locked"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem prop="rePassword">
                    <Input placeholder="请再次输入密码" v-model="rePassword" ref="rePwdInput" type="password">
                        <span slot="prepend">
                            <Icon :size="16" type="locked"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" long :loading="loading" @click="register">注 册</Button>
                    <div style="text-align:right;">
                        <span style="float: left;">已有账号? <a href="javascript:void(0)" @click="login">登录</a></span>
                    </div>
                </FormItem>
            </Form>
        </div>
        <email-success v-if="emailSuccess" :email="email"></email-success>
        <mobile-success v-if="mobileSuccess" ></mobile-success>
    </div>
    
</template>
<script>
import RegisterService from '@/service/registerService';
import EmailSuccess from './emailSuccess';
import MobileSuccess from './mobileSuccess';
import Captcha from '@/views/main-components/captcha/captcha';
import { Base64 } from 'js-base64';
import { validateMobile, validateEmail } from '@/libs/validate';
export default {
    name: 'register',
    components: { EmailSuccess, MobileSuccess, Captcha },
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
        const valiCode = (rule, value, callback) => {
            let code = this.$refs.codeInput.value;
            if (code === '') {
                callback(new Error("输入不能为空"));
            } else {
                callback();
            }
        }
        const valiPwd = (rule, value, callback) => {
            let pwd = this.$refs.pwdInput.value;
            if (pwd === '') {
                callback(new Error("输入不能为空"));
            } else {
                if(pwd.length < 6 || pwd.length > 24) {
                    callback(new Error("密码长度6-24位"));
                } else {
                    callback();
                }
            }
        }
        const valiRePwd = (rule, value, callback) => {
            let repwd = this.$refs.rePwdInput.value;
            let oldPwd = this.$refs.pwdInput.value;
            if (repwd === '') {
                callback(new Error("输入不能为空"));
            } else {
                if(oldPwd !== repwd) {
                    callback(new Error("两次密码不一致"));
                } else {
                    callback();
                }
            }
        }
        return {
            isRegister: true,
            isMobile: 'mobile',
            email: '',
            mobile: '',
            password: '',
            rePassword: '',
            sixCode: '',
            loading: false,
            rules: {
                mobile:[
                    { validator: isValiTel, trigger: 'blur'}
                ],
                email:[
                    { validator: isValiEmail, trigger: 'blur' }
                ],
                sixCode: [
                    { validator: valiCode, trigger: 'blur' }
                ],
                password: [
                    { validator: valiPwd, trigger: 'blur' }
                ],
                rePassword: [
                    { validator: valiRePwd, trigger: 'blur' }
                ]
            },
            emailSuccess: false,
            mobileSuccess: false,
            isValiCaptcha: false,
            captchaObj: {
                captcha: '',
                id: ''
            }
        }
    },
    methods: {
        login() {
            this.$router.push({
                name: 'login'
            });
        },
        valiCaptcha(bool) {
            this.isValiCaptcha = bool;
        },
        getCaptcha(obj) {
            this.captchaObj = obj;
        },
        sendSixCode() {
            this.$refs.stepForm.validateField("mobile");
            if(this.mobile !== '' && this.isValiCaptcha) {
                this.$Notice.success({title: '验证码发送成功，注意接收'});
                RegisterService.sendCode({mobile: this.mobile}).then(res => {
                    if(res.status === 200) {
                        
                    } else {
                        this.$Notice.error({title: res.msg});
                    }
                });
            } else {
                if(!this.isValiCaptcha) {
                    this.$refs['captchaInput'].onBlur();
                    // this.$Message.error("请输入验证码");
                }
                
            }
        },
        register() {
            if(this.isMobile === 'mobile') {
                this.$refs.stepForm.validateField("mobile");
                this.$refs.stepForm.validateField("sixCode");
                this.$refs.stepForm.validateField("password");
                this.$refs.stepForm.validateField("rePassword");
            } else {
                this.$refs.stepForm.validateField("email");
                this.$refs.stepForm.validateField("password");
                this.$refs.stepForm.validateField("rePassword");
            }
            if(this.isValiCaptcha) {
                this.loading = true;
                RegisterService.register({
                    type: this.isMobile,
                    username: (this.isMobile === 'mobile') ? this.mobile : this.email,
                    code: this.sixCode,
                    password: Base64.encode(this.password),
                    captcha: this.captchaObj.captcha,
                    id: this.captchaObj.id
                }).then(res => {
                    this.loading = false;
                    if(res.status === 200) {
                        if(this.isMobile === 'email') {
                            this.isRegister = false;
                            this.emailSuccess = true;
                        } else {
                            this.isRegister = false;
                            this.mobileSuccess = true;
                        }
                        if(this.mobileSuccess) {
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'login'
                                });
                            }, 3000);
                        }
                    } else {
                        this.$Notice.error({title: res.msg});
                    }
                });
            } else {
                this.$Message.error("请输入验证码");
            }
            
        }
    }
}
</script>
