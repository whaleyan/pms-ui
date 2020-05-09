import { appRouter } from '@/router/router';

// 表格分页配置
// let tableConfig = {
//     pageGroup: [5, 10],
//     params: {
//         limit: 10,
//         page: 1
//     },
//     totalCount: 0,
//     tableLoading: false
// };

var tableConfigMixin = {
    data() {
        return {
            pageGroup: [5, 10,20 ,50],
            params: {
                limit: 10,
                page: 1
            },
            totalCount: 0,
            tableLoading: false
        }
    }
}

export { tableConfigMixin };
