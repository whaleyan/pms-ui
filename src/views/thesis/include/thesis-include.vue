<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                已收录的论文
            </h4>
            <Row :gutter="10">
                <Col span="4">
                    <Input v-model="depId" style="display: none"></Input>
                    <department-selector :show="show" @onDepSelector="handleDepSelected" ></department-selector>
                </Col>
                <Col span="4">
                    <Input icon="search" v-model="keywords" placeholder="输入作者..." ></Input>
                </Col>
                <Col span="2" >
                    <Button type="primary" @click="search">搜索</Button>
                </Col>
                <Col span="2" >
                    <Button type="primary" shape="circle" icon="refresh"  @click="refresh"></Button>
                </Col>
                <Col span="12" align="right">
                    <Button type="error" @click="deletePaper">批量删除</Button>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                <Page class="margin-top-10" :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup
                      show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
    </Row>
</template>

<script>
    import paperService from '@/service/paperService';
    import DepartmentSelector from "../../sys/plugins/department-selector";
    import {tableConfigMixin} from "@/libs/config";
    import includeEdit from './include-edit.vue';
    export default {
        name: "thesis-include",
        components: {
            DepartmentSelector,
        },
        mixins: [tableConfigMixin],
        data() {
            let obj = {
                show: true,
                depId: -1,
                keywords: "",
                tableLoading: true,
                tableData: [],
                state:'',
                params:{
                    current:1
                },
                columns: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center",
                    },
                    {
                        title: "全选",
                        key: "id",
                    },
                    {
                        title: "学号",
                        key: "stuNo",
                    },
                    {
                        title: "作者",
                        key: "stuName",
                    },
                    {
                        title: "论文题目名称",
                        key: "papTitleChina",
                    },
                    {
                        title: "状态",
                        key: "state",
                        render: (h, params) => {
                            var txt = '';
                            if (params.row.state == 0) {
                                txt = '未提交';
                            } else if (params.row.state == 1) {
                                txt = '已提交';
                            } else if (params.row.state == 2) {
                                txt = '审核不通过';
                            } else if (params.row.state == 3) {
                                txt = '审核通过';
                            } else if (params.row.state == 4) {
                                txt = '编目完成';
                            } else if (params.row.state == 5) {
                                txt = '发布';
                            } else {
                                txt = "已删除";
                            }
                            return h("span", {}, txt);
                        }
                    },
                    {
                        title: "院系提交时间",
                        key: "createTime",
                    },
                    {
                        title: "操作",
                        key: "action",
                        align: "center",
                        width: 200,
                        render: (h, params) => {
                            let editBtn = h('Button', {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                        this.unPublishing(params.row);
                                    }
                                }
                            },"取消发布");
                            let delBtn = h( "Button",{
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginLeft: '4px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row);
                                    }
                                }
                            }, "删除");
                            let btns = [];
                            if (params.row.state == 5) {
                                btns.push(editBtn);
                            }
                            btns.push(delBtn);
                            return h("div", btns);
                        }
                    }
                ]
            };
            return obj;
        },
        methods: {
            unPublishing(obj){
                let vm = this;
                this.$Modal.confirm({
                    title: "警告",
                    content: "确认取消发布吗？",
                    onOk: () => {
                        paperService.unPublishById(obj.id).then(res => {
                            if (res.status === 200) {
                                vm.$Notice.success({ title: "取消发布成功" });
                                vm.state = '发布完成'
                                vm.getIncludeList();
                            } else {
                                vm.$Notice.error({ title: res.msg });
                            }
                        });
                    }
                });
            },
            remove(obj){
                let vm = this;
                this.$Modal.confirm({
                    title: "警告",
                    content: "确认删除吗？",
                    onOk: () => {
                        paperService.delPapersById(obj.id).then(res => {
                            if (res.status === 200) {
                                vm.$Notice.success({ title: "删除成功" });
                                vm.pageChange(1);
                                // vm.getProcessingList();
                            } else {
                                vm.$Notice.error({ title: res.msg });
                            }
                        });
                    }
                });
            },
            deletePaper(status){
                let vm = this;
                this.$Modal.confirm({
                    title: "警告",
                    content: "确认删除吗？",
                    onOk: () => {
                        let param = vm.tableSelectItems.map((it) => { return it.id; });
                        param = param.join(',');
                        paperService.delPapersById(param).then(res => {
                            if (res.status === 200) {
                                vm.$Notice.success({ title: "删除成功" });
                                vm.getIncludeList();
                            } else {
                                vm.$Notice.error({ title: res.msg });
                            }
                        });
                    }
                });
            },
            handleDepSelected(d) {
                this.depId = d*1;
            },
            refresh(){
                this.pageChange(1);
                // this.params.page = 1;
                // this.getIncludeList();
                // window.location.reload();
            },
            search(){
                this.params.current = 1;
                this.params.page = 1;
                this.getIncludeList();
            },
            pageChange(page) {
                this.params.current = page;
                this.params.page = page;
                this.getIncludeList();
            },
            pageSizeChange(size) {
                this.params.limit = size;
                this.getIncludeList();
            },
            getIncludeList() {
                let vm = this;
                let params = this.params;
                params.depId = vm.depId;
                params.keywords = this.keywords;
                vm.tableLoading = true;
                paperService.finishCatalogueingList(params).then(res => {
                    if (res.status == 200) {
                        vm.tableLoading = false;
                        vm.totalCount = res.data.totalCount*1;
                        vm.searchTableData = res.data.list;
                        vm.tableData = res.data.list;
                        vm.tableLoading = false;
                    } else {
                        vm.$Notice.error({ title: res.msg });
                    }
                });
            },
        },
        created() {
            this.$nextTick(function () {
                this.getIncludeList();
            });
        }
    }
</script>

<style scoped>

</style>
