<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编辑</Button>
        <!-- 新增 -->
        <Modal v-model="show" title="编辑学生" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="editFrom" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="学号" prop="stu_no">
                        <Input disabled="disabled" type="text" v-model="item.stuNo" ></Input>
                    </FormItem>
                    <FormItem label="学生名字" prop='stu_name'>
                        <Input type="text" v-model="item.stuName"></Input>
                    </FormItem>
                    <FormItem label="学院" prop='dep_id'>
                        <!--<Input type="text" v-model="item.depName" ></Input>-->
                        <Input type="text" v-model="item.depId" style="display: none;"></Input>
                        <department-selector :show="show" :depId="depId" @onDepSelector="handleDepSelected"></department-selector>
                    </FormItem>
                    <FormItem label="学科" prop='pro_id'>
                        <!--<Input type="text" v-model="item.proName" ></Input>-->
                        <Input type="text" v-model="item.pro_id" style="display: none;"></Input>
                        <major-selector :show="show" :proId="proId" :depId="depId" @on-change="handleProSelected" ></major-selector>
                    </FormItem>
                    <FormItem label="类型" prop='type'>
                        <!--<Input type="text" v-model="item.degName" ></Input>-->
                        <Input type="text" v-model="item.typeId" style="display: none;"></Input>
                        <student-type-selector :typeId="typeId" :show="show" @onSTypeSelector="handleSTypeSelected"></student-type-selector>
                    </FormItem>
                    <FormItem label="手机号" prop='mobile'>
                        <Input type="text" v-model="item.moblie"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop='email'>
                        <Input type="email" v-model="item.email"></Input>
                    </FormItem>
                    <FormItem label="生日" prop='birthday'>
                        <DatePicker type="date" placement="top-start" v-model="item.birthday" placeholder="选择日期" style="width: 200px"></DatePicker>
                    </FormItem>
                    <FormItem label="性别" prop='email'>
                        <RadioGroup v-model="item.sex">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import StudentManagementService from '@/service/studentService';
import DepartmentService from "@/service/departmentService";
import DepartmentSelector from "../sys/plugins/department-selector";
import MajorSelector from "../sys/plugins/major-selector";
import StudentTypeSelector from "../sys/plugins/student-type-selector";
export default {
    name: "student-edit",
    components: { MajorSelector, DepartmentSelector,StudentTypeSelector },
    props: {
        depList: Array,
        user: Object
    },
    data() {
        return {
            modal1: false,
            show: false,
            rid: "1",
            loading: true,
            rules: {

            },
            item: {},
            depId: 0,
            proId: 0,
            typeId: 0,
            isInit: false,
            proList: [],

            degree: []
        };
    },
    methods: {
        handleDepSelected (d) {
            this.item.dep_id = d*1;
        },
        handleProSelected(value) {
            this.item.pro_id = value*1;
        },
        handleSTypeSelected(value) {
            this.item.typeId = value;
        },
        onOk() {
            function dateToString(d) {
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let datt = d.getDate();
                return year + "-" +
                    (month < 10 ? "0" + month : "" + month) + "-" +
                    (datt < 10 ? "0" + datt : "" + datt);
            }
            let vm = this, params = this.item;
            params.birthday = dateToString(this.item.birthday);
            if(params.sex === "男") {
                params.sex = 0;
            }
            if(params.sex === "女") {
                params.sex = 1;
            }
            this.$refs.editFrom.validate((valid) => {
                if (valid) {
                    params.username = params.userName;
                    StudentManagementService.updateStudent(params).then(res => {
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
        },

        getDegreeList() {
            DepartmentService.getStudentTypeList({}).then(res => {
                if(res.status === 200) {
                    this.degree = res.data;
                } else {
                    this.$Notice.error({title: res.msg});
                }
            });
        }
    },
    created() {
        this.item = Object.assign({}, this.user);
        this.item.birthday = new Date(this.item.birthday * 1);
        this.item.sex = this.item.sex === 0 ? "男" : "女";
        this.depId = this.item.depId*1;
        this.proId = this.item.proId*1;
        this.typeId = this.item.typeId*1;
    },
    mounted() {

    }
};
</script>


