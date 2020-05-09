<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">修改</Button>
        <!-- 修改 -->
        <Modal v-model="show" title="发布论文" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="myForm" :model="item" :label-width="60">

                    <FormItem label="发布论文" prop='state'>
                        <Select v-model="item.state">
                            <Option value="0">发布论文</Option>
                            <Option value="1">取消发布</Option>
                        </Select>
                    </FormItem>
                 </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
    import paperService from '@/service/paperService';
    export default {
        name: "include-edit",
        props: {
            obj: Object
        },
        data() {
            return  {
                show: false,
                loading: true,
                isInit: false,
                item:{},
                state:'',
            };
        },
        methods: {
            openDialog(){
                this.show = true;
            },
            onOk() {
                let vm = this,
                    id = vm.item.id, state = Number(vm.item.state);
                this.$refs.myForm.validate((valid) => {
                    if(state === 0){
                        paperService.unSubmitById(id).then(res => {
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
                    }else if(state === 1){
                        console.log(id)///papers/submitById
                        paperService.submitById(id).then(res => {
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
                    }
                });
            },
            visibleChange(flag) {
                if(!flag) {
                    // this.loading = true;
                    this.isInit = false;
                } else {
                    this.isInit = true;
                }
            },
        },
        created() {
            this.item = Object.assign({}, this.obj);
        },
    }
</script>

<style scoped>

</style>
