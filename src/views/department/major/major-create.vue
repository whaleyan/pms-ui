<template>
    <span>
        <Button type="primary" icon="plus" @click="openDialog">添加专业</Button>
        <!-- 添加 -->
        <Modal v-model="show" title="添加" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="createForm" :model="item" :rules="rules" :label-width="80">
                    <!--<FormItem label="所属院系ID" prop='depId'>-->
                        <!--&lt;!&ndash;<Input type="text" v-model="item.depId"></Input>&ndash;&gt;-->
                        <!--<Select v-model="model1" style="width:200px">-->
                            <!--<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                        <!--</Select>-->
                    <!--</FormItem>-->
                    <FormItem label="院系ID" prop=''>
                        <Select  v-model="item.depId">
                            <Option v-for="list in colleges" :value="list.id" :key="list.id">{{ list.depName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="专业名称" prop='proName'>
                        <Input type="text" v-model="item.proName"></Input>
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
    name: "major-create",
    props: {
        obj: Object,
    },
    data() {
        return {
            modal1: false,
            show: false,
            rid: "",
            loading: true,
            item:{
                depId:'',
                proName:'',
            },
            colleges: [],
            rules: {
                depId: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                proName: [
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
            this.$refs.createForm.validate((valid) => {
                if (valid) {

                    let vm = this, params = this.item;
                    departmentService.addProfessional(params).then(res => {
                        if (res.status === 200) {
                            console.log(params)
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
        let vm = this;
        departmentService.getCollegeList({}).then( res => {
            if(res.status == 200) {
                vm.colleges = res.data;
            } else {
                vm.$Notice.error({title: res.msg});
            }
        });
    },
}
</script>

<style scoped>

</style>
