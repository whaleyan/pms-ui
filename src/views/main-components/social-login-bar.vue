<style lang="less">
    .icons {
        background: url(../../images/social-login-icon.png) no-repeat;
        display: inline-block;
        width: 42px;
        height: 42px;
    }
    .weixin {
        background-position: 0 0;
        background-size: 42px;
    }
    .qq {
        background-position: 0 -85px;
        background-size: 43px;
    }
</style>

<template>
    <div style="position: relative;">
        <span @click="weixin" class="icons weixin"></span>&nbsp;&nbsp;
        <!--<span @click="qq" class="icons qq"></span>&nbsp;&nbsp;-->
        <Modal v-model="modal" width="360">
            <div id="weixin_dlg" style="text-align:center">
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
import Vue from 'vue';
import userService from '@/service/userService';
import Url from '../../../build/url';

export default {
    name: 'socialLoginBar',
    data () {
        return {
            modal : false
        };
    },
    computed: {

    },
    methods: {
        weixin: function() {

            let callbakurl = Url + "/weixin-login";
            console.log(callbakurl.split('http://')[1]);

            this.modal = true;
            setTimeout(()=>{
                new WxLogin({
                    id: "weixin_dlg",
                    appid: "wx9ed36295fc6c0f1e",
                    scope: "snsapi_login",
                    redirect_uri: encodeURIComponent('http://test.kunteng.org/kt-cloud//#/bindingWx'),
                    state: "",
                    style: "",
                    href: ""
                });
            },100);
        },
        qq : function(){
            var c = "https://graph.qq.com/oauth2.0/authorize?client_id=100485241&response_type=token&scope=all&redirect_uri=http://www.processon.com/qq.jsp";
            window.open(c, "newwindow", "height=550, width=900, top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=no,location=no, status=no")
        }
    },
//    created () {
//        //判断URL上是否有微信登录传过来的CODE，有则进行微信登录流程
//        let vm = this;
//        let code = vm.$route.query.weixin;
//        if(code && code != ''){
//            userService.checkWxCode({ code:code }).then(function(response){
//                console.log("response",response);
//                if(response){
//                    vm.$router.push({
//                        name: 'bindingWx'
//                    });
//                }else{
//
//                }
//            });
//        }
//    },
    mounted () {

    }
};
</script>
