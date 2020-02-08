<template>
    <div class="fixed-width mt-4">
    	<div class="bg-white p-6 border rounded-lg">
    		<div class="text-center">
    			<h3 class="text-xl font-bold">报图须知</h3>
    		</div>
            <div>
                <div ref="editor"></div>
            </div>
    		<div class="flex justify-center mt-6">
			  <label class="flex items-center">
			    <input v-model="checked" type="checkbox" class="form-checkbox">
			    <span class="ml-2">已知悉</span>
			  </label>
			  <button @click="next" class="ml-4 btn px-3 py-1">下一步</button>
			</div>
    	</div>
    </div>
</template>

<script>
import Quill from 'quill'

export default {
	data: () => ({
        editor: null,
		checked: false,
	}),

    mounted() {
        this.getExhibition()
        this.initEditor()
    },

    methods: {
        initEditor() {
            this.editor = new Quill(this.$refs.editor, {
                placeholder: '',
                theme: 'snow',
                readOnly: true,
                modules: {
                    toolbar: false
                }
            });

            this.initContents()
        },

        initContents() {
            axios.get('exhibitions/info?with_special_decoration_provision&exhibition_id=' + this.$store.getters.exhibition.id)
                .then(response => {
                    if (JSON.parse(response.data.special_decoration_provision)) {
                        this.editor.setContents(JSON.parse(response.data.special_decoration_provision).ops)
                    }
                })
            // Nova.request().get('/nova-vendor/special-decoration-provision/' + this.resourceId).then(response => {
            //     this.editor.setContents(response.data.ops)
            // })
        },

    	next() {
    		if (this.checked) {
    			return this.$router.push({ path: '/special-decoration/decoration-confirm' })
    		}

            this.$toasted.show('请先阅读报图须知', { type: 'info' })
    	},

        getExhibition() {
        }
    }
}
</script>
