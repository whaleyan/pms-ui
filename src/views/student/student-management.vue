<style lang="less">
@import "../../styles/common.less";
</style>

<template>
    <div>
        <Row>
            <Card>
                <h4 slot="title">
                    <Icon type="person-stalker"></Icon>
                    学生管理
                </h4>
                <Row>
                    <Col span="11">
                        <Form ref="searchForm" inline>
                            <FormItem prop="department">
                                <department-selector :show="depSelectorInitShow" @onDepSelector="handleDepSelected" style="width: 160px;"></department-selector>
                            </FormItem>
                            <FormItem prop="major">
                                <major-selector :depId="depId" @on-change="handleProSelected" style="width: 160px;"></major-selector>
                            </FormItem>
                            <FormItem prop="query">
                                <Input v-model="keywords" placeholder="输入学生名字或学号..."></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="getList">搜索</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span="1" >
                        <Button type="primary" shape="circle" icon="refresh"  @click="refresh"></Button>
                    </Col>
                    <Col span="2" align="right">
                        <student-create @onSuccess="studentAdded"></student-create>
                    </Col>
                    <Col span="2" align="right">
                        <Upload
                            name="uploadfile"
                            :show-upload-list="showUploadList"
                            :headers="header"
                            :on-success="handleUploadSuccess"
                            action="http://120.76.121.210:10010/pmsapi/student/addStudentList">
                            <Button type="ghost" icon="ios-cloud-upload-outline">导入</Button>
                        </Upload>
                    </Col>
                    <Col span="3" align="right">
                        <Button type="primary" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出</Button>
                        <Button type="error" @click="deleteBatch">批量删除</Button>
                    </Col>
                    <Col span="3" align="right">
                        <Button type="primary" @click="exportMould()"><Icon type="ios-cloud-upload-outline"></Icon>下载导入模板</Button>
                    </Col>
                </Row>
                <Row class="margin-top-10">
                    <Col span="24">
                        <Table :columns="columns" :data="tableData" :loading="tableLoading" @on-selection-change="tableItemSelectChange"></Table>

                        <Page class="margin-top-10" :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                    </Col>
                </Row>
            </Card>
        </Row>
    </div>


</template>

<script>
import StudentManagementService from "@/service/studentService";
import departmentService from '@/service/departmentService';

import { tableConfigMixin } from "@/libs/config";
import studentCreate from "./student-create.vue";
import studentEdit from "./student-edit.vue";
import DepartmentSelector from "../sys/plugins/department-selector";
import MajorSelector from "../sys/plugins/major-selector";

export default {
    name: "student-management",
    components: {
        MajorSelector,
        DepartmentSelector,
        studentCreate
    },
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            showUploadList:false,
            header: {token:""},
            tableSelectItems: [],
            depSelectorInitShow: true,
            depId: -1,
            proId: -1,
            typeId: "-1",
            stuName: "",
            stuNo: "",
            keywords: "",

            searchRole: "",
            tableLoading: true,
            modalEdit: false,
            itemEdit: {},
            tableData: [],
            params:{
                current:1,
            },
            columns: [
                {
                    type: "selection",
                    width: 50,
                    align: "center",
                    fixed: "left"
                },
                {
                    title: "学号",
                    key: "stuNo",
                    width: 160,
                    fixed: "left"
                },
                {
                    title: "学生名字",
                    key: "stuName",
                    width: 100
                },
                {
                    title: "学院",
                    key: "depName",
                    width: 240
                },
                {
                    title: "学科",
                    key: "proName",
                    width: 240
                },
                {
                    title: "类型",
                    key: "degName",
                    width: 100
                },
                {
                    title: "手机号",
                    key: "moblie",
                    width: 160
                },
                {
                    title: "邮件",
                    key: "email",
                    width: 260
                },
                {
                    title: "生日",
                    key: "birthday",
                    width: 200,
                    render: (h, params) => {
                        function dateToString(d) {
                            let year = d.getFullYear();
                            let month = d.getMonth() + 1;
                            let datt = d.getDate();
                            return year + "-" +
                                (month < 10 ? "0" + month : "" + month) + "-" +
                                (datt < 10 ? "0" + datt : "" + datt);
                        }
                        let dd = new Date(params.row.birthday);
                        return h("span", {}, dateToString(dd));
                    }
                },
                {
                    title: "性别",
                    key: "sex",
                    width: 100,
                    render: (h, params) => {
                        if (params.row.sex === 0) {
                            return h("span", {}, "男");
                        }
                        return h("span", {}, "女");
                    }
                },
                // {
                //     title: "上次登录时间",
                //     key: "loginTimes",
                //     width: 140
                // },
                {
                    title: "创建时间",
                    key: "createTime",
                    width: 180,
                    render: (h, params) => {
                        return h(
                            "span",
                            {},
                            params.row.createTime.split(".")[0]
                        );
                    }
                },
                {
                    title: "多篇提交",
                    key: "manySubmit",
                    width: 100,
                    fixed: "right",
                    render: (h, params) => {
                        return h("i-Switch", {
                            props: {
                                value: params.row.manySubmit || 0,
                                trueValue: 1,
                                falseValue: 0
                            },
                            on: {
                                'on-change': (v) => {
                                    this.changeManySubmit(params.row.stuNo, v);
                                }
                            }
                        });
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width: 250,
                    fixed: "right",
                    render: (h, params) => {
                        let editBtn = h(studentEdit, {
                            props: {
                                user: params.row
                            },
                            on: {
                                onSuccess: () => {
                                    this.getList();
                                }
                            }
                        });
                        let delBtn = h(
                            "Button",
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "4px"
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row);
                                    }
                                }
                            },
                            "删除"
                        );
                        let checkPassBtn = h("Button", {
                            props: {
                                type: "primary",
                                size: "small"
                            },
                            style: {
                                marginRight: "4px"
                            },
                            on: {
                                click: () => {
                                    this.approveStu(params.row);
                                }
                            }
                        }, "通过审核");
                        let btns = [];
                        if (params.row.state * 1 === 0) {
                            btns.push(checkPassBtn)
                        }
                        btns.push(editBtn);
                        btns.push(delBtn);
                        return h("div", btns);
                    }
                }
            ]
        };
        return obj;
    },
    methods: {
        refresh(){
            this.pageChange(1);
            // this.params.page = 1;
            // this.getList();
            // window.location.reload();
        },
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
        handleDepSelected(d) {
            this.depId = d*1;
        },
        handleProSelected(value) {
            this.proId = value*1;
        },
        remove(obj) {
            let vm = this;
            this.$Modal.confirm({
                title: "警告",
                content: "确认删除【"+obj.stuName+"】吗？",
                onOk: () => {
                    StudentManagementService.delStudent(obj.stuNo).then(res => {
                        if (res.status === 200) {
                            vm.$Notice.success({ title: "删除成功" });
                            vm.pageChange(1);
                            // vm.getList();
                        } else {
                            vm.$Notice.error({ title: res.msg });
                        }
                    });
                }
            });
        },
        editUser() {
            let vm = this;
            let params = this.itemEdit;
            StudentManagementService.updateUser(params).then(res => {
                if (res.status === 200) {
                    vm.$Message.success("编辑成功");
                    vm.getList();
                    vm.itemEdit = {};
                } else {
                    vm.$Notice.error({ title: res.msg });
                }
            });
        },
        approveStu(stu) {
            let vm = this;
            StudentManagementService.passStudent(stu.stuNo).then(res => {
                if (res.status === 200) {
                    vm.$Notice.success({title:"操作成功"});
                    vm.getList();
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
        pageChange(page) {
            this.params.current = page;
            this.params.page = page;
            this.getList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            this.getList();
        },
        studentAdded(){
            this.pageChange(1);
        },
        getList() {
            let vm = this;
            let params = this.params;
            params.depId = this.depId;
            params.proId = this.proId;
            params.typeId = this.typeId;
            params.keywords = this.keywords;

            vm.tableLoading = true;
            StudentManagementService.getStudentList(params).then(res => {
                if (res.status == 200) {
                    vm.tableLoading = false;
                    vm.tableData = res.data.list;
                    vm.totalCount = res.data.totalCount * 1;
                } else {
                    vm.$Notice.error({ title: res.msg });
                }
            });
        },
        exportData() {
            let vm = this;
            let url = "http://120.76.121.210:10010/pmsapi/student/studentListExport";
            url += "?token=" + this.header.token;
            url += "&depId=" + this.depId;
            url += "&proId=" + this.proId;
            url += "&typeId=" + this.typeId;
            url += "&keywords=" + encodeURI(this.keywords)
            window.open(url);
        },
        exportMould(){
            let vm = this;
            let url = "http://120.76.121.210:10010/pmsapi/template/student.xlsx ";
            window.open(url);
        },
        deleteBatch(status) {
            let vm = this;
            if (vm.tableSelectItems.length != 0){

                this.$Modal.confirm({
                    title: "警告",
                    content: "确认删除吗？",
                    onOk: () => {
                        let param = vm.tableSelectItems.map((it) => { return it.stuNo; });
                        param = param.join(',');
                        StudentManagementService.delStudent(param).then(res => {
                            if (res.status === 200) {
                                vm.$Notice.success({ title: "删除成功" });
                                vm.pageChange(1);
                                // vm.getList();
                            } else {
                                vm.$Notice.error({ title: res.msg });
                            }
                        });
                    }
                });

            }else{
                this.$Message.info('请选择')
            }
        },
        tableItemSelectChange(selection) {
            this.tableSelectItems = selection;
        },
        changeManySubmit(stuNo, state) {
            let vm = this;
            StudentManagementService.changeManySubmit(stuNo, state).then(res => {
                if (res.status === 200) {
                    vm.$Notice.success({ title: "操作成功" });
                } else {
                    vm.$Notice.error({ title: res.msg });
                }
            });
        },
        handleUploadSuccess(res, file, fileList) {
            if (res.status === 200) {
                this.$Notice.success({title: "上传成功"});
                this.getList();
            } else {
                this.$Notice.error({ title: res.msg });
            }
        }
    },
    created() {
        this.$nextTick(function() {
            this.getList();
        });
        this.header.token = this.$store.getters.getToken;
    }
};
</script>


