<style lang="less" scpoped>
    @import '../../../../styles/common.less';
    body {
        background: #ffffff!important;
    }
    .c-avatar {
        width: 5rem;
        height: 5rem;
        // border-radius: 50%;
    }
    .code-row-bg > div {
        text-align: center;
    }
</style>
<template>
    <div v-show="initShow" style="margin:80px auto; width: 380px; ">
        <h1 class="margin-bottom-10">绑定微信</h1>
        <Row type="flex" justify="space-between" align="middle" class="code-row-bg margin-top-20 margin-bottom-10">
            <Col span="8"><Avatar class="c-avatar" shape="square" :src="staticResource.aImg" size="large" /></Col>
            <Col span="8"><img :src="staticResource.excImg" alt="" style="width: 4rem; height: 4rem;"></Col>
            <Col span="8"><Avatar class="c-avatar" shape="square" :src="staticResource.userImg" size="large" /></Col>
        </Row>
        <p class="margin-top-20 margin-bottom-10 padding-left-10 padding-right-10">说明：请输入您的系统账号与您的微信号进行绑定，下次可通过微信直接扫码登录</p>
        <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
                <Input v-model="form.userName" placeholder="请输入用户名">
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
            <FormItem>
                <Button type="success" :loading="loading" long @click="binding" >确认绑定</Button>
            </FormItem>
        </Form>
        
    </div>
</template>
<script>
import adminImg from '../../../../images/admin.jpg';
import userImg from '../../../../images/user.png';
import excImg from '../../../../images/exchange.png';
import userService from '@/service/userService';
import { Message } from 'iview';
export default {
    name: 'binding-weixin',
    data() {
        return {
            nickname: '',
            staticResource: {
                aImg: adminImg,
                excImg: excImg,
                userImg: userImg
            },
            form: {
                userName: '',
                password: ''
            },
            loading: false,
            initShow: false,
            openid: '',
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        binding: function() {
            let vm = this;
            this.loading = true;
            userService.wxaccountBinding({
                userName: vm.form.userName,
                password: vm.form.password,
                openid: vm.openid
            }).then(function(response){
                console.log("绑定以后的response",response);
                if (response.status === 200) {
                    vm.$store.commit('SET_TOKEN', response.data.token);
                    vm.$store.commit('SET_NAME', vm.nickname);
                    vm.$store.commit('setAvator', vm.staticResource.userImg);
                    vm.$router.push({
                        name: 'home_index'
                    });
                }else{
                    Message.error({
                        content: response.msg,
                        duration: 2
                    });
                }
                vm.loading = false;
            });
        }
    },
    created () {
        //判断URL上是否有微信登录传过来的CODE，有则进行微信登录流程
        let vm = this;
        let code = vm.$route.query.code;
        if(code && code != ''){
            userService.checkWxCode({ code:code }).then(function(response){
                console.log("response",response);
                if( response.status == 200 ){
                    vm.$store.commit('SET_TOKEN', response.data.token);
                    vm.$store.commit('SET_NAME', response.data.userInfo.nickname);
                    vm.$store.commit('setAvator', response.data.userInfo.headimgurl);
                    vm.$router.push({
                        name: 'home_index'
                    });
                }else if( response.status == 201 ){
                    //需要绑定账号
                    vm.initShow = true;
                    vm.staticResource.userImg = response.data.userInfo.headimgurl;
                    vm.nickname = response.data.userInfo.nickname;
                    vm.openid = response.data.userInfo.openid;
                }else{
                    Message.error({
                        content: response.msg,
                        duration: 2,
                        onClose: function(){
                            vm.$router.push({
                                name: 'login'
                            });
                        }
                    });
                }
            });
        }
    },
}
</script>

