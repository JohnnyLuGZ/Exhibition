<template>
        <file-upload
            extensions="gif,jpg,jpeg,png,webp"
            accept="image/png,image/gif,image/jpeg,image/webp"
            name="avatar"
            class="btn"
            :post-action="postActionUrl"
            :drop="false"
            v-model="files"
            @input-file="handleFileUpload"
            ref="upload">
            点击上传
        </file-upload>
</template>

<script>
import FileUpload from 'vue-upload-component'

export default {
    components: { FileUpload },

    data: () => ({
        files: [],
    }),

    computed: {
        postActionUrl() {
            return axios.defaults.baseURL + '/upload'
        }
    },

    methods: {
        handleFileUpload(e) {
            e.active = true
            // console.log(e)
        },

        inputFilter: function (newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                    return prevent()
                }
            }

            newFile.blob = ''
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
                newFile.blob = URL.createObjectURL(newFile.file)
            }
        }
    }
}
</script>
