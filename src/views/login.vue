<style lang="less">
    @import './login.less';
    .captcha-forback {
        font-size: 1.3rem;
        vertical-align: middle;
        &.success {
            color:#19be6b;
        }
        &.error {
            color: #ed3f14;
        }
    }
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名/手机号/邮箱地址">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password" >
                            <Input type="password" v-model="form.password" placeholder="请输入密码" clearable>
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        
                        <!-- <Row :gutter="8">
                            <Col span="14">
                                <FormItem prop="captcha">
                                    <Input v-model="captcha" ref="captcha" placeholder="请输入验证码" style="width: 80%;"></Input>
                                    <span v-show="weatherVali">
                                        <Icon v-show="!isOkCaptcha" class="captcha-forback error" type="close-circled"></Icon>
                                        <Icon v-show="isOkCaptcha" class="captcha-forback success" type="checkmark-circled"></Icon>
                                    </span>
                                </FormItem>
                            </Col>
                            <Col span="10">
                                <Tooltip content="点击验证码图片可刷新">
                                    <img :src="captchaImg" @click="getImg" style="width: 100%; height: 2.2rem;">
                                </Tooltip>
                            </Col>
                        </Row> -->

                        <Captcha ref="captchaInput" @onVali="valiCaptcha" @onValue="getCaptcha"></Captcha>
                        
                        <Alert v-show="isShowValiLogin" type="error" show-icon>{{message}}</Alert>
                        
                        <FormItem>
                            <Button @click="handleSubmit" :loading="loading" type="primary" long>登录</Button>
                            <!--<div style="text-align:right;">-->
                                <!--<span style="float: left;">没有账号？<a href="javascript:void(0)" @click="register">注册</a></span>-->
                                <!--<a href="javascript:void(0)" @click="forgetPwd">忘记密码？</a>-->
                            <!--</div>-->
                        </FormItem>
                        
                    </Form>
                    <!--<p class="login-tip">- 其他登录方式 -</p>-->
                    <!--<social-login-bar></social-login-bar>-->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import userService from '@/service/userService';
import SocialLoginBar from "./main-components/social-login-bar";
import Captcha from '@/views/main-components/captcha/captcha';
import ajaxUrl from '@/libs/url';
import avator from "@/images/admin.jpg";
export default {
    components: {SocialLoginBar, Captcha},
    data () {
        return {
            isShowValiLogin: false,
            message: '',
            loading: false,
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            isValiCaptcha: false,
            captchaObj: {
                captcha: '',
                id: ''
            }
        };
    },
    methods: {
        handleSubmit () {
            let that = this;
            this.$refs.loginForm.validate((valid) => {
                if (valid && this.isValiCaptcha) {
                    if(this.captchaObj.captcha === "") {
                        this.isShowValiLogin = true;
                        this.message = "验证码输入为空";
                        return false;
                    } else {
                        this.isShowValiLogin = false;
                    }
                    this.loading = true;
                    userService.login({
                        username: that.form.userName,
                        password: that.form.password,
                        captcha: that.captchaObj.captcha,
                        id: that.captchaObj.id
                    }).then(function(response){
                        that.loading = false;
                        if (response.status === 200) {
                            that.$store.commit('SET_TOKEN', response.data.token);
                            that.$store.commit('setAvator', avator);

                            that.$router.push({
                                name: 'home_index'
                            });
                        } 
                        else {
                            that.isShowValiLogin = true;
                            that.message = response.msg;
                        }
                    });
                }
            });
        },
        register() {
            this.$router.push({
                name: 'register'
            });
        },
        forgetPwd() {
            this.$router.push({
                name: 'forgetpwd'
            });
        },
        valiCaptcha(bool) {
            this.isValiCaptcha = bool;
        },
        getCaptcha(obj) {
            this.captchaObj = obj;
        }
    }
};
</script>

<style>

</style>
