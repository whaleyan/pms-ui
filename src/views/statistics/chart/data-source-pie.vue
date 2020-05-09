<template>
    <Row>
        <DatePicker v-model="start" type="date" placeholder="起始日期" ></DatePicker>
        <DatePicker v-model="end" type="date" placeholder="结束日期" ></DatePicker>
        <Button type="primary" @click="search">搜索</Button>
        <!--<Button type="primary" shape="circle" icon="refresh"  @click="refresh"></Button>-->
        <Col span="24">
            <div  style="width:100%;height:100%;min-height: 180px" id="data_source_con" :loading="Loading"></div>
        </COl>
    </Row>
</template>

<script>
    import echarts from 'echarts';
    import { tableConfigMixin } from "@/libs/config";
    import statisticsService from "@/service/statisticsService";
    export default {
        name: 'dataSourcePie',
        mixins: [tableConfigMixin],
        data () {
            let obj= {
                //
                end:'',
                start:'',
                Loading:true,
                pieData:[],
            };
            return obj;
        },
        methods:{
            refresh(){
                this.getPieData();
                // window.location.reload();
            },
            search(){
                this.getPieData();
            },
            getPieData(){
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
                params.start = date2String(vm.start);
                params.end = date2String(vm.end);
                statisticsService.countIPPVUV(params).then(res => {
                    if (res.status == 200) {
                        vm.tableLoading = false;
                        vm.pieData = res.data;
                        this.renderPie();
                    } else {
                        vm.$Notice.error({ title: res.msg });
                    }
                });
            },
            renderPie() {
                var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
                var pieData =this.pieData;
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['PV',  'IP', 'UV']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '66%',
                            center: ['50%', '60%'],
                            data:this.pieData,
                            // data: [
                            //     {value: 2103456, name: 'PV',},
                            //     {value: 798403, name: 'UV',},
                            //     {value: 302340, name: 'IP',}
                            // ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            }

        },
        mounted(){
            this.$nextTick(() => {
                this.getPieData();

            });
        },
        created(){
            //count/countIPPVUV?start=2018-5-24&end=2018-06-07
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
                this.start = starTime();
                this.getPieData()
            })
        }

    };
</script>
