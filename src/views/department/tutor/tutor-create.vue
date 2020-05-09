
<template>
    <span>
        <Button type="primary" icon="plus" @click="openDialog">添加导师</Button>
        <!-- 添加导师 -->
        <Modal v-model="show" title="添加导师" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="createForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="导师编号" prop='teaNo'>
                        <Input type="text" v-model="item.teaNo"></Input>
                    </FormItem>
                    <FormItem label="导师姓名" prop='teaName'>
                        <Input type="text" v-model="item.teaName"></Input>
                    </FormItem>
                    <FormItem label="导师电话" prop='teaMobile'>
                        <Input type="text" v-model="item.teaMobile"></Input>
                    </FormItem>
                    <FormItem label="导师邮箱" prop='teaEmail'>
                        <Input type="text" v-model="item.teaEmail"></Input>
                    </FormItem>
                    <FormItem label="学校名称" prop='schoolName'>
                        <Input type="text" v-model="item.schoolName"></Input>
                    </FormItem>
                    <FormItem label="院系选择" prop='dIds'>
                        <!--<Input type="text" v-model="item.dIds"></Input>-->
                        <Input type="text" v-model="item.depId" style="display: none;"></Input>
                        <department-selector  :show="depSelectorInitShow" @onDepSelector="handleDepSelected" style="width: 160px;"></department-selector>
                    </FormItem>
                    <FormItem label="专业选择" prop="major">
                        <Input type="text" v-model="item.proId" style="display: none;"></Input>
                        <major-selector :depId="item.depId" @on-change="handleProSelected" style="width: 160px;"></major-selector>
                    </FormItem>
                </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import departmentService from '@/service/departmentService';
import { validateEmail, validateMobile } from '@/libs/validate';
import DepartmentSelector from "../../sys/plugins/department-selector";
import MajorSelector from "../../sys/plugins/major-selector";
export default {
    name: "tutor-create",
    components: {
        MajorSelector,
        DepartmentSelector
    },
    data() {
        return {
            depSelectorInitShow: true,
            proId: -1,
            modal1: false,
            show: false,
            rid: "",
            loading: true,
            item: {
                teaNo: "",
                teaName: "",
                teaMobile: "",
                teaEmail: "",
                schoolName: "",
                dIds: "",
                proId: -1,
                depId: -1,
            },
            rules: {
                teaNo: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                teaName: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                teaMobile: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                teaEmail: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                schoolName: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                // dIds: [
                //     { required: true, message: '输入不能为空', trigger: 'change' }
                // ],
            },
            currentNode: {},
            treeData : [],
            selectedRid: "",
            isInit: false
        };
    },
    methods: {
        handleDepSelected(d) {
            this.item.depId = d*1;
        },
        handleProSelected(value) {
            this.item.proId = value*1;
        },
        onOk() {
            let vm = this, params = this.item;
             params = {
                 teaNo: this.item.teaNo,
                 teaName: this.item.teaName,
                 depId: this.item.depId * 1,
                 proId: this.item.proId * 1,
                 teaMobile: this.item.teaMobile,
                 teaEmail: this.item.teaEmail,
            }
            this.$refs.createForm.validate((valid) => {
                if (valid) {
                    departmentService.addTeacher(params).then(res => {
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
    }
}
</script>

<style scoped>

</style>
