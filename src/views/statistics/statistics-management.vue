<template>
    <Row :gutter="16" >
        <Col span="24" >
            <card >
                <h4 slot="title">
                    <Icon type="ios-film-outline"></Icon>统计网站访问
                </h4>
                <div class="data-source-row"  >
                    <data-source-pie></data-source-pie>
                </div>
            </card>
        </Col>
        <Col  span="12" style="margin-top:20px ">
            <card >
                <h4 slot="title">
                    <Icon type="ios-film-outline"></Icon> 工作统计

                </h4>
                <div class="data-source-row" style="min-height: 450px">
                    <Row style="padding-bottom: 10px">
                        <DatePicker v-model="star" type="date" placeholder="起始日期"></DatePicker>
                        <DatePicker v-model="end" type="date" placeholder="结束日期" ></DatePicker>
                        <Button type="primary" @click="search">搜索</Button>
                        <!--<Button type="primary" shape="circle" icon="refresh" @click="refresh"></Button>-->
                    </Row>
                    <!--<visite-volume></visite-volume>-->
                    <Table :columns="columns" :data="tableData" height="400"  :loading="tableLoading"></Table>

                    <Page class="margin-top-10" :current="params.current"  :total="totalCount" :page-size="params.limit" :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
                </div>
            </card>
        </Col>
        <Col span="12" style="margin-top:20px ">
            <card >
                <h4 slot="title">
                    <Icon type="ios-film-outline"></Icon>论文统计

                </h4>
                <div class="data-source-row" style="min-height: 450px">
                    <Row style="padding-bottom: 10px">
                        <DatePicker v-model="star2" type="date" placeholder="起始日期" ></DatePicker>
                        <DatePicker v-model="end2" type="date" placeholder="结束日期" ></DatePicker>
                        <Button type="primary" @click="search2">搜索</Button>
                        <!--<Button type="primary" shape="circle" icon="refresh" @click="refresh2"></Button>-->
                    </Row>
                    <Table :columns="columns2" :data="tableData2" height="400"  :loading="tableLoading2"></Table>
                    <Page class="margin-top-10" :current="params.current2"  :total="totalP"  :page-size-opts=pageGroup show-total show-sizer @on-change="pageChange2" @on-page-size-change="pageSizeChange2"></Page>
                </div>
            </card>
        </Col>


    </Row>
</template>

<script>
import statisticsService from "@/service/statisticsService";
import { tableConfigMixin } from "@/libs/config";
import dataSourcePie from './chart/data-source-pie.vue';
import barTotal from './chart/bar-total.vue';
export default {
    components: {
        dataSourcePie,
        barTotal,
    },
    name: "statistics-management",
    mixins: [tableConfigMixin],
    data() {
        let obj = {
            show: true,
            star:'',
            end:'',
            star2:'',
            end2:'',
            params:{
                current:1,
                current2:1
            },
            totalCount:1,
            totalP:1,
            tableLoading: true,
            tableLoading2: true,
            tableData: [],
            tableData2:[],
            searchTableData:[],
            searchTableData2:[],
            columns: [
                {
                    title: "ID",
                    key: "id",
                },
                {
                    title: "工作人员",
                    key: "name",
                },
                {
                    title: "篇数",
                    key: "count",
                },
            ],
            columns2: [
                {
                    title: "ID",
                    key: "id",
                },
                {
                    title: "学院",
                    key: "name",
                },
                {
                    title: "篇数",
                    key: "count",
                },
            ],
        };
        return obj;
    },
    methods:{
        refresh(){
            this.pageChange(1);
            /*this.params.page = 1;
            this.getUsernametlist();*/
            // window.location.reload();
        },
        search(){
            // this.params.current =1;
            // this.params.page = 1;
            // this.getUsernametlist();
            this.params.current =1;
            this.params.page = 1;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData = this.searchTableData.slice(_start,_end);
        },
        pageChange(page) {
            this.params.curren =page
            this.params.page = page;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData = this.searchTableData.slice(_start,_end);
            // this.getUsernametlist();

        },
        pageSizeChange(size) {
            this.params.limit = size;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData = this.searchTableData.slice(_start,_end);
            // this.getUsernametlist();
        },
        refresh2(){
            this.pageChange2(1);
            // this.params.current = 1;
            // this.params.page = 1;
            // this.getPapersViewers();
            // window.location.reload();
        },
        search2(){
            this.params.current2 =1;
            this.params.page = 1;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData2 = this.searchTableData2.slice(_start,_end);
            // this.getPapersViewers();
        },
        pageChange2(page) {
            this.params.current2 = page;
            this.params.page = page;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData2 = this.searchTableData2.slice(_start,_end);
            // this.getPapersViewers();
        },
        pageSizeChange2(size) {
            this.params.limit = size;
            let _start = (page-1)*this.params.limit;
            let _end = page*this.params.limit;
            this.tableData2 = this.searchTableData2.slice(_start,_end);
            // this.getPapersViewers();
        },
        getUsernametlist(){
            function date2String(d) {
                if (typeof(d) === "string") return d;
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let datt = d.getDate();
                return year + "-" +
                    (month < 10 ? "0" + month : "" + month) + "-" +
                    (datt < 10 ? "0" + datt : "" + datt);
            }
            let vm = this;
            let params = this.params;
            params.start = date2String(this.star);
            params.end = date2String(this.end);
            vm.tableLoading = true;
            statisticsService.countPapersProcess(params).then(res => {
                if (res.status == 200) {
                    vm.tableLoading = false;
                    vm.searchTableData = res.data;
                    vm.tableData = vm.searchTableData.slice(0,vm.params.limit);
                    vm.totalCount = res.data.length;
                } else {
                    vm.$Notice.error({ title: res.msg });
                }
            });
        },
        getPapersViewers(){
            function date2String(d) {
                if (typeof(d) === "string") return d;
                let year = d.getFullYear();
                let month = d.getMonth() + 1;
                let datt = d.getDate();
                return year + "-" +
                    (month < 10 ? "0" + month : "" + month) + "-" +
                    (datt < 10 ? "0" + datt : "" + datt);
            }
            let vm = this;
            let params = this.params;
            params.start = date2String(this.star2);
            params.end = date2String(this.end2);
            vm.tableLoading2 = true;
            statisticsService.countPapersByDep(params).then(res => {
                if (res.status == 200) {
                    vm.tableLoading2 = false;
                    // vm.tableData2 = res.data;
                    vm.searchTableData2 = res.data;
                    vm.tableData2 = vm.searchTableData2.slice(0,vm.params.limit);
                    vm.totalP = res.data.length;
                } else {
                    vm.$Notice.error({ title: res.msg });
                }
            });
        }
    },
    computed: {
        // toTal: function () {
        //     return this.tableData.length
        // },
    },
    created() {
        this.$nextTick(function () {
            function endTime() {
                var nowDate = new Date();
                var seperator1 = "-";
                var year = nowDate.getFullYear();
                var month = nowDate.getMonth() + 1;
                var strDate = nowDate.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            }
            function starTime(data) {
                var arr = endTime().split('-');
                var year = arr[0]; //获取当前日期的年份
                var month = arr[1]; //获取当前日期的月份
                var day = arr[2]; //获取当前日期的日
                var days = new Date(year, month, 0);
                days = days.getDate(); //获取当前日期中月的天数
                var year2 = year;
                var month2 = parseInt(month) - 1;
                if (month2 == 0) {
                    year2 = parseInt(year2) - 1;
                    month2 = 12;
                }
                var day2 = day;
                var days2 = new Date(year2, month2, 0);
                days2 = days2.getDate();
                if (day2 > days2) {
                    day2 = days2;
                }
                if (month2 < 10) {
                    month2 = '0' + month2;
                }
                var preMonth = year2 + '-' + month2 + '-' + day2;
                return preMonth;
            }
            this.end = endTime();
            this.star = starTime();
            this.end2 = endTime();
            this.star2 = starTime();
            this.getUsernametlist();
            this.getPapersViewers();
        });
    }
}
</script>

<style scoped>

</style>
