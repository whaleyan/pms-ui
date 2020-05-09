<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                IP管理
            </h4>
            <Row>
                <ip-create v-on:onSuccess="getList"></ip-create>
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                <Page class="margin-top-10" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
    </Row>
</template>

<script>
import { tableConfigMixin } from "@/libs/config";
export default {
    name: "log",
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            tableLoading: true,
            tableData: [],
            columns: [
                {
                    title: "序号",
                    key: "index",
                },
                {
                    title: "对应区域",
                    key: "area",
                },
                {
                    title: "起始IP",
                    key: "star_ip",
                },
                {
                    title: "结束IP",
                    key: "end_ip",
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
        pageChange(page) {
            this.params.page = page;
            this.getList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            this.getList();
        },
        getList() {
            let vm = this;
            let params = this.params;
            vm.tableLoading = true;
        },
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