<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">申请</heading>
        <div class="bg-white px-6 py-8 border rounded-lg">
            <div class="text-center">
                <h3 class="text-xl font-bold py-4">展位信息确认</h3>
            </div>
            <p class="text-center text-red-600">
                注：请核对展位相关信息（面积尺寸、高度限制、设计方案开口消防要求）务必确定无误方可开始报图
            </p>
            <p class="text-center text-red-600">
                如有问题请先联系施工安全管理（联系方式见首页联系主场）
            </p>
            <div class="flex items-center justify-center mt-6">
                <p>
                    展位号：
                </p>
                <div class="ml-2">
                    <input v-model="name" class="form-input" placeholder="请输入完整的展位号" type="text" />
                    <button @click="show" class="btn ml-2">搜索</button>
                </div>
            </div>
            <div v-if="booth" class="text-center py-2 text-sm text-red-600">
                <span>您的展位号为：{{ booth.name }}</span>
            </div>
        </div>

        <card v-if="booth" class="mt-8">
            <div class="card-title">
                文件上传
            </div>
            <div class="p-5">
                <!-- <file-uploader v-model="files"></file-uploader> -->
                <div v-for="(material, index) in materials" :key="index" class="flex items-center border-b border-gray-100 pb-4 mb-4">
                    <span class="w-1/3 text-gray-800 px-5">{{ material.name }}</span>
                    <div class="flex-1">
                       <input @change="uploadImage($event, index)" class="hidden" type="file" :id="`upload-${index}`" name="file" />
                        <label class="btn cursor-pointer" :for="`upload-${index}`">
                            上传图片
                        </label>
                        <span v-if="material.file" class="pl-4 text-green-800">已上传</span>
                    </div>
                </div>
            </div>
        </card>

        <div v-if="booth" class="text-center mt-4">
            <button @click="submit" class="btn">提交审核</button>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => ({
            materials: [
                { name: '搭建商营业执照复印件或扫描件（盖公章）', isEdit: false, file: null },
                { name: '搭建商施工资质证明（盖公章）', isEdit: false, file: null },
                { name: '搭建商公司法人和现场安全责任人身份证复印件或扫描件（盖公章）', isEdit: false, file: null },
                { name: '特装展位施工申请表（盖公章）', isEdit: false, file: null },
                { name: '进馆作业安全承诺书（盖公章）', isEdit: false, file: null },
                { name: '参展商授权施工委托书（盖双方公章）', isEdit: false, file: null },
                { name: '现场施工电工的电工证（IC卡正反面）复印件或扫描件（盖公章）', isEdit: false, file: null },
                { name: '设计方案彩色效果图', isEdit: false, file: null },
                { name: '设计方案材质尺寸图', isEdit: false, file: null },
                { name: '设计方案施工结构图', isEdit: false, file: null },
                { name: '配电系统图（盖公章）', isEdit: false, file: null },
                { name: '电气分布图（盖公章）', isEdit: false, file: null },
                { name: '展位保险（盖公章）', isEdit: false, file: null },
            ],
            name: null,
            booth: null,
            files: [],
        }),

        methods: {
            uploadImage(e, index) {
                const files = e.target.files
                if (files.length == 0) return

                let formData = new FormData();
                formData.append('file', files[0])
                axios.post('upload', formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(response => {
                        this.materials[index]['file'] = response.data.path
                    })
            },


            show() {
                axios.get(`exhibitions/${this.$store.getters.exhibition.id}/query-exhibition-booths?name=${this.name}`)
                    .then(response => {
                        if (!response.data) {
                            this.$toasted.show('找不到您输入的展位号', { type: 'danger' })
                        }
                        this.booth = response.data
                    })
            },

            submit() {
                let isPassing = true
                this.materials.forEach(material => {
                    if (!material.file) {
                        this.$toasted.show('请上传'+material.name+'的图片', { type: 'danger' })
                        isPassing = false
                    }
                })
                if (!isPassing) return

                axios.post('member/special-decorations', {
                    exhibition_booth_id: this.booth.id,
                    materials: this.materials,
                }).then(() => {
                    this.$router.push({ path: '/special-decoration' })
                })
            }
        }
    }
</script>
