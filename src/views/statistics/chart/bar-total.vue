<template>
    <div style="width:100%;height:100%;min-height: 200px" id="bar-total"></div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        name: 'bar-total',
        data () {
            return {
                //
            };
        },
        mounted () {
            this.$nextTick(() => {
                let visiteVolume = echarts.init(document.getElementById('bar-total'));
                let xAxisData = [];
                let data1 = [];
                let data2 = [];
                for (let i = 0; i < 20; i++) {
                    xAxisData.push('类目' + i);
                    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }

                const option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        top: '2%',
                        left: '2%',
                        right: '4%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        nameRotate:[30],
                        data: ['/01/01', '/02/01', '/03/01', '/04/01', '/05/01', '/06/01', '/07/01'],
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'value',
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    },
                    series: [
                        {
                            name: '访问量',
                            type: 'bar',
                            data: [
                                {value: 453682, name: 'Mon', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: 879545, name: 'Tues', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: 543250, name: 'Fri', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: 1598403, name: 'Thur', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: 2354678, name: 'Wed', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: 453682, name: 'Sat', itemStyle: {normal: {color: '#2d8cf0'}}},
                                {value: 543250, name: 'Sun', itemStyle: {normal: {color: '#2d8cf0'}}}
                            ]
                        }
                    ]
                };

                visiteVolume.setOption(option);

                window.addEventListener('resize', function () {
                    visiteVolume.resize();
                });
            });
        }
    };
</script>
