<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        <Table :columns="columns2" :show-header="showHeader" :data="row.children"></Table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showHeader: false,
            columns2: [
                {width: 50},
                {
                    title: "ID",
                    key: "id",
                    width: 80
                },
                {
                    title: "账户",
                    key: "username",
                    width: 140
                },
                {
                    title: "姓名",
                    key: "name",
                    width: 140
                },
                {
                    title: "性别",
                    key: "sex",
                    width: 100
                },
                {
                    title: "备注",
                    key: "description"
                },
                {
                    title: "联系方式",
                    key: "mobilePhone"
                },
                {
                    title: "操作",
                    key: "action",
                    width: 200,
                    align: "right",
                    render: (h, params) => {
                        console.log(params.row);
                        return h("div", [
                            h(
                                "Button",
                                {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.eidtInfo(params.index);
                                    }
                                }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                on: {
                                    click: () => {
                                    this.remove(params.index);
                                    }
                                }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ]
        }
    },
    props: {
        row: Object
    }
}
</script>

