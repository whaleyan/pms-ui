<template>
    <span>
        <!--<has-permisstion permission="sys:role:save">-->
            <Button type="primary" @click.prevent="openNew()"><Icon type="plus"></Icon> 新增角色</Button>
        <!--</has-permisstion>-->

        <Modal v-model="isShow" title="新增角色" :mask-closable="false" :loading="loading" @on-ok="createItem" @on-visible-change="visibleChange">
            <p>
                <Form ref="newForm" :model="item" :rules="rules" :label-width="80">
                    <FormItem prop="roleName" label="角色名称">
                        <Input type="text" v-model="item.roleName"></Input>
                    </FormItem>
                    <FormItem label="描述">
                        <Input type="text" v-model="item.remark"></Input>
                    </FormItem>
                </Form>
            </p>
        </Modal>
    </span>
    
</template>
<script>
import Role from '@/entity/role';
import RoleService from '@/service/roleService';
import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
export default {
    name: "modal-create",
    components: {HasPermisstion},
    props: {
        parentNode: Object
    },
    data() {
        return {
            isShow: false,
            item: new Role(this.parentNode.roleId),
            loading: true,
            rules: {
                roleName: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
            }
            
        }
    },
    methods: {
        openNew() {
            this.isShow = !this.isShow;
            console.log("parentId:", this.item.parentId);
        },
        createItem() {
            let vm = this;
            this.$refs.newForm.validate((valid) => {
                if(valid) {
                    RoleService.createRole(this.item).then(res => {
                        vm.loading = false;
                        vm.isShow = false;
                        if(res.status === 200) {
                            vm.$Message.success('新建成功');
                            this.$emit("on-custom-create", this.parentNode, res.data );
                        } else {
                            vm.$Message.error(res.msg);
                        }
                        
                    });
                } else {
                    vm.loading = false;
                }
            });
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true
            });
            this.$set(data, 'children', children);
        },
        visibleChange(flag) {
            if(!flag) {
                this.item = new Role(this.parentNode.roleId);
                this.loading = true;
            }
        }
    },
    updated() {
        this.item .parentId = this.parentNode.roleId;
        console.log("create Updated!", "pId:", this.parentNode.roleId);
    },
    mounted() {
        this.item .parentId = this.parentNode.roleId;
        console.log("create Mounted!");
    }
}
</script>

