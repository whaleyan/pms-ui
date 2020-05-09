<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                专业管理
            </h4>
            <Row>
                <major-create type="primary" v-on:onSuccess="majorAdded" icon="plus"></major-create>
                <Input v-model="searchKeyword" icon="search" @on-change="handleSearch" placeholder="请输入专业名称搜索..." style="width: 200px" />
                <Button type="primary" shape="circle" icon="refresh"  @click="refresh"></Button>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                    <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                    <Page class="margin-top-10" :current="params.current"  :total="total" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
    </Row>
</template>

<script>
import departmentService from '@/service/departmentService';
import { tableConfigMixin } from "@/libs/config";
import majorEdit from "./major-edit.vue";
import majorCreate from './major-create'
export default {
    name: "major-management",
    components: { majorCreate,majorEdit },
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            modal1: false,
            tableLoading: true,
            tableData: [],
            searchTableData: [],
            searchKeyword: "",
            srcTableData: [],
            params: {
                current: 1,
                page: 1,
                limit: 10
            },
            columns: [
                {
                    title: "ID",
                    key: "id",
                },
                {
                    title: "专业名称",
                    key: "proName",
                },
                {
                    title: "学院ID",
                    key: "depName",
                },
                {
                    title: "创建时间",
                    key: "createTime",
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width:240,
                    render: (h, params) => {
                        let editBtn = h(majorEdit, {
                            props: {
                                obj: params.row
                            },
                            on: {
                                onSuccess: () => {
                                    this.getList();
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
                                    this.remove(params.index);
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
            // this.params.current = page;
            // this.params.page = page;
            this.pageChange(1);
            this.getList();
            // window.location.reload();
        },
        remove(index) {
            let vm = this;
            this.$Modal.confirm({
                title: '警告',
                content: "确认删除吗？",
                onOk: () => {
                    departmentService.deleteProfessional({ id: vm.tableData[index].id }).then(res => {
                        if (res.status === 200) {
                            vm.$Notice.success({title: '删除成功'});
                            vm.pageChange(1);
                            // vm.getList();
                        } else {
                            vm.$Notice.error({title: res.msg});
                        }
                    });
                }
            });
        },
        pageChange(page) {
            this.params.current =page;
            this.params.page = page;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData = this.searchTableData.slice(_start,_end);
//            this.getList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData = this.searchTableData.slice(_start,_end);
//            this.getList();
        },
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        handleSearch () {
            this.searchTableData = this.search(this.srcTableData, {proName: this.searchKeyword});
            this.pageChange(1);
        },
        majorAdded(){
            this.params.current = 1;
            this.getList();
        },
        getList() {
            let vm = this;
            vm.searchKeyword = "";
            let params = this.params;
            vm.tableLoading = true;
            departmentService.getMajorList(params).then( res => {
                if(res.status == 200) {
                    vm.tableLoading = false;
                    vm.srcTableData = res.data;
                    vm.searchTableData = res.data;
                    vm.tableData = vm.srcTableData.slice(0,vm.params.limit);
                    vm.depId=res.data.depId
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
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
        });
    }
}
</script>

<style scoped>

</style>
