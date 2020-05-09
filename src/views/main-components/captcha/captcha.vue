<style lang="less">
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
    .captcha > input {
        padding-right: 25px;
    }
</style>
<template>
    <Row :gutter="8">
        <Col span="14">
            <FormItem prop="captcha" style="position: relative;" v-bind:class="{'ivu-form-item-error': showError}">
                <Input class="captcha" v-model="captcha" ref="captcha" placeholder="请输入验证码" @on-blur="onBlur" ></Input>
                <span v-show="weatherVali" style="position:absolute; top: 0; right: 5px;">
                    <Icon v-show="!isOkCaptcha" class="captcha-forback error" type="close-circled"></Icon>
                    <Icon v-show="isOkCaptcha" class="captcha-forback success" type="checkmark-circled"></Icon>
                </span>
                <div v-show="showError" class="ivu-form-item-error-tip">输入不能为空</div>
            </FormItem>
        </Col>
        <Col span="10" style="text-align: center;">
            <Tooltip content="点击验证码图片可刷新">
                <img :src="captchaImg" @click="getImg" style="width: 90%; height: 2.2rem;">
            </Tooltip>
        </Col>
    </Row>
</template>
<script>
import userService from '@/service/userService';
import ajaxUrl from '@/libs/url';
export default {
    name: 'captcha-form',
    data() {
        return {
            captcha: "",
            weatherVali: false,
            isOkCaptcha: true,
            captchaImg: '',
            uid: '',
            showError: false
        }
    },
    watch: {
        captcha: function() {
            if (this.captcha.length == 4){
                this.checkCode();
            } else {
                this.isOkCaptcha = false;
                this.$emit("onVali", false);
                this.$emit("onValue", {captcha: this.captcha, id: this.uid});
            }
        }
    },
    methods: {
        getImg() {
            this.captcha = '';
            userService.getUniqId().then(res => {
                if(res.status === 200) {
                    this.uid = res.data.id;
                    this.captchaImg = ajaxUrl + userService.getImage(this.uid) ;
                }
            });
        },
        checkCode(){
            userService.checkCode({id: this.uid, code: this.captcha}).then(res => {
                if(res.status === 200 && res.data.result === true) {
                    this.weatherVali = true;
                    this.isOkCaptcha = true;
                    this.$emit("onVali", true);
                    this.$emit("onValue", {captcha: this.captcha, id: this.uid});
                } else {
                    this.weatherVali = true;
                    this.isOkCaptcha = false;
                    this.$emit("onVali", false);
                }
            });
        },
        onBlur() {
            if(this.captcha === '') {
                this.showError = true;
                this.isOkCaptcha = false;
                this.$emit("onVali", false);
            } else {
                this.showError = false;
            }
        }
    },
    created() {
        this.getImg();
    }
}
</script>

