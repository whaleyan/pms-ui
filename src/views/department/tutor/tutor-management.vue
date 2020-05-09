<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Card>
        <h4 slot="title">
            <Icon type="person-stalker"></Icon>
            导师管理
        </h4>
        <Row>
            <Col span="8" align="left">
                <tutor-create type="primary"  v-on:onSuccess="tutorAdded" icon="plus">添加导师</tutor-create>
                <Input v-model="keywords" icon="search" @on-change="handleSearch" placeholder="请输入专业名称搜索..." style="width: 200px" />
                <Button type="primary" shape="circle" icon="refresh"  @click="refresh"></Button>
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

                <Page class="margin-top-10" :current="params.current"  :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
            </Col>
        </Row>
    </Card>
</template>

<script>
import departmentService from '@/service/departmentService';
import { tableConfigMixin } from "@/libs/config";
import tutorCreate from "./tutor-create.vue";
export default {
    name: "tutor-management",
    components: {tutorCreate},
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            showUploadList:false,
            header: {token:""},
            modal1: false,
            depId: -1,
            proId: -1,
            typeId: "-1",
            keywords:'',
            tableLoading: true,
            tableData: [],
            searchTableData: [],
            srcTableData: [],
            columns: [
                {
                    type: "selection",
                    width: 50,
                    align: "center",
                },
                {
                    title: "ID",
                    key: "id",
                },
                {
                    title: "导师编号",
                    key: "teaNo",
                },
                {
                    title: "导师姓名",
                    key: "teaName",
                },
                {
                    title: "导师电话",
                    key: "teaMobile",
                },
                {
                    title: "导师邮件",
                    key: "teaEmail",
                },
                {
                    title: "学校名称",
                    key: "teaEmail",
                },
                {
                    title: "创建时间",
                    key: "createTime",
                },
                {
                    title: "dIds",
                    key: "dIds",
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width:240,
                    render: (h, params) => {
                        let delBtn = h( "Button",{
                            props: {
                                type: "error",
                                size: "small"
                            },
                            style: {
                                marginRight: '4px'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.row);
                                }
                            }
                        }, "删除");

                        let btns = [];
                        btns.push(delBtn);
                        return h("div", btns);
                    }
                }
            ],
            params: {
                current: 1,
                page: 1,
                limit: 10
            }
        };
        return obj;
    },
    methods:{
        refresh(){
            this.pageChange(1);
            // this.params.current = 1;
            // this.params.page = 1;
            // this.getList();
            // window.location.reload();
        },
        remove(obj) {
            let vm = this;
            this.$Modal.confirm({
                title: '警告',
                content: "确认删除吗？",
                onOk: () => {
                    departmentService.deleteTeacher(obj.id).then(res => {
                        if (res.status === 200) {
                            vm.$Notice.success({title: '删除成功'});
                            vm.pageChange(1);
                        } else {
                            vm.$Notice.error({title: res.msg});
                        }
                    });
                }
            });
        },
        pageChange(page) {
            this.params.current = page;
            this.params.page = page;
            // let _start = (page-1)*this.params.limit;
            // let _end = page*this.params.limit;
            // this.tableData = this.searchTableData.slice(_start,_end);
            this.getList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            this.getList();
            // let _start = (page-1)*this.params.limit;
            // let _end = page*this.params.limit;
            // this.tableData = this.searchTableData.slice(_start,_end);
        },
        handleSearch () {
            this.getList();
            // this.searchTableData = this.search(this.srcTableData, {  teaName: this.searchKeyword, });
            this.pageChange(1);
        },
        tutorAdded() {
            this.pageChange(1);
            this.getList()
        },
        getList() {
            let vm = this;

            let params = this.params;
            params.keywords = this.keywords;
            vm.tableLoading = true;
            departmentService.getTutorList(params).then( res => {
                if(res.status == 200) {
                    vm.tableLoading = false;
                    vm.srcTableData = res.data.list;
                    vm.searchTableData = res.data.list;
                    vm.tableData = vm.srcTableData.slice(0,vm.params.limit);
                    vm.totalCount = res.data.totalCount*1;
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
        exportData() {
            let vm = this;
            let url = "http://120.76.121.210:10010/pmsapi/teacher/teacherListExport";
            url += "?token=" + this.header.token;
            url += "&depId=" + this.depId;
            url += "&proId=" + this.proId;
            url += "&typeId=" + this.typeId;
            url += "&keywords=" + encodeURI(this.keywords)
            window.open(url);
        },
        exportMould(){
            let vm = this;
            let url = "http://120.76.121.210:10010/pmsapi/template/teacher.xlsx";
            window.open(url);
        },
        handleUploadSuccess(res, file, fileList) {
            if (res.status === 200) {
                this.$Notice.success({title: "上传成功"});
                this.getList();
            } else {
                this.$Notice.error({ title: res.msg });
            }
        },
        deleteBatch(status) {
            let vm = this;
            if (vm.tableSelectItems.length != 0){
                this.$Modal.confirm({
                    title: "警告",
                    content: "确认删除吗？",
                    onOk: () => {
                        let param = vm.tableSelectItems.map((it) => { return it.id; });
                        param = param.join(',');
                        departmentService.deleteTeacher(param).then(res => {
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
    },
    computed: {
        total: function () {
            return this.searchTableData.length
        }
    },
    created() {
        this.$nextTick(function () {
            this.getList();
            this.header.token = this.$store.getters.getToken;
        });
    }
}
</script>

<style scoped>

</style>
