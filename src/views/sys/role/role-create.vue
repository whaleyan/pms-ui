<template>
    <div>
        <has-permisstion permission="sys:role:save">
            <Button type="primary" icon="plus" @click="visable">新增角色</Button>
        </has-permisstion>
        <Modal v-model="isOpened" title="新增角色" :loading="loading" @on-ok="createItem">
            <p>
            <Form ref="newForm" :model="item" :label-width="80" :rules="rules">
                <FormItem prop="roleName" label="角色名称">
                    <Input type="text" v-model="item.roleName"></Input>
                </FormItem>
                <FormItem prop="description" label="描述">
                    <Input type="text" v-model="item.remark"></Input>
                </FormItem>
            </Form>
            </p>
        </Modal>
    </div>
</template>

<script>
import RoleService from '@/service/roleService';
import Role from '@/entity/role';
import HasPermisstion from "@/views/main-components/auth/has-permission.vue";
export default {
    name: "role-create",
    components: {HasPermisstion},
    data() {
        return {
            isOpened: false,
            item: new Role(),
            loading: true,
            rules: {
                roleName: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
            },
        }
    },
    methods: {
        createItem: function(){
            alert("Open");
            let vm = this;
            this.$refs.newForm.validate((valid) => {
                if(valid) {
                    RoleService.createRole(this.item).then(res => {
                        vm.loading = false;
                        vm.isOpened = false;
                        if(res.status === 200) {
                            vm.$Notice.success({title:'新建成功'});
                        } else {
                            vm.$Notice.error({title:res.msg});
                        }
                    });
                } else {
                    vm.loading = false;
                }
            });
        },
        visable: function(){
            this.isOpened = true;
        }
    }
};
</script>


