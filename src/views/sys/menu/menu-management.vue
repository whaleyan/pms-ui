<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div>
        
            <Row :gutter="16">
                <Col span="8">
                    <Card :bordered="false">
                        <p slot="title">系统菜单</p>
                        <Tree :data="data1" @on-select-change="getSelectedNodes"></Tree>
                    </Card>
                </Col>
                <Col span="16">
                    <Card :bordered="false">
                        <p slot="title">菜单配置</p>
                        <Form :model="formRight" label-position="right" :label-width="100">
                            <FormItem label="路径编码">
                                <Input v-model="formRight.code" :disabled="isDisabled"></Input>
                            </FormItem>
                            <FormItem label="标题">
                                <Input v-model="formRight.title" :disabled="isDisabled"></Input>
                            </FormItem>
                            <FormItem label="父级节点">
                                <Input v-model="formRight.parentId" :disabled="isDisabled"></Input>
                            </FormItem>
                            <FormItem label="图标">
                                <Input v-model="formRight.icon" :disabled="isDisabled"></Input>
                            </FormItem>
                            <FormItem label="资源路径">
                                <Input v-model="formRight.path" :disabled="isDisabled"></Input>
                            </FormItem>
                            <!-- <FormItem label="类型">
                                <Input v-model="formRight.input3"></Input>
                            </FormItem> -->
                            <FormItem label="排序">
                                <Input v-model="formRight.id" :disabled="isDisabled"></Input>
                            </FormItem>
                            <!-- <FormItem label="描述">
                                <Input v-model="formRight.input3"></Input>
                            </FormItem> -->
                            <FormItem label="前端组件">
                                <Input v-model="formRight.component" :disabled="isDisabled"></Input>
                            </FormItem>
                        </Form>
                    </Card>
                </Col>
                
            </Row>
        

    </div>

    
</template>

<script>
import MenuService from '@/service/menuService';
import Menu from '@/entity/menu';
export default {
    name: "menu-management",
    data() {
        return {
            data1: [],
            isDisabled: true,
            formRight: new Menu()
        }
    },
    methods: {
        getSelectedNodes(data) {
            console.log(data);
            this.formRight = data[0];
        }
    },
    created() {
        let vm = this;
        this.$nextTick(function() {
            MenuService.getMenuTree().then(res => {
                // console.log(res);
                res.forEach((element, index) => {
                    element.expand = true;
                    if(element.children && element.children.length > 0) {
                        element.children.forEach((ele, idx) => {
                            ele.expand = true;
                        });
                    }
                });
                vm.data1 = res;
            });
        });
    }
};
</script>


