<template>
    <span>
        <Button type="primary" size="small" @click="openDialog">编辑</Button>
        <!-- 编辑 -->
        <Modal v-model="show" title="编辑" :loading="loading" @on-ok="onOk" @on-visible-change="visibleChange">
            <p>
                <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="120">
					<FormItem label="FAQ排列顺序" prop="sx">
						<Input v-model="formData.sx" placeholder="输入原因..."></Input>
					</FormItem>
					<FormItem label="FAQ题目" prop="title">
						<Input v-model="formData.title" type="textarea" placeholder="输入内容..."></Input>
					</FormItem>
					<FormItem label="FAQ回答" prop="answer">
						<!-- <Input v-model="formData.answer" type="textarea" placeholder="输入内容..."></Input> -->
						<c-k-editor :value="formData.answer" @abc="abc" ></c-k-editor>
					</FormItem>

            	</Form>
            </p>
        </Modal>

    </span>
</template>

<script>
import service from '@/service/sysSettingService';
import CKEditor from './faq-editor.vue';
export default {
	name: 'faq-edit',
	props: {
		obj: Object,
	},
	components: {
		CKEditor,
	},
	data() {
		return {
			show: false,
			loading: true,
			formData: {
				title: '',
				content: '',
				type: 5,
				sx: '',
				answer: '',
				id: '',
			},
			ruleValidate: {
				title: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
				answer: [{ required: true, message: '输入不能为空', trigger: 'blur' }],
			},
			isInit: false,
		};
	},
	methods: {
		abc(value) {
			this.formData.answer = value;
		},
		onOk() {
			let vm = this;
			let innerInfo = {
				sx: vm.formData.sx,
				answer: vm.formData.answer,
			};

			let data = {
				title: vm.formData.title,
				type: 5,
				id: vm.formData.id,
				content: JSON.stringify(innerInfo),
			};

			console.log(vm);
			console.log(data);

			this.$refs.formData.validate(valid => {
				if (valid) {
					// console.log(vm.formData);
					service.updateFaq(data).then(res => {
						if (res.status === 200) {
							vm.loading = false; // 关闭等待状态
							vm.show = false; // 关闭弹框
							vm.$Notice.success({ title: res.msg });
							vm.$emit('onSuccess');
						} else {
							vm.loading = false;
							vm.$Notice.error({ title: res.msg });
						}
					});
				} else {
					vm.loading = false;
				}
			});
		},
		visibleChange(flag) {
			if (!flag) {
				this.loading = true;
				this.isInit = false;
			} else {
				this.isInit = true;
			}
		},
		openDialog() {
			this.show = true;
		},
	},
	created() {
		let innerInfo = JSON.parse(this.obj.content);
		this.formData.title = this.obj.title;
		this.formData.id = this.obj.id;
		this.formData.answer = innerInfo.answer;
		this.formData.sx = innerInfo.sx;
		console.log('id:' + this.formData.id);
	},
	mounted() {},
};
</script>

<style scoped>
</style>
