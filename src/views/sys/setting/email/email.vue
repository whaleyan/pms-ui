<style lang="less">
    @import '../../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                Email参数设置
            </h4>
            <Row>
                <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
                    <FormItem label="邮件通知">
                        <i-switch v-model="formData.disable" size="large">
                            <span slot="1">On</span>
                            <span slot="0">Off</span>
                        </i-switch>
                    </FormItem>
                    <FormItem label="邮件端口" prop="port">
                        <Input v-model="formData.port" placeholder=""></Input>
                    </FormItem>
                    <FormItem label="smtp服务器" prop="server">
                        <Input v-model="formData.server"></Input>
                    </FormItem>
                    <FormItem label="邮件密码" prop="content">
                        <Input v-model="formData.pwd"></Input>
                    </FormItem>
                    <FormItem label="发送者邮箱" prop="content">
                        <Input v-model="formData.sender"></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="add">更新</Button>
                        <Button type="ghost" @click="reset" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
            </Row>
        </Card>
    </Row>
</template>

<script>
    import service from '@/service/sysSettingService';
    export default {
        name: "email-setting",
        data() {
            let obj = {
                formData: {
                    id: 99999,
                    disable: '',
                    port: '',
                    pwd: '',
                    sender: '',
                    server: ''
                },
                init: false,
                ruleValidate: {

                },
            };
            return obj;
        },
        methods:{
            add() {
                let vm = this;
                this.$refs.formData.validate((valid) => {
                    if (valid) {
                        if(vm.init){
                            service.addEmailSetting( vm.formData ).then(res => {
                                if (res.status === 200) {
                                    vm.$Notice.success({title: res.msg});
                                } else {
                                    vm.$Notice.error({title: res.msg});
                                }
                            });
                        }else{
                            service.updateEmailSetting( vm.formData ).then(res => {
                                if (res.status === 200) {
                                    vm.$Notice.success({title: res.msg});
                                } else {
                                    vm.$Notice.error({title: res.msg});
                                }
                            });
                        }
                    }
                });
            },
            reset() {
                this.formData.disable = false;
                this.formData.port = "";
                this.formData.pwd = "";
                this.formData.sender = "";
                this.formData.server = "";
            }
        },
        computed: {

        },
        created() {
            let vm = this;
            service.getEmailSetting().then(res => {
                if (res.status === 200) {
                    if(res.data.total == 0){
                        vm.init = true;
                    }else{
                        vm.formData = JSON.parse((res.data.list[0]).content);
                        vm.formData.id = (res.data.list[0]).id;
                        console.log(vm.formData);
                    }
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        }
    }
</script>
