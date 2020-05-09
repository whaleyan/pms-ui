<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                IP管理
            </h4>
            <Row>
                <Col span="2" >
                    <ip-create v-on:onSuccess="ipAdded"></ip-create>
                </Col>
                <Col span="1" >
                    <Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>
                </Col>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                    <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                    <Page class="margin-top-10" :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
    </Row>
</template>

<script>
import ipService from '@/service/ipService';
import { tableConfigMixin } from "@/libs/config";
import ipCreate from './ip-create.vue';
import ipEdit from './ip-edit.vue';
export default {
    name: "ip-management",
    components: {ipCreate, ipEdit },
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            tableLoading: true,
            tableData: [],
            searchTableData:[],
            id:'',
            params:{
                current:1
            },
            columns: [
                {
                    title: "序号",
                    key: "id",
                },
                {
                    title: "对应区域",
                    key: "area",
                },
                {
                    title: "起始IP",
                    key: "startIp",
                },
                {
                    title: "结束IP",
                    key: "endIp",
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width:240,
                    render: (h, params) => {
                        let editBtn = h(ipEdit, {
                            props: {
                                user: params.row
                            },
                            on: {
                                onSuccess: () => {
                                    this.getIpList();
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
                        btns.push(editBtn);
                        btns.push(delBtn);
                        return h("div", btns);
                    }
                }
            ],
        };
        return obj;
    },
    methods:{
        refresh(){
            this.pageChange(1);
            // this.params.page = 1;
            this.getIpList();
            // window.location.reload();
        },
        remove(obj) {
            let vm = this;
            this.$Modal.confirm({
                title: '警告',
                content: "确认删除吗？",
                onOk: () => {
                    ipService.delControlipsById(obj.id).then(res => {
                        if (res.status === 200) {
                            vm.$Notice.success({title: '删除成功'});
                            vm.pageChange(1);
                            // vm.getIpList();
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
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData = this.searchTableData.slice(_start,_end);
            // this.getIpList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData = this.searchTableData.slice(_start,_end);
            // this.getIpList();
        },
        ipAdded(){
            this.pageChange(1);
        },
        getIpList() {
            let vm = this;
            let params = this.params;
            vm.tableLoading = true;
            ipService.getIpList(params).then( res => {
                if(res.status == 200) {
                    vm.tableLoading = false;
                    // vm.tableData =res.data.list;
                    vm.searchTableData = res.data.list.reverse();
                    vm.tableData = vm.searchTableData.slice(0,vm.params.limit)
                    vm.totalCount = res.data.total*1;
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        },
    },
    created() {
        this.$nextTick(function () {
            this.getIpList();
        });
    }
}
</script>

<style scoped>

</style>
