<style>
@import '../../../styles/common.less';
</style>

<template>
    <div>
        <Row :gutter="16">
            <Col span="8">
                <Card style="height: 800px; overflow: scroll;">
                    <h4 slot="title">
                        <Icon type="person"></Icon>
                        角色管理
                    </h4>

                    <Row>
                        <create-role :parentNode="rootNode" @on-custom-create="onCreate"></create-role>
                        <delete-role :currentNode="currentNode" @on-custom-delete="onDelete"></delete-role>
                        <!--<Tree :data="treeData"  @on-select-change="onSelectChange"></Tree>-->
                        <Tree :data="treeData" :load-data="loadData" @on-select-change="onSelectChange"></Tree>
                    </Row>
                </Card>
            </Col>
            <Col span="16">
                <Card style="height: 800px; overflow: scroll;">
                    <h4 slot="title">
                        <Icon type="person"></Icon>
                        编辑信息
                    </h4>
                    <Row :gutter="24">
                        <Col span="8">
                            <Form ref="newForm" :model="item" :label-width="80" :rules="rules">
                                <FormItem prop="roleName" label="角色名称">
                                    <Input type="text" v-model="item.roleName"></Input>
                                </FormItem>
                                <FormItem prop="description" label="描述">
                                    <Input type="text" v-model="item.remark"></Input>
                                </FormItem>
                                <FormItem>
                                    <!--<has-permisstion permission="sys:role:update:self">-->
                                        <Button type="primary" @click="onUpdate">更新信息</Button>
                                    <!--</has-permisstion>-->
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="16" style="height:780px; border-left:1px solid #ccc;">
                            <authorities :role="currentNode"></authorities>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>

    </div>
</template>

<script>
import MenuService from '@/service/menuService';
import RoleService from '@/service/roleService';
import createRole from './create.vue';
import deleteRole from './delete.vue';
import Role from '@/entity/role';
import Cookies from 'js-cookie';
import Authorities from "./authorities";
import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
export default {
    name: "role-management",
    components: {
        Authorities,
        createRole, deleteRole, HasPermisstion },
    data() {
        return {
            rootNode : {
                roleId : '1',
                parentId : '-1',
                roleName : '系统管理员',
                rolePath : '1'
            },
            currentNode: {},
            item: new Role(""),
            treeData : [],
            selectedRole: {},
            rules: {
                roleName: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
            },
        }
    },
    methods: {
        getRoleTree(pid){
            return new Promise((resolve, reject) => {
                RoleService.getRoles({parentId: pid}).then(res => {
                    if (res.status === 200) {
                        let tree = res.data.list;
                        tree.forEach(element => {
                            element.title = element.roleName;
//没有多级时可注掉
//                            if(element.type === 0) {
//                                element.loading = false;
//                            }
                            element.children = [];
                        });
                        resolve(tree);
                    }else{
                        reject(res);
                    }
                });
            });
        },
        loadData (item, callback) {
            let pid = item.roleId;
            this.getRoleTree(pid).then(data => {
                callback(data);
            });
        },
        onSelectChange(nodes) {
            if(nodes.length > 0) {
                let item = this.currentNode = nodes[0];
                this.selectedRole = item;
                this.item.roleName = item.roleName;
                this.item.roleId = item.roleId;
                this.item.parentId = item.parentId;
                this.item.remark = item.remark;
            }
        },
        onCreate(parentNode, node) {
            this.refreshTree();
        },
        refreshTree(node) {
            this.getRoleTree(this.rootNode.roleId).then(data => {
                this.treeData = data.filter((it) => {
                    return it.roleId != '1';
                });
            });
        },
        onDelete(node) {
            this.refreshTree(node);
        },
        onUpdate() {
            RoleService.updateRole(this.item).then(res => {
                if(res.status === 200) {
                    this.$Notice.success({title:'操作成功'});
                    this.refreshTree(this.currentNode);
                } else {
                    this.$Notice.error({title:res.msg});
                }
            });
        }
    },
    created(){

        this.refreshTree();
        
    }
};
</script>


