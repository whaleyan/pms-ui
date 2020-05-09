<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编辑</Button>
        <!-- 编辑 -->
        <Modal v-model="show" title="编辑IP" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="myForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="ID" prop="id">
                        <Input type="text" v-model="item.id" disabled="disabled"></Input>
                    </FormItem>
                    <FormItem label="对应区域" prop="area">
                        <Input type="text" v-model="item.area" ></Input>
                    </FormItem>
                    <FormItem label="起始ip" prop='startIp'>
                        <Input type="text" v-model="item.startIp"></Input>
                    </FormItem>
                    <FormItem label="结束ip" prop='endIp'>
                        <Input type="email" v-model="item.endIp" ></Input>
                    </FormItem>

                </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import ipService from '@/service/ipService';
export default {
    name: "ip-edit",
    props: {
        user: Object
    },
    data() {
        return {
            modal1: false,
            show: false,
            rid: "1",
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
            currentNode: {},
            treeData : [],
            item: {},
            selectedRid: "",
            isInit: false
        };
    },
    methods: {
        onOk() {
            let vm = this, params = this.item;
            params.area = vm.item.area;
            params.endIp = vm.item.endIp;
            params.id = vm.item.id;
            params.startIp = vm.item.startIp;
            this.$refs.myForm.validate((valid) => {
                if (valid) {
                    console.log("修改的用户信息为：",params);
                    ipService.updateControlips(params).then(res => {
                        if (res.status === 200) {
                            vm.loading = false; // 关闭等待状态
                            vm.show = false; // 关闭弹框
                            vm.$Notice.success({title: res.msg});
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
        onSelectedVal(val){
            this.item.roleId = val;
        },
        openDialog(){
            this.show = true;

        }
    },
    created() {
        this.item = Object.assign({}, this.user);
    },
    mounted() {

    }
};
</script>


