<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <card >
            <h4 slot="title">
                <Icon type="ios-film-outline"></Icon>用户操作日志
            </h4>
            <Row :gutter="10">
                <Col span="4" style="margin-bottom: 10px">
                    <Input icon="search" v-model="key" placeholder="输入用户名..." ></Input>
                </Col>
                <Col span="2"  style="margin-bottom: 10px;">
                    <Button type="primary" @click="search">搜索</Button>
                </Col>
                <Col span="1" >
                    <Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>
                </Col>
                <Col span="24" >
                <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>
                <Page class="margin-top-10" :current="params.current"  :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </card>
    </Row>
</template>

<script>
    import sysSettingService from "../../../service/sysSettingService";
    import { tableConfigMixin } from '@/libs/config';
    export default {
        name: "opt-list",
        mixins: [tableConfigMixin],
        data() {
            let obj = {
                show: true,
                key:'',
                tableLoading: true,
                tableData: [],
                params:{
                    current:1
                },
                columns: [
                    {
                        title: "ID",
                        key: "id",
                    },
                    {
                        title: "用户名",
                        key: "username",
                    },
                    {
                        title: "操作内容",
                        key:'operation'
                    },
                    {
                        title: "次数",
                        key:'time'
                    },
                    // {
                    //     title: "请求参数",
                    //     key:'params',
                    //     ellipsis:true
                    // },
                    {
                        title: "IP",
                        key:'ip'
                    },
                    {
                        title: "修改时间",
                        key:'createDate',
                        render: (h, params) => {
                            function dateToString(d) {
                                let year = d.getFullYear();
                                let month = d.getMonth() + 1;
                                let datt = d.getDate();
                                let hh = d.getHours();
                                let mm = d.getMinutes();
                                let ss = d.getSeconds();
                                return year + "-" +
                                    (month < 10 ? "0" + month : "" + month) + "-" +
                                    (datt < 10 ? "0" + datt : "" + datt)+ " " +
                                    (hh < 10 ? '0'+hh:''+hh)+ ":"+(mm < 10 ? '0'+mm:''+mm)+":"+
                                    (ss < 10 ? '0'+ss :''+ss);
                            }
                            let dd = new Date(params.row.createDate);
                            return h("span", {}, dateToString(dd));
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
                // this.getUserOptlist();
                // window.location.reload();
            },
            search(){
                this.params.current =1 ;
                this.params.page = 1;
                this.getUserOptlist();
            },
            pageChange(page) {
                this.params.current =page;
                this.params.page = page;
                this.getUserOptlist();
            },
            pageSizeChange(size) {
                this.params.limit = size;
                this.getUserOptlist();
            },
            getUserOptlist(){
                let vm = this,params = this.params;
                params.keyword = vm.key;
                vm.tableLoading = true;
                sysSettingService.sysLoglist(params).then(res => {
                    if (res.status == 200) {
                        vm.tableLoading = false;
                        vm.totalCount = res.page.totalCount*1;
                        vm.tableData = res.page.list;
                    } else {
                        vm.$Notice.error({ title: res.msg });
                    }
                });
            },
        },

        created() {
            this.$nextTick(function () {
                this.getUserOptlist();
            });
        }
    }
</script>

<style scoped>

</style>
