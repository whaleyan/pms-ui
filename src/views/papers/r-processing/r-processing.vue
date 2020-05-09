<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <Card>
            <h4 slot="title">
                <Icon type="person-stalker"></Icon>
                待审核论文
            </h4>
            <Row :gutter="10">
                <Col span="4">
                    <Input v-model="depId" style="display: none"></Input>
                    <department-selector :show="show" @onDepSelector="handleDepSelected" ></department-selector>
                </Col>
                <Col span="4">
                    <Input icon="search" v-model="keywords" placeholder="输入作者..." ></Input>
                </Col>
                <Col span="2" style="width: 80px">
                    <Button type="primary" @click="search">搜索</Button>
                </Col>
                <Col span="1" >
                    <Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>
                </Col>
                <!--<Col span="2">-->
                <!--<span class="height-32px">-->
                <!--<a href="#" slot="extra" @click.prevent="getList">-->
                <!--<Icon type="ios-loop-strong"></Icon>刷新-->
                <!--</a>-->
                <!--</span>-->
                <!--</Col>-->
            </Row>
            <Row class="margin-top-10">
                <Col span="24">
                <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>

                <Page class="margin-top-10"  :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </Card>
    </Row>
</template>

<script>
import paperService from '@/service/paperService';
import { tableConfigMixin } from "@/libs/config";
import DepartmentSelector from "../../sys/plugins/department-selector";
import departmentService from '@/service/departmentService';
export default {
    components: {
        DepartmentSelector
    },
    name: "r-processing",
    mixins: [tableConfigMixin],
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
                    title: "创建时间",
                    key: "createTime",
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width:120,
                    render: (h, params) => {
                        let id = JSON.parse(params.row.id);
                        let Btn = h( "Button",{
                            props: {
                                type: "primary",
                                icon: "eye"
                            },
                            on: {
                                click: () => {
                                    let argu = {
                                        paper_id: id ,
                                    };
                                    this.$router.push({
                                        name: 'paper-review',
                                        params: argu
                                    });
                                }
                            }
                        }, "审核");

                        let btns = [];
                        btns.push(Btn);
                        return h("div", btns);
                    }
                }
            ],
        };
        return obj;
    },
    methods:{
        pageChange(page) {
            this.params.current =page;
            this.params.page = page;
            this.getPaperList();
        },
        pageSizeChange(size) {
            this.params.limit = size;
            this.getPaperList();
        },
        handleDepSelected(d) {
            this.depId = d*1;
        },
        refresh(){
            this.pageChange(1);
            // this.params.page = 1;
            // this.getPaperList();
            // window.location.reload();
        },
        search(){
            this.params.current = 1;
            this.params.page = 1;
            this.getPaperList();
        },
        getPaperList() {
            let vm = this;
            vm.params.keywords = vm.keywords;
            vm.params.depId = vm.depId;
            vm.tableLoading = true;
            paperService.toAuditList(vm.params).then( res => {
                if(res.status == 200) {
                    vm.tableLoading = false;
                    vm.totalCount = res.data.totalCount*1;
                    vm.tableData = res.data.list;
                } else {
                    vm.$Notice.error({title: res.msg});
                }
            });
        }
    },
    created() {
        this.$nextTick(function () {
            this.getPaperList();
        });
    }
}
</script>

<style scoped>

</style>
