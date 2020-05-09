<template>
    <textarea style="height: 500px" id="editor" :value="value"
        v-on:input="updateValue($event.target.value)"  >
    </textarea>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-yx-std';
export default {
	name: 'Ckeditor',
	data: function() {
		return {
			instance: null,
		};
	},
	props: ['value'],
	event: ['abc'],
	watch: {
		value() {
			let html = this.instance.getData();
			if (html !== this.value) {
				this.instance.setData(this.value);
			}
		},
	},
	mounted() {
		ClassicEditor.create(this.$el, {
			simpleUpload: {
				uploadUrl: 'http://120.76.121.210:10010/pmsapi/common/simple-upload?type=faq',
			},
		})
			.then(editor => {
				this.instance = editor;
				editor.model.document.on('change', (evt, data) => {
					this.updateValue(editor.getData());
				});
			})
			.catch(error => {
				console.error(error);
			});
	},
	methods: {
		updateValue: function(value) {
			this.$emit('abc', value);
		},
	},
};
</script>
