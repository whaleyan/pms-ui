<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编辑</Button>
        <!-- 编辑 -->
        <Modal v-model="show" title="编辑" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
                <FormItem label="快捷批注原因" prop="title">
                    <Input v-model="formData.title" placeholder="输入原因..."></Input>
                </FormItem>
                <FormItem label="批注内容" prop="content">
                    <Input v-model="formData.content" type="textarea" placeholder="输入内容..."></Input>
                </FormItem>
            </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import service from '@/service/sysSettingService';
export default {
    name: "comments-edit",
    props: {
        obj: Object
    },
    data() {
        return {
            show: false,
            loading: true,
            formData: {
                title: '',
                content: '',
                type: 1
            },
            ruleValidate: {
                title: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
            },
            isInit: false
        };
    },
    methods: {
        onOk() {
            let vm = this;
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    service.updateComment( vm.formData ).then(res => {
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
        this.formData = Object.assign({}, this.obj);
    },
    mounted() {

    }
}
</script>

<style scoped>

</style>