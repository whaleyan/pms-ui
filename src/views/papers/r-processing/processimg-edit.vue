<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">审核</Button>
        <!-- 审核 -->
        <Modal v-model="show" title="审核" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="myForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="ID" prop='id'>
                        <Input disabled="disabled" type="text" v-model="item.id"></Input>
                    </FormItem>
                    <!--<FormItem label="论文语种" prop='papLanguage'>-->
                        <!--<Input disabled="disabled" type="text" v-model="item.papLanguage"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="学科代码" prop='subNo'>-->
                        <!--<Input disabled="disabled" type="text" v-model="item.subNo"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="学科名称" prop='subName'>-->
                        <!--<Input disabled="disabled" type="text" v-model="item.subName"></Input>-->
                    <!--</FormItem>-->
                    <FormItem label="学位" prop='degName'>
                        <Input disabled="disabled" type="text" v-model="item.degName"></Input>
                    </FormItem>
                    <!--<FormItem label="学号" prop='stuNo'>-->
                        <!--<Input disabled="disabled" type="text" v-model="item.stuNo"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="作者" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="学校" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="院系" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="专业" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第一导师姓名" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第一导师学校" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第一导师院系" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第一导师专业" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第二导师姓名" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第二导师学校" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第二导师院系" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="第二导师专业" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="论文完成日期" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item.papFinishedDate"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="论文答辩日期" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item.papAnswerDate"></Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="论文题目" prop=''>-->
                        <!--<Input disabled="disabled" type="text" v-model="item."></Input>-->
                    <!--</FormItem>-->
                </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
    import paperService from '@/service/paperService';

    export default {
        name: "processing-edit",
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
                    depName: ''
                },
                rules: {
                    depName: [
                        {required: true, message: '输入不能为空', trigger: 'blur'}
                    ]
                },
                currentNode: {},
                treeData: [],

                selectedRid: "",
                isInit: false
            };
        },
        methods: {
            onOk() {
                let vm = this, params = this.item;
                this.$refs.myForm.validate((valid) => {
                    if (valid) {
                        departmentService.updateDepartment(params).then(res => {
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
                if (!flag) {
                    this.loading = true;
                    this.isInit = false;
                } else {
                    this.isInit = true;
                }
            },
            openDialog() {
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