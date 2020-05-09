<style lang="less">
    @import '../../../styles/common.less';
</style>
<template>
    <Row>
        <card >
            <h4 slot="title">
                <Icon type="ios-film-outline"></Icon>用户登录次数统计
            </h4>
            <Row :gutter="16">
                <Col span="4" style="margin-bottom: 10px">
                    <Input icon="search" v-model="key" placeholder="输入作者..." ></Input>
                </Col>
                <Col span="2"  style="margin-bottom: 10px">
                    <Button type="primary"  @click="search">搜索</Button>
                </Col>
                <Col span="1" >
                    <Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>
                </Col>
                <Col span="24" >
                    <Table :columns="columns" :data="tableData" :loading="tableLoading"></Table>
                    <Page class="margin-top-10" :current="params.current" :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </Col>
            </Row>
        </card>
    </Row>
</template>

<script>
    import sysSettingService from "../../../service/sysSettingService";
    import { tableConfigMixin } from '@/libs/config';
    export default {
        name: "login-times",
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
                        title: "学号",
                        key: "stu_no",
                    },
                    {
                        title: "姓名",
                        key: "stu_name",
                    },
                    {
                        title: "IP地址",
                        key:'login_ip'
                    },
                    {
                        title: "登录时间",
                        key:'login_time',
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
                            let dd = new Date(params.row.login_time);
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
                // this.getUserLoginTimelist();
                // window.location.reload();
            },
            search(){
                this.params.curren = 1;
                this.params.page = 1;
                this.getUserLoginTimelist();
            },
            pageChange(page) {
                this.params.current = page;
                this.params.page = page;
                this.getUserLoginTimelist();
            },
            pageSizeChange(size) {
                this.params.limit = size;
                this.getUserLoginTimelist();
            },
            search(){
                this.params.page = 1;
                this.getUserLoginTimelist();
            },
            getUserLoginTimelist(){
                let vm = this;
                vm.params.key = vm.key;
                vm.tableLoading = true;
                sysSettingService.studentLoginLog(vm.params).then(res => {
                    if (res.status == 200) {
                        vm.tableLoading = false;
                        vm.totalCount = res.page.totalCount*1
                        vm.tableData = res.page.list;
                    } else {
                        vm.$Notice.error({ title: res.msg });
                    }
                });
            },
        },
        created() {
            this.$nextTick(function () {

                this.getUserLoginTimelist();
            });
        }
    }
</script>

<style scoped>

</style>
