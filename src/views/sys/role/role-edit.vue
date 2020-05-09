<template>
    <div style="display: inline">
        <Button type="primary" size="small" @click="visable">编辑</Button>
        <Modal v-model="isOpened" title="新增角色" :loading="loading" @on-ok="editItem">
            <p>
            <Form ref="newForm" :model="eitem" :label-width="80" :rules="rules">
                <FormItem prop="roleName" label="角色名称">
                    <Input type="text" v-model="eitem.roleName"></Input>
                </FormItem>
                <FormItem prop="description" label="描述">
                    <Input type="text" v-model="eitem.remark"></Input>
                </FormItem>
            </Form>
            </p>
        </Modal>
    </div>
</template>

<script>
import RoleService from '@/service/roleService';
import Role from '@/entity/role';
export default {
    name: "role-edit",
    props:{
        item: {
            type: Object
        }
    },
    data() {
        return {
            isOpened: false,
            loading: true,
            rules: {
                roleName: [{ required: true, message: '输入不能为空', trigger: 'blur' }]
            },
        }
    },
    methods: {
        editItem: function(){
            alert("edit");
            let vm = this;

        },
        visable: function(){
            this.isOpened = true;
        }
    },
    computed: {
        eitem: function () {
            return this.item
        }
    }
};
</script>


