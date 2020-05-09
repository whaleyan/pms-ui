<template>
    <div>
        <Select v-model="name" @on-change="onChange">
            <Option v-for="item in list" :value="item.id" :key="item.id">{{ item.degName }}</Option>
        </Select>
    </div>
</template>

<script>
    import departmentService from '@/service/departmentService';
    export default {
        name: 'student-type-selector',
        props: {
            show: Boolean,
            typeId: Number
        },
        data () {
            return {
                list: [],
                name: ''
            }
        },
        methods: {
            onChange(value){
                this.$emit("onSTypeSelector", value);
            },
            init(){
                let vm = this;
                departmentService.getStudentTypeList({}).then( res => {
                    if(res.status == 200) {
                        vm.list = res.data;
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            }
        },
        created() {
            this.name = this.typeId;
            if(this.show){
                this.init();
            }
        },
        watch: {
            show: function() {
                if(this.show){
                    this.init()
                }
            }
        }
    };
</script>
