<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                处理中的论文
            </h4>
            <Row :gutter="10">
                <Col span="4">
                    <Input v-model="depId" style="display: none"></Input>
                    <department-selector :show="show" @onDepSelector="handleDepSelected" ></department-selector>
                </Col>
                <Col span="4">
                    <Input icon="search" v-model="keywords " placeholder="输入作者..." ></Input>
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
                <Table :columns="columns" :data="tableData" :loading="tableLoading" @on-selection-change="selectChange"></Table>

                <Page class="margin-top-10" :current="params.current" :total="total" :page-size="params.limit" :page-size-opts=pageGroup
                      show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
    </Row>

    </div>

</template>

<script>
    import paperService from '@/service/paperService';
    import DepartmentSelector from "../../sys/plugins/department-selector";
    import {tableConfigMixin} from "@/libs/config";
    import stateEdit from './state-edit.vue'

    export default {
        name: "thesis-management",
        components: {
            DepartmentSelector,
            stateEdit
        },
        mixins: [tableConfigMixin],
        data() {
            let obj = {
                show: true,
                depId: "-1",
                tableSelectItems:[],
                keywords: "",
                total:0,
                tableLoading: true,
                tableData: [],
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
                            let editBtn = h(stateEdit, {
                                props: {
                                    obj: params.row
                                },
                                on: {
                                    onSuccess: () => {
                                        this.getProcessingList();
                                    }
                                }
                            });
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
                            btns.push(editBtn,delBtn);
                            return h("div", btns);
                        }
                    }
                ]
            };
            return obj;
        },
        methods: {
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
            handleDepSelected(d) {
                this.depId = d*1;
            },
            refresh(){
                this.pageChange(1);
                // this.params.page = 1;
                // this.getProcessingList();
                // window.location.reload();
            },
            search(){
                this.params.page = 1;
                this.getProcessingList();
            },
            pageChange(page) {
                this.params.current = page;
                this.params.page = page;
                this.getProcessingList();
            },
            pageSizeChange(size) {
                this.params.limit = size;
                this.getProcessingList();
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
                                vm.pageChange(1);
                                // vm.getProcessingList();
                            } else {
                                vm.$Notice.error({ title: res.msg });
                            }
                        });
                    }
                });
            },
            selectChange(selected){
                this.tableSelectItems = selected;
            },
            getProcessingList() {
                let vm = this;
                let params = this.params;
                params.depId = vm.depId;
                params.keywords = this.keywords;

                vm.tableLoading = true;
                paperService.processingList(params).then(res => {
                    if (res.status == 200) {
                        vm.tableLoading = false;
                        vm.total = res.data.totalCount;
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
                this.getProcessingList();
            });
        }

    }
</script>

<style scoped>

</style>
