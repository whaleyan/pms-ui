import Mock from 'mockjs';
import Url from '../../build/url';

let prefix = '';

// Mock响应模板

console.log("MOCK 拦截： ",Url+prefix+'sys/student/page?limit=10&page=1');
Mock.mock(Url+prefix+'sys/student/page?limit=10&page=1', 'get', (req, res) => {
    return {
        status: 200,
        data: {
            totalCount: 1,
            list: [{
                stu_no:1,
                stu_name:"张三",
                dep_id:22,
                pro_id:33,
                type:"博士",
                mobile: "18726374924",
                email: "423ad@qq.com",
                birthday: "19870721",
                sex: "男",
                login_times: "2018年5月13日 22:13:20",
                create_times: "2018年5月13日 22:13:20"
            }]
        }
    }

});
Mock.mock(Url+prefix+'sys/ip/page?limit=10&page=1', 'get', (req, res) => {
    return {
        status: 200,
        data: {
            totalCount: 1,
            list: [
                {
                    index:1,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:2,
                    area:'校外',
                    star_ip:'192.168.0.0',
                    end_ip:'192.168.255.255',
                },
                {
                    index:3,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:4,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:5,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:6,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:7,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:8,
                    area:'校外',
                    star_ip:'192.168.0.0',
                    end_ip:'192.168.255.255',
                },
                {
                    index:9,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:10,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:11,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
                {
                    index:12,
                    area:'校内',
                    star_ip:'192.168.1.1',
                    end_ip:'192.168.2.2',
                },
            ]
        }
    }

});
Mock.mock(Url+prefix+'/common/getDepartments/page?limit=10&page=1', 'get', (req, res) => {
    return {
        status: 200,
        data: {
            totalCount: 1,
            list: [
                {
                    "id": 1,
                    "depName": "材料科学与工程学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 2,
                    "depName": "地球科学学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 3,
                    "depName": "地球探测科学与技术学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 4,
                    "depName": "电子科学与工程学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 5,
                    "depName": "动物科学学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 6,
                    "depName": "动物医学学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 7,
                    "depName": "法学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 8,
                    "depName": "公共外交学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 9,
                    "depName": "公共卫生学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 10,
                    "depName": "管理学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 11,
                    "depName": "行政学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 12,
                    "depName": "护理学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 13,
                    "depName": "化学学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 14,
                    "depName": "环境与资源学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 15,
                    "depName": "机械科学与工程学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 16,
                    "depName": "计算机科学与技术学院",
                    "createTime": "2018-05-14 14:59:31.0"
                },
                {
                    "id": 17,
                    "depName": "建设工程学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 18,
                    "depName": "交通学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 19,
                    "depName": "经济学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 20,
                    "depName": "口腔医学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 21,
                    "depName": "临床医学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 22,
                    "depName": "汽车工程学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 23,
                    "depName": "软件学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 24,
                    "depName": "商学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 25,
                    "depName": "生命科学学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 26,
                    "depName": "生物与农业工程学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 27,
                    "depName": "食品科学与工程学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 28,
                    "depName": "数学学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 29,
                    "depName": "体育学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 30,
                    "depName": "通信工程学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 31,
                    "depName": "外国语学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 32,
                    "depName": "文学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 33,
                    "depName": "物理学院",
                    "createTime": "2018-05-14 14:59:32.0"
                },
                {
                    "id": 34,
                    "depName": "新闻与传播学院",
                    "createTime": "2018-05-14 14:59:33.0"
                },
                {
                    "id": 35,
                    "depName": "药学院",
                    "createTime": "2018-05-14 14:59:33.0"
                },
                {
                    "id": 36,
                    "depName": "仪器科学与电气工程学院",
                    "createTime": "2018-05-14 14:59:33.0"
                },
                {
                    "id": 37,
                    "depName": "哲学社会学院",
                    "createTime": "2018-05-14 14:59:33.0"
                },
                {
                    "id": 38,
                    "depName": "植物科学学院",
                    "createTime": "2018-05-14 14:59:33.0"
                }
            ]
        }
    }

});