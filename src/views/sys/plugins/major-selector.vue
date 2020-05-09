<template>
    <div>
        <Select v-model="name" @on-change="onChange">
            <Option v-for="item in list" :value="item.id" :key="item.id">{{ item.proName }}</Option>
        </Select>
    </div>
</template>

<script>
    import departmentService from '@/service/departmentService';
    export default {
        name: 'major-selector',
        props: {
            show: Boolean,
            depId: Number,
            proId: Number
        },
        data () {
            return {
                list: [],
                name: ''
            }
        },
        methods: {
            init(){
                let vm = this;
                if(!this.depId) {
                    var param = -1;
                } else {
                    var param = this.depId;
                }
                
                departmentService.getMajorListByDepId(param).then( res => {
                    if(res.status == 200) {
                        vm.list = res.data;
                    } else {
                        vm.$Notice.error({title: res.msg});
                    }
                });
            },
            onChange(value) {
                this.$emit("on-change", value);
            }
        },
        created() {
            this.name = this.proId;
        },
         watch: {
             depId: function() {
                 this.init()
             },
             show: function() {
                 if(this.show){
                     this.init()
                 }
             }

         }

    };
</script>
