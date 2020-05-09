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
                <Col span="1" >
                    <Button type="primary" shape="circle" icon="refresh"  @click="refresh"></Button>
                </Col>
                <Col span="2">
                    <Button type="primary" @click="releaseBatch">批量发布</Button>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                <Table :columns="columns" :data="tableData" :loading="tableLoading" @on-selection-change="tableItemSelectChange">></Table>

                <Page class="margin-top-10" :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup
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
    name: "recruit-done",
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
            params:{
                current:1
            },
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
                    title: "保密级别",
                    key: "securtLevel",
                },

                {
                    title: "Calisd-OID",
                    key: "calisoid",
                },

                {
                    title: "论文开放日期",
                    key: "openUpDate",
                    render: (h, params) => {
                        function dateToString(d) {
                            let year = d.getFullYear();
                            let month = d.getMonth() + 1;
                            let datt = d.getDate();
                            return year + "-" +
                                (month < 10 ? "0" + month : "" + month) + "-" +
                                (datt < 10 ? "0" + datt : "" + datt);
                        }
                        let dd = new Date(params.row.openUpDate);
                        return h("span", {}, dateToString(dd));
                    }
                },
                {
                    title: "发布",
                    key: "publish",
                    width: 100,
                    fixed: "right",
                    render: (h, params) => {
                        return h("i-Switch", {
                            props: {
                                value: params.row.state == 5 ? 1:0,
                                trueValue: 1,
                                falseValue: 0
                            },
                            on: {
                                'on-change': (v) => {
                                    this.publishOnChange(params.row.id, v);
                                }
                            }
                        });
                    }
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
        releaseBatch(status){
            let vm = this;
            if (vm.tableSelectItems.length != 0){
                this.$Modal.confirm({
                    title: "警告",
                    content: "确认发布",
                    onOk: () => {
                        let params = vm.tableSelectItems.map((it) => { return it.id; });
                        params = params.join(',');
                        console.log(params);
                        paperService.publishById(params).then(res => {
                            if (res.status === 200) {
                                vm.$Notice.success({ title: "发布成功" });
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
        refresh(){
            this.pageChange(1);
            // this.params.page = 1;
            // // this.getPaperList();
            // window.location.reload();
        },
        pageChange(page) {
            this.params.current = page;
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
            this.params.current = 1;
            this.params.page = 1;
            this.getDoneList();
        },
        getDoneList() {
            let vm = this;
            vm.params.depId = vm.depId;
            vm.params.keywords = vm.keywords;
            vm.tableLoading = true;
            paperService.finishCatalogueingList(vm.params).then( res => {
                if(res.status == 200) {
                    vm.tableLoading = false;
                    vm.totalCount = res.data.totalCount*1;
                    vm.tableData = res.data.list;
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
        publishOnChange(id,v){
            let vm = this;
            if(v == 1){
                console.log(id)
                paperService.publishById(id).then( res => {

                    if(res.status == 200) {
                        vm.getDoneList();
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            }else{
                paperService.unPublishById(id).then( res => {
                    if(res.status == 200) {
                        vm.getDoneList();
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            }

        }
    },
    created() {
        this.$nextTick(function () {
            this.getDoneList();
        });
    }
}
</script>

<style scoped>

</style>
