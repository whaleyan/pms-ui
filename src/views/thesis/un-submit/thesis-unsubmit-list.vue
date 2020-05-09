<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                未提交论文的学生列表
            </h4>
            <Row :gutter="10">
                <Col span="4">
                <Input v-model="depId" style="display: none"></Input>
                    <department-selector :show="show" @onDepSelector="handleDepSelected" ></department-selector>
                </Col>
                <Col span="4">
                    <Input icon="search" v-model="keywords" placeholder="输入关键词(作者、学号)..." ></Input>
                </Col>
                <Col span="2" >
                    <Button type="primary" @click="search">搜索</Button>
                </Col>
                <Col span="2" >
                    <Button type="primary" shape="circle" icon="refresh"  @click="refresh"></Button>
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

    export default {
        name: "thesis-unsubmit-list",
        components: {
            DepartmentSelector
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
                        title: "学号",
                        key: "stuNo",
                    },
                    {
                        title: "作者",
                        key: "stuName",
                    },
                    {
                        title: "院系",
                        key: "stuDepartment",
                    },
                    {
                        title: "学生类型",
                        key: "stuType",
                    },
                    {
                        title: "专业",
                        key: "stuProfessionals",
                    }
                ]
            };
            return obj;
        },
        methods: {
            handleDepSelected(d) {
                this.depId = d*1;
            },
            refresh(){
                this.pageChange(1);
                // this.params.page = 1;
                // this.getNoPublishList();
                // window.location.reload();
            },
            search(){
                this.parmas.current = 1;
                this.params.page = 1;
                this.getNoPublishList();
            },
            pageChange(page) {
                this.params.current = page;
                this.params.page = page;
                this.getNoPublishList();
            },
            pageSizeChange(size) {
                this.params.limit = size;
                this.getNoPublishList();
            },
            selectChange(selected){
                this.tableSelectItems = selected;
            },
            getNoPublishList() {
                let vm = this;
                let params = this.params;
                params.depId = vm.depId;
                params.keywords = this.keywords;

                vm.tableLoading = true;
                paperService.noPublishList(params).then(res => {
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
                this.getNoPublishList();
            });
        }

    }
</script>

<style scoped>

</style>
