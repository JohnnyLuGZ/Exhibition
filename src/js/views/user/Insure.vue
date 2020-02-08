<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">{{ $store.getters.exhibition.name }} 保险购买</heading>

        <div class="py-4">
            <div class="bg-yellow-200 border border-yellow-400 px-8 py-5 rounded-lg shadow-lg">
                <div>
                    <span class="text-lg text-red-600 font-bold">特别说明:</span>
                    <ol>
                        <li>目前仅支持购买展会保(展览会责任险)</li>
                        <li>一次下单仅支持同一个公司购买保险</li>
                        <li>如果保险不存在将以所填信息为准, 请务必保证填写信息的真实性和准确性</li>
                        <li>如因信息填写有误造成的后果由客户自行承担</li>
                        <li>如您的展位面积包含小数, 系统将会按整数计算(舍去小数位), 不影响投保</li>
                        <li>一次购买保险的展位数量最多不能超过5个, 如有多个请分批购买</li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="bg-white rounded-lg overflow-hidden shadow">
            <table class="table w-full text-center">
                <thead>
                    <tr>
                        <th>保险公司名称</th>
                        <th>联系人</th>
                        <th>联系人电话</th>
                        <th>微信二维码</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-100">
                    <tr v-for="company in companies">
                        <td>{{ company.name }}</td>
                        <td>{{ company.contact_name }}</td>
                        <td>{{ company.contact_phone }}</td>
                        <td class="flex justify-center">
                            <img class="w-32 h-32" :src="company.qrcode_url">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-show="false" class="mt-4 shadow-lg overflow-hidden">
            <div class="flex items-center bg-white text-sm px-4 py-3 rounded-t-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>请先填写投保信息</p>
            </div>
            <div class="bg-gray-100 rounded-b-lg p-8">
                <form class="flex flex-wrap">
                    <div class="w-full mb-4 border-b py-4">
                        <label class="block w-2/3 px-4 flex items-center">
                            <div>
                                <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>展位号</span>
                            </div>
                            <div class="mx-2">
                                <input v-model="exhibition_booth_name" class="form-input mt-1 block w-full" placeholder="展位号" />
                            </div>
                            <div v-if="exhibition_booth_name">
                                <button @click="check" type="button" class="btn">查询</button>
                            </div>
                            <div class="ml-2" v-if="booth">
                                已选择展位：{{ booth.name }}
                            </div>
                        </label>
                    </div>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>被保险公司名称</span>
                        <input v-model="form.insured_name" class="form-input mt-1 block w-full" placeholder="仅支持填写一家公司名称且需要填写全称" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>被保险公司统一社会信用代码</span>
                        <input v-model="form.company_number" class="form-input mt-1 block w-full" placeholder="统一社会信用代码" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>姓名</span>
                        <input v-model="form.contact_name" class="form-input mt-1 block w-full" placeholder="姓名" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>电话</span>
                        <input v-model="form.contact_phone" class="form-input mt-1 block w-full" placeholder="联系电话" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm">邮箱</span>
                        <input v-model="form.contact_email" class="form-input mt-1 block w-full" placeholder="邮箱" />
                    </label>
                </form>
            </div>
            <div class="mt-8x shadow-lgx py-4 px-8">
                <button class="btn" @click="next">开始购买保险</button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: () => ({
            companies: [],
            exhibition_booth_name: null,
            booth: null,
            form: {
                insured_name: null,
                company_number: null,
                contact_name: null,
                contact_phone: null,
                contact_email: null,
            }
        }),

        mounted() {
            this.getCompanies()
        },

        methods: {
            getCompanies() {
                axios.get('insurance-companies').then(response => this.companies = response.data)
            },

            check() {
                axios.get(`exhibitions/${this.$store.getters.exhibition.id}/query-exhibition-booths?name=${this.exhibition_booth_name}`)
                    .then(response => {
                        this.booth = response.data
                        if (!response.data) {
                            this.$toasted.show('查询不到该展位信息', { type: 'danger' })
                        }
                    })
            },

            next() {
                axios.post(`exhibitions/${this.$store.getters.exhibition.id}/insurances`, { ...this.form, exhibition_booth_id: this.booth.id })
                    .then(() => {
                        this.$toasted.show('已提交，请按提示完成付款', { type: 'success' })
                        this.$router.push({ path: '/my-insurances' })
                    })
            }
        }
    }
</script>
