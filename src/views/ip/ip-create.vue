<template>
    <span>
        <Button type="primary" icon="plus" @click="openDialog">添加新IP</Button>
        <!-- 新增 -->
        <Modal v-model="show" title="添加新IP" :loading="loading"  @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="createForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="对应区域" prop="area">
                        <Input type="text" v-model="item.area" ></Input>
                    </FormItem>
                    <FormItem label="起始ip" prop='startIp'>
                        <Input type="text" v-model="item.startIp"></Input>
                    </FormItem>
                    <FormItem label="结束ip" prop='endIp'>
                        <Input type="text" v-model="item.endIp" ></Input>
                    </FormItem>

                </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import ipService from '@/service/ipService';
import { validateEmail, validateMobile } from '@/libs/validate';
export default {
    name: "ip-create",
    props: {
        user: Object
    },
    data() {
        return {
            modal1: false,
            show: false,
            rid: "",
            loading: true,
            rules: {
                area: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                startIp: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                endIp: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
            },
            isInit: false
        };
    },
    methods: {
        onOk(){
            let vm = this, params = this.item;
            params.area = vm.item.area;
            params.endIp = vm.item.endIp;
            params.startIp = vm.item.startIp;
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    console.log("保持的用户信息为：",params);
                    ipService.addControlips(params).then(res => {
                        if (res.status === 200) {
                            vm.loading = false; // 关闭等待状态
                            vm.show = false; // 关闭弹框
                            vm.$Notice.success({title: '创建成功'});
                            vm.$emit('onSuccess');
                        } else {
                            vm.loading = false;
                            vm.$Notice.error({title: res.msg});
                        }
                    });
                } else {
                    vm.loading = false;
                }
            });
        },
        visibleChange(flag) {
            if(!flag) {
                this.loading = true;
                this.isInit = false;
            } else {
                this.isInit = true;
            }
        },
        openDialog(){
            this.show = true;
        }
    },
    created() {
        this.item = Object.assign({}, this.user);
    },

};
</script>


