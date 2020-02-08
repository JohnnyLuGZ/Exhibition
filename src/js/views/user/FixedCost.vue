<template>
    <div class="fixed-width mt-4">
        <heading class="block py-4">固定费用缴纳</heading>

        <div class="py-4">
            <div class="bg-yellow-200 border border-yellow-400 px-8 py-5 rounded-lg shadow-lg">
                <span class="block font-bold text-xl">{{ $store.getters.exhibition.name }}</span>
                <div class="text-sm">
                    <span>布展时间:</span>
                    <span class="text-red-600">2019-11-11至2019-11-13</span>
                    <span>开展时间:</span>
                    <span class="text-red-600">2019-11-14至2019-11-17</span>
                </div>
            </div>
        </div>
        <div class="mt-4 shadow-lg">
            <div class="flex items-center bg-white text-sm px-4 py-3 rounded-t-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>请先填写基础信息</p>
            </div>
            <div class="bg-gray-100 rounded-b-lg p-8">
                <form class="flex flex-wrap">
                    <div class="w-full mb-4">
                        <label class="block w-2/3 px-4">
                            <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>展位号</span>
                            <div class="flex items-center">
                                <div>
                                    <input v-model="booth" class="form-input mt-1 blockx w-full" placeholder="展位号" />
                                </div>
                                <div v-show="booth" class="mx-1">
                                    <button @click="checkBooth" type="button" class="btn">确定</button>
                                </div>
                                <div>
                                    <span>{{ boothText }}</span>
                                </div>
                            </div>
                        </label>
                    </div>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>参展商</span>
                        <input v-model="form.exhibitor_name" class="form-input mt-1 block w-full" placeholder="请输入参展商名称" required />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>参展商联系人</span>
                        <input v-model="form.contact_name" class="form-input mt-1 block w-full" placeholder="请输入参展商联系人" required />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm"><span class="text-red-600 font-bold">*</span>参展商联系人电话</span>
                        <input v-model="form.contact_phone" class="form-input mt-1 block w-full" placeholder="请输入参展商联系人电话" required />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm">参展商联系邮箱</span>
                        <input v-model="form.contact_email" class="form-input mt-1 block w-full" placeholder="请输入参展商联系邮箱" />
                    </label>
                    <label class="block w-1/3 px-4 mb-4">
                        <span class="text-gray-700 text-sm">参展商联系传真</span>
                        <input v-model="form.contact_fax" class="form-input mt-1 block w-full" placeholder="请输入参展商联系传真" />
                    </label>
                    <label class="block w-full px-4">
                        <span class="text-gray-700 text-sm">备注</span>
                        <textarea v-model="form.remark" class="form-textarea block w-full" rows="3" placeholder=""></textarea>
                    </label>
                </form>
            </div>
        </div>

        <div v-if="presetProducts.length > 0" class="mt-8 shadow-lg">
            <div class="flex items-center bg-white text-whitex text-sm px-4 py-3 rounded-t-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>选择基础费用项</p>
            </div>
            <div class="bg-gray-100 rounded-b-lg">
                <table class="table text-center">
                    <thead class="bg-gray-300">
                        <tr>
                            <th class="w-1/12">是否选择</th>
                            <th class="w-3/12">商品名称</th>
                            <th class="w-2/12">单价</th>
                            <th class="w-2/12">押金</th>
                            <th class="w-2/12">购买数量</th>
                            <th class="w-2/12">小计</th>
                        </tr>
                    </thead>
                    <tbody class="">
                        <tr v-for="(product, index) in presetProducts" :key="product.id">
                            <td>
                                <label class="">
                                    <input @change="handleCheck(product)" type="checkbox" class="form-checkbox w-6 h-6" :checked="product.is_checked">
                                </label>
                            </td>
                            <td>{{ product.name }}</td>
                            <td>¥{{ product.meta.price / 100 }}</td>
                            <td>¥{{ product.meta.deposit / 100 }}</td>
                            <td class="flex justify-center">
                                <span @click="minusQuantity(product)" class="cursor-pointer text-gray-500">-</span>
                                <span class="px-2">{{ product.quantity }}</span>
                                <span @click="addQuantity(product)" class="cursor-pointer text-gray-500">+</span>
                            </td>
                            <td class="text-red-600 font-bold">¥{{ product.total_price / 100 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="mt-8 shadow-lg">
            <div class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 rounded-t-lg" role="alert">
                <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                <p>下单说明</p>
            </div>
            <div class="bg-gray-100 rounded-b-lg overflow-hidden">
                <div class="p-8">
                    <p>这里显示详细的说明项目</p>
                </div>

                <div class="bg-gray-300 p-4 flex items-center justify-between">
                    <div class="py-2">
                        <span>费用总计：</span>
                        <span class="text-red-600 font-bold">¥{{ totalPrice / 100 }}</span>
                    </div>
                    <div>
                        <button @click="submit" type="button" class="btn mr-2">去支付</button>
                        <button class="btn" @click="next">继续 水电展具 租赁</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { merge } from 'lodash'
    export default {
        data: () => ({
            booth: null,
            boothText: null,
            totalPrice: null,
            form: {
                exhibition_booth_id: null,
            },
            presetProducts: []
        }),

        watch: {
            presetProducts(items) {
                this.totalPrice = items.filter(item => item.is_checked).map(item => this.calculateProduct(item)).reduce((a, b) => a + b, 0)
            }
        },

        methods: {
            checkBooth() {
                axios.get(`exhibitions/${this.$store.getters.exhibition.id}/query-exhibition-booths?name=${this.booth}`)
                    .then(response => {
                        if (response.data) {
                            this.boothText = `已选择的展位：${response.data.name}`
                            this.form.exhibition_booth_id = response.data.id
                            this.getPresetProducts(response.data.id)
                        } else {
                            this.boothText = '找不到对应的展位信息'
                        }
                    })
            },

            minusQuantity(product) {
                if (product.quantity == 1) return
                const f = this.presetProducts.find(presetProduct => presetProduct.id == product.id)
                f.quantity = product.quantity - 1
                f.total_price = this.calculateProduct(f)

                this.presetProducts = this.presetProducts.map(presetProduct => {
                    if (presetProduct.id == product.id) {
                        return f
                    }
                    return presetProduct
                })
            },

            addQuantity(product) {
                const f = this.presetProducts.find(presetProduct => presetProduct.id == product.id)
                f.quantity = product.quantity + 1
                f.total_price = this.calculateProduct(f)

                this.presetProducts = this.presetProducts.map(presetProduct => {
                    if (presetProduct.id == product.id) {
                        return f
                    }
                    return presetProduct
                })
            },

            getPresetProducts(boothId) {
                axios.get(`exhibitions/${this.$store.getters.exhibition.id}/exhibition-booths/${boothId}/preset-products`)
                    .then(response => {
                        this.presetProducts = response.data
                        this.presetProducts.forEach(product => {
                            product.quantity = 1
                            product.is_checked = product.meta.is_booth_required
                            product.total_price = this.calculateProduct(product)
                        })
                    })
            },

            handleCheck(product) {
                this.presetProducts = this.presetProducts.map(item => {
                    if (item.id == product.id) {
                        item.is_checked = ! item.is_checked
                    }
                    return item
                })
            },

            calculateProduct(product) {
                return (product.meta.price + product.meta.deposit) * product.quantity
            },

            placeOrder() {
                const presets = this.presetProducts.filter(item => item.is_checked).map(item => {
                    return {
                        product_id: item.id,
                        quantity: item.quantity,
                    }
                })

                return axios.post('orders', {
                    ...this.form, presets
                })
            },

            submit() {
                this.placeOrder().then(response => {
                    this.$router.push({ path: '/my-orders/' + response.data.number })
                })
            },

            next() {
                this.placeOrder().then(response => {
                    this.$router.push({ path: '/rent', query: { order_number: response.data.number }})
                })
            }
        }
    }
</script>
