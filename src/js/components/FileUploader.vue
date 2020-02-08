<template>
    <div>
        <div>
            <ul class="bg-gray-100 px-8">
                <li v-for="file in files" class="py-2 flex items-center justify-between">
                    <span>{{ file.name }}</span>
                    <span>{{ file.success ? '已上传' : '未上传' }}</span>
                </li>
            </ul>

            <div class="bg-gray-100 text-center text-sm text-gray-700 py-4" v-show="files.length == 0">
                <span>未选择文件</span>
            </div>

            <div class="py-4 px-8 flex items-center">
                <file-upload
                    ref="upload"
                    :multiple="true"
                    v-model="files"
                    :post-action="url"
                    @input-file="inputFile"
                    @input-filter="inputFilter"
                >
                    <button class="btn bg-gray-600">选择文件</button>
                </file-upload>

                <div class="pl-5">
                    <button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" type="button" class="btn">开始上传</button>
                    <!-- <button v-show="$refs.upload && $refs.upload.active" @click.prevent="$refs.upload.active = false" type="button">Stop upload</button> -->
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import FileUpload from 'vue-upload-component'
export default {
    components: { FileUpload },

    data: () => ({
        files: [],
    }),

    computed: {
        url() {
            return axios.defaults.baseURL + '/upload'
        }
    },

    watch: {
        files(files) {
            const result = files.filter(file => file.success).map(file => {
                return file.response.path
            })
            this.$emit('input', result)
        }
    },

    methods: {
        async upload(file, component) {
            // console.log(file, component)
            console.log(axios.defaults)
            file = component.update(file, {data: {...file.data, token: json.token}})

            return await component.uploadPut(file)
        },

        inputFile: function (newFile, oldFile) {
            if (newFile && oldFile && !newFile.active && oldFile.active) {
                console.log('response', newFile.response)
                if (newFile.xhr) {
                    console.log('status', newFile.xhr.status)
                }
            }
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
};
</script>
