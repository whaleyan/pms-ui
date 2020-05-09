<template>

    <span>
        <Button type="primary" size="small" @click="openDialog">修改状态</Button>
        <!-- 修改 -->
        <Modal v-model="show" title="状态修改" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="myForm" :model="item" :label-width="60" >

                    <FormItem label="状态修改" prop='state' >
                        <Select v-model="item.state">
                            <Option v-for="item in optionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
        name: "state-edit",
        props: {
            obj: Object
        },
        data() {
            return  {
                optionList:[
                    {
                        value: '未提交论文',
                        label: '未提交论文'
                    },
                    {
                        value: '等待审核',
                        label: '等待审核'
                    },
                    {
                        value: '等待编目',
                        label: '等待编目'
                    },
                    {
                        value: '编目完成',
                        label: '编目完成'
                    },
                ],
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
                    id = vm.item.id, state =vm.item.state;
                this.$refs.myForm.validate((valid) => {
                    if(state === '未提交论文'){
                        console.log(state)
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
                    }else if(state === '等待审核'){
                        console.log(state)///papers/submitById
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
                    }else  if(state === '等待编目'){
                        console.log(state)///papers/passById
                        paperService.passById(id).then(res => {
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
                    }else if(state === '编目完成'){
                        console.log(state)///papers/catalogueById
                        paperService.catalogueById(id).then(res => {
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
        created: function () {
            this.item = Object.assign({}, this.obj);
        },
    }
</script>

<style scoped>

</style>
