<template>
    <div>
        <Row>
            <Button type="primary" icon="plus" @click="openDialog">新增学生</Button>
        </Row>
        <!-- 新增 -->
        <Modal v-model="show" title="新增学生" :loading="loading" @on-ok="onCreateStu" >
            <p>
                <Form ref="creatFrom" :model="item" :rules="rules" :label-width="80">
                    <FormItem label="学号" prop="stuNo">
                        <Input type="text" v-model="item.stuNo" ></Input>
                    </FormItem>
                    <FormItem label="学生名字" prop='stuName'>
                        <Input type="text" v-model="item.stuName"></Input>
                    </FormItem>
                    <FormItem label="学院" prop='depId'>
                        <Input type="text" v-model="item.depId" style="display: none;"></Input>
                        <department-selector :show="show" @onDepSelector="handleDepSelected"></department-selector>
                    </FormItem>
                    <FormItem label="学科" prop='proId'>
                        <Input type="text" v-model="item.proId" style="display: none;"></Input>
                        <major-selector :depId="item.depId" @on-change="handleProSelected" ></major-selector>
                    </FormItem>
                    <FormItem label="类型" prop='typeId'>
                        <Input type="text" v-model="item.typeId" style="display: none;"></Input>
                        <student-type-selector :show="show" @onSTypeSelector="handleSTypeSelected"></student-type-selector>
                    </FormItem>
                    <FormItem label="手机号" prop='mobile'>
                        <Input type="text" v-model="item.mobile"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop='email'>
                        <Input type="email" v-model="item.email"></Input>
                    </FormItem>
                    <FormItem label="生日" prop='birthday'>
                        <DatePicker type="date" placement="top-start" v-model="item.birthday" placeholder="选择日期" style="width: 200px"></DatePicker>
                        <!--<Input type="email" v-model="item.birthday" ></Input>-->
                    </FormItem>
                    <FormItem label="性别" prop='sex'>
                        <RadioGroup v-model="item.sex">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </p>
        </Modal>

    </div>
</template>

<script>
import StudentManagementService from '@/service/studentService';
import { validateEmail, validateMobile } from '@/libs/validate';
import DepartmentSelector from "../sys/plugins/department-selector";
import MajorSelector from "../sys/plugins/major-selector";
import { Base64 } from 'js-base64';
import StudentTypeSelector from "../sys/plugins/student-type-selector";
export default {
    name: "student-create",
    components: {
        StudentTypeSelector,
        MajorSelector, DepartmentSelector
    },
    data() {
        return {
            show: false,
            loading: true,
            item: {
                stuNo:'',
                stuName:'',
                depId: -1,
                proId: -1,
                typeId: -1,
                mobile:'',
                email: '',
                birthday: '',
                sex: ''
            },
            rules:{
                stuNo: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                stuName: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
//                depId: [
//                    { required: true, message: '输入不能为空', trigger: 'blur' }
//                ],
//                proId: [
//                    { required: true, message: '输入不能为空', trigger: 'blur' }
//                ],
//                typeId: [
//                    { required: true, message: '输入不能为空', trigger: 'blur' }
//                ],
                mobile: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, type:'email', message: '输入邮箱格式不正确', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        openDialog(){
            this.show = true;
        },
        handleDepSelected (d) {
            this.item.depId = d*1;
        },
        handleProSelected(value) {
            this.item.proId = value;
        },
        handleSTypeSelected(value) {
            this.item.typeId = value;
        },

        onCreateStu() {
            function dateToString(d) {
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let datt = d.getDate();
                return year + "-" + 
                    (month < 10 ? "0" + month : "" + month) + "-" + 
                    (datt < 10 ? "0" + datt : "" + datt);
            }
            let params = {
                stuNo: this.item.stuNo,
                stuName: this.item.stuName,
                depId: this.item.depId * 1,
                proId: this.item.proId * 1,
                typeId: this.item.typeId * 1,
                moblie: this.item.mobile,
                email: this.item.email,
                birthday: dateToString(this.item.birthday),
                sex: this.item.sex
            }
            if(params.sex === "男") {
                params.sex = 0;
            } else {
                params.sex = 1;
            }
            this.$refs.creatFrom.validate((valid) => {
                if(valid) {
                    StudentManagementService.createStudent(params).then(res => {
                        if (res.status === 200) {
                            this.loading = false; // 关闭等待状态
                            this.show = false; // 关闭弹框
                            this.$Notice.success({title: '创建成功'});
                            this.$emit("onSuccess");
                        } else {
                            this.$Notice.error({title: res.msg});
                        }
                    });
                } else {
                    this.loading = false;
                }
            });
            
        }
    },
}

</script>

<style scoped>

</style>