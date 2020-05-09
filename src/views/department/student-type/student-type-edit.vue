<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编辑</Button>
        <!-- 编辑 -->
        <Modal v-model="show" title="编辑" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="myForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="ID" prop='id'>
                        <Input disabled="disabled" type="text" v-model="item.id"></Input>
                    </FormItem>
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
export default {
    name: "student-type-edit",
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
            this.$refs.myForm.validate((valid) => {
                if (valid) {
                    departmentService.updateDegree(params).then(res => {
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
        openDialog(){
            this.show = true;
        }
    },
    created() {
        this.item = Object.assign({}, this.obj);
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>