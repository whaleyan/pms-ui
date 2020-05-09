<template>
    <span>
        <Button type="primary" icon="plus" @click="openDialog">添加学生类型</Button>
        <!-- 添加学生类型 -->
        <Modal v-model="show" title="添加学生类型" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="createForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="学生类型" prop='degName'>
                        <Input type="text" v-model="item.degName"></Input>
                    </FormItem>

                </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import departmentService from '@/service/departmentService';
import { validateEmail, validateMobile } from '@/libs/validate';
export default {
    name: "student-type-create",
    props: {
        obj: Object
    },
    data() {
        return {
            modal1: false,
            show: false,
            rid: "",
            loading: true,
            item: {
                degName:''
            },
            rules: {
                degName: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ]
            },
            currentNode: {},
            treeData : [],
            selectedRid: "",
            isInit: false
        };
    },
    methods: {
        onOk() {
            let vm = this, params = this.item;
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    departmentService.addDegree(params).then(res => {
                        if (res.status === 200) {
                            vm.loading = false; // 关闭等待状态
                            vm.show = false; // 关闭弹框
                            vm.$Notice.success({title: res.msg});
                            vm.$emit('onSuccess')
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
        this.item = Object.assign({}, this.obj);
    },
}
</script>

<style scoped>

</style>