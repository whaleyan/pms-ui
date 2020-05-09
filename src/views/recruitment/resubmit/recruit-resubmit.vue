<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                已编目论文
            </h4>
            <Row :gutter="10">
                <Col span="4">
                <Input v-model="depId" style="display: none"></Input>
                <department-selector :show="show" @onDepSelector="handleDepSelected"></department-selector>
                </Col>
                <Col span="4">
                <Input icon="search" v-model="keywords" placeholder="输入作者..."></Input>
                </Col>
                <Col span="2">
                <Button type="primary" @click="search">搜索</Button>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                <Page class="margin-top-10" :total="total" :page-size="params.limit" :page-size-opts=pageGroup
                      show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
    </Row>
</template>

<script>
    import paperService from '@/service/paperService';
    import { tableConfigMixin } from "@/libs/config";
    import DepartmentSelector from "../../sys/plugins/department-selector";
    export default {
        name: "recruit-resubmit",
        mixins: [tableConfigMixin],
        components: {
            DepartmentSelector,
        },
        data() {
            let obj = {
                show: true,
                tableLoading: true,
                tableData: [],
                keywords:'',
                depId: -1,
                columns: [
                    {
                        title: "ID",
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
                        title: "院系",
                        key: "stuDepartment",
                    },
                    {
                        title: "论文开放日期",
                        key: "openUpDate",
                    },
                    {
                        title: "保密级别",
                        key: "securtLevel",
                    },

                    {
                        title: "Calisd-OID",
                        key: "calisoid",
                    },

                    // {
                    //     title: "操作",
                    //     key: "action",
                    //     align: "center",
                    //     width:120,
                    //     render: (h, params) => {
                    //         let editBtn = h(processingEdit, {
                    //             props: {
                    //                 obj: params.row
                    //             },
                    //             on: {
                    //                 onSuccess: () => {
                    //                     this.getProcessingList();
                    //                 }
                    //             }
                    //         });
                    //
                    //         let btns = [];
                    //         btns.push(editBtn);
                    //         return h("div", btns);
                    //     }
                    // }
                ],
            };
            return obj;
        },
        methods:{
            pageChange(page) {
                this.params.page = page;
                this.getDoneList();
            },
            pageSizeChange(size) {
                this.params.limit = size;
                this.getDoneList();
            },
            handleDepSelected(d) {
                this.depId = d*1;
            },
            search(){
                this.params.page = 1;
                this.getDoneList();
            },
            getDoneList() {
                let vm = this;
                vm.params.depId = vm.depId;
                vm.params.keywords = vm.keywords;
                vm.tableLoading = true;
                paperService.toCatalogueingList(vm.params).then( res => {
                    if(res.status == 200) {
                        vm.tableLoading = false;
                        vm.tableData = res.data.list;
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            }
        },
        computed: {
            total: function () {
                return this.tableData.length
            }
        },
        created() {
            this.$nextTick(function () {
                this.getDoneList();
            });
        }
    }
</script>
